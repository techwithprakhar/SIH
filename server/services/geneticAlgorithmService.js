const Batch = require("../models/Batch")
const Subject = require("../models/Subject")
const Faculty = require("../models/Faculty")
const Classroom = require("../models/Classroom")
const Timetable = require("../models/Timetable")

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const TIME_SLOTS = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
]
const MAX_CLASSES_PER_DAY_BATCH = 4 // Example: Maximum 4 classes per day for a batch

// Helper function to get random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Chromosome representation: An array of class slots
// Each slot: { day, time, batchId, subjectId, facultyId, classroomId }

async function initializePopulation(populationSize, batches, subjects, faculties, classrooms) {
  const population = []
  for (let i = 0; i < populationSize; i++) {
    const chromosome = []
    const requiredClasses = {} // Track classes needed per subject per batch

    // Initialize requiredClasses
    for (const batch of batches) {
      requiredClasses[batch._id] = {}
      for (const subjectId of batch.subjects) {
        const subject = subjects.find((s) => s._id.equals(subjectId))
        if (subject) {
          requiredClasses[batch._id][subject._id] = subject.weeklyClassesRequired
        }
      }
    }

    // Generate genes (class slots)
    for (const batch of batches) {
      for (const subjectId of batch.subjects) {
        const subject = subjects.find((s) => s._id.equals(subjectId))
        if (!subject) continue

        for (let k = 0; k < subject.weeklyClassesRequired; k++) {
          let validSlotFound = false
          let attempts = 0
          const maxAttempts = 100 // Prevent infinite loops

          while (!validSlotFound && attempts < maxAttempts) {
            const day = getRandomElement(DAYS)
            const time = getRandomElement(TIME_SLOTS)
            const faculty = getRandomElement(subject.facultyAssigned)
            const classroom = getRandomElement(classrooms)

            if (faculty && classroom) {
              chromosome.push({
                day,
                time,
                batchId: batch._id,
                subjectId: subject._id,
                facultyId: faculty._id,
                classroomId: classroom._id,
              })
              validSlotFound = true
            }
            attempts++
          }
        }
      }
    }
    population.push(chromosome)
  }
  return population
}

function calculateFitness(chromosome, allData) {
  let fitness = 0
  const { batches, subjects, faculties, classrooms } = allData

  // Hard Constraints (penalize heavily)
  // 1. No two classes can occupy the same classroom at the same time.
  const classroomOccupancy = {} // { day_time_classroomId: count }
  // 2. A faculty member cannot take two classes at the same time.
  const facultyOccupancy = {} // { day_time_facultyId: count }
  // 3. A batch cannot attend two subjects at the same time.
  const batchOccupancy = {} // { day_time_batchId: count }
  // 4. Each subject must be allocated its required number of classes per week.
  const subjectAllocation = {} // { batchId_subjectId: count }
  // 5. Maximum number of classes per day per batch cannot be exceeded.
  const batchDailyClasses = {} // { batchId_day: count }

  for (const slot of chromosome) {
    const classroomKey = `${slot.day}_${slot.time}_${slot.classroomId}`
    classroomOccupancy[classroomKey] = (classroomOccupancy[classroomKey] || 0) + 1

    const facultyKey = `${slot.day}_${slot.time}_${slot.facultyId}`
    facultyOccupancy[facultyKey] = (facultyOccupancy[facultyKey] || 0) + 1

    const batchKey = `${slot.day}_${slot.time}_${slot.batchId}`
    batchOccupancy[batchKey] = (batchOccupancy[batchKey] || 0) + 1

    const subjectKey = `${slot.batchId}_${slot.subjectId}`
    subjectAllocation[subjectKey] = (subjectAllocation[subjectKey] || 0) + 1

    const batchDayKey = `${slot.batchId}_${slot.day}`
    batchDailyClasses[batchDayKey] = (batchDailyClasses[batchDayKey] || 0) + 1
  }

  // Penalize violations
  for (const key in classroomOccupancy) {
    if (classroomOccupancy[key] > 1) fitness -= 1000 * (classroomOccupancy[key] - 1)
  }
  for (const key in facultyOccupancy) {
    if (facultyOccupancy[key] > 1) fitness -= 1000 * (facultyOccupancy[key] - 1)
  }
  for (const key in batchOccupancy) {
    if (batchOccupancy[key] > 1) fitness -= 1000 * (batchOccupancy[key] - 1)
  }
  for (const key in batchDailyClasses) {
    if (batchDailyClasses[key] > MAX_CLASSES_PER_DAY_BATCH)
      fitness -= 500 * (batchDailyClasses[key] - MAX_CLASSES_PER_DAY_BATCH)
  }

  // Check required classes per subject
  for (const batch of batches) {
    for (const subjectId of batch.subjects) {
      const subject = subjects.find((s) => s._id.equals(subjectId))
      if (subject) {
        const allocated = subjectAllocation[`${batch._id}_${subject._id}`] || 0
        if (allocated !== subject.weeklyClassesRequired) {
          fitness -= 700 * Math.abs(allocated - subject.weeklyClassesRequired)
        }
      }
    }
  }

  // Soft Constraints (reward good scheduling)
  // 1. Balanced workload for faculty across the week.
  const facultyWeeklyLoad = {} // { facultyId: count }
  for (const slot of chromosome) {
    facultyWeeklyLoad[slot.facultyId] = (facultyWeeklyLoad[slot.facultyId] || 0) + 1
  }
  const loads = Object.values(facultyWeeklyLoad)
  if (loads.length > 0) {
    const avgLoad = loads.reduce((sum, load) => sum + load, 0) / loads.length
    const variance = loads.reduce((sum, load) => sum + Math.pow(load - avgLoad, 2), 0) / loads.length
    fitness -= variance * 10 // Penalize high variance
  }

  // 2. Minimize timetable gaps for students (per batch)
  for (const batch of batches) {
    const batchSchedule = chromosome.filter((slot) => slot.batchId.equals(batch._id))
    const dailySchedule = {} // { day: [{time, subjectId}] }
    for (const slot of batchSchedule) {
      if (!dailySchedule[slot.day]) dailySchedule[slot.day] = []
      dailySchedule[slot.day].push(slot)
    }

    for (const day in dailySchedule) {
      dailySchedule[day].sort((a, b) => TIME_SLOTS.indexOf(a.time) - TIME_SLOTS.indexOf(b.time))
      for (let i = 0; i < dailySchedule[day].length - 1; i++) {
        const currentTimeIndex = TIME_SLOTS.indexOf(dailySchedule[day][i].time)
        const nextTimeIndex = TIME_SLOTS.indexOf(dailySchedule[day][i + 1].time)
        const gap = nextTimeIndex - currentTimeIndex - 1
        if (gap > 0) fitness -= gap * 5 // Penalize gaps
      }
    }
  }

  // 3. Prefer scheduling core subjects in the morning, electives later.
  // (This would require a 'type' field on Subject model, e.g., 'core' or 'elective')
  // For now, we'll assume subjects with higher weeklyClassesRequired are 'core'
  for (const slot of chromosome) {
    const subject = subjects.find((s) => s._id.equals(slot.subjectId))
    if (subject) {
      const timeIndex = TIME_SLOTS.indexOf(slot.time)
      if (subject.weeklyClassesRequired > 3 && timeIndex > TIME_SLOTS.length / 2) {
        // Core subject in afternoon
        fitness -= 20
      } else if (subject.weeklyClassesRequired <= 3 && timeIndex <= TIME_SLOTS.length / 2) {
        // Elective in morning
        fitness -= 10
      }
    }
  }

  return fitness
}

function selectParents(population, fitnessScores, tournamentSize) {
  const parents = []
  for (let i = 0; i < 2; i++) {
    let bestIndex = -1
    let bestFitness = Number.NEGATIVE_INFINITY
    for (let j = 0; j < tournamentSize; j++) {
      const randomIndex = Math.floor(Math.random() * population.length)
      if (fitnessScores[randomIndex] > bestFitness) {
        bestFitness = fitnessScores[randomIndex]
        bestIndex = randomIndex
      }
    }
    parents.push(population[bestIndex])
  }
  return parents
}

function crossover(parent1, parent2) {
  const crossoverPoint = Math.floor(Math.random() * parent1.length)
  const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)]
  const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)]
  return [child1, child2]
}

function mutate(chromosome, mutationRate, allData) {
  const { batches, subjects, faculties, classrooms } = allData
  for (let i = 0; i < chromosome.length; i++) {
    if (Math.random() < mutationRate) {
      // Mutate a gene (class slot)
      const originalSlot = chromosome[i]
      const newSlot = { ...originalSlot }

      // Randomly change one attribute
      const attributeToChange = getRandomElement(["day", "time", "faculty", "classroom"])

      switch (attributeToChange) {
        case "day":
          newSlot.day = getRandomElement(DAYS)
          break
        case "time":
          newSlot.time = getRandomElement(TIME_SLOTS)
          break
        case "faculty":
          const subject = subjects.find((s) => s._id.equals(originalSlot.subjectId))
          if (subject && subject.facultyAssigned.length > 0) {
            newSlot.facultyId = getRandomElement(subject.facultyAssigned)
          }
          break
        case "classroom":
          newSlot.classroomId = getRandomElement(classrooms)._id
          break
      }
      chromosome[i] = newSlot
    }
  }
  return chromosome
}

async function generateTimetableGA(
  department,
  shift,
  populationSize = 100,
  generations = 500,
  mutationRate = 0.1,
  tournamentSize = 5,
) {
  // Fetch all necessary data
  const batches = await Batch.find({ department, shift }).populate("subjects")
  const subjects = await Subject.find({ department }).populate("facultyAssigned")
  const faculties = await Faculty.find()
  const classrooms = await Classroom.find()

  const allData = { batches, subjects, faculties, classrooms }

  let population = await initializePopulation(populationSize, batches, subjects, faculties, classrooms)

  for (let gen = 0; gen < generations; gen++) {
    const fitnessScores = population.map((chromo) => calculateFitness(chromo, allData))

    // Sort population by fitness (descending)
    const sortedPopulation = population
      .map((chromo, index) => ({ chromo, fitness: fitnessScores[index] }))
      .sort((a, b) => b.fitness - a.fitness)

    population = sortedPopulation.map((item) => item.chromo)

    const newPopulation = [population[0]] // Elitism: keep the best chromosome

    while (newPopulation.length < populationSize) {
      const [parent1, parent2] = selectParents(population, fitnessScores, tournamentSize)
      const [child1, child2] = crossover(parent1, parent2)

      newPopulation.push(mutate(child1, mutationRate, allData))
      if (newPopulation.length < populationSize) {
        newPopulation.push(mutate(child2, mutationRate, allData))
      }
    }
    population = newPopulation
  }

  // After generations, return the best timetable
  const finalFitnessScores = population.map((chromo) => calculateFitness(chromo, allData))
  const bestTimetableIndex = finalFitnessScores.indexOf(Math.max(...finalFitnessScores))
  return population[bestTimetableIndex]
}

module.exports = {
  generateTimetableGA,
  DAYS,
  TIME_SLOTS,
}
