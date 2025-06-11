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
document.addEventListener('DOMContentLoaded', function() {
    initializeWorkPlans();
});

function initializeWorkPlans() {
    loadPlansFromStorage();
    renderPlans();
    setupEventListeners();
}
function setupEventListeners() {
    const planForm = document.querySelector('.plan-form');
    if (planForm) {
        const submitBtn = planForm.closest('.modal').querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', handlePlanSubmit);
        }
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
function openPlanModal() {
    const modal = document.getElementById('modalOverlay');
    const planModal = document.getElementById('planModal');
    if (modal && planModal) {
        modal.classList.add('active');
        planModal.style.display = 'block';
        document.getElementById('diaryModal').style.display = 'none';
        localStorage.removeItem('openPlanModalOnLoad');
    }
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
        savePlansToStorage();
        form.reset();
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
            savePlansToStorage();
            showNotification('Tiến độ đã được cập nhật!', 'success');
        }
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
function savePlansToStorage() {
    try {
        localStorage.setItem('workflowPlans', JSON.stringify(plans));
    } catch (error) {
        console.error('Error saving plans to localStorage:', error);
    }
}
function loadPlansFromStorage() {
    try {
        const savedPlans = localStorage.getItem('workflowPlans');
        if (savedPlans) {
            plans = JSON.parse(savedPlans);
        }
    } catch (error) {
        console.error('Error loading plans from localStorage:', error);
    }
}