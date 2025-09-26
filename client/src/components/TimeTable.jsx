import React, { useState, useRef, useEffect } from 'react';
import './TimeTable.css';

const TimeTable = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [clickedCard, setClickedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const tableRef = useRef(null);

  // Sample timetable data
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const schedule = {
    Monday: ['Math', 'Physics', 'Chemistry', 'Break', 'CS', 'English', 'Lab', 'Study'],
    Tuesday: ['Physics', 'Math', 'English', 'Break', 'Chemistry', 'CS', 'PE', 'Study'],
    Wednesday: ['Chemistry', 'English', 'Math', 'Break', 'Physics', 'Lab', 'CS', 'Study'],
    Thursday: ['English', 'CS', 'Physics', 'Break', 'Math', 'Chemistry', 'Lab', 'Study'],
    Friday: ['CS', 'Chemistry', 'English', 'Break', 'Physics', 'Math', 'PE', 'Study']
  };

  const subjectColors = {
    Math: '#ff6b6b',
    Physics: '#4ecdc4',
    Chemistry: '#45b7d1',
    CS: '#96ceb4',
    English: '#ffeaa7',
    Lab: '#dda0dd',
    PE: '#98d8c8',
    Break: '#f7dc6f',
    Study: '#bb8fce'
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('mousemove', handleMouseMove);
      return () => tableElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Get initial tilt for the entire timetable
//   const getInitialTableTilt = () => {
//     return 'perspective(1200px) rotateX(5deg) rotateY(-3deg) translateZ(10px)';
//   };

  // Get table transform based on mouse position for comprehensive effects
  const getTableTransform = () => {
    const { x, y } = mousePosition;
    let baseTransform = 'perspective(1200px)';
    
    // Calculate rotation based on mouse position
    const rotateX = (y - 50) * 0.3; // -15 to +15 degrees
    const rotateY = (x - 50) * 0.3; // -15 to +15 degrees
    
    // Enhanced corner and edge effects
    let additionalTransform = '';
    
    // Corner effects with stronger transformations
    if (x < 20 && y < 20) {
      // Top-left corner
      additionalTransform = ` rotateX(-15deg) rotateY(-15deg) translateZ(40px) scale(1.02)`;
    } else if (x > 80 && y < 20) {
      // Top-right corner
      additionalTransform = ` rotateX(-15deg) rotateY(15deg) translateZ(40px) scale(1.02)`;
    } else if (x < 20 && y > 80) {
      // Bottom-left corner
      additionalTransform = ` rotateX(15deg) rotateY(-15deg) translateZ(40px) scale(1.02)`;
    } else if (x > 80 && y > 80) {
      // Bottom-right corner
      additionalTransform = ` rotateX(15deg) rotateY(15deg) translateZ(40px) scale(1.02)`;
    }
    // Edge effects
    else if (x < 15) {
      // Left edge
      additionalTransform = ` rotateY(-12deg) translateZ(25px) scale(1.01)`;
    } else if (x > 85) {
      // Right edge
      additionalTransform = ` rotateY(12deg) translateZ(25px) scale(1.01)`;
    } else if (y < 15) {
      // Top edge
      additionalTransform = ` rotateX(-12deg) translateZ(25px) scale(1.01)`;
    } else if (y > 85) {
      // Bottom edge
      additionalTransform = ` rotateX(12deg) translateZ(25px) scale(1.01)`;
    }
    // Center hover effect with dynamic rotation
    else {
      additionalTransform = ` rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.005)`;
    }
    
    return baseTransform + additionalTransform;
  };

  // // Get corner indicator info
  // const getCornerInfo = () => {
  //   const { x, y } = mousePosition;
    
  //   if (x < 20 && y < 20) return { active: true, position: 'top-left', text: '↖ Top-Left Lift & Tilt' };
  //   if (x > 80 && y < 20) return { active: true, position: 'top-right', text: '↗ Top-Right Lift & Tilt' };
  //   if (x < 20 && y > 80) return { active: true, position: 'bottom-left', text: '↙ Bottom-Left Lift & Tilt' };
  //   if (x > 80 && y > 80) return { active: true, position: 'bottom-right', text: '↘ Bottom-Right Lift & Tilt' };
  //   if (x < 15) return { active: true, position: 'left', text: '← Left Edge Tilt' };
  //   if (x > 85) return { active: true, position: 'right', text: '→ Right Edge Tilt' };
  //   if (y < 15) return { active: true, position: 'top', text: '↑ Top Edge Tilt' };
  //   if (y > 85) return { active: true, position: 'bottom', text: '↓ Bottom Edge Tilt' };
    
  //   return { active: true, position: 'center', text: '🎯 Dynamic 3D Following' };
  // };

  const getDynamicBackground = () => {
    return {
      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
        rgba(255, 255, 255, 0.2) 0%, 
        rgba(138, 43, 226, 0.15) 20%,
        rgba(59, 130, 246, 0.1) 40%,
        rgba(236, 72, 153, 0.08) 60%,
        transparent 80%)`
    };
  };

  const handleCardClick = (dayIndex, timeIndex) => {
    const cardId = `${dayIndex}-${timeIndex}`;
    setClickedCard(clickedCard === cardId ? null : cardId);
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      Math: '📐',
      Physics: '⚛️',
      Chemistry: '🧪',
      CS: '💻',
      English: '📚',
      Lab: '🔬',
      PE: '⚽',
      Break: '☕',
      Study: '📖'
    };
    return icons[subject] || '📚';
  };

  // const cornerInfo = getCornerInfo();

  return (
    <div className="timetable-container">
      {/* Dynamic background lighting */}
      <div 
        className="dynamic-background"
        style={getDynamicBackground()}
      />
      
      {/* Animated background pattern */}
      <div className="background-pattern">
        <div className="background-gradient" />
        <div className="background-animation" />
      </div>

      <div className="content-wrapper">
        {/* Title */}
        <h1 className="main-title">
          
        </h1>
        
        {/* Enhanced corner indicators
        <div className={`corner-indicator ${cornerInfo.active ? 'active' : ''} ${cornerInfo.position}`}>
          {cornerInfo.text}
        </div> */}
        
        {/* Main Timetable Box with 3D effects */}
        <div 
          ref={tableRef}
          className="timetable-box"
          style={{
            transform: getTableTransform()
          }}
        >
          {/* Timetable Grid */}
          <div className="timetable-grid">
            {/* Header Row */}
            <div className="header-cell time-header">
              <span>Time</span>
              <div className="header-shine" />
            </div>
            
            {days.map((day, index) => (
              <div key={index} className="header-cell day-header">
                <span>{day}</span>
                <div className="header-shine" />
              </div>
            ))}
            
            {/* Time and Subject Cards */}
            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={timeIndex}>
                {/* Time slot */}
                <div className="time-slot">
                  <span>{time}</span>
                  <div className="time-shine" />
                </div>
                
                {/* Subject cards */}
                {days.map((day, dayIndex) => {
                  const subject = schedule[day][timeIndex];
                  const cardId = `${dayIndex}-${timeIndex}`;
                  const isHovered = hoveredCard === cardId;
                  const isClicked = clickedCard === cardId;
                  
                  return (
                    <div
                      key={cardId}
                      className={`subject-card ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
                      style={{
                        '--subject-color': subjectColors[subject],
                        zIndex: isClicked ? 10 : isHovered ? 5 : 1
                      }}
                      onMouseEnter={() => setHoveredCard(cardId)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardClick(dayIndex, timeIndex)}
                    >
                      {/* Card container */}
                      <div className="card-inner">
                        {/* Card content */}
                        <div className="card-content">
                          <div className="subject-name">{subject}</div>
                          <div className="subject-icon">
                            {getSubjectIcon(subject)}
                          </div>
                          
                          {/* Expanded content for clicked cards */}
                          {isClicked && (
                            <div className="expanded-info">
                              <p className="expanded-time">{time}</p>
                              <p className="expanded-room">Room: </p>     {/* add room number with your choice*/}
                            </div>
                          )}
                        </div>
                        
                        {/* Card overlay effects */}
                        <div className="card-overlay" />
                        {isHovered && <div className="hover-overlay" />}
                        {isClicked && <div className="click-overlay" />}
                      </div>
                      
                      {/* Enhanced effects */}
                      {(isHovered || isClicked) && (
                        <div className={`card-glow ${isClicked ? 'clicked-glow' : 'hovered-glow'}`} />
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          
          {/* Box decoration effects
          <div className="box-border-glow"></div>
          <div className="box-inner-glow"></div> */}
        </div>

        {/* Instructions
        <div className="instructions-panel">
          <h3 className="instructions-title">3D Timetable Controls:</h3>
          <ul className="instructions-list">
            <li>• Move mouse around to control 3D perspective</li>
            <li>• Hover cards for highlight effects</li>
            <li>• Click cards to expand and show details</li>
            <li>• Move to corners/edges for enhanced tilting</li>
            <li>• Entire timetable moves in 3D space</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default TimeTable;