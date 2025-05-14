document.addEventListener('DOMContentLoaded', function () {
  console.log('Dashboard loaded successfully!');

  const navItems = document.querySelectorAll('.sidebar-nav li');
  const topbarTitle = document.getElementById('topbar-title');
  const reportTitle = document.getElementById('report-title');

  navItems.forEach(item => {
    item.addEventListener('click', function () {
      navItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      const newTitle = this.getAttribute('data-title');
      topbarTitle.textContent = newTitle;
      reportTitle.textContent = newTitle;
    });
  });

  const progressCircle = document.querySelector('.progress-circle');
  if (progressCircle) {
    const percent = 85;
    progressCircle.style.background = `conic-gradient(#0066ff 0% ${percent}%, #e6f0ff ${percent}% 100%)`;
  }

  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
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

  const createReportCard = document.querySelector('.create-report-card');
  if (createReportCard) {
    createReportCard.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
      this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });

    createReportCard.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    });

    createReportCard.addEventListener('click', function () {
      alert('Tạo báo cáo mới');
    });
  }

  const createReportBtn = document.querySelector('.btn-create-report');
  if (createReportBtn) {
    createReportBtn.addEventListener('click', function () {
      alert('Tạo báo cáo mới cho dự án website nội bộ');
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
    searchInput.addEventListener('focus', function () {
      this.parentElement.style.boxShadow = '0 0 0 2px rgba(0, 102, 255, 0.2)';
    });

    searchInput.addEventListener('blur', function () {
      this.parentElement.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', function () {
      console.log('Searching for:', this.value);
    });
  }

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
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

  // Responsive layout
  function handleResponsiveLayout() {
    const width = window.innerWidth;

    if (width < 768) {
      document.querySelector('.content').style.flexDirection = 'column';
      document.querySelector('.side-panel').style.width = '100%';
    } else {
      document.querySelector('.content').style.flexDirection = 'row';
      document.querySelector('.side-panel').style.width = '320px';
    }
  }

  handleResponsiveLayout();
  window.addEventListener('resize', handleResponsiveLayout);

  // Menu toggle
  const menuToggleBtn = document.querySelector('.menu-toggle');
  if (!menuToggleBtn) {
    const newMenuToggleBtn = document.createElement('button');
    newMenuToggleBtn.classList.add('menu-toggle');
    newMenuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.topbar').prepend(newMenuToggleBtn);

    newMenuToggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');

      if (window.innerWidth < 768) {
        document.querySelector('.main-content').style.marginLeft = sidebar.classList.contains('open') ? '220px' : '0';
      }
    });
  }

  document.querySelectorAll('.btn-new, .btn-plan, .btn-create-report').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});