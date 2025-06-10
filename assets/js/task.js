
function renderTasksPage() {
    return `
      <div class="tasks-container">
        <div class="tasks-header">
          <h3>Công việc đang thực hiện</h3>
          <div class="tasks-actions">
            <button class="btn-add-task"><i class="fas fa-plus"></i> Thêm công việc</button>
            <div class="tasks-filter">
              <select id="task-filter">
                <option value="all">Tất cả công việc</option>
                <option value="in-progress">Đang thực hiện</option>
                <option value="not-started">Chưa bắt đầu</option>
                <option value="completed">Hoàn thành</option>
                <option value="overdue">Quá hạn</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="tasks-list">
          ${renderAllTasks()}
        </div>
      </div>
    `;
  }
  

  function renderAllTasks() {
    const tasks = getAllTasks();
    
    if (tasks.length === 0) {
      return '<div class="no-tasks">Không có công việc nào</div>';
    }
    
    return tasks.map(task => `
      <div class="task-card ${task.status}">
        <div class="task-card-header">
          <div class="task-status-badge">${getStatusText(task.status)}</div>
          <div class="task-actions">
            <button class="btn-task-action" data-task-id="${task.id}"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>
        <div class="task-card-body">
          <h4>${task.title}</h4>
          <p>${task.description}</p>
        </div>
        <div class="task-card-footer">
          <div class="task-meta">
            <span class="task-project"><i class="fas fa-folder"></i> ${task.project}</span>
            <span class="task-deadline ${task.isOverdue ? 'overdue' : ''}"><i class="fas fa-calendar"></i> ${formatDeadline(task.deadline)}</span>
          </div>
          <div class="task-assignee">
            <img src="${task.assigneeAvatar || 'assets/icon/avatar.jpg'}" alt="${task.assignee}">
            <span>${task.assignee}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  
  function getAllTasks() {
    
    const storedTasks = localStorage.getItem('allTasks');
    
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    
    
    const sampleTasks = [
      {
        id: 1,
        title: 'Kiểm tra hệ thống xử lý nước thải tại KCN VSIP',
        description: 'Thực hiện kiểm tra định kỳ hệ thống xử lý nước thải, lấy mẫu và phân tích chất lượng nước.',
        project: 'Dự án VSIP',
        deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
        isOverdue: false,
        status: 'in-progress',
        assignee: 'Nguyễn Văn A',
        assigneeAvatar: 'assets/icon/avatar.jpg'
      },
      {
        id: 2,
        title: 'Lập hồ sơ môi trường cho khách hàng Công ty ABC',
        description: 'Chuẩn bị hồ sơ đánh giá tác động môi trường theo yêu cầu của khách hàng và quy định pháp luật.',
        project: 'Dự án ABC',
        deadline: new Date(new Date().setDate(new Date().getDate() - 1)),
        isOverdue: true,
        status: 'overdue',
        assignee: 'Trần Thị B',
        assigneeAvatar: 'assets/icon/avatar.jpg'
      },
      {
        id: 3,
        title: 'Báo cáo tiến độ dự án xử lý rác thải sinh hoạt',
        description: 'Tổng hợp kết quả thực hiện và tiến độ dự án, đề xuất các giải pháp khắc phục vướng mắc.',
        project: 'Dự án XYZ',
        deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
        isOverdue: false,
        status: 'not-started',
        assignee: 'Lê Văn C',
        assigneeAvatar: 'assets/icon/avatar.jpg'
      },
      {
        id: 4,
        title: 'Khảo sát hiện trạng môi trường tại nhà máy D',
        description: 'Thực hiện khảo sát, đánh giá hiện trạng môi trường và đề xuất giải pháp cải thiện.',
        project: 'Dự án D',
        deadline: new Date(new Date().setDate(new Date().getDate() - 3)),
        isOverdue: true,
        status: 'completed',
        assignee: 'Phạm Thị D',
        assigneeAvatar: 'assets/icon/avatar.jpg'
      }
    ];
    
    localStorage.setItem('allTasks', JSON.stringify(sampleTasks));
    return sampleTasks;
  }
  
  // Lấy text hiển thị cho trạng thái
  function getStatusText(status) {
    const statusMap = {
      'in-progress': 'Đang thực hiện',
      'not-started': 'Chưa bắt đầu',
      'completed': 'Hoàn thành',
      'overdue': 'Quá hạn'
    };
    
    return statusMap[status] || 'Không xác định';
  }
  
  // Định dạng deadline (sử dụng lại từ home.js)
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
  
  // Đăng ký route cho trang công việc đang thực hiện
  router.addRoute('#tasks', renderTasksPage);