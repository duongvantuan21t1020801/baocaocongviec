// Dữ liệu mẫu cho ứng dụng
const initialData = {
  // Dữ liệu người dùng
  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123', // Trong thực tế, mật khẩu nên được mã hóa
      fullName: 'Quản trị viên',
      role: 'admin',
      avatar: 'assets/icon/avatar.jpg'
    },
    {
      id: 2,
      username: 'user',
      password: 'user123',
      fullName: 'Nguyễn Văn A',
      role: 'user',
      avatar: 'assets/icon/avatar.jpg'
    }
  ],

  // Dữ liệu công việc
  tasks: [
    {
      id: 1,
      title: 'Kiểm tra hệ thống xử lý nước thải tại KCN VSIP',
      description: 'Kiểm tra và đánh giá hiệu suất của hệ thống xử lý nước thải tại KCN VSIP',
      assignee: 2,
      status: 'in-progress', // not-started, in-progress, completed, overdue
      priority: 'high',
      projectId: 1,
      deadline: '2024-06-15T17:00:00',
      createdAt: '2024-06-01T09:00:00',
      updatedAt: '2024-06-10T14:30:00'
    },
    {
      id: 2,
      title: 'Lập hồ sơ môi trường cho khách hàng Công ty ABC',
      description: 'Chuẩn bị và hoàn thiện hồ sơ môi trường theo yêu cầu của khách hàng',
      assignee: 2,
      status: 'not-started',
      priority: 'medium',
      projectId: 2,
      deadline: '2024-06-20T17:00:00',
      createdAt: '2024-06-05T10:00:00'
    },
    {
      id: 3,
      title: 'Báo cáo tiến độ dự án xử lý rác thải sinh hoạt',
      description: 'Tổng hợp và báo cáo tiến độ của dự án xử lý rác thải sinh hoạt',
      assignee: 1,
      status: 'completed',
      priority: 'medium',
      projectId: 3,
      deadline: '2024-06-08T17:00:00',
      createdAt: '2024-06-01T11:00:00',
      completedAt: '2024-06-08T15:00:00'
    },
    // Thêm các công việc khác...
  ],

  // Dữ liệu dự án
  projects: [
    {
      id: 1,
      name: 'Giám sát an toàn và xử lý chất thải công nghiệp',
      description: 'Dự án giám sát và xử lý chất thải công nghiệp tại các khu công nghiệp',
      progress: 85,
      startDate: '2024-01-01T00:00:00',
      endDate: '2024-12-31T23:59:59',
      members: [1, 2],
      createdAt: '2023-12-15T10:00:00'
    },
    {
      id: 2,
      name: 'Dự án ABC',
      description: 'Mô tả dự án ABC',
      progress: 60,
      startDate: '2024-03-01T00:00:00',
      endDate: '2024-09-30T23:59:59',
      members: [2],
      createdAt: '2024-02-15T10:00:00'
    },
    {
      id: 3,
      name: 'Dự án XYZ',
      description: 'Mô tả dự án XYZ',
      progress: 30,
      startDate: '2024-05-01T00:00:00',
      endDate: '2024-11-30T23:59:59',
      members: [1, 2],
      createdAt: '2024-04-15T10:00:00'
    }
  ],

  // Dữ liệu báo cáo kế hoạch
  reports: [
    {
      id: 1,
      title: 'Báo cáo kế hoạch Q2/2024',
      content: 'Nội dung báo cáo kế hoạch Q2/2024',
      author: 1,
      status: 'approved',
      createdAt: '2024-04-01T09:00:00',
      updatedAt: '2024-04-05T14:00:00'
    }
    // Thêm các báo cáo khác...
  ],

  // Dữ liệu nhật ký công việc
  journals: [
    {
      id: 1,
      title: 'Nhật ký công việc ngày 10/06/2024',
      content: 'Đã hoàn thành kiểm tra hệ thống xử lý nước thải tại KCN VSIP. Phát hiện một số vấn đề về van điều áp cần được khắc phục.',
      author: 2,
      taskId: 1,
      projectId: 1,
      createdAt: '2024-06-10T17:00:00'
    }
    // Thêm các nhật ký khác...
  ],

  // Dữ liệu thông báo
  notifications: [
    {
      id: 1,
      title: 'Báo cáo tiến độ dự án cần được nộp trước 17:00',
      content: 'Vui lòng nộp báo cáo tiến độ dự án trước 17:00 hôm nay',
      type: 'reminder',
      userId: 2,
      isRead: false,
      createdAt: '2024-06-10T14:00:00'
    },
    {
      id: 2,
      title: 'Nguyễn Văn A đã thêm bạn vào dự án mới',
      content: 'Bạn đã được thêm vào dự án mới',
      type: 'project',
      userId: 2,
      isRead: false,
      createdAt: '2024-06-10T12:00:00'
    },
    {
      id: 3,
      title: 'Cập nhật hệ thống vào ngày 20/06/2024',
      content: 'Hệ thống sẽ được cập nhật vào ngày 20/06/2024',
      type: 'system',
      userId: 0, // 0 = tất cả người dùng
      isRead: false,
      createdAt: '2024-06-09T10:00:00'
    }
  ],

  // Dữ liệu lịch họp
  meetings: [
    {
      id: 1,
      title: 'Họp nhóm dự án',
      location: 'Phòng họp A - Tầng 3',
      startTime: '2024-06-10T13:00:00',
      endTime: '2024-06-10T14:00:00',
      participants: [1, 2],
      createdAt: '2024-06-05T10:00:00'
    },
    {
      id: 2,
      title: 'Phân công công việc',
      location: 'Phòng họp B - Tầng 2',
      startTime: '2024-06-10T15:00:00',
      endTime: '2024-06-10T16:00:00',
      participants: [1, 2],
      createdAt: '2024-06-05T10:30:00'
    },
    {
      id: 3,
      title: 'Báo cáo với khách hàng',
      location: 'Phòng họp trực tuyến',
      startTime: '2024-06-10T16:30:00',
      endTime: '2024-06-10T17:30:00',
      participants: [1],
      createdAt: '2024-06-05T11:00:00'
    }
  ]
};