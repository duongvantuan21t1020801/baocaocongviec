document.addEventListener('DOMContentLoaded', function() {
  console.log('Dashboard loaded successfully!');
  
 
  const navItems = document.querySelectorAll('.sidebar-nav li');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  
  const progressCircle = document.querySelector('.progress-circle');
  if (progressCircle) {
    const percent = 85; 
    progressCircle.style.background = `conic-gradient(#0066ff 0% ${percent}%, #e6f0ff ${percent}% 100%)`;
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
      this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    });
  });

  
  const createReportCard = document.querySelector('.create-report-card');
  if (createReportCard) {
    createReportCard.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
      this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
    
    createReportCard.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    });
  }

  
  const createReportBtn = document.querySelector('.btn-create-report');
  if (createReportBtn) {
    createReportBtn.addEventListener('click', function() {
      alert('Tạo báo cáo mới cho dự án website nội bộ');
    });
  }

 
  if (createReportCard) {
    createReportCard.addEventListener('click', function() {
      alert('Tạo báo cáo mới');
    });
  }


  const scheduleItems = document.querySelectorAll('.schedule-list li');
  scheduleItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });

  
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.parentElement.style.boxShadow = '0 0 0 2px rgba(0, 102, 255, 0.2)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.parentElement.style.boxShadow = 'none';
    });
    
    searchInput.addEventListener('input', function() {
     
      console.log('Searching for:', this.value);
    });
  }

  
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  
  const dateHeader = document.querySelector('.date-header h4');
  if (dateHeader) {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    
  }

  
  function handleResponsiveLayout() {
    const width = window.innerWidth;
    
    if (width < 768) {
      document.querySelector('.content').style.flexDirection = 'column';
      document.querySelector('.side-panel').style.width = '100%';
      
      if (document.querySelector('.sidebar').classList.contains('open')) {
        document.querySelector('.main-content').style.marginLeft = '220px';
      } else {
        document.querySelector('.main-content').style.marginLeft = '0';
      }
    } else {
      document.querySelector('.content').style.flexDirection = 'row';
      document.querySelector('.side-panel').style.width = '320px';
      document.querySelector('.main-content').style.marginLeft = '0';
    }
  }

  
  handleResponsiveLayout();
  window.addEventListener('resize', handleResponsiveLayout);

  // Toggle sidebar for mobile view
  const menuToggleBtn = document.createElement('button');
  menuToggleBtn.classList.add('menu-toggle');
  menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('.topbar').prepend(menuToggleBtn);
  
  menuToggleBtn.addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
    
    if (window.innerWidth < 768) {
      if (sidebar.classList.contains('open')) {
        document.querySelector('.main-content').style.marginLeft = '220px';
      } else {
        document.querySelector('.main-content').style.marginLeft = '0';
      }
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: -220px;
        top: 0;
        height: 100%;
        z-index: 1000;
        transition: left 0.3s ease;
      }
      
      .sidebar.open {
        left: 0;
      }
      
      .menu-toggle {
        display: block;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #555;
      }
      
      .main-content {
        transition: margin-left 0.3s ease;
      }
    }
    
    @media (min-width: 769px) {
      .menu-toggle {
        display: none;
      }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      width: 100px;
      height: 100px;
      margin-top: -50px;
      margin-left: -50px;
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
});