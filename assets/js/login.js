document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded successfully!');
    
    // Xử lý slideshow
    const slideshow = document.getElementById('slideshow');
    const dots = document.querySelectorAll('.dot');
    const images = [
      'assets/image/image1.jpg',
      'assets/image/image2.jpg',
      'assets/image/image3.jpg',
      'assets/image/image4.jpg'
    ];
    let currentSlide = 0;
    
    // Hiển thị slide
    function showSlide(index) {
      // Cập nhật chỉ số slide hiện tại
      currentSlide = index;
      
      // Cập nhật ảnh
      slideshow.src = images[index];
      
      // Cập nhật dot active
      dots.forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === index);
      });
    }
    
    // Chuyển đến slide trước
    window.prevSlide = function() {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      showSlide(currentSlide);
    };
    
    // Chuyển đến slide tiếp theo
    window.nextSlide = function() {
      currentSlide = (currentSlide + 1) % images.length;
      showSlide(currentSlide);
    };
    
    // Chuyển đến slide cụ thể
    window.showSlide = function(index) {
      showSlide(index);
    };
    
    // Tự động chuyển slide
    setInterval(() => {
      nextSlide();
    }, 5000);
    
    // Khởi tạo slide đầu tiên
    showSlide(0);
    
    // Xử lý hiển thị/ẩn mật khẩu
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🔒';
      });
    }
    
    // Xử lý form đăng nhập
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        console.log('Đăng nhập với:', { username, password, remember });
        
        // Giả lập đăng nhập thành công
        alert('Đăng nhập thành công!');
        window.location.href = 'dashboard.html';
      });
    }
    
    // Hiệu ứng ripple cho buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  });