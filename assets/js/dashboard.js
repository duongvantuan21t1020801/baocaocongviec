class Dashboard {
    constructor() {
        this.notifications = this.loadNotifications();
        this.quickTasks = this.loadQuickTasks();
        this.chart = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserInfo();
        this.updateCurrentDate();
        this.updateStatistics();
        this.renderRecentPlans();
        this.renderTodayTasks();
        this.renderTeamActivity();
        this.renderRecentLogs();
        this.renderNotifications();
        this.initChart();
        this.updateNotificationCount();
    }

    loadNotifications() {
        const defaultNotifications = [
            {
                id: 1,
                title: 'Kế hoạch mới được tạo',
                message: 'Dự án phát triển website đã được thêm vào hệ thống',
                time: new Date(Date.now() - 30 * 60 * 1000),
                read: false,
                type: 'info'
            },
            {
                id: 2,
                title: 'Nhiệm vụ sắp hết hạn',
                message: 'Bạn có 3 nhiệm vụ sẽ hết hạn trong 24 giờ tới',
                time: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: false,
                type: 'warning'
            },
            {
                id: 3,
                title: 'Thành viên mới tham gia',
                message: 'Nguyễn Văn An đã tham gia vào nhóm IT',
                time: new Date(Date.now() - 4 * 60 * 60 * 1000),
                read: false,
                type: 'success'
            }
        ];

        const saved = localStorage.getItem('workflowNotifications');
        return saved ? JSON.parse(saved) : defaultNotifications;
    }

    loadQuickTasks() {
        const defaultTasks = [
            {
                id: 1,
                title: 'Hoàn thành báo cáo tuần',
                priority: 'high',
                dueDate: new Date().toISOString().split('T')[0],
                completed: false
            },
            {
                id: 2,
                title: 'Review code dự án A',
                priority: 'medium',
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: false
            },
            {
                id: 3,
                title: 'Cập nhật tài liệu API',
                priority: 'low',
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                completed: true
            }
        ];

        const saved = localStorage.getItem('workflowQuickTasks');
        return saved ? JSON.parse(saved) : defaultTasks;
    }

    saveNotifications() {
        localStorage.setItem('workflowNotifications', JSON.stringify(this.notifications));
    }

    saveQuickTasks() {
        localStorage.setItem('workflowQuickTasks', JSON.stringify(this.quickTasks));
    }

    setupEventListeners() {
        document.getElementById('globalSearch').addEventListener('input', (e) => {
            this.performGlobalSearch(e.target.value);
        });
        document.querySelector('.sidebar-toggle').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('collapsed');
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-notifications')) {
                document.getElementById('notificationsDropdown').classList.remove('active');
            }
            if (!e.target.closest('.header-user')) {
                document.getElementById('userMenu').classList.remove('active');
            }
        });
        document.getElementById('chartPeriod').addEventListener('change', () => {
            this.updateChart();
        });
    }

    loadUserInfo() {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (user.firstName && user.lastName) {
            const fullName = `${user.firstName} ${user.lastName}`;
            document.getElementById('sidebarUserName').textContent = fullName;
            document.getElementById('welcomeUserName').textContent = user.firstName;
        }
        
        if (user.role) {
            document.getElementById('sidebarUserRole').textContent = user.role;
        }
        
        if (user.avatar) {
            document.getElementById('sidebarAvatar').src = user.avatar;
            document.getElementById('headerAvatar').src = user.avatar;
        }
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('vi-VN', options);
        document.getElementById('currentDate').textContent = dateString;
    }

    updateStatistics() {
        const plans = JSON.parse(localStorage.getItem('workflowPlans') || '[]');
        const diaryEntries = JSON.parse(localStorage.getItem('workflowDiary') || '[]');
        const teamMembers = JSON.parse(localStorage.getItem('workflowTeamMembers') || '[]');
        const totalPlans = plans.length;
        const activeTasks = this.quickTasks.filter(task => !task.completed).length;
        const completedTasks = this.quickTasks.filter(task => task.completed).length;
        const todayTasks = this.quickTasks.filter(task => 
            task.dueDate === new Date().toISOString().split('T')[0]
        ).length;
        document.getElementById('totalPlans').textContent = totalPlans;
        document.getElementById('activeTasks').textContent = activeTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('teamMembers').textContent = teamMembers.length;
        document.getElementById('todayTasks').textContent = todayTasks;
    }

    renderRecentPlans() {
        const plans = JSON.parse(localStorage.getItem('workflowPlans') || '[]');
        const recentPlans = plans.slice(0, 5);
        
        const container = document.getElementById('recentPlansList');
        
        if (recentPlans.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Chưa có kế hoạch nào</p>
                    <button class="btn btn-primary" onclick="createNewPlan()">
                        <i class="fas fa-plus"></i>
                        Tạo kế hoạch đầu tiên
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = recentPlans.map(plan => {
            const progress = this.calculatePlanProgress(plan);
            return `
                <div class="plan-item" onclick="viewPlan(${plan.id})">
                    <div class="plan-icon">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div class="plan-info">
                        <h4>${plan.title}</h4>
                        <p>${plan.description || 'Không có mô tả'}</p>
                    </div>
                    <div class="plan-progress">
                        <div class="progress-circle" style="--progress: ${progress * 3.6}deg">
                            ${progress}%
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderTodayTasks() {
        const todayTasks = this.quickTasks.filter(task => 
            task.dueDate === new Date().toISOString().split('T')[0]
        );
        
        const container = document.getElementById('todayTasksList');
        
        if (todayTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Không có nhiệm vụ nào cho hôm nay</p>
                    <button class="btn btn-primary" onclick="addQuickTask()">
                        <i class="fas fa-plus"></i>
                        Thêm nhiệm vụ
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = todayTasks.map(task => `
            <div class="task-item">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="toggleTask(${task.id})"></div>
                <div class="task-content">
                    <h5>${task.title}</h5>
                    <p>Hạn: ${new Date(task.dueDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div class="task-priority ${task.priority}"></div>
            </div>
        `).join('');
    }

    renderTeamActivity() {
        const activities = [
            {
                user: 'Nguyễn Văn An',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=35&h=35&fit=crop&crop=face',
                action: 'đã hoàn thành nhiệm vụ "Thiết kế giao diện"',
                time: '2 giờ trước'
            },
            {
                user: 'Trần Thị Bình',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=35&h=35&fit=crop&crop=face',
                action: 'đã tạo kế hoạch mới "Dự án B"',
                time: '4 giờ trước'
            },
            {
                user: 'Lê Minh Cường',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=35&h=35&fit=crop&crop=face',
                action: 'đã cập nhật tiến độ dự án',
                time: '6 giờ trước'
            }
        ];
        
        const container = document.getElementById('teamActivityList');
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <img src="${activity.avatar}" alt="${activity.user}" class="activity-avatar">
                <div class="activity-content">
                    <p><strong>${activity.user}</strong> ${activity.action}</p>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    renderRecentLogs() {
        const logs = JSON.parse(localStorage.getItem('workflowDiary') || '[]');
        const recentLogs = logs.slice(0, 3);
        
        const container = document.getElementById('recentLogsList');
        
        if (recentLogs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Chưa có nhật ký nào</p>
                    <button class="btn btn-primary" onclick="addDailyLog()">
                        <i class="fas fa-plus"></i>
                        Thêm nhật ký đầu tiên
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = recentLogs.map(log => `
            <div class="log-item">
                <h5>${log.title}</h5>
                <p>${log.content.substring(0, 100)}${log.content.length > 100 ? '...' : ''}</p>
                <div class="log-meta">
                    <span>${log.author}</span>
                    <span>${new Date(log.date).toLocaleDateString('vi-VN')}</span>
                </div>
            </div>
        `).join('');
    }

    renderNotifications() {
        const container = document.getElementById('notificationsList');
        
        if (this.notifications.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Không có thông báo mới</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.notifications.map(notification => `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" 
                 onclick="markAsRead(${notification.id})">
                <div class="notification-icon ${notification.type}">
                    <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <h5>${notification.title}</h5>
                    <p>${notification.message}</p>
                    <div class="notification-time">${this.formatTime(notification.time)}</div>
                </div>
            </div>
        `).join('');
    }

    updateNotificationCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationCount');
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    initChart() {
        const ctx = document.getElementById('progressChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
                datasets: [{
                    label: 'Nhiệm vụ hoàn thành',
                    data: [12, 19, 15, 25, 22, 18, 20],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Nhiệm vụ mới',
                    data: [8, 15, 12, 20, 18, 15, 16],
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    updateChart() {
        const period = document.getElementById('chartPeriod').value;
        let labels, data1, data2;
        
        switch (period) {
            case 'week':
                labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
                data1 = [12, 19, 15, 25, 22, 18, 20];
                data2 = [8, 15, 12, 20, 18, 15, 16];
                break;
            case 'month':
                labels = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
                data1 = [85, 92, 78, 95];
                data2 = [65, 75, 68, 82];
                break;
            case 'quarter':
                labels = ['Tháng 1', 'Tháng 2', 'Tháng 3'];
                data1 = [320, 285, 350];
                data2 = [250, 220, 280];
                break;
        }
        
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data1;
        this.chart.data.datasets[1].data = data2;
        this.chart.update();
    }

    calculatePlanProgress(plan) {
        if (!plan.progress || plan.progress.length === 0) return 0;
        
        const completedSteps = plan.progress.filter(step => step.status === 'completed').length;
        return Math.round((completedSteps / plan.progress.length) * 100);
    }

    getNotificationIcon(type) {
        const icons = {
            'info': 'info-circle',
            'warning': 'exclamation-triangle',
            'success': 'check-circle',
            'error': 'times-circle'
        };
        return icons[type] || 'bell';
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (minutes < 60) {
            return `${minutes} phút trước`;
        } else if (hours < 24) {
            return `${hours} giờ trước`;
        } else {
            return `${days} ngày trước`;
        }
    }

    performGlobalSearch(query) {
        if (!query.trim()) return;
        console.log('Searching for:', query);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}
function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    dropdown.classList.toggle('active');
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('active');
}

function markAsRead(notificationId) {
    const notification = dashboard.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        dashboard.saveNotifications();
        dashboard.renderNotifications();
        dashboard.updateNotificationCount();
    }
}

function markAllAsRead() {
    dashboard.notifications.forEach(n => n.read = true);
    dashboard.saveNotifications();
    dashboard.renderNotifications();
    dashboard.updateNotificationCount();
}

function toggleTask(taskId) {
    const task = dashboard.quickTasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        dashboard.saveQuickTasks();
        dashboard.renderTodayTasks();
        dashboard.updateStatistics();
        
        const message = task.completed ? 'Nhiệm vụ đã được đánh dấu hoàn thành' : 'Nhiệm vụ đã được đánh dấu chưa hoàn thành';
        dashboard.showNotification(message, 'success');
    }
}

function addQuickTask() {
    document.getElementById('quickTaskModal').classList.add('active');
    document.getElementById('taskDueDate').value = new Date().toISOString().split('T')[0];
}

function closeQuickTaskModal() {
    document.getElementById('quickTaskModal').classList.remove('active');
    document.getElementById('quickTaskForm').reset();
}

function addQuickTaskSubmit(event) {
    event.preventDefault();
    
    const newTask = {
        id: Date.now(),
        title: document.getElementById('taskTitle').value,
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value,
        completed: false
    };
    
    dashboard.quickTasks.push(newTask);
    dashboard.saveQuickTasks();
    dashboard.renderTodayTasks();
    dashboard.updateStatistics();
    
    closeQuickTaskModal();
    dashboard.showNotification('Nhiệm vụ mới đã được thêm thành công!', 'success');
}

function createNewPlan() {
    dashboard.showNotification('Đang chuyển đến trang tạo kế hoạch...', 'info');
    localStorage.setItem('openPlanModalOnLoad', 'true');
    setTimeout(() => {
        window.location.href = 'work-plans.html';
    }, 1000);
}

function addDailyLog() {
    dashboard.showNotification('Đang chuyển đến trang nhật ký...', 'info');
    localStorage.setItem('openDiaryModalOnLoad', 'true');
    setTimeout(() => {
        window.location.href = 'daily-logs.html';
    }, 1000);
}

function viewPlan(planId) {
    localStorage.setItem('viewPlanId', planId);
    dashboard.showNotification('Đang tải thông tin kế hoạch...', 'info');
    setTimeout(() => {
        window.location.href = `work-plans.html?plan=${planId}`;
    }, 1000);
}

function inviteTeamMember() {
    dashboard.showNotification('Đang chuyển đến trang quản lý nhóm...', 'info');
    localStorage.setItem('openAddMemberModalOnLoad', 'true');
    setTimeout(() => {
        window.location.href = 'team-management.html';
    }, 1000);
}

function generateReport() {
    dashboard.showNotification('Đang chuyển đến trang báo cáo...', 'info');
    localStorage.setItem('openReportModalOnLoad', 'true');
    setTimeout(() => {
        window.location.href = 'reports.html';
    }, 1000);
}

function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    dashboard = new Dashboard();
});
const notificationStyles = `
<style>
.notification-item {
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

.notification-item:hover {
    background: rgba(102, 126, 234, 0.05);
}

.notification-item.unread {
    background: rgba(102, 126, 234, 0.02);
    border-left: 3px solid #667eea;
}

.notification-icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
}

.notification-icon.info {
    background: #2196F3;
}

.notification-icon.warning {
    background: #ff9800;
}

.notification-icon.success {
    background: #4CAF50;
}

.notification-icon.error {
    background: #f44336;
}

.notification-content {
    flex: 1;
}

.notification-content h5 {
    margin: 0 0 5px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

.notification-content p {
    margin: 0 0 5px;
    color: #666;
    font-size: 13px;
    line-height: 1.4;
}

.notification-time {
    color: #999;
    font-size: 11px;
}

.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

.empty-state p {
    margin: 0 0 15px;
    color: #666;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    padding: 15px 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 3000;
    min-width: 300px;
    border-left: 4px solid #667eea;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.notification-success {
    border-left-color: #4CAF50;
}

.notification-error {
    border-left-color: #f44336;
}

.notification-info {
    border-left-color: #2196F3;
}

.notification i {
    color: #667eea;
}

.notification-success i {
    color: #4CAF50;
}

.notification-error i {
    color: #f44336;
}

.notification-info i {
    color: #2196F3;
}

.notification-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    margin-left: auto;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.notification-close:hover {
    background: rgba(0, 0, 0, 0.1);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);