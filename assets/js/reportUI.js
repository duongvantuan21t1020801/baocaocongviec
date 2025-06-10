const ReportUIModule = (function() {
    return {
        showNotification: function(message, type) {
          const notification = document.createElement('div');
          notification.className = `notification ${type}`;
          notification.innerHTML = `
            <div class="notification-content">
              <span>${message}</span>
              <button class="notification-close">&times;</button>
            </div>
          `;
        
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.classList.add('show');
          }, 10);
          
          setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          }, 3000);
          
          const closeButton = notification.querySelector('.notification-close');
          closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 300);
          });
        }
      };
    })();
    
      let currentReportType = 'daily'; 
let currentView = 'list'; 
let currentReportId = null;
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    function getStatusClass(status) {
      switch(status.toLowerCase()) {
        case 'hoàn thành':
          return 'completed';
        case 'đang làm':
          return 'in-progress';
        case 'chưa làm':
          return 'pending';
        case 'quá hạn':
          return 'overdue';
        default:
          return '';
      }
    }
    
    function createReportCard(report) {
      const statusClass = getStatusClass(report.status);
      
      return `
        <div class="report-card" data-id="${report.id}">
          <div class="report-header">
            <h4>${report.title}</h4>
            <span class="report-date">${formatDate(report.date)}</span>
          </div>
          <div class="report-content">
            <p>${report.description}</p>
            <div class="report-meta">
              <span class="report-user"><i class="fas fa-user"></i> ${report.user}</span>
              <span class="report-department"><i class="fas fa-building"></i> ${report.department}</span>
              <span class="report-status status-${statusClass}">${report.status}</span>
            </div>
          </div>
          <div class="report-actions">
            <button class="btn-edit" data-id="${report.id}"><i class="fas fa-edit"></i></button>
            <button class="btn-delete" data-id="${report.id}"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    }
    
    function createReportRow(report) {
      const statusClass = getStatusClass(report.status);
      
      return `
        <tr data-id="${report.id}">
          <td>${report.title}</td>
          <td>${formatDate(report.date)}</td>
          <td><span class="status-dot ${statusClass}"></span>${report.status}</td>
          <td>${report.user}</td>
          <td>${report.department}</td>
          <td>
            <button class="btn-edit" data-id="${report.id}"><i class="fas fa-edit"></i></button>
            <button class="btn-delete" data-id="${report.id}"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      `;
    }
    
    function renderReportsList(reports) {
      const container = document.querySelector('.reports-container');
      if (!container) return;
      
      if (currentView === 'grid') {
        // Hiển thị dạng lưới
        let html = '<div class="reports-grid">';
        
        if (reports.length === 0) {
          html += '<div class="no-data">Không có báo cáo nào.</div>';
        } else {
          reports.forEach(report => {
            html += createReportCard(report);
          });
        }
        
        html += '</div>';
        container.innerHTML = html;
      } else {
        // Hiển thị dạng bảng
        let html = `
          <table class="reports-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th>Người thực hiện</th>
                <th>Phòng ban</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
        `;
        
        if (reports.length === 0) {
          html += '<tr><td colspan="6" class="no-data">Không có báo cáo nào.</td></tr>';
        } else {
          reports.forEach(report => {
            html += createReportRow(report);
          });
        }
        
        html += '</tbody></table>';
        container.innerHTML = html;
      }
      
      // Thêm sự kiện cho các nút
      attachEventListeners();
    }
    
    function attachEventListeners() {
      // Sự kiện cho nút chỉnh sửa
      const editButtons = document.querySelectorAll('.btn-edit');
      editButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-id'));
          openEditForm(id);
        });
      });
      
      // Sự kiện cho nút xóa
      const deleteButtons = document.querySelectorAll('.btn-delete');
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = parseInt(this.getAttribute('data-id'));
          confirmDelete(id);
        });
      });
      
      // Sự kiện cho nút chuyển đổi chế độ xem
      const viewToggle = document.getElementById('view-toggle');
      if (viewToggle) {
        viewToggle.addEventListener('click', function() {
          currentView = currentView === 'list' ? 'grid' : 'list';
          
          // Cập nhật giao diện nút
          if (currentView === 'grid') {
            this.innerHTML = '<i class="fas fa-list"></i>';
            this.title = 'Chuyển sang dạng danh sách';
          } else {
            this.innerHTML = '<i class="fas fa-th-large"></i>';
            this.title = 'Chuyển sang dạng lưới';
          }
          
          // Tải lại danh sách báo cáo
          const reports = ReportsModule.getReports(currentReportType);
          renderReportsList(reports);
        });
      }
      
      // Sự kiện cho nút tạo báo cáo mới
      const createButton = document.getElementById('create-report-btn');
      if (createButton) {
        createButton.addEventListener('click', openCreateForm);
      }
      
      // Sự kiện cho các tab loại báo cáo
      const reportTabs = document.querySelectorAll('.report-tab');
      reportTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Xóa class active khỏi tất cả các tab
          reportTabs.forEach(t => t.classList.remove('active'));
          
          // Thêm class active cho tab được chọn
          this.classList.add('active');
          
          // Cập nhật loại báo cáo hiện tại
          currentReportType = this.getAttribute('data-type');
          
          // Tải lại danh sách báo cáo
          const reports = ReportsModule.getReports(currentReportType);
          renderReportsList(reports);
        });
      });
    }
    
    function openCreateForm() {
      // Tạo form
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Tạo báo cáo mới</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <form id="create-report-form">
              <div class="form-group">
                <label for="report-title">Tiêu đề</label>
                <input type="text" id="report-title" required>
              </div>
              <div class="form-group">
                <label for="report-description">Mô tả</label>
                <textarea id="report-description" rows="4" required></textarea>
              </div>
              <div class="form-group">
                <label for="report-status">Trạng thái</label>
                <select id="report-status" required>
                  <option value="Chưa làm">Chưa làm</option>
                  <option value="Đang làm">Đang làm</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Quá hạn">Quá hạn</option>
                </select>
              </div>
              <div class="form-group">
                <label for="report-date">Ngày</label>
                <input type="date" id="report-date" required>
              </div>
              <div class="form-group">
                <label for="report-user">Người thực hiện</label>
                <input type="text" id="report-user" required>
              </div>
              <div class="form-group">
                <label for="report-department">Phòng ban</label>
                <input type="text" id="report-department" required>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-submit">Tạo báo cáo</button>
                <button type="button" class="btn-cancel">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      `;
      
      // Thêm vào DOM
      document.body.appendChild(modal);
      
      // Hiển thị modal
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Xử lý sự kiện đóng modal
      const closeButton = modal.querySelector('.modal-close');
      const cancelButton = modal.querySelector('.btn-cancel');
      
      closeButton.addEventListener('click', () => {
        closeModal(modal);
      });
      
      cancelButton.addEventListener('click', () => {
        closeModal(modal);
      });
      
      // Xử lý sự kiện submit form
      const form = modal.querySelector('#create-report-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const reportData = {
          title: document.getElementById('report-title').value,
          description: document.getElementById('report-description').value,
          status: document.getElementById('report-status').value,
          date: document.getElementById('report-date').value,
          user: document.getElementById('report-user').value,
          department: document.getElementById('report-department').value
        };
        
        // Thêm báo cáo mới
        ReportsModule.addReport(currentReportType, reportData);
        
        // Hiển thị thông báo
        UIModule.showNotification('Tạo báo cáo thành công', 'success');
        
        // Đóng modal
        closeModal(modal);
        
        // Tải lại danh sách báo cáo
        const reports = ReportsModule.getReports(currentReportType);
        renderReportsList(reports);
      });
    }
    
    function openEditForm(id) {
      // Lấy thông tin báo cáo
      const report = ReportsModule.getReports(currentReportType).find(r => r.id === id);
      if (!report) return;
      
      // Tạo form
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Chỉnh sửa báo cáo</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <form id="edit-report-form">
              <div class="form-group">
                <label for="edit-report-title">Tiêu đề</label>
                <input type="text" id="edit-report-title" value="${report.title}" required>
              </div>
              <div class="form-group">
                <label for="edit-report-description">Mô tả</label>
                <textarea id="edit-report-description" rows="4" required>${report.description}</textarea>
              </div>
              <div class="form-group">
                <label for="edit-report-status">Trạng thái</label>
                <select id="edit-report-status" required>
                  <option value="Chưa làm" ${report.status === 'Chưa làm' ? 'selected' : ''}>Chưa làm</option>
                  <option value="Đang làm" ${report.status === 'Đang làm' ? 'selected' : ''}>Đang làm</option>
                  <option value="Hoàn thành" ${report.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                  <option value="Quá hạn" ${report.status === 'Quá hạn' ? 'selected' : ''}>Quá hạn</option>
                </select>
              </div>
              <div class="form-group">
                <label for="edit-report-date">Ngày</label>
                <input type="date" id="edit-report-date" value="${report.date}" required>
              </div>
              <div class="form-group">
                <label for="edit-report-user">Người thực hiện</label>
                <input type="text" id="edit-report-user" value="${report.user}" required>
              </div>
              <div class="form-group">
                <label for="edit-report-department">Phòng ban</label>
                <input type="text" id="edit-report-department" value="${report.department}" required>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-submit">Cập nhật</button>
                <button type="button" class="btn-cancel">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      `;
      
      // Thêm vào DOM
      document.body.appendChild(modal);
      
      // Hiển thị modal
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Xử lý sự kiện đóng modal
      const closeButton = modal.querySelector('.modal-close');
      const cancelButton = modal.querySelector('.btn-cancel');
      
      closeButton.addEventListener('click', () => {
        closeModal(modal);
      });
      
      cancelButton.addEventListener('click', () => {
        closeModal(modal);
      });
      
      // Xử lý sự kiện submit form
      const form = modal.querySelector('#edit-report-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const updatedData = {
          title: document.getElementById('edit-report-title').value,
          description: document.getElementById('edit-report-description').value,
          status: document.getElementById('edit-report-status').value,
          date: document.getElementById('edit-report-date').value,
          user: document.getElementById('edit-report-user').value,
          department: document.getElementById('edit-report-department').value
        };
        
        // Cập nhật báo cáo
        const result = ReportsModule.updateReport(currentReportType, id, updatedData);
        
        // Hiển thị thông báo
        if (result.success) {
          UIModule.showNotification(result.message, 'success');
        } else {
          UIModule.showNotification(result.message, 'error');
        }
        
        // Đóng modal
        closeModal(modal);
        
        // Tải lại danh sách báo cáo
        const reports = ReportsModule.getReports(currentReportType);
        renderReportsList(reports);
      });
    }
    
    function confirmDelete(id) {
      // Tạo modal xác nhận
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3>Xác nhận xóa</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa báo cáo này?</p>
            <div class="form-actions">
              <button type="button" class="btn-confirm">Xóa</button>
              <button type="button" class="btn-cancel">Hủy</button>
            </div>
          </div>
        </div>
      `;
      
      // Thêm vào DOM
      document.body.appendChild(modal);
      
      // Hiển thị modal
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Xử lý sự kiện đóng modal
      const closeButton = modal.querySelector('.modal-close');
      const cancelButton = modal.querySelector('.btn-cancel');
      
      closeButton.addEventListener('click', () => {
        closeModal(modal);
      });
      
      cancelButton.addEventListener('click', () => {
        closeModal(modal);
      });
      
      // Xử lý sự kiện xác nhận xóa
      const confirmButton = modal.querySelector('.btn-confirm');
      confirmButton.addEventListener('click', () => {
        // Xóa báo cáo
        const result = ReportsModule.deleteReport(currentReportType, id);
        
        // Hiển thị thông báo
        if (result.success) {
          UIModule.showNotification(result.message, 'success');
        } else {
          UIModule.showNotification(result.message, 'error');
        }
        
        // Đóng modal
        closeModal(modal);
        
        // Tải lại danh sách báo cáo
        const reports = ReportsModule.getReports(currentReportType);
        renderReportsList(reports);
      });
    }
    
    function closeModal(modal) {
      modal.classList.remove('show');
      // Xóa modal khỏi DOM sau khi animation kết thúc
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 300);
    }
    
    function initReportFilters() {
      const filterForm = document.getElementById('report-filter-form');
      if (!filterForm) return;
      
      // Lấy danh sách phòng ban và người dùng
      const departments = ReportsModule.getDepartments();
      const users = ReportsModule.getUsers();
      
      // Điền danh sách phòng ban vào select
      const departmentSelect = document.getElementById('filter-department');
      if (departmentSelect) {
        let options = '<option value="all">Tất cả phòng ban</option>';
        departments.forEach(department => {
          options += `<option value="${department}">${department}</option>`;
        });
        departmentSelect.innerHTML = options;
      }
      
      // Điền danh sách người dùng vào select
      const userSelect = document.getElementById('filter-user');
      if (userSelect) {
        let options = '<option value="all">Tất cả người dùng</option>';
        users.forEach(user => {
          options += `<option value="${user}">${user}</option>`;
        });
        userSelect.innerHTML = options;
      }
      
      // Xử lý sự kiện submit form
      filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const status = document.getElementById('filter-status').value;
        const department = document.getElementById('filter-department').value;
        const user = document.getElementById('filter-user').value;
        const startDate = document.getElementById('filter-start-date').value;
        const endDate = document.getElementById('filter-end-date').value;
        
        const filters = {
          status,
          department,
          user,
          startDate,
          endDate
        };
        
        const filteredReports = ReportsModule.filterReports(currentReportType, filters);
        renderReportsList(filteredReports);
      });
      
      // Xử lý sự kiện reset form
      const resetButton = document.getElementById('filter-reset');
      if (resetButton) {
        resetButton.addEventListener('click', function() {
          filterForm.reset();
          
          // Tải lại danh sách báo cáo
          const reports = ReportsModule.getReports(currentReportType);
          renderReportsList(reports);
        });
      }
    }
    
    // Public API
    return {
      init: function() {
        // Tải báo cáo
        const reports = ReportsModule.getReports(currentReportType);
        
        // Hiển thị danh sách báo cáo
        renderReportsList(reports);
        
        // Khởi tạo bộ lọc
        initReportFilters();
        
        // Thêm sự kiện cho các nút
        attachEventListeners();
      },
      
      renderReportsList: renderReportsList,
      
      refreshReports: function() {
        const reports = ReportsModule.getReports(currentReportType);
        renderReportsList(reports);
      },
      
      setReportType: function(type) {
        currentReportType = type;
        this.refreshReports();
      },
      
      setView: function(view) {
        currentView = view;
        this.refreshReports();
      },
      
      showReportDetails: function(id) {
        const report = ReportsModule.getReports(currentReportType).find(r => r.id === id);
        if (!report) return;
        
        // Tạo modal chi tiết
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h3>Chi tiết báo cáo</h3>
              <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
              <div class="report-detail">
                <h4>${report.title}</h4>
                <div class="report-meta">
                  <span class="report-date"><i class="fas fa-calendar"></i> ${formatDate(report.date)}</span>
                  <span class="report-status status-${getStatusClass(report.status)}">${report.status}</span>
                </div>
                <div class="report-description">
                  <p>${report.description}</p>
                </div>
                <div class="report-info">
                  <div class="info-item">
                    <span class="info-label">Người thực hiện:</span>
                    <span class="info-value">${report.user}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phòng ban:</span>
                    <span class="info-value">${report.department}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Ngày tạo:</span>
                    <span class="info-value">${formatDate(report.createdAt)}</span>
                  </div>
                  ${report.updatedAt ? `
                  <div class="info-item">
                    <span class="info-label">Cập nhật lần cuối:</span>
                    <span class="info-value">${formatDate(report.updatedAt)}</span>
                  </div>
                  ` : ''}
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-edit" data-id="${report.id}">Chỉnh sửa</button>
                <button type="button" class="btn-close">Đóng</button>
              </div>
            </div>
          </div>
        `;
        
        // Thêm vào DOM
        document.body.appendChild(modal);
        
        // Hiển thị modal
        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
        
        // Xử lý sự kiện đóng modal
        const closeButton = modal.querySelector('.modal-close');
        const closeBtn = modal.querySelector('.btn-close');
        
        closeButton.addEventListener('click', () => {
          closeModal(modal);
        });
        
        closeBtn.addEventListener('click', () => {
          closeModal(modal);
        });
        
        // Xử lý sự kiện chỉnh sửa
        const editButton = modal.querySelector('.btn-edit');
        editButton.addEventListener('click', () => {
          closeModal(modal);
          openEditForm(id);
        });
      }
    };
  
  // Khởi tạo module khi trang được tải
  document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có đang ở trang báo cáo không
    const reportsContainer = document.querySelector('.reports-container');
    if (reportsContainer) {
      ReportUIModule.init();
    }
  })();