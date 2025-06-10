// Trang chủ
function renderHomePage() {
  return `
    <div class="main-panel">
      <div class="home-container">
        <!-- Cột trái - Nội dung chính (70%) -->
        <div class="main-content-column">
          <!-- Danh mục công việc -->
          <div class="folders-section small">
            <div class="section-header">
              <h3>Danh mục công việc</h3>
            </div>
            <div class="folders-grid">
              <div class="folder-card" data-route="tasks">
                <div class="folder-icon" style="background-color: #E6F0F9;">
                  <i class="fas fa-clipboard-list" style="color: #0066B3;"></i>
                </div>
                <div class="folder-info">
                  <h4>Công việc đang thực hiện</h4>
                  <p>${getTaskStats().inProgress} công việc</p>
                </div>
              </div>
              <div class="folder-card" data-route="reports">
                <div class="folder-icon" style="background-color: #D4E6F9;">
                  <i class="fas fa-file-alt" style="color: #0066B3;"></i>
                </div>
                <div class="folder-info">
                  <h4>Báo cáo</h4>
                  <p>${getReportsCount()} báo cáo</p>
                </div>
              </div>
              <div class="folder-card" data-route="projects">
                <div class="folder-icon" style="background-color: #FFF8E6;">
                  <i class="fas fa-folder" style="color: #FFC107;"></i>
                </div>
                <div class="folder-info">
                  <h4>Dự án</h4>
                  <p>${getProjectsCount()} dự án</p>
                </div>
              </div>
              <div class="folder-card" data-route="documents">
                <div class="folder-icon" style="background-color: #F9E6E6;">
                  <i class="fas fa-images" style="color: #DC3545;"></i>
                </div>
                <div class="folder-info">
                  <h4>Tài liệu</h4>
                  <p>${getDocumentsCount()} tài liệu</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Truy cập nhanh -->
          <div class="quick-access-section">
            <div class="section-header">
              <h3>Truy cập nhanh</h3>
            </div>
            <div class="quick-access-grid">
              ${renderQuickAccessItems()}
            </div>
          </div>

          <!-- Dự án được chia sẻ -->
          <div class="shared-projects-section">
            <div class="section-header">
              <h3>Dự án được chia sẻ</h3>
            </div>
            <ul class="shared-folders-list">
              ${renderSharedProjects()}
            </ul>
          </div>
        </div>

        <!-- Cột phải - Sidebar (30%) -->
        <div class="sidebar-column">
          <!-- Thống kê công việc -->
          <div class="usage-stats">
            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Thống kê công việc</h3>
              <button id="toggleChartBtn" style="background:none;border:none;cursor:pointer;font-size:18px;">
                <i class="fas fa-chevron-up" id="toggleChartIcon"></i>
              </button>
            </div>
            <div class="stats-chart-container" id="chartContainer">
              <canvas id="usageChart"></canvas>
            </div>
          </div>

          <!-- Công việc gần đây -->
          <div class="recent-tasks-section">
            <div class="section-header">
              <h3>Công việc gần đây</h3>
              <button class="more-btn"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <ul class="recent-tasks-list">
              ${renderRecentTasks()}
            </ul>
          </div>

          <!-- Quản lý tệp -->
          <div class="file-manager">
            <div class="section-header">
              <h3>Quản lý tệp</h3>
              <button class="more-btn"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <div class="file-list">
              ${renderFileManager()}
            </div>
            <button class="open-file-manager-btn">Mở quản lý tệp</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Hàm mới để hiển thị các mục truy cập nhanh
function renderQuickAccessItems() {
  return `
    <div class="quick-access-item" data-route="reports">
      <img src="assets/image/report-template.jpg" alt="Mẫu báo cáo" />
      <div class="quick-access-info">
        <h4>Mẫu báo cáo</h4>
        <p>Các mẫu báo cáo tiêu chuẩn</p>
      </div>
    </div>
    <div class="quick-access-item" data-route="projects">
      <img src="assets/image/project-plan.jpg" alt="Kế hoạch dự án" />
      <div class="quick-access-info">
        <h4>Kế hoạch dự án</h4>
        <p>Mẫu kế hoạch dự án</p>
      </div>
    </div>
    <div class="quick-access-item" data-route="tasks">
      <img src="assets/image/task-list.jpg" alt="Danh sách công việc" />
      <div class="quick-access-info">
        <h4>Danh sách công việc</h4>
        <p>Mẫu danh sách công việc</p>
      </div>
    </div>
  `;
}

// Hàm mới để hiển thị quản lý tệp
function renderFileManager() {
  return `
    <div class="file-item">
      <i class="fas fa-file-pdf"></i>
      <div class="file-info">
        <p>Báo cáo Q2.pdf</p>
        <span>Cập nhật: 10/06/2024</span>
      </div>
    </div>
    <div class="file-item">
      <i class="fas fa-file-excel"></i>
      <div class="file-info">
        <p>Dữ liệu thống kê.xlsx</p>
        <span>Cập nhật: 08/06/2024</span>
      </div>
    </div>
  `;
}

// Hàm mới để hiển thị dự án được chia sẻ
function renderSharedProjects() {
  const projects = getFeaturedProjects();
  
  if (projects.length === 0) {
    return '<li class="no-shared">Không có dự án được chia sẻ</li>';
  }
  
  return projects.map(project => `
    <li class="shared-folder-item">
      <div class="shared-folder-icon">
        <i class="fas fa-folder"></i>
      </div>
      <div class="shared-folder-info">
        <p>${project.name}</p>
        <span>Chia sẻ bởi: Admin</span>
      </div>
      <div class="shared-folder-date">
        <span>10/06 17:30pm</span>
      </div>
    </li>
  `).join('');
}

// Hàm để lấy số lượng báo cáo
function getReportsCount() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API hoặc localStorage
  return 5;
}

// Hàm để lấy số lượng dự án
function getProjectsCount() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API hoặc localStorage
  return 3;
}

// Hàm để lấy số lượng tài liệu
function getDocumentsCount() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API hoặc localStorage
  return 12;
}
  
  // Hiển thị danh sách công việc cần làm hôm nay
  function renderTodayTasks() {
    const tasks = getTodayTasks();
    
    if (tasks.length === 0) {
      return '<li class="no-tasks">Không có công việc nào cần làm hôm nay</li>';
    }
    
    return tasks.map(task => `
      <li class="task-item ${task.status}">
        <div class="task-checkbox">
          <input type="checkbox" id="task-${task.id}" ${task.status === 'completed' ? 'checked' : ''}>
          <label for="task-${task.id}"></label>
        </div>
        <div class="task-info">
          <h4>${task.title}</h4>
          <div class="task-meta">
            <span class="task-project">${task.project}</span>
            <span class="task-deadline ${task.isOverdue ? 'overdue' : ''}">${formatDeadline(task.deadline)}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-task-action" data-task-id="${task.id}"><i class="fas fa-ellipsis-v"></i></button>
        </div>
      </li>
    `).join('');
  }
  
  // Hiển thị danh sách công việc gần đây
  function renderRecentTasks() {
    // Lấy 5 công việc gần nhất từ dữ liệu
    const recentTasks = getRecentTasks(5);
    
    if (recentTasks.length === 0) {
      return '<li class="no-tasks">Không có công việc gần đây</li>';
    }
    
    return recentTasks.map(task => {
      // Xác định màu sắc dựa trên trạng thái
      let iconColor = '#0066B3'; // Xanh dương đậm
      let bgColor = '#E6F0F9';
      
      if (task.status === 'completed') {
        iconColor = '#00A651'; // Xanh lá
        bgColor = '#E6F9F0';
      } else if (task.status === 'overdue') {
        iconColor = '#DC3545'; // Đỏ
        bgColor = '#F9E6E6';
      }
      
      return `
        <li class="recent-task-item" data-task-id="${task.id}">
          <div class="task-icon" style="background-color: ${bgColor};">
            <i class="fas fa-tasks" style="color: ${iconColor};"></i>
          </div>
          <div class="task-info">
            <p>${task.title}</p>
            <span>${getStatusText(task.status)}</span>
          </div>
          <div class="task-date">
            <span>${formatDate(task.updatedAt || task.createdAt)}</span>
          </div>
        </li>
      `;
    }).join('');
  }
  
  // Hàm hỗ trợ để lấy văn bản trạng thái
  function getStatusText(status) {
    const statusMap = {
      'not-started': 'Chưa bắt đầu',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'overdue': 'Quá hạn'
    };
    return statusMap[status] || status;
  }
  
  // Hàm hỗ trợ để định dạng ngày tháng
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
  // Hiển thị danh sách dự án nổi bật
  function renderFeaturedProjects() {
    const projects = getFeaturedProjects();
    
    if (projects.length === 0) {
      return '<li>Không có dự án nổi bật</li>';
    }
    
    return projects.map(project => `
      <li>
        <div class="project-info">
          <h4>${project.name}</h4>
          <div class="project-progress">
            <div class="progress-bar">
              <div class="progress" style="width: ${project.progress}%"></div>
            </div>
            <span>${project.progress}%</span>
          </div>
        </div>
      </li>
    `).join('');
  }
  
  // Lấy thống kê công việc
  // Hàm để lấy thống kê công việc theo trạng thái
  function getTaskStats() {
    // Lấy dữ liệu từ localStorage hoặc từ biến toàn cục nếu có
    const tasks = JSON.parse(localStorage.getItem('tasks')) || initialData.tasks || [];
    
    // Đếm số lượng công việc theo trạng thái
    const stats = {
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0
    };
    
    tasks.forEach(task => {
      if (task.status === 'not-started') stats.notStarted++;
      else if (task.status === 'in-progress') stats.inProgress++;
      else if (task.status === 'completed') stats.completed++;
      else if (task.status === 'overdue') stats.overdue++;
    });
    
    return stats;
  }
  
  // Lấy danh sách công việc cần làm hôm nay
  function getTodayTasks() {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const storedTasks = localStorage.getItem('todayTasks');
    
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    
    // Nếu không có, sử dụng dữ liệu mẫu và lưu vào localStorage
    const sampleTasks = [
      {
        id: 1,
        title: 'Nộp báo cáo môi trường định kỳ',
        project: 'Dự án ABC',
        deadline: new Date(new Date().setDate(new Date().getDate() - 2)),
        isOverdue: true,
        status: 'overdue'
      },
      {
        id: 2,
        title: 'Họp nhóm dự án xử lý nước thải',
        project: 'Dự án XYZ',
        deadline: new Date(new Date().setHours(15, 0, 0, 0)),
        isOverdue: false,
        status: 'today'
      },
      {
        id: 3,
        title: 'Kiểm tra hệ thống xử lý nước thải tại KCN VSIP',
        project: 'Dự án VSIP',
        deadline: new Date(new Date().setHours(17, 0, 0, 0)),
        isOverdue: false,
        status: 'today'
      }
    ];
    
    localStorage.setItem('todayTasks', JSON.stringify(sampleTasks));
    return sampleTasks;
  }
  
  // Lấy danh sách công việc gần đây
  function renderRecentTasks() {
    // Lấy 5 công việc gần nhất từ dữ liệu
    const recentTasks = getRecentTasks(5);
    
    if (recentTasks.length === 0) {
      return '<li class="no-tasks">Không có công việc gần đây</li>';
    }
    
    return recentTasks.map(task => {
      // Xác định màu sắc dựa trên trạng thái
      let iconColor = '#0066B3'; // Xanh dương đậm
      let bgColor = '#E6F0F9';
      
      if (task.status === 'completed') {
        iconColor = '#00A651'; // Xanh lá
        bgColor = '#E6F9F0';
      } else if (task.status === 'overdue') {
        iconColor = '#DC3545'; // Đỏ
        bgColor = '#F9E6E6';
      }
      
      return `
        <li class="recent-task-item" data-task-id="${task.id}">
          <div class="task-icon" style="background-color: ${bgColor};">
            <i class="fas fa-tasks" style="color: ${iconColor};"></i>
          </div>
          <div class="task-info">
            <p>${task.title}</p>
            <span>${getStatusText(task.status)}</span>
          </div>
          <div class="task-date">
            <span>${formatDate(task.updatedAt || task.createdAt)}</span>
          </div>
        </li>
      `;
    }).join('');
  }
  
  // Hàm hỗ trợ để lấy văn bản trạng thái
  function getStatusText(status) {
    const statusMap = {
      'not-started': 'Chưa bắt đầu',
      'in-progress': 'Đang thực hiện',
      'completed': 'Hoàn thành',
      'overdue': 'Quá hạn'
    };
    return statusMap[status] || status;
  }
  
  // Hàm hỗ trợ để định dạng ngày tháng
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
  // Hiển thị danh sách dự án nổi bật
  function renderFeaturedProjects() {
    const projects = getFeaturedProjects();
    
    if (projects.length === 0) {
      return '<li>Không có dự án nổi bật</li>';
    }
    
    return projects.map(project => `
      <li>
        <div class="project-info">
          <h4>${project.name}</h4>
          <div class="project-progress">
            <div class="progress-bar">
              <div class="progress" style="width: ${project.progress}%"></div>
            </div>
            <span>${project.progress}%</span>
          </div>
        </div>
      </li>
    `).join('');
  }
  
  // Lấy thống kê công việc
  // Hàm để lấy thống kê công việc theo trạng thái
  function getTaskStats() {
    // Lấy dữ liệu từ localStorage hoặc từ biến toàn cục nếu có
    const tasks = JSON.parse(localStorage.getItem('tasks')) || initialData.tasks || [];
    
    // Đếm số lượng công việc theo trạng thái
    const stats = {
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0
    };
    
    tasks.forEach(task => {
      if (task.status === 'not-started') stats.notStarted++;
      else if (task.status === 'in-progress') stats.inProgress++;
      else if (task.status === 'completed') stats.completed++;
      else if (task.status === 'overdue') stats.overdue++;
    });
    
    return stats;
  }
  
  // Lấy danh sách công việc cần làm hôm nay
  function getTodayTasks() {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const storedTasks = localStorage.getItem('todayTasks');
    
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    
    // Nếu không có, sử dụng dữ liệu mẫu và lưu vào localStorage
    const sampleTasks = [
      {
        id: 1,
        title: 'Nộp báo cáo môi trường định kỳ',
        project: 'Dự án ABC',
        deadline: new Date(new Date().setDate(new Date().getDate() - 2)),
        isOverdue: true,
        status: 'overdue'
      },
      {
        id: 2,
        title: 'Họp nhóm dự án xử lý nước thải',
        project: 'Dự án XYZ',
        deadline: new Date(new Date().setHours(15, 0, 0, 0)),
        isOverdue: false,
        status: 'today'
      },
      {
        id: 3,
        title: 'Kiểm tra hệ thống xử lý nước thải tại KCN VSIP',
        project: 'Dự án VSIP',
        deadline: new Date(new Date().setHours(17, 0, 0, 0)),
        isOverdue: false,
        status: 'today'
      }
    ];
    
    localStorage.setItem('todayTasks', JSON.stringify(sampleTasks));
    return sampleTasks;
  }
  
  // Lấy danh sách công việc gần đây
  function getRecentTasks() {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const storedTasks = localStorage.getItem('recentTasks');
    
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    
    // Nếu không có, sử dụng dữ liệu mẫu và lưu vào localStorage
    const sampleTasks = [
      {
        id: 1,
        title: 'Kiểm tra hệ thống xử lý nước thải tại KCN VSIP',
        assignee: 'Nguyễn Văn A',
        department: 'Kỹ thuật',
        date: new Date(new Date().setDate(new Date().getDate() - 0)),
        status: 'in-progress'
      },
      {
        id: 2,
        title: 'Lập hồ sơ môi trường cho khách hàng Công ty ABC',
        assignee: 'Trần Thị B',
        department: 'Tư vấn',
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        status: 'not-started'
      },
      {
        id: 3,
        title: 'Báo cáo tiến độ dự án xử lý rác thải sinh hoạt',
        assignee: 'Lê Văn C',
        department: 'Quản lý dự án',
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        status: 'completed'
      }
    ];
    
    localStorage.setItem('recentTasks', JSON.stringify(sampleTasks));
    return sampleTasks;
  }
  
  // Lấy danh sách dự án nổi bật
  function getFeaturedProjects() {
    // Kiểm tra xem có dữ liệu trong localStorage không
    const storedProjects = localStorage.getItem('featuredProjects');
    
    if (storedProjects) {
      return JSON.parse(storedProjects);
    }
    
    // Nếu không có, sử dụng dữ liệu mẫu và lưu vào localStorage
    const sampleProjects = [
      {
        id: 1,
        name: 'Giám sát an toàn và xử lý chất thải công nghiệp',
        progress: 85
      },
      {
        id: 2,
        name: 'Dự án ABC',
        progress: 60
      },
      {
        id: 3,
        name: 'Dự án XYZ',
        progress: 30
      }
    ];
    
    localStorage.setItem('featuredProjects', JSON.stringify(sampleProjects));
    return sampleProjects;
  }
  
  // Định dạng deadline
  function formatDeadline(deadline) {
    const date = new Date(deadline);
    const today = new Date();
    
    // Kiểm tra xem deadline có phải là hôm nay không
    if (date.toDateString() === today.toDateString()) {
      return `Hôm nay ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Kiểm tra xem deadline có phải là quá hạn không
    if (date < today) {
      const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      return `Quá hạn ${diffDays} ngày`;
    }
    
    // Trường hợp khác
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
  // Định dạng ngày tháng
  function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
  
  // Đăng ký route cho trang chủ
  router.addRoute('#home', renderHomePage);

// Thêm vào cuối hàm renderHomePage() trước return
function setupFolderCardNavigation() {
  // Đợi DOM được tải
  setTimeout(() => {
    // Thêm sự kiện click cho các folder card
    document.querySelectorAll('.folder-card').forEach(card => {
      card.addEventListener('click', function() {
        const route = this.getAttribute('data-route');
        if (route) {
          router.navigate('#' + route);
        }
      });
    });
    
    // Thêm sự kiện click cho các quick access item
    document.querySelectorAll('.quick-access-item').forEach(item => {
      item.addEventListener('click', function() {
        const route = this.getAttribute('data-route');
        if (route) {
          router.navigate('#' + route);
        }
      });
    });
  }, 100);
}

// Gọi hàm thiết lập sự kiện sau khi DOM được tải
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.hash === '#home' || window.location.hash === '') {
    setupFolderCardNavigation();
  }
});

// Thêm vào router để thiết lập sự kiện khi chuyển đến trang chủ
const originalNavigate = router.navigate;
router.navigate = function(path) {
  originalNavigate.call(this, path);
  
  if (path === '#home' || path === '') {
    setupFolderCardNavigation();
  }
};
document.getElementById('toggleChartBtn').onclick = function() {
  const chartDiv = document.getElementById('chartContainer');
  const icon = document.getElementById('toggleChartIcon');
  if (chartDiv.style.display === 'none') {
    chartDiv.style.display = '';
    icon.className = 'fas fa-chevron-up';
  } else {
    chartDiv.style.display = 'none';
    icon.className = 'fas fa-chevron-down';
  }
};