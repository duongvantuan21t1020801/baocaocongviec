// Module quản lý báo cáo kế hoạch công việc
const ReportsModule = (function() {
  // Private variables
  let reports = [];
  
  // Private functions
  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  // Public API
  return {
    // Lấy báo cáo theo khoảng thời gian
    getReports: function(reportType, startDate, endDate) {
      if (startDate && endDate) {
        let filteredReports = reports;
        if (reportType && reportType !== 'all') {
          filteredReports = filteredReports.filter(report => report.type === reportType);
        }
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          filteredReports = filteredReports.filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= start && reportDate <= end;
          });
        }
        
        return filteredReports;
      }
      
      return reports;
    },
    
    // Thêm báo cáo mới
    addReport: function(reportType, reportData) {
      const report = {
        ...reportData,
        type: reportType || 'daily', // Thêm loại báo cáo
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      reports.push(report);
      
      // Lưu vào localStorage
      this.saveReports();
      return report;
    },
    updateReport: function(reportType, id, updatedData) {
      const index = reports.findIndex(report => report.id === id);
      if (index !== -1) {
        // Cập nhật thông tin báo cáo
        reports[index] = {
          ...reports[index],
          ...updatedData,
          type: reportType || reports[index].type, // Giữ nguyên hoặc cập nhật loại báo cáo
          updatedAt: new Date().toISOString()
        };
    // Lưu vào localStorage
    this.saveReports();
    
    return {
      success: true,
      report: reports[index],
      message: 'Cập nhật báo cáo thành công'
    };
  }
  
  return {
    success: false,
    message: 'Không tìm thấy báo cáo'
  };
},
    // Lưu báo cáo vào localStorage
    saveReports: function() {
      localStorage.setItem('reports', JSON.stringify(reports));
    },
    
    // Tải báo cáo từ localStorage
    loadReports: function() {
      const storedReports = localStorage.getItem('reports');
      if (storedReports) reports = JSON.parse(storedReports);
    },
    
    // Tạo báo cáo mẫu
    generateSampleReports: function() {
      reports = [
        {
          id: 1,
          title: 'Kế hoạch xử lý nước thải KCN VSIP',
          description: 'Kế hoạch triển khai hệ thống xử lý nước thải mới cho khu công nghiệp VSIP',
          date: '2024-06-10',
          deadline: '2024-08-15',
          status: 'in-progress',
          progress: 65,
          manager: 'Nguyễn Văn A',
          department: 'Kỹ thuật',
          members: [
            { id: 1, name: 'Nguyễn Văn A', role: 'Quản lý dự án' },
            { id: 2, name: 'Trần Thị B', role: 'Kỹ sư môi trường' },
            { id: 3, name: 'Lê Văn C', role: 'Kỹ thuật viên' }
          ],
          tasks: [
            { id: 1, title: 'Khảo sát hiện trạng', status: 'completed', assignee: 'Trần Thị B', deadline: '2024-06-20' },
            { id: 2, title: 'Thiết kế hệ thống', status: 'in-progress', assignee: 'Lê Văn C', deadline: '2024-07-15' },
            { id: 3, title: 'Lắp đặt thiết bị', status: 'not-started', assignee: 'Nguyễn Văn A', deadline: '2024-08-10' }
          ],
          attachments: [],
          createdAt: '2024-06-10T12:00:00Z'
        },
        {
          id: 2,
          title: 'Báo cáo đánh giá tác động môi trường dự án ABC',
          description: 'Đánh giá tác động môi trường cho dự án xây dựng nhà máy sản xuất ABC',
          date: '2024-06-05',
          deadline: '2024-07-30',
          status: 'in-progress',
          progress: 40,
          manager: 'Trần Thị B',
          department: 'Tư vấn',
          members: [
            { id: 2, name: 'Trần Thị B', role: 'Trưởng nhóm' },
            { id: 4, name: 'Phạm Văn D', role: 'Chuyên viên đánh giá' },
            { id: 5, name: 'Hoàng Thị E', role: 'Chuyên viên pháp lý' }
          ],
          tasks: [
            { id: 4, title: 'Thu thập số liệu', status: 'completed', assignee: 'Phạm Văn D', deadline: '2024-06-15' },
            { id: 5, title: 'Phân tích tác động', status: 'in-progress', assignee: 'Trần Thị B', deadline: '2024-07-10' },
            { id: 6, title: 'Lập báo cáo', status: 'not-started', assignee: 'Hoàng Thị E', deadline: '2024-07-25' }
          ],
          attachments: [],
          createdAt: '2024-06-05T10:00:00Z'
        }
      ];
      
      this.saveReports();
    },
    
    // Cập nhật báo cáo
    updateReport: function(id, updatedData) {
      const index = reports.findIndex(report => report.id === id);
      
      if (index !== -1) {
        // Cập nhật thông tin báo cáo
        reports[index] = {
          ...reports[index],
          ...updatedData,
          updatedAt: new Date().toISOString()
        };
        
        // Lưu vào localStorage
        this.saveReports();
        
        return {
          success: true,
          report: reports[index],
          message: 'Cập nhật báo cáo thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Xóa báo cáo
    deleteReport: function(id) {
      const index = reports.findIndex(report => report.id === id);
      
      if (index !== -1) {
        reports.splice(index, 1);
        
        // Lưu vào localStorage
        this.saveReports();
        
        return {
          success: true,
          message: 'Xóa báo cáo thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Tìm kiếm báo cáo
    searchReports: function(query) {
      if (!query) return reports;
      
      query = query.toLowerCase();
      return reports.filter(report => 
        report.title.toLowerCase().includes(query) || 
        report.description.toLowerCase().includes(query) ||
        report.manager.toLowerCase().includes(query) ||
        report.department.toLowerCase().includes(query)
      );
    },
    
    // Thêm công việc vào báo cáo
    addTask: function(reportId, taskData) {
      const report = reports.find(r => r.id === reportId);
      
      if (report) {
        const task = {
          id: Date.now(),
          ...taskData
        };
        
        report.tasks.push(task);
        
        // Cập nhật tiến độ
        this.updateProgress(reportId);
        
        // Lưu vào localStorage
        this.saveReports();
        
        return {
          success: true,
          task,
          message: 'Thêm công việc thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Cập nhật công việc
    updateTask: function(reportId, taskId, updatedData) {
      const report = reports.find(r => r.id === reportId);
      
      if (report) {
        const taskIndex = report.tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex !== -1) {
          // Cập nhật thông tin công việc
          report.tasks[taskIndex] = {
            ...report.tasks[taskIndex],
            ...updatedData
          };
          
          // Cập nhật tiến độ
          this.updateProgress(reportId);
          
          // Lưu vào localStorage
          this.saveReports();
          
          return {
            success: true,
            task: report.tasks[taskIndex],
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
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Xóa công việc
    deleteTask: function(reportId, taskId) {
      const report = reports.find(r => r.id === reportId);
      
      if (report) {
        const taskIndex = report.tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex !== -1) {
          report.tasks.splice(taskIndex, 1);
          
          // Cập nhật tiến độ
          this.updateProgress(reportId);
          
          // Lưu vào localStorage
          this.saveReports();
          
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
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Cập nhật tiến độ báo cáo
    updateProgress: function(reportId) {
      const report = reports.find(r => r.id === reportId);
      
      if (report && report.tasks.length > 0) {
        const completedTasks = report.tasks.filter(t => t.status === 'completed').length;
        report.progress = Math.round((completedTasks / report.tasks.length) * 100);
        
        // Cập nhật trạng thái
        if (report.progress === 100) {
          report.status = 'completed';
        } else if (report.progress === 0) {
          report.status = 'not-started';
        } else {
          report.status = 'in-progress';
        }
        
        // Lưu vào localStorage
        this.saveReports();
      }
    },
    
    // Thêm thành viên vào báo cáo
    addMember: function(reportId, memberData) {
      const report = reports.find(r => r.id === reportId);
      
      if (report) {
        const member = {
          id: Date.now(),
          ...memberData
        };
        
        report.members.push(member);
        
        // Lưu vào localStorage
        this.saveReports();
        
        return {
          success: true,
          member,
          message: 'Thêm thành viên thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Xóa thành viên
    deleteMember: function(reportId, memberId) {
      const report = reports.find(r => r.id === reportId);
      
      if (report) {
        const memberIndex = report.members.findIndex(m => m.id === memberId);
        
        if (memberIndex !== -1) {
          report.members.splice(memberIndex, 1);
          
          // Lưu vào localStorage
          this.saveReports();
          
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
        message: 'Không tìm thấy báo cáo'
      };
    },
    
    // Render danh sách báo cáo
    renderReportsList: function(containerId, reports) {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      if (reports.length === 0) {
        container.innerHTML = '<div class="empty-state">Không có báo cáo nào</div>';
        return;
      }
      
      let html = '';
      reports.forEach(report => {
        html += `
          <div class="report-card" data-id="${report.id}">
            <div class="report-header">
              <h3 class="report-title">${report.title}</h3>
              <div class="report-actions">
                <button class="btn-edit" onclick="ReportsUI.editReport(${report.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="ReportsUI.deleteReport(${report.id})"><i class="fas fa-trash"></i></button>
              </div>
            </div>
            <div class="report-meta">
              <span class="report-date"><i class="fas fa-calendar"></i> ${formatDate(report.date)}</span>
              <span class="report-deadline"><i class="fas fa-clock"></i> Deadline: ${formatDate(report.deadline)}</span>
              <span class="report-status ${report.status}"><i class="fas fa-info-circle"></i> ${this.getStatusText(report.status)}</span>
            </div>
            <div class="report-progress">
              <div class="progress-bar">
                <div class="progress" style="width: ${report.progress}%"></div>
              </div>
              <span>${report.progress}%</span>
            </div>
            <p class="report-description">${report.description}</p>
            <div class="report-footer">
              <div class="report-manager">
                <i class="fas fa-user"></i> ${report.manager}
              </div>
              <div class="report-department">
                <i class="fas fa-building"></i> ${report.department}
              </div>
              <div class="report-members">
                <i class="fas fa-users"></i> ${report.members.length} thành viên
              </div>
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
      
      return statusMap[status] || 'Không xác định';
    }
  };
})();

// UI Module cho báo cáo kế hoạch công việc
const ReportsUI = (function() {
  // Private variables
  let currentReportId = null;
  let currentTaskId = null;
  let currentMemberId = null;
  
  // Public API
  return {
    // Khởi tạo trang báo cáo
    init: function() {
      // Tải báo cáo từ localStorage
      ReportsModule.loadReports();
      
      // Nếu không có báo cáo, tạo dữ liệu mẫu
      if (ReportsModule.getReports().length === 0) {
        ReportsModule.generateSampleReports();
      }
      
      // Render danh sách báo cáo
      this.renderReports();
      
      // Khởi tạo sự kiện
      this.initEvents();
    },
    
    // Khởi tạo sự kiện
    initEvents: function() {
      // Sự kiện tìm kiếm
      const searchInput = document.getElementById('report-search');
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          const query = this.value.trim();
          const filteredReports = ReportsModule.searchReports(query);
          ReportsModule.renderReportsList('reports-container', filteredReports);
        });
      }
      
      // Sự kiện lọc theo trạng thái
      const statusFilter = document.getElementById('report-status-filter');
      if (statusFilter) {
        statusFilter.addEventListener('change', function() {
          ReportsUI.filterReportsByStatus(this.value);
        });
      }
      
      // Sự kiện nút tạo báo cáo mới
      const createBtn = document.getElementById('btn-create-report');
      if (createBtn) {
        createBtn.addEventListener('click', function() {
          ReportsUI.showReportForm();
        });
      }
      
      // Sự kiện submit form báo cáo
      const reportForm = document.getElementById('report-form');
      if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
          e.preventDefault();
          ReportsUI.saveReport();
        });
      }
      
      // Sự kiện submit form công việc
      const taskForm = document.getElementById('task-form');
      if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
          e.preventDefault();
          ReportsUI.saveTask();
        });
      }
      
      // Sự kiện submit form thành viên
      const memberForm = document.getElementById('member-form');
      if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
          e.preventDefault();
          ReportsUI.saveMember();
        });
      }
    },
    
    // Render danh sách báo cáo
    renderReports: function() {
      const reports = ReportsModule.getReports();
      ReportsModule.renderReportsList('reports-container', reports);
    },
    
    // Lọc báo cáo theo trạng thái
    filterReportsByStatus: function(status) {
      const reports = ReportsModule.getReports();
      
      if (status === 'all') {
        ReportsModule.renderReportsList('reports-container', reports);
      } else {
        const filteredReports = reports.filter(report => report.status === status);
        ReportsModule.renderReportsList('reports-container', filteredReports);
      }
    },
    
    // Hiển thị form tạo/chỉnh sửa báo cáo
    showReportForm: function(reportId) {

      // Thêm sự kiện cho nút đóng
  const closeButton = document.querySelector('#report-modal .btn-close');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      const modal = document.getElementById('report-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  // Thêm sự kiện cho nút hủy
  const cancelButton = document.querySelector('#report-modal .btn-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', function() {
      const modal = document.getElementById('report-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
      currentReportId = reportId;
      
      // Hiển thị modal
      const modal = document.getElementById('report-modal');
      if (modal) {
        modal.style.display = 'flex';
      }
      
      // Nếu là chỉnh sửa, điền thông tin vào form
      if (reportId) {
        const reports = ReportsModule.getReports();
        const report = reports.find(r => r.id === reportId);
        
        if (report) {
          document.getElementById('report-title').value = report.title;
          document.getElementById('report-description').value = report.description;
          document.getElementById('report-date').value = report.date;
          document.getElementById('report-deadline').value = report.deadline;
          document.getElementById('report-status').value = report.status;
          document.getElementById('report-manager').value = report.manager;
          document.getElementById('report-department').value = report.department;
        }
      } else {
        // Reset form nếu là tạo mới
        document.getElementById('report-form').reset();
      }
    },
    
    // Lưu báo cáo
    saveReport: function() {
      const reportData = {
        title: document.getElementById('report-title').value,
        description: document.getElementById('report-description').value,
        date: document.getElementById('report-date').value,
        deadline: document.getElementById('report-deadline').value,
        status: document.getElementById('report-status').value,
        manager: document.getElementById('report-manager').value,
        department: document.getElementById('report-department').value
      };
      
      if (currentReportId) {
        // Cập nhật báo cáo
        ReportsModule.updateReport(currentReportId, reportData);
      } else {
        // Thêm báo cáo mới
        reportData.progress = 0;
        reportData.members = [];
        reportData.tasks = [];
        ReportsModule.addReport(reportData);
      }
      
      // Đóng modal
      const modal = document.getElementById('report-modal');
      if (modal) {
        modal.style.display = 'none';
      }
      
      // Render lại danh sách
      this.renderReports();
    },
    
    // Hiển thị form tạo/chỉnh sửa công việc
    showTaskForm: function(reportId, taskId) {
      currentReportId = reportId;
      currentTaskId = taskId;
      
      // Hiển thị modal
      const modal = document.getElementById('task-modal');
      if (modal) {
        modal.style.display = 'flex';
      }
      
      // Nếu là chỉnh sửa, điền thông tin vào form
      if (reportId && taskId) {
        const reports = ReportsModule.getReports();
        const report = reports.find(r => r.id === reportId);
        
        if (report) {
          const task = report.tasks.find(t => t.id === taskId);
          
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
        ReportsModule.updateTask(currentReportId, currentTaskId, taskData);
      } else {
        // Thêm công việc mới
        ReportsModule.addTask(currentReportId, taskData);
      }
      
      // Đóng modal
      const modal = document.getElementById('task-modal');
      if (modal) {
        modal.style.display = 'none';
      }
      
      // Render lại danh sách
      this.renderReports();
    },
    
    // Hiển thị form tạo/chỉnh sửa thành viên
    showMemberForm: function(reportId, memberId) {
      currentReportId = reportId;
      currentMemberId = memberId;
      
      // Hiển thị modal
      const modal = document.getElementById('member-modal');
      if (modal) {
        modal.style.display = 'flex';
      }
      
      // Nếu là chỉnh sửa, điền thông tin vào form
      if (reportId && memberId) {
        const reports = ReportsModule.getReports();
        const report = reports.find(r => r.id === reportId);
        
        if (report) {
          const member = report.members.find(m => m.id === memberId);
          
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
        const reports = ReportsModule.getReports();
        const report = reports.find(r => r.id === currentReportId);
        
        if (report) {
          const memberIndex = report.members.findIndex(m => m.id === currentMemberId);
          
          if (memberIndex !== -1) {
            report.members[memberIndex] = {
              ...report.members[memberIndex],
              ...memberData
            };
            
            ReportsModule.saveReports();
          }
        }
      } else {
        // Thêm thành viên mới
        ReportsModule.addMember(currentReportId, memberData);
      }
      
      // Đóng modal
      const modal = document.getElementById('member-modal');
      if (modal) {
        modal.style.display = 'none';
      }
      
      // Render lại danh sách
      this.renderReports();
    },
    
    // Chỉnh sửa báo cáo
    editReport: function(reportId) {
      this.showReportForm(reportId);
    },
    
    // Xóa báo cáo
    deleteReport: function(reportId) {
      if (confirm('Bạn có chắc chắn muốn xóa báo cáo này?')) {
        ReportsModule.deleteReport(reportId);
        this.renderReports();
      }
    },
    
    // Xem chi tiết báo cáo
    viewReportDetails: function(reportId) {
      const reports = ReportsModule.getReports();
      const report = reports.find(r => r.id === reportId);
      
      if (report) {
        // Hiển thị modal chi tiết
        const modal = document.getElementById('report-details-modal');
        if (modal) {
          modal.style.display = 'flex';
          
          // Render thông tin báo cáo
          document.getElementById('report-details-title').textContent = report.title;
          document.getElementById('report-details-description').textContent = report.description;
          document.getElementById('report-details-date').textContent = formatDate(report.date);
          document.getElementById('report-details-deadline').textContent = formatDate(report.deadline);
          document.getElementById('report-details-status').textContent = ReportsModule.getStatusText(report.status);
          document.getElementById('report-details-progress').textContent = `${report.progress}%`;
          document.getElementById('report-details-manager').textContent = report.manager;
          document.getElementById('report-details-department').textContent = report.department;
          
          // Render danh sách thành viên
          const membersContainer = document.getElementById('report-details-members');
          if (membersContainer) {
            if (report.members.length === 0) {
              membersContainer.innerHTML = '<div class="empty-state">Không có thành viên nào</div>';
            } else {
              let membersHtml = '<ul class="members-list">';
              report.members.forEach(member => {
                membersHtml += `
                  <li>
                    <span class="member-name">${member.name}</span>
                    <span class="member-role">${member.role}</span>
                  </li>
                `;
              });
              membersHtml += '</ul>';
              membersContainer.innerHTML = membersHtml;
            }
          }
          
          // Render danh sách công việc
          const tasksContainer = document.getElementById('report-details-tasks');
          if (tasksContainer) {
            if (report.tasks.length === 0) {
              tasksContainer.innerHTML = '<div class="empty-state">Không có công việc nào</div>';
            } else {
              let tasksHtml = '<ul class="tasks-list">';
              report.tasks.forEach(task => {
                tasksHtml += `
                  <li class="${task.status}">
                    <div class="task-title">${task.title}</div>
                    <div class="task-meta">
                      <span class="task-assignee">${task.assignee}</span>
                      <span class="task-deadline">Deadline: ${formatDate(task.deadline)}</span>
                      <span class="task-status">${ReportsModule.getStatusText(task.status)}</span>
                    </div>
                  </li>
                `;
              });
              tasksHtml += '</ul>';
              tasksContainer.innerHTML = tasksHtml;
            }
          }
        }
      }
    },
    
    // Render trang báo cáo
    renderReportsPage: function() {
      return `
        <div class="reports-page">
          <div class="reports-header">
            <h3>Báo cáo kế hoạch công việc</h3>
            <button id="btn-create-report" class="btn-create-report">
              <i class="fas fa-plus"></i> Tạo báo cáo mới
            </button>
          </div>
          
          <div class="reports-filter">
            <div class="filter-group">
              <label for="report-search">Tìm kiếm</label>
              <input type="text" id="report-search" placeholder="Nhập từ khóa...">
            </div>
            
            <div class="filter-group">
              <label for="report-date-filter">Thời gian</label>
              <select id="report-date-filter">
                <option value="all">Tất cả</option>
                <option value="today">Hôm nay</option>
                <option value="week">7 ngày qua</option>
                <option value="month">30 ngày qua</option>
              </select>
            </div>
          </div>
          
          <div id="reports-container" class="reports-container">
            <!-- Danh sách báo cáo sẽ được render ở đây -->
          </div>
          
          <!-- Modal form tạo/chỉnh sửa báo cáo -->
          <div id="report-modal" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Báo cáo kế hoạch công việc</h3>
                <button class="btn-close">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              
              <form id="report-form" class="report-form">
                <div class="form-group">
                  <label for="report-title">Tiêu đề</label>
                  <input type="text" id="report-title" required>
                </div>
                
                <div class="form-group">
                  <label for="report-description">Mô tả</label>
                  <textarea id="report-description" rows="4"></textarea>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="report-status">Trạng thái</label>
                    <select id="report-status" required>
                      <option value="Chưa làm">Chưa làm</option>
                      <option value="Đang làm">Đang làm</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="report-date">Ngày</label>
                    <input type="date" id="report-date" required>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="report-user">Người thực hiện</label>
                    <input type="text" id="report-user" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="report-department">Phòng ban</label>
                    <input type="text" id="report-department" required>
                  </div>
                </div>
                
                <div class="form-actions">
                  <button type="button" class="btn-cancel">Hủy</button>
                  <button type="submit" class="btn-save">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
    }
  };
})();

// Khởi tạo module khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo module nếu đang ở trang báo cáo
  if (window.location.hash === '#reports') {
    ReportsUI.init();
  }
});

// Đăng ký route cho trang báo cáo
if (typeof router !== 'undefined') {
  router.addRoute('#reports', function() {
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = ReportsUI.renderReportsPage();
      ReportsUI.init();
    }
    return true;
  });
}