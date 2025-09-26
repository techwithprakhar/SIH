// Enhanced College Scheduling System with Advanced Features

class CollegeSchedulingSystem {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.theme = localStorage.getItem('theme') || 'light';
        this.sidebarOpen = false;
        this.selectedRating = 0;
        this.selectedElectives = [];
        this.selectedAlgorithm = 'genetic';
        this.mockData = this.initializeMockData();
        this.electivePreferences = [];
        this.feedbackData = [];
        this.classRequests = [];
        this.workloadHours = {};
        this.notifications = [];
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.showLoginPage();
        this.loadStoredData();
    }

    initializeMockData() {
        return {
            users: [
                {
                    id: 1,
                    username: "admin",
                    password: "admin123",
                    role: "admin",
                    name: "System Administrator",
                    email: "admin@college.edu",
                    phone: "+1-234-567-8900",
                    address: "123 College Street, University City",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                },
                {
                    id: 2,
                    username: "faculty1",
                    password: "faculty123",
                    role: "faculty",
                    name: "Dr. Sarah Johnson",
                    email: "sarah.johnson@college.edu",
                    phone: "+1-234-567-8901",
                    address: "456 Faculty Lane, University City",
                    department: "Computer Science",
                    subjects: ["Data Structures", "Algorithms", "Database Systems"],
                    maxHoursPerWeek: 18,
                    currentWorkload: 15,
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face"
                },
                {
                    id: 3,
                    username: "student1",
                    password: "student123",
                    role: "student",
                    name: "John Smith",
                    email: "john.smith@student.college.edu",
                    phone: "+1-234-567-8902",
                    address: "789 Student Housing, University City",
                    batch: "CS-2023-A",
                    semester: 3,
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                }
            ],
            faculties: [
                {
                    id: 1,
                    name: "Dr. Sarah Johnson",
                    email: "sarah.johnson@college.edu",
                    department: "Computer Science",
                    subjects: ["Data Structures", "Algorithms", "Database Systems"],
                    maxHoursPerWeek: 18,
                    currentWorkload: 15,
                    weeklyHours: { "Data Structures": 6, "Algorithms": 4, "Database Systems": 5 },
                    status: "active"
                },
                {
                    id: 2,
                    name: "Prof. Michael Chen",
                    email: "michael.chen@college.edu",
                    department: "Mathematics",
                    subjects: ["Calculus", "Linear Algebra", "Statistics"],
                    maxHoursPerWeek: 20,
                    currentWorkload: 18,
                    weeklyHours: { "Calculus": 8, "Linear Algebra": 6, "Statistics": 4 },
                    status: "active"
                },
                {
                    id: 3,
                    name: "Dr. Emma Wilson",
                    email: "emma.wilson@college.edu",
                    department: "Computer Science",
                    subjects: ["Machine Learning", "AI", "Data Mining"],
                    maxHoursPerWeek: 16,
                    currentWorkload: 14,
                    weeklyHours: { "Machine Learning": 6, "AI": 4, "Data Mining": 4 },
                    status: "active"
                }
            ],
            subjects: [
                { id: 1, name: "Data Structures", code: "CS301", credits: 4, type: "core", semester: 3, hoursPerWeek: 4 },
                { id: 2, name: "Database Systems", code: "CS401", credits: 3, type: "core", semester: 4, hoursPerWeek: 3 },
                { id: 3, name: "Machine Learning", code: "CS501", credits: 3, type: "elective", semester: 5, hoursPerWeek: 3 },
                { id: 4, name: "Web Development", code: "CS502", credits: 3, type: "elective", semester: 5, hoursPerWeek: 3 },
                { id: 5, name: "Mobile App Development", code: "CS503", credits: 3, type: "elective", semester: 5, hoursPerWeek: 3 },
                { id: 6, name: "Cybersecurity", code: "CS504", credits: 3, type: "elective", semester: 5, hoursPerWeek: 3 },
                { id: 7, name: "Cloud Computing", code: "CS505", credits: 3, type: "elective", semester: 5, hoursPerWeek: 3 },
                { id: 8, name: "Blockchain Technology", code: "CS506", credits: 3, type: "elective", semester: 5, hoursPerWeek: 3 }
            ],
            classrooms: [
                { id: 1, name: "Room A101", capacity: 60, type: "lecture", equipment: ["Projector", "Whiteboard", "AC"] },
                { id: 2, name: "Lab B201", capacity: 30, type: "lab", equipment: ["30 Computers", "Projector", "AC"] },
                { id: 3, name: "Room C301", capacity: 45, type: "lecture", equipment: ["Smart Board", "Sound System", "AC"] }
            ],
            batches: [
                { id: 1, name: "CS-2023-A", department: "Computer Science", semester: 3, strength: 45 },
                { id: 2, name: "CS-2023-B", department: "Computer Science", semester: 3, strength: 42 },
                { id: 3, name: "CS-2022-A", department: "Computer Science", semester: 5, strength: 38 }
            ],
            timetable: [
                {
                    id: 1, batch: "CS-2023-A", day: "Monday", timeSlot: "09:00-10:00",
                    subject: "Data Structures", faculty: "Dr. Sarah Johnson", room: "Room A101", type: "lecture"
                },
                {
                    id: 2, batch: "CS-2023-A", day: "Monday", timeSlot: "10:00-11:00",
                    subject: "Computer Networks", faculty: "Prof. David Miller", room: "Room A102", type: "lecture"
                },
                {
                    id: 3, batch: "CS-2023-A", day: "Tuesday", timeSlot: "09:00-10:00",
                    subject: "Database Systems", faculty: "Dr. Sarah Johnson", room: "Room C301", type: "lecture"
                },
                {
                    id: 4, batch: "CS-2023-A", day: "Wednesday", timeSlot: "11:15-12:15",
                    subject: "Data Structures Lab", faculty: "Dr. Sarah Johnson", room: "Lab B201", type: "lab"
                }
            ],
            constraints: {
                timeSlots: [
                    "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:15-12:15",
                    "12:15-13:15", "14:15-15:15", "15:15-16:15", "16:15-17:15"
                ],
                maxClassesPerDay: { faculty: 6, student: 8 },
                teachingLoadNorms: { professor: 18, associateProfessor: 16, assistantProfessor: 20 },
                breakTimes: ["11:00-11:15", "13:15-14:15"]
            },
            analyticsData: {
                facultyWorkload: [
                    { faculty: "Dr. Sarah Johnson", hours: 15, maxHours: 18 },
                    { faculty: "Prof. Michael Chen", hours: 18, maxHours: 20 },
                    { faculty: "Dr. Emma Wilson", hours: 14, maxHours: 16 }
                ],
                classroomUtilization: [
                    { room: "Room A101", utilization: 75 },
                    { room: "Lab B201", utilization: 60 },
                    { room: "Room C301", utilization: 80 }
                ],
                subjectPopularity: [
                    { subject: "Machine Learning", enrollments: 120 },
                    { subject: "Web Development", enrollments: 98 },
                    { subject: "Cybersecurity", enrollments: 85 },
                    { subject: "Mobile App Development", enrollments: 67 }
                ]
            }
        };
    }

    loadStoredData() {
        // Load stored preferences and data
        const storedElectives = localStorage.getItem('electivePreferences');
        if (storedElectives) {
            this.electivePreferences = JSON.parse(storedElectives);
        }

        const storedFeedback = localStorage.getItem('feedbackData');
        if (storedFeedback) {
            this.feedbackData = JSON.parse(storedFeedback);
        }

        const storedRequests = localStorage.getItem('classRequests');
        if (storedRequests) {
            this.classRequests = JSON.parse(storedRequests);
        }

        const storedNotifications = localStorage.getItem('notifications');
        if (storedNotifications) {
            this.notifications = JSON.parse(storedNotifications);
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Enhanced Sidebar with Auto-Close
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSidebar();
            });
        }

        const sidebarClose = document.getElementById('sidebar-close');
        if (sidebarClose) {
            sidebarClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeSidebar();
            });
        }

        const sidebarOverlay = document.getElementById('sidebar-overlay');
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        }

        // Auto-close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebar-toggle');
            
            if (this.sidebarOpen && sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // Profile menu toggle
        const profileMenuBtn = document.getElementById('profile-menu-btn');
        const profileDropdown = document.getElementById('profile-dropdown');
        if (profileMenuBtn && profileDropdown) {
            profileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                profileDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!profileDropdown.contains(e.target) && !profileMenuBtn.contains(e.target)) {
                    profileDropdown.classList.add('hidden');
                }
            });
        }

        // Edit Profile Link
        const editProfileLink = document.getElementById('edit-profile-link');
        if (editProfileLink) {
            editProfileLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showProfileEditModal();
                profileDropdown.classList.add('hidden');
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Logout
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Navigation - Event delegation with auto-close
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
                e.preventDefault();
                const navLink = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
                const page = navLink.getAttribute('data-page');
                if (page) {
                    this.navigateTo(page);
                    // Always close sidebar after navigation
                    this.closeSidebar();
                }
            }
        });

        // Management card clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.management-card') || e.target.closest('.management-card')) {
                e.preventDefault();
                const card = e.target.matches('.management-card') ? e.target : e.target.closest('.management-card');
                const page = card.getAttribute('data-page');
                if (page) {
                    this.navigateTo(page);
                }
            }
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-backdrop') || 
                e.target.matches('.modal-close') || 
                e.target.matches('.cancel-btn') ||
                e.target.closest('.modal-close') ||
                e.target.closest('.cancel-btn')) {
                e.preventDefault();
                this.closeModal();
            }
        });

        // Prevent modal from closing when clicking inside modal content
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-content') || e.target.closest('.modal-content')) {
                e.stopPropagation();
            }
        });
    }

    // Enhanced Sidebar Functions
    toggleSidebar() {
        if (this.sidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar) {
            sidebar.classList.remove('sidebar-hidden');
            this.sidebarOpen = true;
        }
        
        if (overlay && window.innerWidth <= 1024) {
            overlay.classList.remove('hidden');
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar) {
            sidebar.classList.add('sidebar-hidden');
            this.sidebarOpen = false;
        }
        
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    setupTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.className = this.theme === 'dark' ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.setupTheme();
        this.showToast(`Switched to ${this.theme} mode`, 'success');
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        if (!username || !password || !role) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        this.showLoading();
        await this.delay(1000);

        const user = this.mockData.users.find(u => 
            u.username === username && u.password === password && u.role === role
        );

        this.hideLoading();

        if (user) {
            this.currentUser = user;
            this.initializeUserData();
            this.showToast(`Welcome back, ${user.name}!`, 'success');
            this.showMainApp();
        } else {
            this.showToast('Invalid credentials. Please check your username, password, and role.', 'error');
        }
    }

    initializeUserData() {
        // Initialize workload hours for faculty
        if (this.currentUser.role === 'faculty') {
            const facultyData = this.mockData.faculties.find(f => f.name === this.currentUser.name);
            if (facultyData && facultyData.weeklyHours) {
                this.workloadHours = { ...facultyData.weeklyHours };
            }
        }

        // Update notification count
        this.updateNotificationCount();
    }

    updateNotificationCount() {
        const notificationBtn = document.getElementById('notification-count');
        if (notificationBtn) {
            const pendingNotifications = this.notifications.filter(n => n.status === 'pending').length;
            if (pendingNotifications > 0) {
                notificationBtn.textContent = pendingNotifications;
                notificationBtn.classList.remove('hidden');
            } else {
                notificationBtn.classList.add('hidden');
            }
        }
    }

    logout() {
        this.currentUser = null;
        this.closeSidebar();
        this.showToast('Logged out successfully', 'info');
        this.showLoginPage();
    }

    showLoginPage() {
        const loginPage = document.getElementById('login-page');
        const app = document.getElementById('app');
        
        if (loginPage) loginPage.classList.remove('hidden');
        if (app) app.classList.add('hidden');
        
        const form = document.getElementById('login-form');
        if (form) form.reset();
    }

    showMainApp() {
        const loginPage = document.getElementById('login-page');
        const app = document.getElementById('app');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (app) app.classList.remove('hidden');
        
        this.setupUserInterface();
        this.navigateTo('dashboard');
        this.closeSidebar();
    }

    setupUserInterface() {
        // Update user info
        const userNameElement = document.getElementById('user-name');
        const dropdownNameElement = document.getElementById('dropdown-name');
        const dropdownRoleElement = document.getElementById('dropdown-role');
        const userAvatar = document.getElementById('user-avatar');
        const dropdownAvatar = document.getElementById('dropdown-avatar');

        if (userNameElement) userNameElement.textContent = this.currentUser.name;
        if (dropdownNameElement) dropdownNameElement.textContent = this.currentUser.name;
        if (dropdownRoleElement) dropdownRoleElement.textContent = this.currentUser.role;
        if (userAvatar) userAvatar.src = this.currentUser.avatar;
        if (dropdownAvatar) dropdownAvatar.src = this.currentUser.avatar;

        // Show appropriate navigation
        document.querySelectorAll('.nav-section').forEach(nav => nav.classList.add('hidden'));
        const roleNav = document.getElementById(`${this.currentUser.role}-nav`);
        if (roleNav) {
            roleNav.classList.remove('hidden');
        }
    }

    navigateTo(page) {
        this.currentPage = page;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Update page title
        const pageTitle = this.getPageTitle(page);
        const pageTitleElement = document.getElementById('page-title');
        if (pageTitleElement) {
            pageTitleElement.textContent = pageTitle;
        }

        // Load page content
        this.loadPageContent(page);
    }

    getPageTitle(page) {
        const titles = {
            dashboard: 'Dashboard',
            'faculty-management': 'Faculty Management',
            'subject-management': 'Subject Management',
            'classroom-management': 'Classroom Management',
            'batch-management': 'Batch Management',
            constraints: 'Scheduling Constraints',
            'timetable-generator': 'Timetable Generator',
            reports: 'Reports & Analytics',
            'my-schedule': 'My Schedule',
            'calendar-view': 'Calendar View',
            workload: 'Workload Management',
            availability: 'Availability Settings',
            'change-requests': 'Class Requests',
            'my-timetable': 'My Timetable',
            electives: 'Elective Preferences',
            feedback: 'Submit Feedback',
            notifications: 'Notifications',
            'feedback-management': 'Feedback Management'
        };
        return titles[page] || 'Dashboard';
    }

    async loadPageContent(page) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        this.showLoading();
        await this.delay(300);

        let content = '';
        
        try {
            switch (page) {
                case 'dashboard':
                    content = this.renderDashboard();
                    break;
                case 'faculty-management':
                    content = this.renderFacultyManagement();
                    break;
                case 'subject-management':
                    content = this.renderSubjectManagement();
                    break;
                case 'classroom-management':
                    content = this.renderClassroomManagement();
                    break;
                case 'batch-management':
                    content = this.renderBatchManagement();
                    break;
                case 'constraints':
                    content = this.renderConstraints();
                    break;
                case 'timetable-generator':
                    content = this.renderTimetableGenerator();
                    break;
                case 'reports':
                    content = this.renderReports();
                    break;
                case 'my-schedule':
                    content = this.renderMySchedule();
                    break;
                case 'calendar-view':
                    content = this.renderCalendarView();
                    break;
                case 'workload':
                    content = this.renderWorkloadManagement();
                    break;
                case 'change-requests':
                    content = this.renderChangeRequests();
                    break;
                case 'my-timetable':
                    content = this.renderMyTimetable();
                    break;
                case 'electives':
                    content = this.renderElectives();
                    break;
                case 'feedback':
                    content = this.renderFeedback();
                    break;
                case 'notifications':
                    content = this.renderNotifications();
                    break;
                case 'feedback-management':
                    content = this.renderFeedbackManagement();
                    break;
                default:
                    content = this.renderDashboard();
            }

            mainContent.innerHTML = content;
            this.setupPageEventListeners(page);
            
            // Initialize charts if on dashboard or reports
            if (page === 'dashboard' && this.currentUser.role === 'admin') {
                setTimeout(() => this.initializeCharts(), 100);
            } else if (page === 'reports') {
                setTimeout(() => this.initializeReportsCharts(), 100);
            }
        } catch (error) {
            console.error('Error loading page content:', error);
            mainContent.innerHTML = '<div class="error-message">Error loading page content. Please try again.</div>';
        }
        
        this.hideLoading();
    }

    // Enhanced Dashboard Rendering
    renderDashboard() {
        const role = this.currentUser.role;
        
        if (role === 'admin') {
            return this.renderAdminDashboard();
        } else if (role === 'faculty') {
            return this.renderFacultyDashboard();
        } else {
            return this.renderStudentDashboard();
        }
    }

    // Admin Dashboard with Interactive Charts
    renderAdminDashboard() {
        return `
            <div class="dashboard">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${this.mockData.faculties.length}</div>
                        <div class="stat-label">Total Faculty</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.mockData.subjects.length}</div>
                        <div class="stat-label">Total Subjects</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.mockData.classrooms.length}</div>
                        <div class="stat-label">Total Classrooms</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.mockData.batches.length}</div>
                        <div class="stat-label">Total Batches</div>
                    </div>
                </div>

                <div class="charts-container">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3 class="chart-title">Faculty Workload Distribution</h3>
                        </div>
                        <div class="chart-container">
                            <canvas id="workloadChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3 class="chart-title">Classroom Utilization</h3>
                        </div>
                        <div class="chart-container">
                            <canvas id="utilizationChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="dashboard-cards-grid">
                    <div class="management-card" data-page="faculty-management">
                        <div class="card-header">
                            <div class="card-icon card-icon--faculty">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 class="card-title">Faculty Management</h3>
                        </div>
                        <p class="card-description">Manage faculty members, their subjects, workload, and availability.</p>
                        <div class="card-stats">
                            <div class="card-stat">
                                <div class="stat-number">${this.mockData.faculties.filter(f => f.status === 'active').length}</div>
                                <div class="stat-label">Active Faculty</div>
                            </div>
                        </div>
                    </div>

                    <div class="management-card" data-page="subject-management">
                        <div class="card-header">
                            <div class="card-icon card-icon--subject">
                                <i class="fas fa-book"></i>
                            </div>
                            <h3 class="card-title">Subject Management</h3>
                        </div>
                        <p class="card-description">Manage academic subjects, credits, and curriculum structure.</p>
                        <div class="card-stats">
                            <div class="card-stat">
                                <div class="stat-number">${this.mockData.subjects.filter(s => s.type === 'core').length}</div>
                                <div class="stat-label">Core Subjects</div>
                            </div>
                            <div class="card-stat">
                                <div class="stat-number">${this.mockData.subjects.filter(s => s.type === 'elective').length}</div>
                                <div class="stat-label">Electives</div>
                            </div>
                        </div>
                    </div>

                    <div class="management-card" data-page="timetable-generator">
                        <div class="card-header">
                            <div class="card-icon card-icon--timetable">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <h3 class="card-title">Timetable Generator</h3>
                        </div>
                        <p class="card-description">Generate optimized timetables using advanced algorithms.</p>
                        <div class="card-stats">
                            <div class="card-stat">
                                <div class="stat-number">${this.mockData.timetable.length}</div>
                                <div class="stat-label">Scheduled Classes</div>
                            </div>
                        </div>
                    </div>

                    <div class="management-card" data-page="notifications">
                        <div class="card-header">
                            <div class="card-icon card-icon--reports">
                                <i class="fas fa-bell"></i>
                            </div>
                            <h3 class="card-title">Notifications</h3>
                        </div>
                        <p class="card-description">Review class requests and notifications from faculty.</p>
                        <div class="card-stats">
                            <div class="card-stat">
                                <div class="stat-number">${this.notifications.filter(n => n.status === 'pending').length}</div>
                                <div class="stat-label">Pending Requests</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize Charts
    initializeCharts() {
        // Faculty Workload Chart
        const workloadCtx = document.getElementById('workloadChart');
        if (workloadCtx) {
            new Chart(workloadCtx, {
                type: 'bar',
                data: {
                    labels: this.mockData.analyticsData.facultyWorkload.map(f => f.faculty),
                    datasets: [{
                        label: 'Current Hours',
                        data: this.mockData.analyticsData.facultyWorkload.map(f => f.hours),
                        backgroundColor: '#1FB8CD',
                    }, {
                        label: 'Max Hours',
                        data: this.mockData.analyticsData.facultyWorkload.map(f => f.maxHours),
                        backgroundColor: '#FFC185',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Classroom Utilization Chart
        const utilizationCtx = document.getElementById('utilizationChart');
        if (utilizationCtx) {
            new Chart(utilizationCtx, {
                type: 'pie',
                data: {
                    labels: this.mockData.analyticsData.classroomUtilization.map(c => c.room),
                    datasets: [{
                        data: this.mockData.analyticsData.classroomUtilization.map(c => c.utilization),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    // Enhanced Faculty Management with Editable Cards
    renderFacultyManagement() {
        return `
            <div class="faculty-management">
                <div class="page-header">
                    <h2>Faculty Management</h2>
                    <button class="btn btn--primary" onclick="app.showAddFacultyModal()">
                        <i class="fas fa-plus"></i> Add Faculty
                    </button>
                </div>
                
                <div class="faculty-cards-grid">
                    ${this.mockData.faculties.map(faculty => `
                        <div class="faculty-card" data-faculty-id="${faculty.id}">
                            <div class="faculty-card-header">
                                <div class="faculty-info">
                                    <div class="faculty-name">${faculty.name}</div>
                                    <div class="faculty-email">${faculty.email}</div>
                                    <div class="faculty-department">${faculty.department}</div>
                                </div>
                                <div class="faculty-actions">
                                    <button class="btn-icon btn-icon--edit" onclick="app.editFaculty(${faculty.id})" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-icon btn-icon--delete" onclick="app.removeFaculty(${faculty.id})" title="Remove">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="faculty-subjects">
                                <div class="subjects-list">
                                    ${faculty.subjects.map(subject => `<span class="subject-tag">${subject}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div class="faculty-workload">
                                <span class="workload-text">${faculty.currentWorkload}h</span>
                                <div class="workload-bar">
                                    <div class="workload-fill" style="width: ${(faculty.currentWorkload / faculty.maxHoursPerWeek) * 100}%"></div>
                                </div>
                                <span class="workload-text">${faculty.maxHoursPerWeek}h</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Enhanced Workload Management
    renderWorkloadManagement() {
        const facultyData = this.mockData.faculties.find(f => f.name === this.currentUser.name);
        if (!facultyData) return '<div>Faculty data not found</div>';

        const totalHours = Object.values(this.workloadHours).reduce((sum, hours) => sum + hours, 0);

        return `
            <div class="workload-management">
                <div class="workload-container">
                    <div class="workload-header">
                        <h3>Workload Management</h3>
                        <button class="btn btn--primary" onclick="app.showWorkloadHoursModal()">
                            <i class="fas fa-edit"></i> Edit Hours
                        </button>
                    </div>
                    
                    <div class="workload-summary">
                        <div class="workload-stat">
                            <div class="workload-number">${totalHours}</div>
                            <div class="workload-label">Current Hours</div>
                        </div>
                        <div class="workload-stat">
                            <div class="workload-number">${facultyData.maxHoursPerWeek}</div>
                            <div class="workload-label">Maximum Hours</div>
                        </div>
                        <div class="workload-stat">
                            <div class="workload-number">${facultyData.maxHoursPerWeek - totalHours}</div>
                            <div class="workload-label">Available Hours</div>
                        </div>
                        <div class="workload-stat">
                            <div class="workload-number">${Math.round((totalHours / facultyData.maxHoursPerWeek) * 100)}%</div>
                            <div class="workload-label">Utilization</div>
                        </div>
                    </div>
                    
                    <div class="subject-hours-breakdown">
                        <h4>Subject-wise Hours Breakdown</h4>
                        <div class="subject-hours-list">
                            ${Object.entries(this.workloadHours).map(([subject, hours]) => `
                                <div class="subject-hours-item">
                                    <span class="subject-name">${subject}</span>
                                    <div class="hours-display">${hours} hours/week</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Enhanced Elective Preferences with Delete Functionality
    renderElectives() {
        const currentPrefs = this.electivePreferences.find(p => p.studentId === this.currentUser.id);
        
        return `
            <div class="electives-page">
                <div class="electives-container">
                    <div class="electives-header">
                        <h3>Elective Preferences</h3>
                        <button class="btn btn--primary" onclick="app.showElectivePreferencesModal()">
                            <i class="fas fa-edit"></i> ${currentPrefs && currentPrefs.electives.length > 0 ? 'Update' : 'Select'} Preferences
                        </button>
                    </div>

                    ${currentPrefs && currentPrefs.electives.length > 0 ? `
                        <div class="current-preferences">
                            <h4>Your Current Preferences</h4>
                            <div class="selected-electives-display">
                                ${currentPrefs.electives.map((elective, index) => `
                                    <div class="selected-elective-item">
                                        <div class="elective-priority">${index + 1}</div>
                                        <div class="elective-name">${elective}</div>
                                        <button class="remove-elective-btn" onclick="app.removeElectivePreference(${index})" title="Remove">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                            ${currentPrefs.comments ? `
                                <div class="preference-comments">
                                    <h5>Additional Comments:</h5>
                                    <p>${currentPrefs.comments}</p>
                                </div>
                            ` : ''}
                        </div>
                    ` : `
                        <div class="empty-state">
                            <i class="fas fa-list-alt"></i>
                            <h4>No Elective Preferences Selected</h4>
                            <p>Click "Select Preferences" to choose your elective subjects for the upcoming semester.</p>
                        </div>
                    `}

                    <div class="available-electives">
                        <h4>Available Elective Subjects</h4>
                        <div class="electives-grid">
                            ${this.mockData.subjects.filter(s => s.type === 'elective').map(subject => `
                                <div class="elective-option">
                                    <div class="elective-title">${subject.name}</div>
                                    <div class="elective-code">${subject.code}</div>
                                    <div class="elective-credits">${subject.credits} Credits</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Enhanced Calendar View
    renderCalendarView() {
        const today = new Date();
        const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
        const myClasses = this.mockData.timetable.filter(t => t.faculty === this.currentUser.name);
        const todayClasses = myClasses.filter(t => t.day === currentDay);

        return `
            <div class="calendar-view">
                <div class="calendar-container">
                    <div class="calendar-header">
                        <h3>Calendar View</h3>
                        <div class="calendar-nav">
                            <button onclick="app.showPreviousDay()"><i class="fas fa-chevron-left"></i></button>
                            <span class="current-date">${today.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                            <button onclick="app.showNextDay()"><i class="fas fa-chevron-right"></i></button>
                        </div>
                        <button class="btn btn--primary" onclick="app.showClassRequestModal()">
                            <i class="fas fa-plus"></i> Request Class Change
                        </button>
                    </div>

                    <div class="today-schedule">
                        <h4>Today's Schedule (${currentDay})</h4>
                        <div class="daily-schedule">
                            ${todayClasses.length > 0 ? todayClasses.map(cls => `
                                <div class="schedule-event">
                                    <div class="event-time">${cls.timeSlot}</div>
                                    <div class="event-details">
                                        <div class="event-subject">${cls.subject}</div>
                                        <div class="event-info">${cls.batch} • ${cls.room}</div>
                                    </div>
                                    <div class="event-actions">
                                        <button class="btn-icon btn-icon--edit" onclick="app.editClass('${cls.id}')" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="empty-state">
                                    <i class="fas fa-calendar-day"></i>
                                    <h4>No Classes Scheduled for Today</h4>
                                    <p>You have a free day today!</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Enhanced Timetable Generator with Algorithms
    renderTimetableGenerator() {
        return `
            <div class="timetable-generator">
                <div class="generator-container">
                    <div class="generator-header">
                        <h3>Timetable Generator</h3>
                        <div class="generator-actions">
                            <button class="btn btn--secondary" onclick="app.exportTimetable()">
                                <i class="fas fa-download"></i> Export
                            </button>
                        </div>
                    </div>
                    
                    <div class="algorithm-selection">
                        <div class="algorithm-option ${this.selectedAlgorithm === 'genetic' ? 'selected' : ''}" onclick="app.selectAlgorithm('genetic')">
                            <div class="algorithm-title">Genetic Algorithm</div>
                            <div class="algorithm-description">Uses evolutionary computing to find optimal timetable solutions</div>
                        </div>
                        <div class="algorithm-option ${this.selectedAlgorithm === 'linear' ? 'selected' : ''}" onclick="app.selectAlgorithm('linear')">
                            <div class="algorithm-title">Linear Programming</div>
                            <div class="algorithm-description">Uses mathematical optimization for constraint satisfaction</div>
                        </div>
                    </div>
                    
                    <div class="generation-controls">
                        <button class="btn btn--primary" onclick="app.generateTimetable()">
                            <i class="fas fa-play"></i> Generate Timetable (${this.selectedAlgorithm === 'genetic' ? 'Genetic' : 'Linear'})
                        </button>
                    </div>
                    
                    <div id="generation-progress" class="progress-container hidden">
                        <div class="progress-bar">
                            <div id="progress-fill" class="progress-fill"></div>
                        </div>
                        <div class="progress-info">
                            <span>Progress: <span id="progress-percent">0</span>%</span>
                            <span>Status: <span id="progress-status">Ready</span></span>
                        </div>
                    </div>

                    <div class="timetable-results">
                        ${this.renderTimetableGrid('admin')}
                    </div>
                </div>
            </div>
        `;
    }

    // Reports and Analytics
    renderReports() {
        return `
            <div class="reports-page">
                <div class="reports-header">
                    <h3>Reports & Analytics</h3>
                    <button class="btn btn--secondary" onclick="app.exportReports()">
                        <i class="fas fa-download"></i> Export Reports
                    </button>
                </div>
                
                <div class="charts-container">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3 class="chart-title">Subject Popularity</h3>
                        </div>
                        <div class="chart-container">
                            <canvas id="popularityChart"></canvas>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3 class="chart-title">Weekly Schedule Efficiency</h3>
                        </div>
                        <div class="chart-container">
                            <canvas id="efficiencyChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializeReportsCharts() {
        // Subject Popularity Chart
        const popularityCtx = document.getElementById('popularityChart');
        if (popularityCtx) {
            new Chart(popularityCtx, {
                type: 'bar',
                data: {
                    labels: this.mockData.analyticsData.subjectPopularity.map(s => s.subject),
                    datasets: [{
                        label: 'Enrollments',
                        data: this.mockData.analyticsData.subjectPopularity.map(s => s.enrollments),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Efficiency Chart
        const efficiencyCtx = document.getElementById('efficiencyChart');
        if (efficiencyCtx) {
            new Chart(efficiencyCtx, {
                type: 'line',
                data: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    datasets: [{
                        label: 'Efficiency %',
                        data: [85, 92, 78, 96, 89],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    // Notifications Management
    renderNotifications() {
        const pendingRequests = this.classRequests.filter(r => r.status === 'pending');
        
        return `
            <div class="notifications-page">
                <div class="notifications-container">
                    <div class="notifications-header">
                        <h3>Class Requests & Notifications</h3>
                        <div class="notification-stats">
                            <span class="badge badge--pending">${pendingRequests.length} Pending</span>
                        </div>
                    </div>

                    <div class="notifications-list">
                        ${pendingRequests.length > 0 ? pendingRequests.map(request => `
                            <div class="notification-item">
                                <div class="notification-icon notification-icon--request">
                                    <i class="fas fa-calendar-plus"></i>
                                </div>
                                <div class="notification-content">
                                    <div class="notification-title">${request.requestType.replace('_', ' ').toUpperCase()} Request</div>
                                    <div class="notification-message">
                                        ${request.facultyName} requested to ${request.requestType.replace('_', ' ')} 
                                        ${request.subject} on ${request.date} at ${request.timeSlot}
                                    </div>
                                    <div class="notification-meta">
                                        <span><i class="fas fa-clock"></i> ${new Date(request.submittedAt).toLocaleDateString()}</span>
                                        <span><i class="fas fa-user"></i> ${request.facultyName}</span>
                                    </div>
                                    <div class="notification-actions">
                                        <button class="btn btn--sm btn--primary" onclick="app.approveRequest('${request.id}')">
                                            <i class="fas fa-check"></i> Approve
                                        </button>
                                        <button class="btn btn--sm btn--secondary" onclick="app.rejectRequest('${request.id}')">
                                            <i class="fas fa-times"></i> Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('') : `
                            <div class="empty-state">
                                <i class="fas fa-bell-slash"></i>
                                <h4>No Pending Notifications</h4>
                                <p>All requests have been processed.</p>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    // Modal Functions
    showProfileEditModal() {
        const template = document.getElementById('profile-edit-template');
        const modalContainer = document.getElementById('modal-container');
        
        if (template && modalContainer) {
            modalContainer.innerHTML = template.innerHTML;
            this.populateProfileForm();
        }
    }

    populateProfileForm() {
        const form = document.getElementById('profile-edit-form');
        if (!form) return;

        // Populate form with current user data
        form.name.value = this.currentUser.name || '';
        form.email.value = this.currentUser.email || '';
        form.phone.value = this.currentUser.phone || '';
        form.address.value = this.currentUser.address || '';
        
        if (this.currentUser.department) {
            form.department.value = this.currentUser.department;
        }

        const profilePreview = document.getElementById('profile-preview');
        if (profilePreview) {
            profilePreview.src = this.currentUser.avatar;
        }

        // Handle photo upload
        const photoUpload = document.getElementById('photo-upload');
        if (photoUpload) {
            photoUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        profilePreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    showElectivePreferencesModal() {
        const template = document.getElementById('elective-preferences-template');
        const modalContainer = document.getElementById('modal-container');
        
        if (template && modalContainer) {
            modalContainer.innerHTML = template.innerHTML;
            this.populateElectivesModal();
        }
    }

    populateElectivesModal() {
        const currentPrefs = this.electivePreferences.find(p => p.studentId === this.currentUser.id);
        this.selectedElectives = currentPrefs ? [...currentPrefs.electives] : [];
        
        this.updateElectivesDisplay();
        
        // Populate comments if they exist
        const commentsField = document.querySelector('textarea[name="comments"]');
        if (commentsField && currentPrefs && currentPrefs.comments) {
            commentsField.value = currentPrefs.comments;
        }
    }

    updateElectivesDisplay() {
        const selectedList = document.getElementById('selected-list');
        const availableContainer = document.getElementById('available-electives');
        
        if (!selectedList || !availableContainer) return;

        // Update selected electives list
        selectedList.innerHTML = this.selectedElectives.length > 0 ? 
            this.selectedElectives.map((elective, index) => `
                <div class="selected-elective-item">
                    <div class="elective-priority">${index + 1}</div>
                    <div class="elective-name">${elective}</div>
                    <button class="remove-elective-btn" onclick="app.removeSelectedElective(${index})" title="Remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('') : '<p class="text-center" style="color: var(--color-text-secondary);">No electives selected yet</p>';

        // Update available electives
        const availableElectives = this.mockData.subjects
            .filter(s => s.type === 'elective')
            .filter(s => !this.selectedElectives.includes(s.name));
            
        availableContainer.innerHTML = availableElectives.map(subject => `
            <div class="elective-option" onclick="app.addSelectedElective('${subject.name}')">
                <div class="elective-title">${subject.name}</div>
                <div class="elective-code">${subject.code}</div>
                <div class="elective-credits">${subject.credits} Credits</div>
            </div>
        `).join('');
    }

    showClassRequestModal() {
        const template = document.getElementById('class-request-template');
        const modalContainer = document.getElementById('modal-container');
        
        if (template && modalContainer) {
            modalContainer.innerHTML = template.innerHTML;
            this.populateClassRequestModal();
        }
    }

    populateClassRequestModal() {
        const subjectSelect = document.querySelector('select[name="subject"]');
        if (subjectSelect && this.currentUser.subjects) {
            this.currentUser.subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        }

        // Set minimum date to tomorrow
        const dateInput = document.querySelector('input[name="date"]');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    showWorkloadHoursModal() {
        const template = document.getElementById('workload-hours-template');
        const modalContainer = document.getElementById('modal-container');
        
        if (template && modalContainer) {
            modalContainer.innerHTML = template.innerHTML;
            this.populateWorkloadHoursModal();
        }
    }

    populateWorkloadHoursModal() {
        const subjectHoursList = document.getElementById('subject-hours-list');
        const facultyData = this.mockData.faculties.find(f => f.name === this.currentUser.name);
        
        if (!subjectHoursList || !facultyData) return;

        subjectHoursList.innerHTML = facultyData.subjects.map(subject => {
            const hours = this.workloadHours[subject] || 0;
            return `
                <div class="subject-hours-item">
                    <span class="subject-name">${subject}</span>
                    <div class="hours-controls">
                        <button class="hours-btn" onclick="app.adjustHours('${subject}', -1)" ${hours <= 0 ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="hours-display">${hours}</span>
                        <button class="hours-btn" onclick="app.adjustHours('${subject}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        this.updateWorkloadTotal();
    }

    // Helper Functions
    addSelectedElective(electiveName) {
        if (this.selectedElectives.length >= 3) {
            this.showToast('You can select maximum 3 electives', 'warning');
            return;
        }
        
        if (!this.selectedElectives.includes(electiveName)) {
            this.selectedElectives.push(electiveName);
            this.updateElectivesDisplay();
        }
    }

    removeSelectedElective(index) {
        this.selectedElectives.splice(index, 1);
        this.updateElectivesDisplay();
    }

    removeElectivePreference(index) {
        const currentPrefs = this.electivePreferences.find(p => p.studentId === this.currentUser.id);
        if (currentPrefs) {
            currentPrefs.electives.splice(index, 1);
            this.saveElectivePreferences();
            this.navigateTo('electives');
        }
    }

    adjustHours(subject, delta) {
        const currentHours = this.workloadHours[subject] || 0;
        const newHours = Math.max(0, currentHours + delta);
        this.workloadHours[subject] = newHours;
        
        // Update display
        const hoursDisplay = document.querySelector(`[data-subject="${subject}"] .hours-display`);
        if (hoursDisplay) {
            hoursDisplay.textContent = newHours;
        }
        
        this.updateWorkloadTotal();
        this.populateWorkloadHoursModal();
    }

    updateWorkloadTotal() {
        const totalHours = Object.values(this.workloadHours).reduce((sum, hours) => sum + hours, 0);
        const totalHoursValue = document.getElementById('total-hours-value');
        const maxHoursValue = document.getElementById('max-hours-value');
        
        if (totalHoursValue) totalHoursValue.textContent = totalHours;
        if (maxHoursValue) {
            const facultyData = this.mockData.faculties.find(f => f.name === this.currentUser.name);
            maxHoursValue.textContent = facultyData ? facultyData.maxHoursPerWeek : 18;
        }
    }

    selectAlgorithm(algorithm) {
        this.selectedAlgorithm = algorithm;
        document.querySelectorAll('.algorithm-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`[onclick="app.selectAlgorithm('${algorithm}')"]`).classList.add('selected');
    }

    // Save Functions
    saveProfileChanges() {
        const form = document.getElementById('profile-edit-form');
        const formData = new FormData(form);
        
        // Update user data
        this.currentUser.name = formData.get('name');
        this.currentUser.email = formData.get('email');
        this.currentUser.phone = formData.get('phone');
        this.currentUser.address = formData.get('address');
        
        // Handle password change
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmPassword = formData.get('confirmPassword');
        
        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword) {
                this.showToast('Please enter your current password', 'error');
                return;
            }
            if (newPassword !== confirmPassword) {
                this.showToast('New passwords do not match', 'error');
                return;
            }
            if (newPassword.length < 6) {
                this.showToast('New password must be at least 6 characters', 'error');
                return;
            }
        }
        
        this.closeModal();
        this.setupUserInterface();
        this.showToast('Profile updated successfully!', 'success');
    }

    saveElectivePreferences() {
        const form = document.getElementById('electives-form');
        const formData = new FormData(form);
        
        if (this.selectedElectives.length === 0) {
            this.showToast('Please select at least one elective', 'error');
            return;
        }

        const preferences = {
            studentId: this.currentUser.id,
            studentName: this.currentUser.name,
            electives: [...this.selectedElectives],
            comments: formData.get('comments') || '',
            submittedAt: new Date().toISOString()
        };

        // Update or add preferences
        const existingIndex = this.electivePreferences.findIndex(p => p.studentId === this.currentUser.id);
        if (existingIndex >= 0) {
            this.electivePreferences[existingIndex] = preferences;
        } else {
            this.electivePreferences.push(preferences);
        }

        // Save to localStorage
        localStorage.setItem('electivePreferences', JSON.stringify(this.electivePreferences));

        this.closeModal();
        this.showToast('Elective preferences saved successfully!', 'success');
        
        if (this.currentPage === 'electives') {
            this.navigateTo('electives');
        }
    }

    submitClassRequest() {
        const form = document.getElementById('class-request-form');
        const formData = new FormData(form);
        
        const request = {
            id: Date.now().toString(),
            facultyId: this.currentUser.id,
            facultyName: this.currentUser.name,
            requestType: formData.get('requestType'),
            subject: formData.get('subject'),
            date: formData.get('date'),
            timeSlot: formData.get('timeSlot'),
            room: formData.get('room') || '',
            reason: formData.get('reason'),
            status: 'pending',
            submittedAt: new Date().toISOString()
        };

        this.classRequests.push(request);
        localStorage.setItem('classRequests', JSON.stringify(this.classRequests));
        
        this.closeModal();
        this.showToast('Class request submitted successfully!', 'success');
    }

    saveWorkloadHours() {
        // Update faculty data
        const facultyIndex = this.mockData.faculties.findIndex(f => f.name === this.currentUser.name);
        if (facultyIndex >= 0) {
            this.mockData.faculties[facultyIndex].weeklyHours = { ...this.workloadHours };
            this.mockData.faculties[facultyIndex].currentWorkload = Object.values(this.workloadHours).reduce((sum, hours) => sum + hours, 0);
        }
        
        this.closeModal();
        this.showToast('Workload hours updated successfully!', 'success');
        
        if (this.currentPage === 'workload') {
            this.navigateTo('workload');
        }
    }

    // Algorithm Generation
    async generateTimetable() {
        const progressSection = document.getElementById('generation-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        const progressStatus = document.getElementById('progress-status');
        
        if (!progressSection) return;
        
        progressSection.classList.remove('hidden');
        
        const algorithmSteps = this.selectedAlgorithm === 'genetic' ? [
            'Initializing population...',
            'Calculating fitness scores...',
            'Performing selection...',
            'Executing crossover...',
            'Applying mutations...',
            'Evaluating new generation...',
            'Optimizing solution...',
            'Finalizing timetable...'
        ] : [
            'Setting up constraint matrix...',
            'Defining objective function...',
            'Initializing simplex tableau...',
            'Performing pivot operations...',
            'Checking feasibility...',
            'Finding optimal solution...',
            'Validating constraints...',
            'Generating final schedule...'
        ];
        
        for (let i = 0; i <= 100; i += 12.5) {
            await this.delay(200);
            const stepIndex = Math.floor(i / 12.5);
            
            if (progressFill) progressFill.style.width = `${i}%`;
            if (progressPercent) progressPercent.textContent = Math.floor(i);
            if (progressStatus && stepIndex < algorithmSteps.length) {
                progressStatus.textContent = algorithmSteps[stepIndex];
            }
        }
        
        await this.delay(500);
        progressSection.classList.add('hidden');
        
        const algorithmName = this.selectedAlgorithm === 'genetic' ? 'Genetic Algorithm' : 'Linear Programming';
        this.showToast(`Timetable generated successfully using ${algorithmName}!`, 'success');
        
        // Reload the timetable display
        this.navigateTo('timetable-generator');
    }

    // Admin Functions
    approveRequest(requestId) {
        const request = this.classRequests.find(r => r.id === requestId);
        if (request) {
            request.status = 'approved';
            localStorage.setItem('classRequests', JSON.stringify(this.classRequests));
            this.showToast('Request approved successfully', 'success');
            this.navigateTo('notifications');
        }
    }

    rejectRequest(requestId) {
        const request = this.classRequests.find(r => r.id === requestId);
        if (request) {
            request.status = 'rejected';
            localStorage.setItem('classRequests', JSON.stringify(this.classRequests));
            this.showToast('Request rejected', 'info');
            this.navigateTo('notifications');
        }
    }

    editFaculty(facultyId) {
        this.showToast('Edit faculty functionality would open here', 'info');
    }

    removeFaculty(facultyId) {
        if (confirm('Are you sure you want to remove this faculty member?')) {
            // Remove from mockData
            this.mockData.faculties = this.mockData.faculties.filter(f => f.id !== facultyId);
            this.showToast('Faculty member removed successfully', 'success');
            if (this.currentPage === 'faculty-management') {
                this.navigateTo('faculty-management');
            }
        }
    }

    // Stub Methods for Additional Pages
    renderFacultyDashboard() {
        const faculty = this.mockData.faculties.find(f => f.name === this.currentUser.name);
        const myClasses = this.mockData.timetable.filter(t => t.faculty === this.currentUser.name);
        const todayClasses = myClasses.filter(t => t.day === this.getCurrentDay());

        return `
            <div class="dashboard">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${faculty ? faculty.currentWorkload : 0}</div>
                        <div class="stat-label">Current Workload (Hours)</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${todayClasses.length}</div>
                        <div class="stat-label">Today's Classes</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${faculty ? faculty.subjects.length : 0}</div>
                        <div class="stat-label">Subjects Assigned</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${myClasses.length}</div>
                        <div class="stat-label">Total Weekly Classes</div>
                    </div>
                </div>

                <div class="dashboard-cards-grid">
                    <div class="management-card" data-page="my-schedule">
                        <div class="card-header">
                            <div class="card-icon card-icon--schedule">
                                <i class="fas fa-calendar"></i>
                            </div>
                            <h3 class="card-title">My Schedule</h3>
                        </div>
                        <p class="card-description">View your complete teaching schedule and timetable.</p>
                    </div>

                    <div class="management-card" data-page="workload">
                        <div class="card-header">
                            <div class="card-icon card-icon--timetable">
                                <i class="fas fa-tasks"></i>
                            </div>
                            <h3 class="card-title">Workload Management</h3>
                        </div>
                        <p class="card-description">Manage your teaching hours and workload distribution.</p>
                    </div>

                    <div class="management-card" data-page="change-requests">
                        <div class="card-header">
                            <div class="card-icon card-icon--reports">
                                <i class="fas fa-exchange-alt"></i>
                            </div>
                            <h3 class="card-title">Class Requests</h3>
                        </div>
                        <p class="card-description">Submit requests for class changes, additions, or cancellations.</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderStudentDashboard() {
        const student = this.currentUser;
        const batchClasses = this.mockData.timetable.filter(t => t.batch === student.batch);
        const todayClasses = batchClasses.filter(t => t.day === this.getCurrentDay());

        return `
            <div class="dashboard">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">${student.semester}</div>
                        <div class="stat-label">Current Semester</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${todayClasses.length}</div>
                        <div class="stat-label">Today's Classes</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.mockData.subjects.filter(s => s.type === 'core' && s.semester <= student.semester).length}</div>
                        <div class="stat-label">Core Subjects</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${this.selectedElectives.length}</div>
                        <div class="stat-label">Electives Selected</div>
                    </div>
                </div>

                <div class="dashboard-cards-grid">
                    <div class="management-card" data-page="my-timetable">
                        <div class="card-header">
                            <div class="card-icon card-icon--schedule">
                                <i class="fas fa-calendar"></i>
                            </div>
                            <h3 class="card-title">My Timetable</h3>
                        </div>
                        <p class="card-description">View your complete class schedule and timetable.</p>
                    </div>

                    <div class="management-card" data-page="electives">
                        <div class="card-header">
                            <div class="card-icon card-icon--subject">
                                <i class="fas fa-list-alt"></i>
                            </div>
                            <h3 class="card-title">Elective Preferences</h3>
                        </div>
                        <p class="card-description">Select and manage your preferred elective subjects.</p>
                    </div>

                    <div class="management-card" data-page="feedback">
                        <div class="card-header">
                            <div class="card-icon card-icon--reports">
                                <i class="fas fa-comment"></i>
                            </div>
                            <h3 class="card-title">Submit Feedback</h3>
                        </div>
                        <p class="card-description">Provide feedback on faculty and course content.</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderTimetableGrid(userType = 'admin') {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = this.mockData.constraints.timeSlots;
        
        let timetableData = this.mockData.timetable;
        
        if (userType === 'faculty') {
            timetableData = timetableData.filter(t => t.faculty === this.currentUser.name);
        } else if (userType === 'student') {
            timetableData = timetableData.filter(t => t.batch === this.currentUser.batch);
        }

        return `
            <div class="timetable-grid" style="display: grid; grid-template-columns: 100px repeat(5, 1fr); gap: 1px; background: var(--color-border); border-radius: var(--radius-base); overflow: hidden;">
                <div class="time-slot" style="background: var(--color-bg-2); padding: var(--space-12); font-weight: var(--font-weight-medium); color: var(--color-text); font-size: var(--font-size-xs); text-align: center;"></div>
                ${days.map(day => `<div class="day-header" style="background: var(--color-bg-1); padding: var(--space-12); font-weight: var(--font-weight-semibold); color: var(--color-text); text-align: center;">${day}</div>`).join('')}
                
                ${timeSlots.map(timeSlot => `
                    <div class="time-slot" style="background: var(--color-bg-2); padding: var(--space-12); font-weight: var(--font-weight-medium); color: var(--color-text); font-size: var(--font-size-xs); text-align: center;">${timeSlot}</div>
                    ${days.map(day => {
                        const classInfo = timetableData.find(t => t.day === day && t.timeSlot === timeSlot);
                        return `
                            <div class="schedule-cell ${classInfo ? 'occupied' : ''}" 
                                 style="background: ${classInfo ? 'var(--color-bg-3)' : 'var(--color-surface)'}; padding: var(--space-12); min-height: 60px; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-sm); ${classInfo ? 'border-left: 4px solid var(--color-primary);' : ''}"
                                 data-day="${day}" 
                                 data-time="${timeSlot}">
                                ${classInfo ? `
                                    <div class="class-info" style="text-align: center; font-size: var(--font-size-xs); line-height: 1.3; width: 100%;">
                                        <div class="class-subject" style="font-weight: var(--font-weight-semibold); color: var(--color-text); margin-bottom: var(--space-2);">${classInfo.subject}</div>
                                        <div class="class-faculty" style="color: var(--color-text-secondary); margin-bottom: var(--space-1);">${userType === 'faculty' ? classInfo.batch : classInfo.faculty}</div>
                                        <div class="class-room" style="color: var(--color-primary); font-size: 10px;">${classInfo.room}</div>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                `).join('')}
            </div>
        `;
    }

    // Stub implementations for other pages
    renderSubjectManagement() {
        return `
            <div class="management-page">
                <div class="page-header">
                    <h3>Subject Management</h3>
                    <button class="btn btn--primary">
                        <i class="fas fa-plus"></i> Add Subject
                    </button>
                </div>
                <p>Manage subjects and curriculum here.</p>
            </div>
        `;
    }

    renderClassroomManagement() {
        return `
            <div class="management-page">
                <div class="page-header">
                    <h3>Classroom Management</h3>
                    <button class="btn btn--primary">
                        <i class="fas fa-plus"></i> Add Classroom
                    </button>
                </div>
                <p>Manage classrooms and resources here.</p>
            </div>
        `;
    }

    renderBatchManagement() {
        return `
            <div class="management-page">
                <div class="page-header">
                    <h3>Batch Management</h3>
                    <button class="btn btn--primary">
                        <i class="fas fa-plus"></i> Add Batch
                    </button>
                </div>
                <p>Manage student batches here.</p>
            </div>
        `;
    }

    renderConstraints() {
        return `
            <div class="constraints-page">
                <div class="page-header">
                    <h3>Scheduling Constraints</h3>
                    <button class="btn btn--primary">
                        <i class="fas fa-save"></i> Save Constraints
                    </button>
                </div>
                <p>Configure scheduling constraints and rules here.</p>
            </div>
        `;
    }

    renderMySchedule() {
        return `
            <div class="my-schedule">
                <div class="timetable-container">
                    <div class="timetable-header">
                        <h3>My Teaching Schedule</h3>
                    </div>
                    ${this.renderTimetableGrid('faculty')}
                </div>
            </div>
        `;
    }

    renderChangeRequests() {
        return `
            <div class="change-requests-page">
                <div class="page-header">
                    <h3>Class Requests</h3>
                    <button class="btn btn--primary" onclick="app.showClassRequestModal()">
                        <i class="fas fa-plus"></i> New Request
                    </button>
                </div>
                <div class="requests-list">
                    ${this.classRequests.filter(r => r.facultyId === this.currentUser.id).length > 0 ? 
                        this.classRequests.filter(r => r.facultyId === this.currentUser.id).map(request => `
                            <div class="request-item">
                                <div class="request-header">
                                    <h4>${request.requestType.replace('_', ' ').toUpperCase()}</h4>
                                    <span class="badge badge--${request.status}">${request.status}</span>
                                </div>
                                <div class="request-details">
                                    <p><strong>Subject:</strong> ${request.subject}</p>
                                    <p><strong>Date:</strong> ${request.date}</p>
                                    <p><strong>Time:</strong> ${request.timeSlot}</p>
                                    <p><strong>Reason:</strong> ${request.reason}</p>
                                </div>
                            </div>
                        `).join('') : `
                            <div class="empty-state">
                                <i class="fas fa-exchange-alt"></i>
                                <h4>No Requests Submitted</h4>
                                <p>Click "New Request" to submit a class change request.</p>
                            </div>
                        `}
                </div>
            </div>
        `;
    }

    renderMyTimetable() {
        return `
            <div class="my-timetable">
                <div class="timetable-container">
                    <div class="timetable-header">
                        <h3>My Class Timetable</h3>
                        <div class="timetable-info">
                            <span class="badge badge--info">Batch: ${this.currentUser.batch}</span>
                            <span class="badge badge--active">Semester: ${this.currentUser.semester}</span>
                        </div>
                    </div>
                    ${this.renderTimetableGrid('student')}
                </div>
            </div>
        `;
    }

    renderFeedback() {
        return `
            <div class="feedback-page">
                <div class="page-header">
                    <h3>Submit Feedback</h3>
                </div>
                <p>Provide feedback on faculty and course content here.</p>
            </div>
        `;
    }

    renderFeedbackManagement() {
        return `
            <div class="feedback-management-page">
                <div class="page-header">
                    <h3>Feedback Management</h3>
                </div>
                <p>View and manage feedback from students here.</p>
            </div>
        `;
    }

    // Utility Functions
    closeModal() {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
            modalContainer.innerHTML = '';
        }
    }

    getCurrentDay() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    }

    setupPageEventListeners(page) {
        // Setup any page-specific event listeners
    }

    exportTimetable() {
        this.showToast('Timetable export started (PDF/Excel)', 'info');
        setTimeout(() => {
            this.showToast('Timetable exported successfully!', 'success');
        }, 2000);
    }

    exportReports() {
        this.showToast('Reports export started', 'info');
        setTimeout(() => {
            this.showToast('Reports exported successfully!', 'success');
        }, 2000);
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' :
                    type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 5000);

            // Manual close
            const closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                });
            }
        }
    }

    showLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.remove('hidden');
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new CollegeSchedulingSystem();
        window.app = app;
    });
} else {
    app = new CollegeSchedulingSystem();
    window.app = app;
}