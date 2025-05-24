// Module quản lý UI
const UIModule = (function() {
  // Khởi tạo hiệu ứng cho các card
  function initCardEffects() {
    const cards = document.querySelectorAll('.stat-card, .overview-card, .report-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow)';
      });
    });
  }
  
  // Khởi tạo hiệu ứng cho các nút
  function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Hiệu ứng ripple
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  // Render bảng công việc
  function renderWorkTable(data) {
    const table = document.getElementById('work-table');
    if (!table) return;
    
    // Tạo header
    let html = `
      <thead>
        <tr>
          <th>Tên công việc</th>
          <th>Trạng thái</th>
          <th>Ngày</th>
          <th>Người thực hiện</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
    `;
    
    // Tạo các dòng dữ liệu
    data.forEach(item => {
      let statusClass = '';
      
      if (item.status === 'Hoàn thành') {
        statusClass = 'completed';
      } else if (item.status === 'Đang làm') {
        statusClass = 'in-progress';
      } else {
        statusClass = 'pending';
      }
      
      html += `
        <tr>
          <td>${item.title}</td>
          <td><span class="status-dot ${statusClass}"></span>${item.status}</td>
          <td>${item.date}</td>
          <td>${item.user}</td>
          <td>
            <button class="btn-edit" data-id="${item.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-delete" data-id="${item.id}">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
    
    html += '</tbody>';
    table.innerHTML = html;
    
    // Thêm sự kiện cho các nút
    const editButtons = table.querySelectorAll('.btn-edit');
    const deleteButtons = table.querySelectorAll('.btn-delete');
    
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        console.log('Edit report with ID:', id);
        // Hiển thị form chỉnh sửa
      });
    });
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        console.log('Delete report with ID:', id);
        // Hiển thị xác nhận xóa
      });
    });
  }
  
  // Render danh sách báo cáo
  function renderReportsList(data) {
    const reportsContainer = document.querySelector('.reports-list');
    if (!reportsContainer) return;
    
    let html = '';
    
    data.forEach(report => {
      const statusClass = `status-${report.status.toLowerCase().replace(' ', '-')}`;
      
      html += `
        <div class="report-card">
          <div class="report-header">
            <h4>${report.title}</h4>
            <span class="report-date">${report.date}</span>
          </div>
          <div class="report-content">
            <p>${report.description}</p>
            <div class="report-meta">
              <span class="report-user"><i class="fas fa-user"></i> ${report.user}</span>
              <span class="report-department"><i class="fas fa-building"></i> ${report.department}</span>
              <span class="report-status ${statusClass}">${report.status}</span>
            </div>
          </div>
        </div>
      `;
    });
    
    reportsContainer.innerHTML = html;
  }
  
  // Các phương thức public
  return {
    initCardEffects: initCardEffects,
    initButtonEffects: initButtonEffects,
    renderWorkTable: renderWorkTable,
    renderReportsList: renderReportsList,
    
    showNotification: function(message, type = 'success') {
      // Tạo thông báo
      const notification = document.createElement('div');
      notification.classList.add('notification', `notification-${type}`);
      notification.innerHTML = `
        <div class="notification-content">
          <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
          <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
      `;
      
      // Thêm vào DOM
      document.body.appendChild(notification);
      
      // Hiển thị thông báo
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      // Tự động ẩn sau 3 giây
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 3000);
      
      // Xử lý nút đóng
      const closeButton = notification.querySelector('.notification-close');
      closeButton.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      });
    }
  };
})();