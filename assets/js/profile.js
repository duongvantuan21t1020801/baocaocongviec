let currentUploadType = null;
let currentUser = null;
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

function initializeProfile() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    loadUserProfile();
    loadUserStats();
    loadUserActivity();
    setupProfileEventListeners();
    setupFileUpload();
    setupPasswordStrength();
    switchTab('personal');
}

function loadUserProfile() {
    document.getElementById('profileName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('profileRole').textContent = currentUser.role || 'Nhân viên';
    document.getElementById('profileCompany').textContent = currentUser.company || 'Chưa cập nhật';
    document.getElementById('sidebarUserName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById('sidebarUserRole').textContent = currentUser.role || 'Nhân viên';
    document.getElementById('firstName').value = currentUser.firstName || '';
    document.getElementById('lastName').value = currentUser.lastName || '';
    document.getElementById('email').value = currentUser.email || '';
    document.getElementById('phone').value = currentUser.phone || '';
    document.getElementById('company').value = currentUser.company || '';
    document.getElementById('position').value = currentUser.role || '';
    document.getElementById('bio').value = currentUser.bio || '';
    const avatarUrl = currentUser.avatar || 'assets/icon/avatar.jpg';
    document.getElementById('profileAvatar').src = avatarUrl;
    document.getElementById('headerAvatar').src = avatarUrl;
    document.getElementById('sidebarAvatar').src = avatarUrl;
}

function loadUserStats() {
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    const userPlans = plans.filter(plan => 
        plan.assignedTo && plan.assignedTo.includes(currentUser.email)
    );
    
    const userEntries = diaryEntries.filter(entry => 
        entry.author === currentUser.email
    );
    
    const completedTasks = userEntries.filter(entry => 
        entry.status === 'completed'
    ).length;
    const workingDays = new Set(
        userEntries.map(entry => entry.date.split('T')[0])
    ).size;
    document.getElementById('totalProjects').textContent = userPlans.length;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('workingDays').textContent = workingDays;
}

function loadUserActivity() {
    const activityList = document.getElementById('activityList');
    const activities = getUserActivities();
    
    if (activities.length === 0) {
        activityList.innerHTML = `
            <div class="no-activity">
                <i class="fas fa-history"></i>
                <p>Chưa có hoạt động nào</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${formatRelativeTime(activity.timestamp)}</div>
            </div>
        </div>
    `).join('');
}

function getUserActivities() {
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    
    let activities = [];
    plans.forEach(plan => {
        if (plan.assignedTo && plan.assignedTo.includes(currentUser.email)) {
            activities.push({
                type: 'plan',
                icon: 'fas fa-project-diagram',
                title: 'Tham gia dự án',
                description: plan.title,
                timestamp: plan.createdAt || new Date().toISOString()
            });
        }
    });
    diaryEntries.forEach(entry => {
        if (entry.author === currentUser.email) {
            activities.push({
                type: 'diary',
                icon: 'fas fa-book',
                title: 'Cập nhật nhật ký',
                description: entry.content.substring(0, 100) + '...',
                timestamp: entry.date
            });
        }
    });
    return activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
}

function setupProfileEventListeners() {
    document.getElementById('personalForm').addEventListener('submit', handlePersonalFormSubmit);
    document.getElementById('passwordForm').addEventListener('submit', handlePasswordFormSubmit);
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', handleToggleChange);
    });
    document.querySelectorAll('input[name="theme"]').forEach(radio => {
        radio.addEventListener('change', handleThemeChange);
    });
    document.querySelector('.form-select').addEventListener('change', handleLanguageChange);
}

function setupFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect({ target: { files } });
        }
    });
}

function setupPasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', () => {
            checkPasswordStrength('newPassword', 'newPasswordStrength');
        });
    }
}
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}
async function handlePersonalFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updatedData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        role: formData.get('position'),
        bio: formData.get('bio')
    };
    
    try {
        Object.assign(currentUser, updatedData);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            Object.assign(users[userIndex], updatedData);
            localStorage.setItem('users', JSON.stringify(users));
        }
        loadUserProfile();
        
        showNotification('Thông tin đã được cập nhật thành công!', 'success');
    } catch (error) {
        showNotification('Có lỗi xảy ra khi cập nhật thông tin', 'error');
    }
}

async function handlePasswordFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');
    if (currentPassword !== currentUser.password) {
        showNotification('Mật khẩu hiện tại không chính xác', 'error');
        return;
    }
    if (newPassword.length < 8) {
        showNotification('Mật khẩu mới phải có ít nhất 8 ký tự', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return;
    }
    
    try {
        currentUser.password = newPassword;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
        }
        document.getElementById('passwordForm').reset();
        
        showNotification('Mật khẩu đã được thay đổi thành công!', 'success');
    } catch (error) {
        showNotification('Có lỗi xảy ra khi thay đổi mật khẩu', 'error');
    }
}

function handleToggleChange(e) {
    const toggleId = e.target.id;
    const isEnabled = e.target.checked;
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences[toggleId] = isEnabled;
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    showNotification(`Cài đặt ${toggleId} đã được ${isEnabled ? 'bật' : 'tắt'}`, 'success');
}

function handleThemeChange(e) {
    const theme = e.target.value;
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences.theme = theme;
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    showNotification(`Đã chuyển sang chế độ ${theme}`, 'success');
}

function handleLanguageChange(e) {
    const language = e.target.value;
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences.language = language;
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    showNotification('Ngôn ngữ đã được thay đổi', 'success');
}
function changeProfilePhoto() {
    currentUploadType = 'avatar';
    document.getElementById('uploadModalTitle').textContent = 'Thay đổi ảnh đại diện';
    document.getElementById('uploadModal').classList.add('active');
}

function changeCoverPhoto() {
    currentUploadType = 'cover';
    document.getElementById('uploadModalTitle').textContent = 'Thay đổi ảnh bìa';
    document.getElementById('uploadModal').classList.add('active');
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    removePreview();
    currentUploadType = null;
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showNotification('Vui lòng chọn file ảnh', 'error');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File ảnh không được vượt quá 5MB', 'error');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('uploadPreview').style.display = 'block';
        document.getElementById('uploadBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

function removePreview() {
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadBtn').disabled = true;
    document.getElementById('fileInput').value = '';
}

function uploadImage() {
    const previewImage = document.getElementById('previewImage');
    const imageUrl = previewImage.src;
    
    if (currentUploadType === 'avatar') {
        currentUser.avatar = imageUrl;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].avatar = imageUrl;
            localStorage.setItem('users', JSON.stringify(users));
        }
        document.getElementById('profileAvatar').src = imageUrl;
        document.getElementById('headerAvatar').src = imageUrl;
        document.getElementById('sidebarAvatar').src = imageUrl;
        
        showNotification('Ảnh đại diện đã được cập nhật!', 'success');
    } else if (currentUploadType === 'cover') {
        currentUser.coverPhoto = imageUrl;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.querySelector('.profile-cover').style.backgroundImage = `url(${imageUrl})`;
        
        showNotification('Ảnh bìa đã được cập nhật!', 'success');
    }
    
    closeUploadModal();
}
function resetPersonalForm() {
    loadUserProfile();
    showNotification('Đã khôi phục thông tin ban đầu', 'info');
}

function resetPasswordForm() {
    document.getElementById('passwordForm').reset();
    showNotification('Đã xóa form đổi mật khẩu', 'info');
}
function checkPasswordStrength(inputId, strengthId) {
    const password = document.getElementById(inputId).value;
    const strengthContainer = document.getElementById(strengthId);
    
    if (!strengthContainer) return;
    
    const strength = calculatePasswordStrength(password);
    strengthContainer.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
    
    if (password.length === 0) {
        strengthContainer.querySelector('.strength-text').textContent = 'Độ mạnh mật khẩu';
        return;
    }
    switch (strength.level) {
        case 1:
            strengthContainer.classList.add('strength-weak');
            strengthContainer.querySelector('.strength-text').textContent = 'Yếu';
            break;
        case 2:
            strengthContainer.classList.add('strength-fair');
            strengthContainer.querySelector('.strength-text').textContent = 'Trung bình';
            break;
        case 3:
            strengthContainer.classList.add('strength-good');
            strengthContainer.querySelector('.strength-text').textContent = 'Tốt';
            break;
        case 4:
            strengthContainer.classList.add('strength-strong');
            strengthContainer.querySelector('.strength-text').textContent = 'Mạnh';
            break;
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    let level = 1;
    if (score >= 3) level = 2;
    if (score >= 5) level = 3;
    if (score >= 6) level = 4;
    
    return { score, level };
}
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
function formatRelativeTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) {
        return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} giờ trước`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ngày trước`;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        default: return 'fas fa-info-circle';
    }
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}