let currentTab = 'dashboard';
let plans = [
    {
        id: 1,
        name: 'Dự án Website Công ty',
        description: 'Phát triển website công ty với đầy đủ tính năng quản lý và báo cáo',
        progress: 75,
        status: 'in-progress',
        deadline: '2024-12-15',
        team: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'],
        tasks: [
            { name: 'Thiết kế UI/UX', progress: 100, assignee: 'Trần Thị B' },
            { name: 'Phát triển Frontend', progress: 80, assignee: 'Lê Văn C' },
            { name: 'Phát triển Backend', progress: 70, assignee: 'Nguyễn Văn A' },
            { name: 'Testing', progress: 50, assignee: 'Phạm Thị D' }
        ]
    },
    {
        id: 2,
        name: 'Ứng dụng Mobile',
        description: 'Phát triển ứng dụng mobile cho khách hàng với tính năng đặt hàng online',
        progress: 25,
        status: 'planning',
        deadline: '2025-01-20',
        team: ['Nguyễn Văn A', 'Trần Thị B', 'Hoàng Văn E'],
        tasks: [
            { name: 'Phân tích yêu cầu', progress: 100, assignee: 'Nguyễn Văn A' },
            { name: 'Thiết kế wireframe', progress: 60, assignee: 'Trần Thị B' },
            { name: 'Setup dự án', progress: 30, assignee: 'Hoàng Văn E' },
            { name: 'Phát triển MVP', progress: 0, assignee: 'Lê Văn C' }
        ]
    }
];

let diaryEntries = [
    {
        id: 1,
        title: 'Họp team phát triển',
        content: 'Thảo luận về tiến độ dự án website, phân công nhiệm vụ tuần này. Cần tập trung vào module thanh toán và tối ưu hiệu suất.',
        author: 'Nguyễn Văn A',
        time: '09:00',
        date: '2024-12-10',
        tags: ['Họp', 'Dự án Website'],
        comments: [
            { author: 'Trần Thị B', content: 'Cần bổ sung thêm test case cho module thanh toán' },
            { author: 'Lê Văn C', content: 'Đã hoàn thành phần tối ưu database' }
        ]
    },
    {
        id: 2,
        title: 'Trao đổi với khách hàng',
        content: 'Gặp khách hàng để thảo luận về yêu cầu mới cho ứng dụng mobile. Khách hàng muốn thêm tính năng chat và notification push.',
        author: 'Trần Thị B',
        time: '14:30',
        date: '2024-12-10',
        tags: ['Khách hàng', 'Ứng dụng Mobile'],
        comments: [
            { author: 'Nguyễn Văn A', content: 'Cần đánh giá thời gian phát triển cho tính năng mới' }
        ]
    }
];

let teamMembers = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        role: 'Team Leader',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        performance: 95,
        activePlans: 5,
        email: 'nguyenvana@company.com',
        phone: '0123456789'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        role: 'Frontend Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
        performance: 88,
        activePlans: 3,
        email: 'tranthib@company.com',
        phone: '0123456790'
    },
    {
        id: 3,
        name: 'Lê Văn C',
        role: 'Backend Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        performance: 92,
        activePlans: 4,
        email: 'levanc@company.com',
        phone: '0123456791'
    }
];
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateDashboardStats();
});
function initializeApp() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        if (!input.value) {
            input.value = currentTime;
        }
    });
    loadDataFromStorage();
}
function setupEventListeners() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    setupFormSubmissions();
    document.addEventListener('keydown', handleKeyboardShortcuts);
}
function switchTab(tabName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    const pageTitle = document.querySelector('.page-title');
    const pageTitles = {
        'dashboard': 'Tổng quan',
        'plans': 'Kế hoạch công việc',
        'diary': 'Nhật ký hàng ngày',
        'reports': 'Báo cáo',
        'team': 'Quản lý nhân sự'
    };
    
    if (pageTitle && pageTitles[tabName]) {
        pageTitle.textContent = pageTitles[tabName];
    }

    currentTab = tabName;
    switch(tabName) {
        case 'dashboard':
            updateDashboardStats();
            break;
        case 'plans':
            renderPlans();
            break;
        case 'diary':
            renderDiaryEntries();
            break;
        case 'reports':
            updateReports();
            break;
        case 'team':
            renderTeamMembers();
            break;
    }
}
function updateDashboardStats() {
    const stats = {
        activePlans: plans.filter(p => p.status === 'in-progress').length,
        completedPlans: plans.filter(p => p.status === 'completed').length,
        totalMembers: teamMembers.length,
        todayDiaries: diaryEntries.filter(d => d.date === new Date().toISOString().split('T')[0]).length
    };
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('h3').textContent = stats.activePlans;
        statCards[1].querySelector('h3').textContent = stats.completedPlans;
        statCards[2].querySelector('h3').textContent = stats.totalMembers;
        statCards[3].querySelector('h3').textContent = stats.todayDiaries;
    }
    updateProgressBars();
    updateRecentActivities();
}

function updateProgressBars() {
    const progressItems = document.querySelectorAll('.progress-item');
    plans.slice(0, 3).forEach((plan, index) => {
        if (progressItems[index]) {
            const nameSpan = progressItems[index].querySelector('span:first-child');
            const progressFill = progressItems[index].querySelector('.progress-fill');
            const percentSpan = progressItems[index].querySelector('span:last-child');
            
            if (nameSpan) nameSpan.textContent = plan.name;
            if (progressFill) progressFill.style.width = plan.progress + '%';
            if (percentSpan) percentSpan.textContent = plan.progress + '%';
        }
    });
}

function updateRecentActivities() {
    const activities = [
        {
            icon: 'fas fa-plus',
            text: '<strong>Nguyễn Văn B</strong> đã tạo kế hoạch mới',
            time: '2 giờ trước'
        },
        {
            icon: 'fas fa-edit',
            text: '<strong>Trần Thị C</strong> đã cập nhật nhật ký',
            time: '4 giờ trước'
        },
        {
            icon: 'fas fa-check',
            text: '<strong>Lê Văn D</strong> đã hoàn thành nhiệm vụ',
            time: '6 giờ trước'
        }
    ];

    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span>${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}
function renderPlans() {
    const plansGrid = document.querySelector('.plans-grid');
    if (!plansGrid) return;

    plansGrid.innerHTML = plans.map(plan => `
        <div class="plan-card hover-lift">
            <div class="plan-header">
                <h3>${plan.name}</h3>
                <span class="status-badge ${plan.status}">${getStatusText(plan.status)}</span>
            </div>
            <p class="plan-description">${plan.description}</p>
            <div class="plan-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${plan.progress}%"></div>
                </div>
                <span>${plan.progress}% hoàn thành</span>
            </div>
            <div class="plan-team">
                <div class="team-avatars">
                    ${plan.team.slice(0, 3).map((member, index) => `
                        <img src="https://images.unsplash.com/photo-${index % 2 === 0 ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b612b786'}?w=32&h=32&fit=crop&crop=face" alt="${member}" title="${member}">
                    `).join('')}
                    ${plan.team.length > 3 ? `<span class="team-count">+${plan.team.length - 3}</span>` : ''}
                </div>
                <span class="deadline">Hạn: ${formatDate(plan.deadline)}</span>
            </div>
            <div class="plan-actions">
                <button class="btn-secondary" onclick="viewPlanDetails(${plan.id})">Xem chi tiết</button>
                <button class="btn-primary" onclick="updateProgress(${plan.id})">Cập nhật tiến độ</button>
            </div>
        </div>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'planning': 'Lên kế hoạch',
        'in-progress': 'Đang thực hiện',
        'completed': 'Hoàn thành',
        'on-hold': 'Tạm dừng'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}
function renderDiaryEntries() {
    const diaryTimeline = document.querySelector('.diary-timeline');
    if (!diaryTimeline) return;

    diaryTimeline.innerHTML = diaryEntries.map(entry => `
        <div class="diary-entry">
            <div class="diary-time">${entry.time}</div>
            <div class="diary-content">
                <div class="diary-header">
                    <h4>${entry.title}</h4>
                    <span class="diary-author">${entry.author}</span>
                </div>
                <p>${entry.content}</p>
                <div class="diary-tags">
                    ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="diary-actions">
                    <button class="btn-comment" onclick="toggleComments(${entry.id})">
                        <i class="fas fa-comment"></i> ${entry.comments.length} bình luận
                    </button>
                    <span class="diary-date">${formatDate(entry.date)}</span>
                </div>
                <div class="comments-section" id="comments-${entry.id}" style="display: none;">
                    ${entry.comments.map(comment => `
                        <div class="comment">
                            <strong>${comment.author}:</strong> ${comment.content}
                        </div>
                    `).join('')}
                    <div class="add-comment">
                        <input type="text" placeholder="Thêm bình luận..." onkeypress="handleCommentSubmit(event, ${entry.id})">
                        <button class="btn-send" onclick="addComment(${entry.id})"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleComments(entryId) {
    const commentsSection = document.getElementById(`comments-${entryId}`);
    if (commentsSection) {
        commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    }
}

function addComment(entryId) {
    const input = document.querySelector(`#comments-${entryId} input`);
    if (input && input.value.trim()) {
        const entry = diaryEntries.find(e => e.id === entryId);
        if (entry) {
            entry.comments.push({
                author: 'Bạn',
                content: input.value.trim()
            });
            input.value = '';
            renderDiaryEntries();
            toggleComments(entryId);
            saveDataToStorage();
        }
    }
}

function handleCommentSubmit(event, entryId) {
    if (event.key === 'Enter') {
        addComment(entryId);
    }
}
function renderTeamMembers() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    teamGrid.innerHTML = teamMembers.map(member => `
        <div class="team-member-card hover-lift">
            <div class="member-avatar">
                <img src="${member.avatar}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
                <div class="member-stats">
                    <span>${member.activePlans} kế hoạch</span>
                    <span>${member.performance}% hiệu suất</span>
                </div>
            </div>
            <div class="member-actions">
                <button class="btn-secondary" onclick="viewMemberDetails(${member.id})">Xem chi tiết</button>
            </div>
        </div>
    `).join('');
}
function updateReports() {
    updatePerformanceReport();
    updatePlanSummary();
}

function updatePerformanceReport() {
    const performanceList = document.querySelector('.performance-list');
    if (!performanceList) return;

    performanceList.innerHTML = teamMembers.map(member => `
        <div class="performance-item">
            <div class="employee-info">
                <img src="${member.avatar}" alt="${member.name}">
                <span>${member.name}</span>
            </div>
            <div class="performance-score">
                <span class="score">${member.performance}%</span>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${member.performance}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function updatePlanSummary() {
    const completedOnTime = plans.filter(p => p.status === 'completed').length;
    const inProgress = plans.filter(p => p.status === 'in-progress').length;
    const overdue = plans.filter(p => {
        const deadline = new Date(p.deadline);
        const today = new Date();
        return deadline < today && p.status !== 'completed';
    }).length;

    const summaryItems = document.querySelectorAll('.summary-item');
    if (summaryItems.length >= 3) {
        summaryItems[0].querySelector('.value').textContent = `${completedOnTime}/${plans.length}`;
        summaryItems[1].querySelector('.value').textContent = inProgress;
        summaryItems[2].querySelector('.value').textContent = overdue;
    }
}
function openPlanModal() {
    const modal = document.getElementById('modalOverlay');
    const planModal = document.getElementById('planModal');
    if (modal && planModal) {
        modal.classList.add('active');
        planModal.style.display = 'block';
        document.getElementById('diaryModal').style.display = 'none';
    }
}

function openDiaryModal() {
    const modal = document.getElementById('modalOverlay');
    const diaryModal = document.getElementById('diaryModal');
    if (modal && diaryModal) {
        modal.classList.add('active');
        diaryModal.style.display = 'block';
        document.getElementById('planModal').style.display = 'none';
    }
}

function openTeamModal() {
    showNotification('Tính năng đang được phát triển', 'info');
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.getElementById('planModal').style.display = 'none';
            document.getElementById('diaryModal').style.display = 'none';
        }, 300);
    }
}
function setupFormSubmissions() {
    const planForm = document.querySelector('.plan-form');
    if (planForm) {
        const submitBtn = planForm.closest('.modal').querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', handlePlanSubmit);
        }
    }
    const diaryForm = document.querySelector('.diary-form');
    if (diaryForm) {
        const submitBtn = diaryForm.closest('.modal').querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', handleDiarySubmit);
        }
    }
}

function handlePlanSubmit() {
    const form = document.querySelector('.plan-form');
    const formData = new FormData(form);
    
    const newPlan = {
        id: plans.length + 1,
        name: form.querySelector('input[type="text"]').value,
        description: form.querySelector('textarea').value,
        progress: 0,
        status: 'planning',
        deadline: form.querySelectorAll('input[type="date"]')[1].value,
        team: Array.from(form.querySelector('select').selectedOptions).map(option => option.text),
        tasks: []
    };

    if (newPlan.name && newPlan.description) {
        plans.push(newPlan);
        renderPlans();
        closeModal();
        showNotification('Kế hoạch đã được tạo thành công!', 'success');
        saveDataToStorage();
        form.reset();
    } else {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    }
}

function handleDiarySubmit() {
    const form = document.querySelector('.diary-form');
    
    const newEntry = {
        id: diaryEntries.length + 1,
        title: form.querySelector('input[type="text"]').value,
        content: form.querySelector('textarea').value,
        author: 'Bạn',
        time: form.querySelector('input[type="time"]').value,
        date: form.querySelector('input[type="date"]').value,
        tags: form.querySelectorAll('input[type="text"]')[1].value.split(',').map(tag => tag.trim()).filter(tag => tag),
        comments: []
    };

    if (newEntry.title && newEntry.content) {
        diaryEntries.unshift(newEntry);
        renderDiaryEntries();
        closeModal();
        showNotification('Nhật ký đã được thêm thành công!', 'success');
        saveDataToStorage();
        form.reset();
        const now = new Date();
        form.querySelector('input[type="time"]').value = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        form.querySelector('input[type="date"]').value = now.toISOString().split('T')[0];
    } else {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
    }
}
function viewPlanDetails(planId) {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
        showNotification(`Xem chi tiết kế hoạch: ${plan.name}`, 'info');
    }
}

function updateProgress(planId) {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
        const newProgress = prompt(`Cập nhật tiến độ cho "${plan.name}" (0-100):`, plan.progress);
        if (newProgress !== null && !isNaN(newProgress) && newProgress >= 0 && newProgress <= 100) {
            plan.progress = parseInt(newProgress);
            if (plan.progress === 100) {
                plan.status = 'completed';
            }
            renderPlans();
            updateDashboardStats();
            saveDataToStorage();
            showNotification('Tiến độ đã được cập nhật!', 'success');
        }
    }
}

function viewMemberDetails(memberId) {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
        showNotification(`Xem chi tiết nhân sự: ${member.name}`, 'info');
    }
}
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    
    if (currentTab === 'plans') {
        const planCards = document.querySelectorAll('.plan-card');
        planCards.forEach((card, index) => {
            const plan = plans[index];
            const isVisible = plan.name.toLowerCase().includes(query) || 
                            plan.description.toLowerCase().includes(query) ||
                            plan.team.some(member => member.toLowerCase().includes(query));
            card.style.display = isVisible ? 'block' : 'none';
        });
    } else if (currentTab === 'diary') {
        const diaryEntries = document.querySelectorAll('.diary-entry');
        diaryEntries.forEach((entry, index) => {
            const diary = diaryEntries[index];
            const isVisible = diary && (
                diary.title.toLowerCase().includes(query) ||
                diary.content.toLowerCase().includes(query) ||
                diary.author.toLowerCase().includes(query)
            );
            entry.style.display = isVisible ? 'flex' : 'none';
        });
    } else if (currentTab === 'team') {
        const memberCards = document.querySelectorAll('.team-member-card');
        memberCards.forEach((card, index) => {
            const member = teamMembers[index];
            const isVisible = member.name.toLowerCase().includes(query) ||
                            member.role.toLowerCase().includes(query);
            card.style.display = isVisible ? 'block' : 'none';
        });
    }
}
function handleKeyboardShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case '1':
                event.preventDefault();
                switchTab('dashboard');
                break;
            case '2':
                event.preventDefault();
                switchTab('plans');
                break;
            case '3':
                event.preventDefault();
                switchTab('diary');
                break;
            case '4':
                event.preventDefault();
                switchTab('reports');
                break;
            case '5':
                event.preventDefault();
                switchTab('team');
                break;
            case 'n':
                event.preventDefault();
                if (currentTab === 'plans') {
                    openPlanModal();
                } else if (currentTab === 'diary') {
                    openDiaryModal();
                }
                break;
        }
    }
    
    if (event.key === 'Escape') {
        closeModal();
    }
}
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#2ecc71',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#3498db'
    };
    return colors[type] || '#3498db';
}
function saveDataToStorage() {
    try {
        localStorage.setItem('workflowPlans', JSON.stringify(plans));
        localStorage.setItem('workflowDiary', JSON.stringify(diaryEntries));
        localStorage.setItem('workflowTeam', JSON.stringify(teamMembers));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}

function loadDataFromStorage() {
    try {
        const savedPlans = localStorage.getItem('workflowPlans');
        const savedDiary = localStorage.getItem('workflowDiary');
        const savedTeam = localStorage.getItem('workflowTeam');
        
        if (savedPlans) {
            plans = JSON.parse(savedPlans);
        }
        
        if (savedDiary) {
            diaryEntries = JSON.parse(savedDiary);
        }
        
        if (savedTeam) {
            teamMembers = JSON.parse(savedTeam);
        }
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
    }
}
function exportData() {
    const data = {
        plans: plans,
        diaryEntries: diaryEntries,
        teamMembers: teamMembers,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `workflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Dữ liệu đã được xuất thành công!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.plans) plans = data.plans;
                if (data.diaryEntries) diaryEntries = data.diaryEntries;
                if (data.teamMembers) teamMembers = data.teamMembers;
                
                saveDataToStorage();
                switch(currentTab) {
                    case 'dashboard':
                        updateDashboardStats();
                        break;
                    case 'plans':
                        renderPlans();
                        break;
                    case 'diary':
                        renderDiaryEntries();
                        break;
                    case 'team':
                        renderTeamMembers();
                        break;
                }
                
                showNotification('Dữ liệu đã được nhập thành công!', 'success');
            } catch (error) {
                showNotification('Lỗi khi nhập dữ liệu. Vui lòng kiểm tra file!', 'error');
            }
        };
        reader.readAsText(file);
    }
}
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);
function initializeUIEnhancements() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    const cards = document.querySelectorAll('.stat-card, .plan-card, .team-member-card');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
}
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeUIEnhancements, 100);
});