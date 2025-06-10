document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    document.addEventListener('click', (e) => {
        const notificationsDropdown = document.getElementById('notificationsDropdown');
        if (notificationsDropdown && !e.target.closest('.header-notifications')) {
            notificationsDropdown.classList.remove('active');
        }
        const userMenu = document.getElementById('userMenu');
        if (userMenu && !e.target.closest('.header-user')) {
            userMenu.classList.remove('active');
        }
    });
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    if (notificationBtn && notificationsDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('active');
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.classList.remove('active');
            }
        });
    }
    const headerAvatar = document.querySelector('.header-avatar');
    const userMenu = document.getElementById('userMenu');
    
    if (headerAvatar && userMenu) {
        headerAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
            if (notificationsDropdown) {
                notificationsDropdown.classList.remove('active');
            }
        });
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const sidebarUserName = document.getElementById('sidebarUserName');
    const sidebarUserRole = document.getElementById('sidebarUserRole');
    const headerUserName = document.getElementById('headerUserName');
    
    if (sidebarUserName) {
        sidebarUserName.textContent = currentUser.fullName || 'Người dùng';
    }
    if (sidebarUserRole) {
        sidebarUserRole.textContent = currentUser.role || 'Nhân viên';
    }
    if (headerUserName) {
        headerUserName.textContent = currentUser.fullName || 'Người dùng';
    }
});
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}
function markAllAsRead() {
    const notificationItems = document.querySelectorAll('.notification-item.unread');
    notificationItems.forEach(item => {
        item.classList.remove('unread');
    });
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}