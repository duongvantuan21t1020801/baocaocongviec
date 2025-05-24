// Trang chủ
function renderHomePage() {
    return `
      <div class="main-panel">
        <!-- Công việc cần làm hôm nay -->
        <div class="today-tasks">
          <div class="section-header">
            <h3>Công việc cần làm hôm nay</h3>
            <a href="#" class="view-all">Xem tất cả <i class="fas fa-chevron-right"></i></a>
          </div>
          <ul class="task-list">
            ${renderTodayTasks()}
          </ul>
        </div>
  
        <!-- Thống kê nhanh -->
        <div class="quick-stats">
          <div class="stat-card urgent">
            <div class="stat-icon">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${getTaskStats().overdue}</span>
              <span class="stat-label">Quá hạn</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-spinner"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${getTaskStats().inProgress}</span>
              <span class="stat-label">Đang làm</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${getTaskStats().completed}</span>
              <span class="stat-label">Hoàn thành</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-tasks"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">${getTaskStats().total}</span>
              <span class="stat-label">Tổng công việc</span>
            </div>
          </div>
        </div>
  
        <!-- Biểu đồ tiến độ -->
        <div class="chart-container">
          <h3>Tiến độ công việc theo thời gian</h3>
          <canvas id="progressChart"></canvas>
        </div>
  
        <!-- Công việc gần đây và Dự án nổi bật -->
        <div class="overview-grid">
          <div class="overview-card">
            <div class="card-header">
              <h3>Công việc gần đây</h3>
              <a href="#" class="view-all">Xem tất cả <i class="fas fa-chevron-right"></i></a>
            </div>
            <ul class="recent-tasks">
              ${renderRecentTasks()}
            </ul>
          </div>
  
          <div class="overview-card">
            <div class="card-header">
              <h3>Dự án nổi bật</h3>
              <a href="#" class="view-all">Xem tất cả <i class="fas fa-chevron-right"></i></a>
            </div>
            <ul class="featured-projects">
              ${renderFeaturedProjects()}
            </ul>
          </div>
        </div>
      </div>
    `;
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
    const tasks = getRecentTasks();
    
    if (tasks.length === 0) {
      return '<li>Không có công việc gần đây</li>';
    }
    
    return tasks.map(task => `
      <li>
        <div class="task-status ${task.status}"></div>
        <div class="task-info">
          <h4>${task.title}</h4>
          <p>${task.assignee} - ${task.department}</p>
        </div>
        <div class="task-date">${formatDate(task.date)}</div>
      </li>
    `).join('');
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
  function getTaskStats() {
    // Trong thực tế, dữ liệu này sẽ được lấy từ API hoặc localStorage
    // Ở đây chúng ta sẽ sử dụng dữ liệu mẫu
    return {
      total: 12,
      inProgress: 3,
      completed: 7,
      overdue: 2
    };
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