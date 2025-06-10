class TeamManager {
    constructor() {
        this.members = this.loadMembers();
        this.departments = this.loadDepartments();
        this.roles = this.loadRoles();
        this.permissions = this.loadPermissions();
        this.currentView = 'grid';
        this.currentTab = 'members';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserInfo();
        this.updateOverview();
        this.renderMembers();
        this.renderDepartments();
        this.renderRoles();
        this.renderPermissions();
        this.setupFilters();
    }

    loadMembers() {
        const defaultMembers = [
            {
                id: 1,
                firstName: 'Nguyễn',
                lastName: 'Văn An',
                email: 'nguyen.van.an@company.com',
                phone: '0123456789',
                department: 'IT',
                role: 'Manager',
                status: 'active',
                startDate: '2023-01-15',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                notes: 'Trưởng phòng IT với 5 năm kinh nghiệm',
                projects: ['Dự án A', 'Dự án B'],
                skills: ['JavaScript', 'Python', 'Management'],
                lastActive: '2024-12-15T10:30:00'
            },
            {
                id: 2,
                firstName: 'Trần',
                lastName: 'Thị Bình',
                email: 'tran.thi.binh@company.com',
                phone: '0987654321',
                department: 'HR',
                role: 'Manager',
                status: 'active',
                startDate: '2023-03-20',
                avatar: 'assets/icon/avatar.jpg',
                notes: 'Chuyên viên nhân sự cao cấp',
                projects: ['Tuyển dụng Q4'],
                skills: ['HR Management', 'Recruitment', 'Training'],
                lastActive: '2024-12-15T09:15:00'
            },
            {
                id: 3,
                firstName: 'Lê',
                lastName: 'Minh Cường',
                email: 'le.minh.cuong@company.com',
                phone: '0369852147',
                department: 'IT',
                role: 'Developer',
                status: 'active',
                startDate: '2023-06-10',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                notes: 'Lập trình viên Frontend',
                projects: ['Dự án A', 'Dự án C'],
                skills: ['React', 'Vue.js', 'CSS'],
                lastActive: '2024-12-15T11:45:00'
            }
        ];

        const saved = localStorage.getItem('workflowTeamMembers');
        return saved ? JSON.parse(saved) : defaultMembers;
    }

    loadDepartments() {
        const defaultDepartments = [
            {
                id: 1,
                name: 'Công nghệ thông tin',
                code: 'IT',
                manager: 'Nguyễn Văn An',
                memberCount: 8,
                description: 'Phòng ban phát triển và bảo trì hệ thống công nghệ',
                budget: 500000000,
                projects: ['Dự án A', 'Dự án B', 'Dự án C']
            },
            {
                id: 2,
                name: 'Nhân sự',
                code: 'HR',
                manager: 'Trần Thị Bình',
                memberCount: 4,
                description: 'Phòng ban quản lý nhân sự và tuyển dụng',
                budget: 200000000,
                projects: ['Tuyển dụng Q4', 'Đào tạo nhân viên']
            },
            {
                id: 3,
                name: 'Marketing',
                code: 'MKT',
                manager: null,
                memberCount: 6,
                description: 'Phòng ban marketing và truyền thông',
                budget: 300000000,
                projects: ['Chiến dịch Q1', 'Brand Awareness']
            }
        ];

        const saved = localStorage.getItem('workflowDepartments');
        return saved ? JSON.parse(saved) : defaultDepartments;
    }

    loadRoles() {
        const defaultRoles = [
            {
                id: 1,
                name: 'Manager',
                level: 3,
                description: 'Quản lý phòng ban và nhóm',
                permissions: ['read_plans', 'create_plans', 'edit_plans', 'delete_plans', 'manage_team', 'view_reports'],
                memberCount: 3
            },
            {
                id: 2,
                name: 'Developer',
                level: 2,
                description: 'Lập trình viên phát triển sản phẩm',
                permissions: ['read_plans', 'create_plans', 'edit_plans'],
                memberCount: 8
            },
            {
                id: 3,
                name: 'Designer',
                level: 2,
                description: 'Thiết kế giao diện và trải nghiệm người dùng',
                permissions: ['read_plans', 'create_plans', 'edit_plans'],
                memberCount: 4
            },
            {
                id: 4,
                name: 'Tester',
                level: 1,
                description: 'Kiểm thử chất lượng sản phẩm',
                permissions: ['read_plans', 'view_reports'],
                memberCount: 3
            }
        ];

        const saved = localStorage.getItem('workflowRoles');
        return saved ? JSON.parse(saved) : defaultRoles;
    }

    loadPermissions() {
        return {
            'read_plans': 'Xem kế hoạch',
            'create_plans': 'Tạo kế hoạch',
            'edit_plans': 'Chỉnh sửa kế hoạch',
            'delete_plans': 'Xóa kế hoạch',
            'manage_team': 'Quản lý nhóm',
            'view_reports': 'Xem báo cáo'
        };
    }

    saveMembers() {
        localStorage.setItem('workflowTeamMembers', JSON.stringify(this.members));
    }

    saveDepartments() {
        localStorage.setItem('workflowDepartments', JSON.stringify(this.departments));
    }

    saveRoles() {
        localStorage.setItem('workflowRoles', JSON.stringify(this.roles));
    }

    setupEventListeners() {
        document.getElementById('teamSearchInput').addEventListener('input', (e) => {
            this.searchMembers(e.target.value);
        });
        document.getElementById('departmentFilter').addEventListener('change', () => {
            this.applyFilters();
        });
        
        document.getElementById('roleFilter').addEventListener('change', () => {
            this.applyFilters();
        });
        
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.applyFilters();
        });
    }

    setupFilters() {
        const departmentFilter = document.getElementById('departmentFilter');
        this.departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.code;
            option.textContent = dept.name;
            departmentFilter.appendChild(option);
        });
        const roleFilter = document.getElementById('roleFilter');
        this.roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.name;
            option.textContent = role.name;
            roleFilter.appendChild(option);
        });
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

    updateOverview() {
        const totalMembers = this.members.length;
        const activeMembers = this.members.filter(m => m.status === 'active').length;
        const activeProjects = [...new Set(this.members.flatMap(m => m.projects || []))].length;
        const efficiency = Math.round((activeMembers / totalMembers) * 100) || 0;

        document.getElementById('totalMembers').textContent = totalMembers;
        document.getElementById('activeMembers').textContent = activeMembers;
        document.getElementById('activeProjects').textContent = activeProjects;
        document.getElementById('teamEfficiency').textContent = `${efficiency}%`;
    }

    renderMembers(membersToRender = this.members) {
        const container = document.getElementById('membersContainer');
        container.className = `members-container ${this.currentView}-view`;
        
        if (membersToRender.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>Không tìm thấy thành viên</h3>
                    <p>Không có thành viên nào phù hợp với tiêu chí tìm kiếm</p>
                </div>
            `;
            return;
        }

        if (this.currentView === 'grid') {
            container.innerHTML = membersToRender.map(member => `
                <div class="member-card" onclick="showMemberDetail(${member.id})">
                    <div class="member-avatar">
                        <img src="${member.avatar}" alt="${member.firstName} ${member.lastName}">
                        <div class="member-status ${member.status}"></div>
                    </div>
                    <div class="member-info">
                        <h4>${member.firstName} ${member.lastName}</h4>
                        <p class="member-role">${member.role}</p>
                        <p class="member-department">${this.getDepartmentName(member.department)}</p>
                        <div class="member-projects">
                            ${(member.projects || []).slice(0, 2).map(project => 
                                `<span class="project-tag">${project}</span>`
                            ).join('')}
                            ${(member.projects || []).length > 2 ? `<span class="project-more">+${(member.projects || []).length - 2}</span>` : ''}
                        </div>
                    </div>
                    <div class="member-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); editMember(${member.id})" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="event.stopPropagation(); deleteMember(${member.id})" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = `
                <div class="members-table">
                    <div class="table-header">
                        <div class="table-cell">Thành viên</div>
                        <div class="table-cell">Vai trò</div>
                        <div class="table-cell">Phòng ban</div>
                        <div class="table-cell">Trạng thái</div>
                        <div class="table-cell">Hoạt động cuối</div>
                        <div class="table-cell">Thao tác</div>
                    </div>
                    ${membersToRender.map(member => `
                        <div class="table-row" onclick="showMemberDetail(${member.id})">
                            <div class="table-cell">
                                <div class="member-info-inline">
                                    <img src="${member.avatar}" alt="${member.firstName} ${member.lastName}" class="member-avatar-small">
                                    <div>
                                        <div class="member-name">${member.firstName} ${member.lastName}</div>
                                        <div class="member-email">${member.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-cell">${member.role}</div>
                            <div class="table-cell">${this.getDepartmentName(member.department)}</div>
                            <div class="table-cell">
                                <span class="status-badge ${member.status}">${this.getStatusText(member.status)}</span>
                            </div>
                            <div class="table-cell">${this.formatLastActive(member.lastActive)}</div>
                            <div class="table-cell">
                                <div class="table-actions">
                                    <button class="action-btn" onclick="event.stopPropagation(); editMember(${member.id})" title="Chỉnh sửa">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="action-btn" onclick="event.stopPropagation(); deleteMember(${member.id})" title="Xóa">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    renderDepartments() {
        const container = document.getElementById('departmentsGrid');
        
        container.innerHTML = this.departments.map(dept => `
            <div class="department-card">
                <div class="department-header">
                    <div class="department-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="department-info">
                        <h4>${dept.name}</h4>
                        <p class="department-code">${dept.code}</p>
                    </div>
                    <div class="department-actions">
                        <button class="action-btn" onclick="editDepartment(${dept.id})" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="deleteDepartment(${dept.id})" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="department-stats">
                    <div class="stat-item">
                        <span class="stat-value">${dept.memberCount}</span>
                        <span class="stat-label">Thành viên</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${(dept.projects || []).length}</span>
                        <span class="stat-label">Dự án</span>
                    </div>
                </div>
                
                <div class="department-manager">
                    <strong>Trưởng phòng:</strong> ${dept.manager || 'Chưa có'}
                </div>
                
                <div class="department-description">
                    ${dept.description}
                </div>
                
                <div class="department-budget">
                    <strong>Ngân sách:</strong> ${this.formatCurrency(dept.budget)}
                </div>
            </div>
        `).join('');
    }

    renderRoles() {
        const container = document.getElementById('rolesList');
        
        container.innerHTML = this.roles.map(role => `
            <div class="role-item">
                <div class="role-header">
                    <div class="role-info">
                        <h4>${role.name}</h4>
                        <p class="role-description">${role.description}</p>
                    </div>
                    <div class="role-stats">
                        <span class="role-level">Cấp ${role.level}</span>
                        <span class="role-count">${role.memberCount} thành viên</span>
                    </div>
                    <div class="role-actions">
                        <button class="action-btn" onclick="editRole(${role.id})" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="deleteRole(${role.id})" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="role-permissions">
                    <strong>Quyền hạn:</strong>
                    <div class="permissions-list">
                        ${role.permissions.map(perm => 
                            `<span class="permission-tag">${this.permissions[perm]}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPermissions() {
        const container = document.getElementById('permissionsMatrix');
        
        const permissionKeys = Object.keys(this.permissions);
        
        container.innerHTML = `
            <div class="permissions-table">
                <div class="permissions-header">
                    <div class="permission-cell role-header">Vai trò</div>
                    ${permissionKeys.map(key => 
                        `<div class="permission-cell">${this.permissions[key]}</div>`
                    ).join('')}
                </div>
                
                ${this.roles.map(role => `
                    <div class="permissions-row">
                        <div class="permission-cell role-name">${role.name}</div>
                        ${permissionKeys.map(key => `
                            <div class="permission-cell">
                                <input type="checkbox" 
                                       ${role.permissions.includes(key) ? 'checked' : ''}
                                       onchange="updateRolePermission(${role.id}, '${key}', this.checked)">
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    }

    searchMembers(query) {
        if (!query.trim()) {
            this.renderMembers();
            return;
        }

        const filtered = this.members.filter(member => {
            const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
            const email = member.email.toLowerCase();
            const department = this.getDepartmentName(member.department).toLowerCase();
            const role = member.role.toLowerCase();
            
            return fullName.includes(query.toLowerCase()) ||
                   email.includes(query.toLowerCase()) ||
                   department.includes(query.toLowerCase()) ||
                   role.includes(query.toLowerCase());
        });

        this.renderMembers(filtered);
    }

    applyFilters() {
        const departmentFilter = document.getElementById('departmentFilter').value;
        const roleFilter = document.getElementById('roleFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        let filtered = this.members;

        if (departmentFilter) {
            filtered = filtered.filter(member => member.department === departmentFilter);
        }

        if (roleFilter) {
            filtered = filtered.filter(member => member.role === roleFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(member => member.status === statusFilter);
        }

        this.renderMembers(filtered);
    }

    getDepartmentName(code) {
        const dept = this.departments.find(d => d.code === code);
        return dept ? dept.name : code;
    }

    getStatusText(status) {
        const statusMap = {
            'active': 'Đang hoạt động',
            'inactive': 'Không hoạt động',
            'pending': 'Chờ xác nhận'
        };
        return statusMap[status] || status;
    }

    formatLastActive(dateString) {
        if (!dateString) return 'Chưa có';
        
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
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

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
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
function switchTeamTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    teamManager.currentTab = tabName;
}

function setMembersView(view) {
    teamManager.currentView = view;
    teamManager.renderMembers();
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}
function openAddMemberModal() {
    document.getElementById('addMemberModal').classList.add('active');
    document.getElementById('memberStartDate').value = new Date().toISOString().split('T')[0];
}

function closeAddMemberModal() {
    document.getElementById('addMemberModal').classList.remove('active');
    document.getElementById('addMemberForm').reset();
}

function openAddDepartmentModal() {
    const managerSelect = document.getElementById('departmentManager');
    managerSelect.innerHTML = '<option value="">Chọn trưởng phòng</option>';
    
    teamManager.members.forEach(member => {
        if (member.role === 'Manager') {
            const option = document.createElement('option');
            option.value = `${member.firstName} ${member.lastName}`;
            option.textContent = `${member.firstName} ${member.lastName}`;
            managerSelect.appendChild(option);
        }
    });
    
    document.getElementById('addDepartmentModal').classList.add('active');
}

function closeAddDepartmentModal() {
    document.getElementById('addDepartmentModal').classList.remove('active');
    document.getElementById('addDepartmentForm').reset();
}

function openAddRoleModal() {
    document.getElementById('addRoleModal').classList.add('active');
}

function closeAddRoleModal() {
    document.getElementById('addRoleModal').classList.remove('active');
    document.getElementById('addRoleForm').reset();
}

function showMemberDetail(memberId) {
    const member = teamManager.members.find(m => m.id === memberId);
    if (!member) return;
    
    const content = document.getElementById('memberDetailContent');
    content.innerHTML = `
        <div class="member-detail-header">
            <div class="member-detail-avatar">
                <img src="${member.avatar}" alt="${member.firstName} ${member.lastName}">
                <div class="member-status ${member.status}"></div>
            </div>
            <div class="member-detail-info">
                <h3>${member.firstName} ${member.lastName}</h3>
                <p class="member-detail-role">${member.role} - ${teamManager.getDepartmentName(member.department)}</p>
                <p class="member-detail-email">${member.email}</p>
                <p class="member-detail-phone">${member.phone}</p>
            </div>
        </div>
        
        <div class="member-detail-body">
            <div class="detail-section">
                <h4>Thông tin cơ bản</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Ngày bắt đầu:</span>
                        <span class="detail-value">${new Date(member.startDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Trạng thái:</span>
                        <span class="detail-value">
                            <span class="status-badge ${member.status}">${teamManager.getStatusText(member.status)}</span>
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Hoạt động cuối:</span>
                        <span class="detail-value">${teamManager.formatLastActive(member.lastActive)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Dự án tham gia</h4>
                <div class="projects-list">
                    ${(member.projects || []).map(project => 
                        `<span class="project-tag">${project}</span>`
                    ).join('')}
                    ${(member.projects || []).length === 0 ? '<p>Chưa tham gia dự án nào</p>' : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Kỹ năng</h4>
                <div class="skills-list">
                    ${(member.skills || []).map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                    ${(member.skills || []).length === 0 ? '<p>Chưa có thông tin kỹ năng</p>' : ''}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Ghi chú</h4>
                <p>${member.notes || 'Không có ghi chú'}</p>
            </div>
        </div>
    `;
    
    document.getElementById('memberDetailModal').classList.add('active');
}

function closeMemberDetailModal() {
    document.getElementById('memberDetailModal').classList.remove('active');
}
function addMember() {
    const form = document.getElementById('addMemberForm');
    const formData = new FormData(form);
    
    const newMember = {
        id: Date.now(),
        firstName: document.getElementById('memberFirstName').value,
        lastName: document.getElementById('memberLastName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        department: document.getElementById('memberDepartment').value,
        role: document.getElementById('memberRole').value,
        status: 'active',
        startDate: document.getElementById('memberStartDate').value,
        avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b612b786'}?w=100&h=100&fit=crop&crop=face`,
        notes: document.getElementById('memberNotes').value,
        projects: [],
        skills: [],
        lastActive: new Date().toISOString()
    };
    
    teamManager.members.push(newMember);
    teamManager.saveMembers();
    teamManager.updateOverview();
    teamManager.renderMembers();
    
    closeAddMemberModal();
    teamManager.showNotification('Thành viên mới đã được thêm thành công!', 'success');
}

function addDepartment() {
    const newDepartment = {
        id: Date.now(),
        name: document.getElementById('departmentName').value,
        code: document.getElementById('departmentCode').value,
        manager: document.getElementById('departmentManager').value,
        memberCount: 0,
        description: document.getElementById('departmentDescription').value,
        budget: 0,
        projects: []
    };
    
    teamManager.departments.push(newDepartment);
    teamManager.saveDepartments();
    teamManager.renderDepartments();
    
    closeAddDepartmentModal();
    teamManager.showNotification('Phòng ban mới đã được thêm thành công!', 'success');
}

function addRole() {
    const permissions = Array.from(document.querySelectorAll('#addRoleForm input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    const newRole = {
        id: Date.now(),
        name: document.getElementById('roleName').value,
        level: parseInt(document.getElementById('roleLevel').value),
        description: document.getElementById('roleDescription').value,
        permissions: permissions,
        memberCount: 0
    };
    
    teamManager.roles.push(newRole);
    teamManager.saveRoles();
    teamManager.renderRoles();
    teamManager.renderPermissions();
    
    closeAddRoleModal();
    teamManager.showNotification('Vai trò mới đã được thêm thành công!', 'success');
}

function editMember(memberId) {
    teamManager.showNotification('Chức năng chỉnh sửa thành viên đang được phát triển', 'info');
}

function deleteMember(memberId) {
    if (confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
        teamManager.members = teamManager.members.filter(m => m.id !== memberId);
        teamManager.saveMembers();
        teamManager.updateOverview();
        teamManager.renderMembers();
        teamManager.showNotification('Thành viên đã được xóa', 'success');
    }
}

function editDepartment(deptId) {
    teamManager.showNotification('Chức năng chỉnh sửa phòng ban đang được phát triển', 'info');
}

function deleteDepartment(deptId) {
    if (confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
        teamManager.departments = teamManager.departments.filter(d => d.id !== deptId);
        teamManager.saveDepartments();
        teamManager.renderDepartments();
        teamManager.showNotification('Phòng ban đã được xóa', 'success');
    }
}

function editRole(roleId) {
    teamManager.showNotification('Chức năng chỉnh sửa vai trò đang được phát triển', 'info');
}

function deleteRole(roleId) {
    if (confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
        teamManager.roles = teamManager.roles.filter(r => r.id !== roleId);
        teamManager.saveRoles();
        teamManager.renderRoles();
        teamManager.renderPermissions();
        teamManager.showNotification('Vai trò đã được xóa', 'success');
    }
}

function updateRolePermission(roleId, permission, hasPermission) {
    const role = teamManager.roles.find(r => r.id === roleId);
    if (!role) return;
    
    if (hasPermission) {
        if (!role.permissions.includes(permission)) {
            role.permissions.push(permission);
        }
    } else {
        role.permissions = role.permissions.filter(p => p !== permission);
    }
    
    teamManager.saveRoles();
    teamManager.showNotification('Quyền hạn đã được cập nhật', 'success');
}
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}
let teamManager;
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    teamManager = new TeamManager();
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