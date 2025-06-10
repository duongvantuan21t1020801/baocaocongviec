const router = {
    routes: {},
    currentPage: null,
    
    addRoute: function(path, pageFunction) {
      this.routes[path] = pageFunction;
      return this;
    },
    
  
    navigate: function(path) {
      
      const route = path || '#home';
      
    
      const pageFunction = this.routes[route] || this.routes['#home'];
      
 
      if (pageFunction) {
       
        const title = route.substring(1);
        document.getElementById('topbar-title').textContent = this.getPageTitle(title);
        
     
        this.updateActiveMenu(title);
        
        
        const contentElement = document.querySelector('.content');
        contentElement.innerHTML = pageFunction();
        
        
        this.initPageComponents(title);
        
        if (window.location.hash !== route) {
          window.history.pushState(null, '', route);
        }
      }
    },
    
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
    
    updateActiveMenu: function(routeName) {
      document.querySelectorAll('#menu-list li').forEach(item => {
        item.classList.remove('active');
        
        const itemRoute = item.getAttribute('data-route') || '';
        if (itemRoute.substring(1) === routeName) {
          item.classList.add('active');
        }
      });
    },
    
 
    initPageComponents: function(routeName) {
      if (routeName === 'home') {
       
        initCharts();
      }
      
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