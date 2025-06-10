
const ProjectsModule = (function() {
    
    let projects = [];
    function formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    
    return {
      
      getProjects: function() {
        return projects;
      },
      
      getProjectById: function(id) {
        return projects.find(project => project.id === id);
      },
    
      addProject: function(projectData) {
        const project = {
          ...projectData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        
        projects.push(project);
        
     
        this.saveProjects();
        return project;
      },
      
    
      saveProjects: function() {
        localStorage.setItem('projects', JSON.stringify(projects));
      },
      
      
      loadProjects: function() {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) projects = JSON.parse(storedProjects);
      },
      
      
      generateSampleProjects: function() {
        projects = [
          {
            id: 1,
            name: 'Giám sát an toàn và xử lý chất thải công nghiệp',
            description: 'Dự án giám sát và xử lý chất thải công nghiệp tại các khu công nghiệp trên địa bàn tỉnh.',
            startDate: '2024-01-15',
            endDate: '2024-12-31',
            status: 'in-progress',
            progress: 85,
            budget: 1500000000,
            manager: 'Nguyễn Văn A',
            client: 'Sở Tài nguyên và Môi trường',
            members: [
              { id: 1, name: 'Nguyễn Văn A', role: 'Quản lý dự án' },
              { id: 2, name: 'Trần Thị B', role: 'Kỹ sư môi trường' },
              { id: 3, name: 'Lê Văn C', role: 'Kỹ thuật viên' }
            ],
            tasks: [
              { id: 1, title: 'Khảo sát hiện trạng', status: 'completed', assignee: 'Trần Thị B', deadline: '2024-02-20' },
              { id: 2, title: 'Lắp đặt thiết bị giám sát', status: 'completed', assignee: 'Lê Văn C', deadline: '2024-03-15' },
              { id: 3, title: 'Vận hành thử nghiệm', status: 'completed', assignee: 'Nguyễn Văn A', deadline: '2024-04-10' },
              { id: 4, title: 'Giám sát định kỳ', status: 'in-progress', assignee: 'Trần Thị B', deadline: '2024-12-15' }
            ],
            milestones: [
              { id: 1, title: 'Hoàn thành khảo sát', date: '2024-02-20', status: 'completed' },
              { id: 2, title: 'Hoàn thành lắp đặt', date: '2024-03-15', status: 'completed' },
              { id: 3, title: 'Bắt đầu vận hành chính thức', date: '2024-04-15', status: 'completed' },
              { id: 4, title: 'Đánh giá giữa kỳ', date: '2024-06-30', status: 'in-progress' },
              { id: 5, title: 'Hoàn thành dự án', date: '2024-12-31', status: 'not-started' }
            ],
            risks: [
              { id: 1, title: 'Thiết bị hỏng hóc', impact: 'high', probability: 'medium', mitigation: 'Chuẩn bị thiết bị dự phòng' },
              { id: 2, title: 'Thay đổi quy định pháp luật', impact: 'medium', probability: 'low', mitigation: 'Theo dõi cập nhật quy định mới' }
            ],
            documents: [
              { id: 1, title: 'Báo cáo khảo sát', type: 'report', url: '#' },
              { id: 2, title: 'Hợp đồng dự án', type: 'contract', url: '#' }
            ]
          },
          {
            id: 2,
            name: 'Dự án ABC',
            description: 'Dự án xây dựng hệ thống xử lý nước thải cho khu công nghiệp ABC.',
            startDate: '2024-03-01',
            endDate: '2024-09-30',
            status: 'in-progress',
            progress: 60,
            budget: 800000000,
            manager: 'Trần Thị B',
            client: 'Công ty ABC',
            members: [
              { id: 2, name: 'Trần Thị B', role: 'Quản lý dự án' },
              { id: 4, name: 'Phạm Văn D', role: 'Kỹ sư thiết kế' },
              { id: 5, name: 'Hoàng Thị E', role: 'Chuyên viên pháp lý' }
            ],
            tasks: [
              { id: 5, title: 'Thiết kế hệ thống', status: 'completed', assignee: 'Phạm Văn D', deadline: '2024-04-15' },
              { id: 6, title: 'Xin giấy phép', status: 'completed', assignee: 'Hoàng Thị E', deadline: '2024-05-10' },
              { id: 7, title: 'Thi công xây dựng', status: 'in-progress', assignee: 'Trần Thị B', deadline: '2024-08-25' }
            ],
            milestones: [
              { id: 6, title: 'Hoàn thành thiết kế', date: '2024-04-15', status: 'completed' },
              { id: 7, title: 'Nhận giấy phép', date: '2024-05-10', status: 'completed' },
              { id: 8, title: 'Hoàn thành xây dựng', date: '2024-08-25', status: 'not-started' },
              { id: 9, title: 'Nghiệm thu dự án', date: '2024-09-30', status: 'not-started' }
            ],
            risks: [
              { id: 3, title: 'Chậm tiến độ thi công', impact: 'high', probability: 'medium', mitigation: 'Tăng cường giám sát' },
              { id: 4, title: 'Vượt ngân sách', impact: 'medium', probability: 'medium', mitigation: 'Kiểm soát chi phí chặt chẽ' }
            ],
            documents: [
              { id: 3, title: 'Bản vẽ thiết kế', type: 'design', url: '#' },
              { id: 4, title: 'Giấy phép xây dựng', type: 'permit', url: '#' }
            ]
          },
          {
            id: 3,
            name: 'Dự án XYZ',
            description: 'Dự án đánh giá tác động môi trường cho nhà máy XYZ.',
            startDate: '2024-05-01',
            endDate: '2024-08-31',
            status: 'in-progress',
            progress: 30,
            budget: 500000000,
            manager: 'Lê Văn C',
            client: 'Công ty XYZ',
            members: [
              { id: 3, name: 'Lê Văn C', role: 'Quản lý dự án' },
              { id: 6, name: 'Ngô Thị F', role: 'Chuyên viên đánh giá' },
              { id: 7, name: 'Đỗ Văn G', role: 'Kỹ thuật viên' }
            ],
            tasks: [
              { id: 8, title: 'Thu thập số liệu', status: 'completed', assignee: 'Ngô Thị F', deadline: '2024-05-20' },
              { id: 9, title: 'Phân tích mẫu', status: 'in-progress', assignee: 'Đỗ Văn G', deadline: '2024-06-15' },
              { id: 10, title: 'Lập báo cáo ĐTM', status: 'not-started', assignee: 'Lê Văn C', deadline: '2024-07-30' }
            ],
            milestones: [
              { id: 10, title: 'Hoàn thành thu thập số liệu', date: '2024-05-20', status: 'completed' },
              { id: 11, title: 'Hoàn thành phân tích', date: '2024-06-15', status: 'in-progress' },
              { id: 12, title: 'Nộp báo cáo ĐTM', date: '2024-07-30', status: 'not-started' },
              { id: 13, title: 'Phê duyệt báo cáo', date: '2024-08-31', status: 'not-started' }
            ],
            risks: [
              { id: 5, title: 'Dữ liệu không đầy đủ', impact: 'high', probability: 'low', mitigation: 'Thu thập bổ sung' },
              { id: 6, title: 'Chậm phê duyệt', impact: 'medium', probability: 'high', mitigation: 'Làm việc sớm với cơ quan chức năng' }
            ],
            documents: [
              { id: 5, title: 'Kết quả phân tích mẫu', type: 'report', url: '#' },
              { id: 6, title: 'Đề cương báo cáo ĐTM', type: 'document', url: '#' }
            ]
          }
        ];
        
        this.saveProjects();
      },
      
      // Cập nhật dự án
      updateProject: function(id, updatedData) {
        const index = projects.findIndex(project => project.id === id);
        
        if (index !== -1) {
          // Cập nhật thông tin dự án
          projects[index] = {
            ...projects[index],
            ...updatedData,
            updatedAt: new Date().toISOString()
          };
          
          // Lưu vào localStorage
          this.saveProjects();
          
          return {
            success: true,
            project: projects[index],
            message: 'Cập nhật dự án thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Xóa dự án
      deleteProject: function(id) {
        const index = projects.findIndex(project => project.id === id);
        
        if (index !== -1) {
          projects.splice(index, 1);
          
          // Lưu vào localStorage
          this.saveProjects();
          
          return {
            success: true,
            message: 'Xóa dự án thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Tìm kiếm dự án
      searchProjects: function(query) {
        if (!query) return projects;
        
        query = query.toLowerCase();
        return projects.filter(project => 
          project.name.toLowerCase().includes(query) || 
          project.description.toLowerCase().includes(query) ||
          project.manager.toLowerCase().includes(query) ||
          project.client.toLowerCase().includes(query)
        );
      },
      
      // Lọc dự án theo trạng thái
      filterProjectsByStatus: function(status) {
        if (!status || status === 'all') return projects;
        
        return projects.filter(project => project.status === status);
      },
      
      // Thêm công việc vào dự án
      addTask: function(projectId, taskData) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const task = {
            id: Date.now(),
            ...taskData
          };
          
          project.tasks.push(task);
          
          // Cập nhật tiến độ
          this.updateProgress(projectId);
          
          // Lưu vào localStorage
          this.saveProjects();
          
          return {
            success: true,
            task,
            message: 'Thêm công việc thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Cập nhật công việc
      updateTask: function(projectId, taskId, updatedData) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const taskIndex = project.tasks.findIndex(t => t.id === taskId);
          
          if (taskIndex !== -1) {
            // Cập nhật thông tin công việc
            project.tasks[taskIndex] = {
              ...project.tasks[taskIndex],
              ...updatedData
            };
            
            // Cập nhật tiến độ
            this.updateProgress(projectId);
            
            // Lưu vào localStorage
            this.saveProjects();
            
            return {
              success: true,
              task: project.tasks[taskIndex],
              message: 'Cập nhật công việc thành công'
            };
          }
          
          return {
            success: false,
            message: 'Không tìm thấy công việc'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Xóa công việc
      deleteTask: function(projectId, taskId) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const taskIndex = project.tasks.findIndex(t => t.id === taskId);
          
          if (taskIndex !== -1) {
            project.tasks.splice(taskIndex, 1);
            
            // Cập nhật tiến độ
            this.updateProgress(projectId);
            
            // Lưu vào localStorage
            this.saveProjects();
            
            return {
              success: true,
              message: 'Xóa công việc thành công'
            };
          }
          
          return {
            success: false,
            message: 'Không tìm thấy công việc'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Thêm cột mốc vào dự án
      addMilestone: function(projectId, milestoneData) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const milestone = {
            id: Date.now(),
            ...milestoneData
          };
          
          project.milestones.push(milestone);
          
          // Lưu vào localStorage
          this.saveProjects();
          
          return {
            success: true,
            milestone,
            message: 'Thêm cột mốc thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Cập nhật cột mốc
      updateMilestone: function(projectId, milestoneId, updatedData) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId);
          
          if (milestoneIndex !== -1) {
            // Cập nhật thông tin cột mốc
            project.milestones[milestoneIndex] = {
              ...project.milestones[milestoneIndex],
              ...updatedData
            };
            
            // Lưu vào localStorage
            this.saveProjects();
            
            return {
              success: true,
              milestone: project.milestones[milestoneIndex],
              message: 'Cập nhật cột mốc thành công'
            };
          }
          
          return {
            success: false,
            message: 'Không tìm thấy cột mốc'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Xóa cột mốc
      deleteMilestone: function(projectId, milestoneId) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId);
          
          if (milestoneIndex !== -1) {
            project.milestones.splice(milestoneIndex, 1);
            
            // Lưu vào localStorage
            this.saveProjects();
            
            return {
              success: true,
              message: 'Xóa cột mốc thành công'
            };
          }
          
          return {
            success: false,
            message: 'Không tìm thấy cột mốc'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Thêm thành viên vào dự án
      addMember: function(projectId, memberData) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const member = {
            id: Date.now(),
            ...memberData
          };
          
          project.members.push(member);
          
          // Lưu vào localStorage
          this.saveProjects();
          
          return {
            success: true,
            member,
            message: 'Thêm thành viên thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Xóa thành viên
      deleteMember: function(projectId, memberId) {
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
          const memberIndex = project.members.findIndex(m => m.id === memberId);
          
          if (memberIndex !== -1) {
            project.members.splice(memberIndex, 1);
            
            // Lưu vào localStorage
            this.saveProjects();
            
            return {
              success: true,
              message: 'Xóa thành viên thành công'
            };
          }
          
          return {
            success: false,
            message: 'Không tìm thấy thành viên'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy dự án'
        };
      },
      
      // Cập nhật tiến độ dự án
      updateProgress: function(projectId) {
        const project = projects.find(p => p.id === projectId);
        
        if (project && project.tasks.length > 0) {
          const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
          project.progress = Math.round((completedTasks / project.tasks.length) * 100);
          
          // Cập nhật trạng thái
          if (project.progress === 100) {
            project.status = 'completed';
          } else if (project.progress === 0) {
            project.status = 'not-started';
          } else {
            project.status = 'in-progress';
          }
          
          // Lưu vào localStorage
          this.saveProjects();
        }
      },
      
      // Lấy thống kê dự án
      getProjectStats: function() {
        const totalProjects = projects.length;
        const completedProjects = projects.filter(p => p.status === 'completed').length;
        const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
        const notStartedProjects = projects.filter(p => p.status === 'not-started').length;
        
        // Tính tổng ngân sách
        const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
        
        return {
          total: totalProjects,
          completed: completedProjects,
          inProgress: inProgressProjects,
          notStarted: notStartedProjects,
          totalBudget: totalBudget
        };
      }
    };
  })();
  
  // UI Module cho quản lý dự án
  const ProjectsUI = (function() {
    // Private variables
    let currentProjectId = null;
    let currentTaskId = null;
    let currentMilestoneId = null;
    let currentMemberId = null;
    
    // Public API
    return {
      // Khởi tạo trang dự án
      init: function() {
        // Tải dự án từ localStorage
        ProjectsModule.loadProjects();
        
        // Nếu không có dự án, tạo dữ liệu mẫu
        if (ProjectsModule.getProjects().length === 0) {
          ProjectsModule.generateSampleProjects();
        }
        
        // Render danh sách dự án
        this.renderProjects();
        
        // Khởi tạo sự kiện
        this.initEvents();
      },
      
      // Khởi tạo sự kiện
      initEvents: function() {
        // Sự kiện tìm kiếm
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
          searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            const filteredProjects = ProjectsModule.searchProjects(query);
            ProjectsUI.renderProjectsList(filteredProjects);
          });
        }
        
        // Sự kiện lọc theo trạng thái
        const statusFilter = document.getElementById('project-status-filter');
        if (statusFilter) {
          statusFilter.addEventListener('change', function() {
            const status = this.value;
            const filteredProjects = ProjectsModule.filterProjectsByStatus(status);
            ProjectsUI.renderProjectsList(filteredProjects);
          });
        }
        
        // Sự kiện nút tạo dự án mới
        const createBtn = document.getElementById('btn-create-project');
        if (createBtn) {
          createBtn.addEventListener('click', function() {
            ProjectsUI.showProjectForm();
          });
        }
        
        // Sự kiện submit form dự án
        const projectForm = document.getElementById('project-form');
        if (projectForm) {
          projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            ProjectsUI.saveProject();
          });
        }
        
        // Sự kiện submit form công việc
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
          taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            ProjectsUI.saveTask();
          });
        }
        
        // Sự kiện submit form cột mốc
        const milestoneForm = document.getElementById('milestone-form');
        if (milestoneForm) {
          milestoneForm.addEventListener('submit', function(e) {
            e.preventDefault();
            ProjectsUI.saveMilestone();
          });
        }
        
        // Sự kiện submit form thành viên
        const memberForm = document.getElementById('member-form');
        if (memberForm) {
          memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            ProjectsUI.saveMember();
          });
        }
      },
      
      // Render danh sách dự án
      renderProjects: function() {
        const projects = ProjectsModule.getProjects();
        this.renderProjectsList(projects);
        this.renderProjectStats();
      },
      
      // Render thống kê dự án
      renderProjectStats: function() {
        const stats = ProjectsModule.getProjectStats();
        const statsContainer = document.getElementById('project-stats');
        
        if (statsContainer) {
          statsContainer.innerHTML = `
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-folder"></i>
              </div>
              <div class="stat-info">
                <span class="stat-number">${stats.total}</span>
                <span class="stat-label">Tổng dự án</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-spinner"></i>
              </div>
              <div class="stat-info">
                <span class="stat-number">${stats.inProgress}</span>
                <span class="stat-label">Đang thực hiện</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-info">
                <span class="stat-number">${stats.completed}</span>
                <span class="stat-label">Hoàn thành</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="stat-info">
                <span class="stat-number">${stats.totalBudget.toLocaleString('vi-VN')}</span>
                <span class="stat-label">Tổng ngân sách (VNĐ)</span>
              </div>
            </div>
          `;
        }
      },
      
      // Render danh sách dự án vào container
      renderProjectsList: function(projects) {
        const container = document.getElementById('projects-container');
        if (!container) return;
        
        if (projects.length === 0) {
          container.innerHTML = '<div class="empty-state">Không có dự án nào</div>';
          return;
        }
        
        let html = '';
        projects.forEach(project => {
          html += `
            <div class="project-card" data-id="${project.id}">
              <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                <div class="project-actions">
                  <button class="btn-edit" onclick="ProjectsUI.editProject(${project.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn-delete" onclick="ProjectsUI.deleteProject(${project.id})"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div class="project-meta">
                <span class="project-date"><i class="fas fa-calendar"></i> ${formatDate(project.startDate)} - ${formatDate(project.endDate)}</span>
                <span class="project-status ${project.status}"><i class="fas fa-info-circle"></i> ${this.getStatusText(project.status)}</span>
              </div>
              <div class="project-progress">
            <div class="progress-bar">
            <div class="progress" style="width: ${project.progress}%"></div>
            </div>
            <span>${project.progress}%</span>
            </div>
              <p class="project-description">${project.description}</p>
              <div class="project-footer">
                <div class="project-manager">
                  <i class="fas fa-user"></i> ${project.manager}
                </div>
                <div class="project-client">
                  <i class="fas fa-building"></i> ${project.client}
                </div>
                <div class="project-budget">
                  <i class="fas fa-money-bill-wave"></i> ${project.budget ? project.budget.toLocaleString('vi-VN') + ' VNĐ' : 'Chưa có'}
                </div>
              </div>
              <div class="project-actions-footer">
                <button class="btn-view-tasks" onclick="ProjectsUI.viewTasks(${project.id})">
                  <i class="fas fa-tasks"></i> Công việc (${project.tasks.length})
                </button>
                <button class="btn-view-milestones" onclick="ProjectsUI.viewMilestones(${project.id})">
                  <i class="fas fa-flag"></i> Cột mốc (${project.milestones.length})
                </button>
                <button class="btn-view-members" onclick="ProjectsUI.viewMembers(${project.id})">
                  <i class="fas fa-users"></i> Thành viên (${project.members.length})
                </button>
              </div>
            </div>
          `;
        });
        
        container.innerHTML = html;
      },
      
      // Lấy text hiển thị cho trạng thái
      getStatusText: function(status) {
        const statusMap = {
          'not-started': 'Chưa bắt đầu',
          'in-progress': 'Đang thực hiện',
          'completed': 'Hoàn thành',
          'overdue': 'Quá hạn'
        };
        
        return statusMap[status] || status;
      },
      
      // Hiển thị form tạo/chỉnh sửa dự án
      showProjectForm: function(projectId) {
        currentProjectId = projectId;
        
        // Hiển thị modal
        const modal = document.getElementById('project-modal');
        if (modal) {
          modal.style.display = 'flex';
        }
        
        // Nếu là chỉnh sửa, điền thông tin vào form
        if (projectId) {
          const project = ProjectsModule.getProjectById(projectId);
          
          if (project) {
            document.getElementById('project-name').value = project.name;
            document.getElementById('project-description').value = project.description;
            document.getElementById('project-start-date').value = project.startDate;
            document.getElementById('project-end-date').value = project.endDate;
            document.getElementById('project-status').value = project.status;
            document.getElementById('project-budget').value = project.budget;
            document.getElementById('project-manager').value = project.manager;
            document.getElementById('project-client').value = project.client;
          }
        } else {
          // Reset form nếu là tạo mới
          document.getElementById('project-form').reset();
        }
      },
      
      // Lưu dự án
      saveProject: function() {
        const projectData = {
          name: document.getElementById('project-name').value,
          description: document.getElementById('project-description').value,
          startDate: document.getElementById('project-start-date').value,
          endDate: document.getElementById('project-end-date').value,
          status: document.getElementById('project-status').value,
          budget: parseFloat(document.getElementById('project-budget').value) || 0,
          manager: document.getElementById('project-manager').value,
          client: document.getElementById('project-client').value
        };
        
        if (currentProjectId) {
          // Cập nhật dự án
          ProjectsModule.updateProject(currentProjectId, projectData);
        } else {
          // Thêm dự án mới
          projectData.progress = 0;
          projectData.members = [];
          projectData.tasks = [];
          projectData.milestones = [];
          projectData.risks = [];
          projectData.documents = [];
          ProjectsModule.addProject(projectData);
        }
        
        // Đóng modal
        const modal = document.getElementById('project-modal');
        if (modal) {
          modal.style.display = 'none';
        }
        
        // Render lại danh sách
        this.renderProjects();
      },
      
      // Xóa dự án
      deleteProject: function(projectId) {
        if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
          ProjectsModule.deleteProject(projectId);
          this.renderProjects();
        }
      },
      
      // Chỉnh sửa dự án
      editProject: function(projectId) {
        this.showProjectForm(projectId);
      },
      
      // Xem danh sách công việc
      viewTasks: function(projectId) {
        currentProjectId = projectId;
        const project = ProjectsModule.getProjectById(projectId);
        
        if (!project) return;
        
        // Hiển thị modal
        const modal = document.getElementById('tasks-modal');
        if (modal) {
          modal.style.display = 'flex';
          
          // Cập nhật tiêu đề
          const modalTitle = modal.querySelector('.modal-title');
          if (modalTitle) {
            modalTitle.textContent = `Công việc - ${project.name}`;
          }
          
          // Render danh sách công việc
          const tasksContainer = document.getElementById('tasks-container');
          if (tasksContainer) {
            if (project.tasks.length === 0) {
              tasksContainer.innerHTML = '<div class="empty-state">Không có công việc nào</div>';
            } else {
              let html = '<div class="tasks-list">';
              project.tasks.forEach(task => {
                html += `
                  <div class="task-item ${task.status}">
                    <div class="task-header">
                      <h4 class="task-title">${task.title}</h4>
                      <div class="task-actions">
                        <button class="btn-edit" onclick="ProjectsUI.editTask(${project.id}, ${task.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="ProjectsUI.deleteTask(${project.id}, ${task.id})"><i class="fas fa-trash"></i></button>
                      </div>
                    </div>
                    <div class="task-meta">
                      <span class="task-assignee"><i class="fas fa-user"></i> ${task.assignee}</span>
                      <span class="task-deadline"><i class="fas fa-clock"></i> ${formatDate(task.deadline)}</span>
                      <span class="task-status ${task.status}"><i class="fas fa-info-circle"></i> ${this.getStatusText(task.status)}</span>
                    </div>
                  </div>
                `;
              });
              html += '</div>';
              tasksContainer.innerHTML = html;
            }
          }
          
          // Hiển thị nút thêm công việc
          const addTaskBtn = document.getElementById('btn-add-task');
          if (addTaskBtn) {
            addTaskBtn.onclick = function() {
              ProjectsUI.showTaskForm(projectId);
            };
          }
        }
      },
      
      // Hiển thị form tạo/chỉnh sửa công việc
      showTaskForm: function(projectId, taskId) {
        currentProjectId = projectId;
        currentTaskId = taskId;
        
        // Hiển thị modal
        const modal = document.getElementById('task-modal');
        if (modal) {
          modal.style.display = 'flex';
        }
        
        // Nếu là chỉnh sửa, điền thông tin vào form
        if (projectId && taskId) {
          const project = ProjectsModule.getProjectById(projectId);
          
          if (project) {
            const task = project.tasks.find(t => t.id === taskId);
            
            if (task) {
              document.getElementById('task-title').value = task.title;
              document.getElementById('task-status').value = task.status;
              document.getElementById('task-assignee').value = task.assignee;
              document.getElementById('task-deadline').value = task.deadline;
            }
          }
        } else {
          // Reset form nếu là tạo mới
          document.getElementById('task-form').reset();
        }
      },
      
      // Lưu công việc
      saveTask: function() {
        const taskData = {
          title: document.getElementById('task-title').value,
          status: document.getElementById('task-status').value,
          assignee: document.getElementById('task-assignee').value,
          deadline: document.getElementById('task-deadline').value
        };
        
        if (currentTaskId) {
          // Cập nhật công việc
          ProjectsModule.updateTask(currentProjectId, currentTaskId, taskData);
        } else {
          // Thêm công việc mới
          ProjectsModule.addTask(currentProjectId, taskData);
        }
        
        // Đóng modal
        const modal = document.getElementById('task-modal');
        if (modal) {
          modal.style.display = 'none';
        }
        
        // Cập nhật lại danh sách công việc
        this.viewTasks(currentProjectId);
        
        // Render lại danh sách dự án
        this.renderProjects();
      },
      
      // Xóa công việc
      deleteTask: function(projectId, taskId) {
        if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
          ProjectsModule.deleteTask(projectId, taskId);
          
          // Cập nhật lại danh sách công việc
          this.viewTasks(projectId);
          
          // Render lại danh sách dự án
          this.renderProjects();
        }
      },
      
      // Chỉnh sửa công việc
      editTask: function(projectId, taskId) {
        this.showTaskForm(projectId, taskId);
      },
      
      // Xem danh sách cột mốc
      viewMilestones: function(projectId) {
        currentProjectId = projectId;
        const project = ProjectsModule.getProjectById(projectId);
        
        if (!project) return;
        
        // Hiển thị modal
        const modal = document.getElementById('milestones-modal');
        if (modal) {
          modal.style.display = 'flex';
          
          // Cập nhật tiêu đề
          const modalTitle = modal.querySelector('.modal-title');
          if (modalTitle) {
            modalTitle.textContent = `Cột mốc - ${project.name}`;
          }
          
          // Render danh sách cột mốc
          const milestonesContainer = document.getElementById('milestones-container');
          if (milestonesContainer) {
            if (project.milestones.length === 0) {
              milestonesContainer.innerHTML = '<div class="empty-state">Không có cột mốc nào</div>';
            } else {
              let html = '<div class="milestones-list">';
              
              // Sắp xếp cột mốc theo ngày
              const sortedMilestones = [...project.milestones].sort((a, b) => new Date(a.date) - new Date(b.date));
              
              sortedMilestones.forEach(milestone => {
                html += `
                  <div class="milestone-item ${milestone.status}">
                    <div class="milestone-header">
                      <h4 class="milestone-title">${milestone.title}</h4>
                      <div class="milestone-actions">
                        <button class="btn-edit" onclick="ProjectsUI.editMilestone(${project.id}, ${milestone.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="ProjectsUI.deleteMilestone(${project.id}, ${milestone.id})"><i class="fas fa-trash"></i></button>
                      </div>
                    </div>
                    <div class="milestone-meta">
                      <span class="milestone-date"><i class="fas fa-calendar"></i> ${formatDate(milestone.date)}</span>
                      <span class="milestone-status ${milestone.status}"><i class="fas fa-info-circle"></i> ${this.getStatusText(milestone.status)}</span>
                    </div>
                  </div>
                `;
              });
              html += '</div>';
              milestonesContainer.innerHTML = html;
            }
          }
          
          // Hiển thị nút thêm cột mốc
          const addMilestoneBtn = document.getElementById('btn-add-milestone');
          if (addMilestoneBtn) {
            addMilestoneBtn.onclick = function() {
              ProjectsUI.showMilestoneForm(projectId);
            };
          }
        }
      },
      
      // Hiển thị form tạo/chỉnh sửa cột mốc
      showMilestoneForm: function(projectId, milestoneId) {
        currentProjectId = projectId;
        currentMilestoneId = milestoneId;
        
        // Hiển thị modal
        const modal = document.getElementById('milestone-modal');
        if (modal) {
          modal.style.display = 'flex';
        }
        
        // Nếu là chỉnh sửa, điền thông tin vào form
        if (projectId && milestoneId) {
          const project = ProjectsModule.getProjectById(projectId);
          
          if (project) {
            const milestone = project.milestones.find(m => m.id === milestoneId);
            
            if (milestone) {
              document.getElementById('milestone-title').value = milestone.title;
              document.getElementById('milestone-date').value = milestone.date;
              document.getElementById('milestone-status').value = milestone.status;
            }
          }
        } else {
          // Reset form nếu là tạo mới
          document.getElementById('milestone-form').reset();
        }
      },
      
      // Lưu cột mốc
      saveMilestone: function() {
        const milestoneData = {
          title: document.getElementById('milestone-title').value,
          date: document.getElementById('milestone-date').value,
          status: document.getElementById('milestone-status').value
        };
        
        if (currentMilestoneId) {
          // Cập nhật cột mốc
          ProjectsModule.updateMilestone(currentProjectId, currentMilestoneId, milestoneData);
        } else {
          // Thêm cột mốc mới
          ProjectsModule.addMilestone(currentProjectId, milestoneData);
        }
        
        // Đóng modal
        const modal = document.getElementById('milestone-modal');
        if (modal) {
          modal.style.display = 'none';
        }
        
        // Cập nhật lại danh sách cột mốc
        this.viewMilestones(currentProjectId);
      },
      
      // Xóa cột mốc
      deleteMilestone: function(projectId, milestoneId) {
        if (confirm('Bạn có chắc chắn muốn xóa cột mốc này?')) {
          ProjectsModule.deleteMilestone(projectId, milestoneId);
          
          // Cập nhật lại danh sách cột mốc
          this.viewMilestones(projectId);
        }
      },
      
      // Chỉnh sửa cột mốc
      editMilestone: function(projectId, milestoneId) {
        this.showMilestoneForm(projectId, milestoneId);
      },
      
      // Xem danh sách thành viên
      viewMembers: function(projectId) {
        currentProjectId = projectId;
        const project = ProjectsModule.getProjectById(projectId);
        
        if (!project) return;
        
        // Hiển thị modal
        const modal = document.getElementById('members-modal');
        if (modal) {
          modal.style.display = 'flex';
          
          // Cập nhật tiêu đề
          const modalTitle = modal.querySelector('.modal-title');
          if (modalTitle) {
            modalTitle.textContent = `Thành viên - ${project.name}`;
          }
          
          // Render danh sách thành viên
          const membersContainer = document.getElementById('members-container');
          if (membersContainer) {
            if (project.members.length === 0) {
              membersContainer.innerHTML = '<div class="empty-state">Không có thành viên nào</div>';
            } else {
              let html = '<div class="members-list">';
              project.members.forEach(member => {
                html += `
                  <div class="member-item">
                    <div class="member-header">
                      <h4 class="member-name">${member.name}</h4>
                      <div class="member-actions">
                        <button class="btn-edit" onclick="ProjectsUI.editMember(${project.id}, ${member.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-delete" onclick="ProjectsUI.deleteMember(${project.id}, ${member.id})"><i class="fas fa-trash"></i></button>
                      </div>
                    </div>
                    <div class="member-meta">
                      <span class="member-role"><i class="fas fa-user-tag"></i> ${member.role}</span>
                    </div>
                  </div>
                `;
              });
              html += '</div>';
              membersContainer.innerHTML = html;
            }
          }
          
          // Hiển thị nút thêm thành viên
          const addMemberBtn = document.getElementById('btn-add-member');
          if (addMemberBtn) {
            addMemberBtn.onclick = function() {
              ProjectsUI.showMemberForm(projectId);
            };
          }
        }
      },
      
      // Hiển thị form tạo/chỉnh sửa thành viên
      showMemberForm: function(projectId, memberId) {
        currentProjectId = projectId;
        currentMemberId = memberId;
        
        // Hiển thị modal
        const modal = document.getElementById('member-modal');
        if (modal) {
          modal.style.display = 'flex';
        }
        
        // Nếu là chỉnh sửa, điền thông tin vào form
        if (projectId && memberId) {
          const project = ProjectsModule.getProjectById(projectId);
          
          if (project) {
            const member = project.members.find(m => m.id === memberId);
            
            if (member) {
              document.getElementById('member-name').value = member.name;
              document.getElementById('member-role').value = member.role;
            }
          }
        } else {
          // Reset form nếu là tạo mới
          document.getElementById('member-form').reset();
        }
      },
      
      // Lưu thành viên
      saveMember: function() {
        const memberData = {
          name: document.getElementById('member-name').value,
          role: document.getElementById('member-role').value
        };
        
        if (currentMemberId) {
          // Cập nhật thành viên
          const project = ProjectsModule.getProjectById(currentProjectId);
          if (project) {
            const memberIndex = project.members.findIndex(m => m.id === currentMemberId);
            if (memberIndex !== -1) {
              project.members[memberIndex] = {
                ...project.members[memberIndex],
                ...memberData
              };
              ProjectsModule.saveProjects();
            }
          }
        } else {
          // Thêm thành viên mới
          ProjectsModule.addMember(currentProjectId, memberData);
        }
        
        // Đóng modal
        const modal = document.getElementById('member-modal');
        if (modal) {
          modal.style.display = 'none';
        }
        
        // Cập nhật lại danh sách thành viên
        this.viewMembers(currentProjectId);
      },
      
      // Xóa thành viên
      deleteMember: function(projectId, memberId) {
        if (confirm('Bạn có chắc chắn muốn xóa thành viên này?')) {
          ProjectsModule.deleteMember(projectId, memberId);
          
          // Cập nhật lại danh sách thành viên
          this.viewMembers(projectId);
        }
      },
      
      // Chỉnh sửa thành viên
      editMember: function(projectId, memberId) {
        this.showMemberForm(projectId, memberId);
      }
    };
  })();
  
  // Khởi tạo khi trang được tải
  document.addEventListener('DOMContentLoaded', function() {
    ProjectsUI.init();
  });