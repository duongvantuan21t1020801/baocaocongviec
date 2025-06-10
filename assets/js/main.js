const UIModule = (function() {
 
    let sidebar, toggleBtn, overlay, navItems, topbarTitle;
    let dashboardContent = null;
    let workContent = null;
  
   
    function init() {
      console.log('Khởi tạo UI...');
      
      
      sidebar = document.querySelector(".sidebar");
      toggleBtn = document.getElementById("sidebarToggle");
      navItems = document.querySelectorAll('#menu-list li');
      topbarTitle = document.getElementById('topbar-title');
  
      
      overlay = document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);
  
      
      initEvents();
  
      
      if (document.querySelector('.main-panel')) {
        dashboardContent = document.querySelector('.main-panel').innerHTML;
      }
  
      
      handleResponsiveLayout();
      window.addEventListener('resize', handleResponsiveLayout);
    }
  
   
    function initEvents() {
      
      navItems.forEach(item => {
        item.addEventListener('click', function () {
          navItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
          const newTitle = this.getAttribute('data-title');
          topbarTitle.textContent = newTitle;
          handlePageChange(newTitle);
        });
      });
  
    
      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
        });
      }
  
      
      overlay.addEventListener('click', closeSidebar);
  
      
      document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target) && 
            sidebar.classList.contains('active')) {
          closeSidebar();
        }
      });
  
  
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
          this.style.transform = 'translateY(-5px)';
          this.style.transition = 'transform 0.3s ease';
          this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', function () {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        });
      });
    }
  

    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
    }
  
    // Mở sidebar
    function openSidebar() {
      sidebar.classList.add('active');
      overlay.style.display = 'block';
    }
  
    // Xử lý chuyển đổi trang
    function handlePageChange(title) {
      const mainPanel = document.querySelector('.main-panel');
      const sidePanel = document.querySelector('.side-panel');
      
      if (title === 'Báo cáo kế hoạch công việc') {
        // Hiển thị trang Trang chủ
        window.location.href = 'pages/reports/daily.html'
      } 
      else if (title === 'Công việc đang thực hiện') {
        // Lưu nội dung trang công việc nếu chưa có
        if (!workContent) {
          workContent = `
            <div class="work-section">
              <div class="section-header">
                <h2>Công việc đang thực hiện</h2>
                <button class="create-report-btn">
                  <i class="fas fa-plus"></i> Thêm công việc mới
                </button>
              </div>
              <div class="work-filter">
                <input type="text" placeholder="Tìm kiếm công việc" id="work-search">
                <select id="status-filter">
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Đang làm">Đang làm</option>
                  <option value="Chưa làm">Chưa làm</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                </select>
                <button id="filter-btn">Lọc</button>
              </div>
              <table id="work-table" class="work-table"></table>
              <div class="projects-section">
                <div class="project-card">
                  <img src="assets/images/image5.jpg" alt="Quản lý chất thải công nghiệp" />
                  <div class="project-info">
                    <h3>Giám sát an toàn và xử lý chất thải công nghiệp</h3>
                    <p>Nhân viên tham gia</p>
                    <button class="btn-create-report">
                      <i class="fas fa-plus-square"></i>
                      Tạo báo cáo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
        
        // Hiển thị trang Công việc
        mainPanel.innerHTML = workContent;
        
        // Ẩn side panel nếu có
        if (sidePanel) sidePanel.style.display = 'none';
        
        // Render bảng công việc
        renderWorkTable(DataModule.getWorkReports());
        
        // Thêm sự kiện cho nút lọc
        const filterBtn = document.getElementById('filter-btn');
        if (filterBtn) {
          filterBtn.addEventListener('click', filterWorkTable);
        }
      }
    }
  
    // Render bảng công việc
    function renderWorkTable(data) {
      const table = document.getElementById('work-table');
      if (!table) return;
      let html = `
        <thead>
          <tr>
            <th>Tên công việc</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
            <th>Người thực hiện</th>
            <th>Phòng ban</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
      `;
      data.forEach(item => {
        html += `<tr>
          <td>${item.name}</td>
          <td>${item.date}</td>
          <td><span class="status-dot ${getStatusClass(item.status)}"></span>${item.status}</td>
          <td>${item.user}</td>
          <td>${item.department}</td>
          <td>${item.note}</td>
        </tr>`;
      });
      html += '</tbody>';
      table.innerHTML = html;
    }
  
    // Lấy class cho trạng thái
    function getStatusClass(status) {
      switch(status) {
        case 'Đang làm': return 'in-progress';
        case 'Chưa làm': return 'pending';
        case 'Hoàn thành': return 'completed';
        case 'Quá hạn': return 'overdue';
        default: return '';
      }
    }
  
    // Lọc bảng công việc
    function filterWorkTable() {
      const searchText = document.getElementById('work-search').value.toLowerCase();
      const statusFilter = document.getElementById('status-filter').value;
      
      const reports = DataModule.getWorkReports();
      const filteredReports = reports.filter(report => {
        const matchesSearch = report.name.toLowerCase().includes(searchText) || 
                             report.user.toLowerCase().includes(searchText) ||
                             report.department.toLowerCase().includes(searchText) ||
                             report.note.toLowerCase().includes(searchText);
        
        const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      });
      
      renderWorkTable(filteredReports);
    }
  
    // Xử lý responsive layout
    function handleResponsiveLayout() {
      const width = window.innerWidth;
      const content = document.querySelector('.content');
      const sidePanel = document.querySelector('.side-panel');
  
      if (width < 768) {
        if (content) content.style.flexDirection = 'column';
        if (sidePanel) sidePanel.style.width = '100%';
      } else {
        if (content) content.style.flexDirection = 'row';
        if (sidePanel) sidePanel.style.width = '320px';
      }
    }
  
    return {
      init,
      renderWorkTable
    };
  })();
  
  // Khởi tạo ứng dụng khi trang được tải
  document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard loaded successfully!');
  
    // Khởi tạo dữ liệu mẫu
    if (window.DataModule) {
      DataModule.initMockData();
    }
  
    // Khởi tạo UI
    UIModule.init();
  
    // Khởi tạo biểu đồ
    if (window.ChartModule) {
      ChartModule.initProgressChart();
    }
  });