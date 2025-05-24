// Hệ thống định tuyến SPA
const router = {
    routes: {},
    currentPage: null,
    
    // Đăng ký route mới
    addRoute: function(path, pageFunction) {
      this.routes[path] = pageFunction;
      return this;
    },
    
    // Chuyển hướng đến route
    navigate: function(path) {
      // Mặc định là trang chủ nếu không có path
      const route = path || '#home';
      
      // Lấy hàm xử lý cho route
      const pageFunction = this.routes[route] || this.routes['#home'];
      
      // Render trang
      if (pageFunction) {
        // Cập nhật tiêu đề
        const title = route.substring(1);
        document.getElementById('topbar-title').textContent = this.getPageTitle(title);
        
        // Cập nhật trạng thái active cho menu
        this.updateActiveMenu(title);
        
        // Render nội dung trang
        const contentElement = document.querySelector('.content');
        contentElement.innerHTML = pageFunction();
        
        // Khởi tạo các thành phần động (biểu đồ, bảng,...)
        this.initPageComponents(title);
        
        // Cập nhật URL nếu cần
        if (window.location.hash !== route) {
          window.history.pushState(null, '', route);
        }
      }
    },
    
    // Lấy tiêu đề trang
    getPageTitle: function(routeName) {
      const titles = {
        'home': 'Trang chủ',
        'tasks': 'Công việc đang thực hiện',
        'reports': 'Báo cáo kế hoạch công việc',
        'journals': 'Nhật ký công việc',
        'projects': 'Dự án'
      };
      
      return titles[routeName] || 'Trang chủ';
    },
    
    // Cập nhật trạng thái active cho menu
    updateActiveMenu: function(routeName) {
      document.querySelectorAll('#menu-list li').forEach(item => {
        item.classList.remove('active');
        
        const itemRoute = item.getAttribute('data-route') || '';
        if (itemRoute.substring(1) === routeName) {
          item.classList.add('active');
        }
      });
    },
    
    // Khởi tạo các thành phần động
    initPageComponents: function(routeName) {
      if (routeName === 'home') {
        // Khởi tạo biểu đồ
        initCharts();
      }
      // Thêm các khởi tạo khác cho từng trang
    },
    
    // Khởi tạo router
    init: function() {
      // Xử lý sự kiện khi URL thay đổi
      window.addEventListener('popstate', () => {
        this.navigate(window.location.hash);
      });
      
      // Xử lý click vào các menu item
      document.querySelectorAll('#menu-list li').forEach(item => {
        item.addEventListener('click', () => {
          const route = '#' + (item.getAttribute('data-route') || 'home');
          this.navigate(route);
        });
      });
      
      // Thêm thuộc tính data-route cho các menu item nếu chưa có
      document.querySelectorAll('#menu-list li').forEach(item => {
        if (!item.hasAttribute('data-route')) {
          const title = item.getAttribute('data-title').toLowerCase().replace(/\s+/g, '-');
          item.setAttribute('data-route', title);
        }
      });
      
      // Điều hướng đến route hiện tại hoặc trang chủ
      this.navigate(window.location.hash);
    }
  };