class SettingsManager {
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserInfo();
        this.applySettings();
        this.setupThemeOptions();
        this.setupColorOptions();
        this.setupIntegrations();
    }

    loadSettings() {
        const defaultSettings = {
            language: 'vi',
            timezone: 'Asia/Ho_Chi_Minh',
            dateFormat: 'dd/mm/yyyy',
            autoSave: true,
            animations: true,
            theme: 'light',
            primaryColor: '#667eea',
            compactSidebar: false,
            showBreadcrumb: true,
            emailNewTasks: true,
            emailDeadlines: true,
            emailWeeklyReport: false,
            browserNotifications: false,
            notificationSound: false,
            autoLogout: '30',
            rememberLogin: true,
            confirmDelete: true,
            activityLogging: true,
            autoBackup: true,
            backupFrequency: 'daily'
        };

        const saved = localStorage.getItem('workflowSettings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    saveSettings() {
        localStorage.setItem('workflowSettings', JSON.stringify(this.settings));
        this.showNotification('Cài đặt đã được lưu thành công!', 'success');
    }

    setupEventListeners() {
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.settings.language = e.target.value;
            this.saveSettings();
        });
        document.getElementById('timezoneSelect').addEventListener('change', (e) => {
            this.settings.timezone = e.target.value;
            this.saveSettings();
        });
        document.getElementById('dateFormatSelect').addEventListener('change', (e) => {
            this.settings.dateFormat = e.target.value;
            this.saveSettings();
        });
        const toggles = [
            'autoSave', 'animations', 'compactSidebar', 'showBreadcrumb',
            'emailNewTasks', 'emailDeadlines', 'emailWeeklyReport',
            'browserNotifications', 'notificationSound', 'rememberLogin',
            'confirmDelete', 'activityLogging', 'autoBackup'
        ];

        toggles.forEach(toggle => {
            const element = document.getElementById(toggle);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.settings[toggle] = e.target.checked;
                    this.saveSettings();
                    if (toggle === 'browserNotifications' && e.target.checked) {
                        this.requestNotificationPermission();
                    }
                });
            }
        });
        document.getElementById('autoLogoutSelect').addEventListener('change', (e) => {
            this.settings.autoLogout = e.target.value;
            this.saveSettings();
        });
        document.getElementById('backupFrequency').addEventListener('change', (e) => {
            this.settings.backupFrequency = e.target.value;
            this.saveSettings();
        });
        document.getElementById('importFileInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                document.getElementById('importBtn').disabled = false;
            }
        });
    }

    setupThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                this.settings.theme = theme;
                this.saveSettings();
            });
        });
    }

    setupColorOptions() {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                this.setPrimaryColor(color);
                colorOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                this.settings.primaryColor = color;
                this.saveSettings();
            });
        });
    }

    setupIntegrations() {
        const integrations = JSON.parse(localStorage.getItem('workflowIntegrations') || '{}');
        Object.keys(integrations).forEach(service => {
            if (integrations[service].connected) {
                this.updateIntegrationStatus(service, true);
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    }

    setPrimaryColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
    }

    applySettings() {
        document.getElementById('languageSelect').value = this.settings.language;
        document.getElementById('timezoneSelect').value = this.settings.timezone;
        document.getElementById('dateFormatSelect').value = this.settings.dateFormat;
        document.getElementById('autoLogoutSelect').value = this.settings.autoLogout;
        document.getElementById('backupFrequency').value = this.settings.backupFrequency;
        const toggles = [
            'autoSave', 'animations', 'compactSidebar', 'showBreadcrumb',
            'emailNewTasks', 'emailDeadlines', 'emailWeeklyReport',
            'browserNotifications', 'notificationSound', 'rememberLogin',
            'confirmDelete', 'activityLogging', 'autoBackup'
        ];

        toggles.forEach(toggle => {
            const element = document.getElementById(toggle);
            if (element) {
                element.checked = this.settings[toggle];
            }
        });
        this.setTheme(this.settings.theme);
        document.querySelector(`[data-theme="${this.settings.theme}"]`).classList.add('active');
        this.setPrimaryColor(this.settings.primaryColor);
        document.querySelector(`[data-color="${this.settings.primaryColor}"]`).classList.add('active');
    }

    loadUserInfo() {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        if (user.firstName && user.lastName) {
            const fullName = `${user.firstName} ${user.lastName}`;
            document.getElementById('sidebarUserName').textContent = fullName;
        }
        
        if (user.role) {
            document.getElementById('sidebarUserRole').textContent = user.role;
        }
        
        if (user.avatar) {
            document.getElementById('sidebarAvatar').src = user.avatar;
            document.getElementById('headerAvatar').src = user.avatar;
        }
    }

    requestNotificationPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    document.getElementById('browserNotifications').checked = false;
                    this.settings.browserNotifications = false;
                    this.saveSettings();
                    this.showNotification('Quyền thông báo bị từ chối', 'error');
                }
            });
        }
    }

    updateIntegrationStatus(service, connected) {
        const integrationItem = document.querySelector(`[onclick="connectIntegration('${service}')"]`);
        if (integrationItem) {
            if (connected) {
                integrationItem.textContent = 'Đã kết nối';
                integrationItem.classList.remove('btn-secondary');
                integrationItem.classList.add('btn-success');
                integrationItem.onclick = () => this.disconnectIntegration(service);
            } else {
                integrationItem.textContent = 'Kết nối';
                integrationItem.classList.remove('btn-success');
                integrationItem.classList.add('btn-secondary');
                integrationItem.onclick = () => this.connectIntegration(service);
            }
        }
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
function showSettingsSection(sectionId) {
    document.querySelectorAll('.settings-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionId}-section`).classList.add('active');
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.closest('.settings-nav-item').classList.add('active');
}
function connectIntegration(service) {
    const button = event.target;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang kết nối...';
    
    setTimeout(() => {
        const integrations = JSON.parse(localStorage.getItem('workflowIntegrations') || '{}');
        integrations[service] = {
            connected: true,
            connectedAt: new Date().toISOString()
        };
        localStorage.setItem('workflowIntegrations', JSON.stringify(integrations));
        settingsManager.updateIntegrationStatus(service, true);
        button.disabled = false;
        
        settingsManager.showNotification(`Đã kết nối thành công với ${service}!`, 'success');
    }, 2000);
}

function disconnectIntegration(service) {
    if (confirm('Bạn có chắc chắn muốn ngắt kết nối?')) {
        const integrations = JSON.parse(localStorage.getItem('workflowIntegrations') || '{}');
        delete integrations[service];
        localStorage.setItem('workflowIntegrations', JSON.stringify(integrations));
        settingsManager.updateIntegrationStatus(service, false);
        
        settingsManager.showNotification(`Đã ngắt kết nối với ${service}`, 'info');
    }
}
function exportData() {
    const data = {
        plans: JSON.parse(localStorage.getItem('workflowPlans') || '[]'),
        diaryEntries: JSON.parse(localStorage.getItem('workflowDiary') || '[]'),
        teamMembers: JSON.parse(localStorage.getItem('workflowTeam') || '[]'),
        settings: JSON.parse(localStorage.getItem('workflowSettings') || '{}'),
        user: JSON.parse(localStorage.getItem('currentUser') || '{}'),
        integrations: JSON.parse(localStorage.getItem('workflowIntegrations') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    settingsManager.showNotification('Dữ liệu đã được xuất thành công!', 'success');
}

function importData() {
    document.getElementById('importModal').classList.add('active');
}

function closeImportModal() {
    document.getElementById('importModal').classList.remove('active');
    document.getElementById('importFileInput').value = '';
    document.getElementById('importBtn').disabled = true;
}

function processImport() {
    const fileInput = document.getElementById('importFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        settingsManager.showNotification('Vui lòng chọn file để nhập', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.exportDate) {
                throw new Error('File không hợp lệ');
            }
            if (data.plans) localStorage.setItem('workflowPlans', JSON.stringify(data.plans));
            if (data.diaryEntries) localStorage.setItem('workflowDiary', JSON.stringify(data.diaryEntries));
            if (data.teamMembers) localStorage.setItem('workflowTeam', JSON.stringify(data.teamMembers));
            if (data.settings) localStorage.setItem('workflowSettings', JSON.stringify(data.settings));
            if (data.user) localStorage.setItem('currentUser', JSON.stringify(data.user));
            if (data.integrations) localStorage.setItem('workflowIntegrations', JSON.stringify(data.integrations));
            
            closeImportModal();
            settingsManager.showNotification('Dữ liệu đã được nhập thành công! Trang sẽ được tải lại.', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            settingsManager.showNotification('Lỗi khi nhập dữ liệu: ' + error.message, 'error');
        }
    };
    
    reader.readAsText(file);
}

function clearAllData() {
    const confirmation = prompt('Để xác nhận xóa toàn bộ dữ liệu, vui lòng nhập "XOA TAT CA":');
    
    if (confirmation === 'XOA TAT CA') {
        const keysToRemove = [
            'workflowPlans',
            'workflowDiary', 
            'workflowTeam',
            'workflowSettings',
            'workflowIntegrations'
        ];
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        settingsManager.showNotification('Toàn bộ dữ liệu đã được xóa! Trang sẽ được tải lại.', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    } else if (confirmation !== null) {
        settingsManager.showNotification('Xác nhận không chính xác', 'error');
    }
}
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}
let settingsManager;
document.addEventListener('DOMContentLoaded', () => {
    settingsManager = new SettingsManager();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
});