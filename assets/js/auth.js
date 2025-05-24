// Dịch vụ xác thực
const authService = {
  // Đăng nhập
  login: function(username, password) {
    const users = mockApi.getAll('users');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Lưu thông tin người dùng vào sessionStorage (không lưu mật khẩu)
      const { password, ...userInfo } = user;
      sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
      return userInfo;
    }
    
    return null;
  },
  
  // Đăng xuất
  logout: function() {
    sessionStorage.removeItem('currentUser');
  },
  
  // Kiểm tra đã đăng nhập chưa
  isLoggedIn: function() {
    return sessionStorage.getItem('currentUser') !== null;
  },
  
  // Lấy thông tin người dùng hiện tại
  getCurrentUser: function() {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
};