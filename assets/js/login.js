
document.addEventListener('DOMContentLoaded', function() {
  // Lấy phần tử slideshow
  const slideshow = document.getElementById('slideshow');
  // Kiểm tra lỗi tải ảnh
  slideshow.onerror = function() {
      console.error('Lỗi khi tải ảnh:', this.src);
  };
  // Mảng ảnh đầy đủ 5 ảnh
  const images = [
    'assets/image/image1.jpg',
    'assets/image/image2.jpg',
    'assets/image/image3.jpg',
    'assets/image/image4.jpg',
    
  ];
  let currentSlide = 0;
  const dots = document.querySelectorAll('.dot');
  slideshow.style.transition = 'opacity 0.5s ease';
  function showCurrentSlide() {
    slideshow.style.opacity = '0';
    setTimeout(() => {
      slideshow.src = images[currentSlide];
      setTimeout(() => {
        slideshow.style.opacity = '1';
      }, 100);
    }, 300);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active-dot', i === currentSlide);
    });
  }
  window.prevSlide = function() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    showCurrentSlide();
  };
  window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % images.length;
    showCurrentSlide();
  };
  window.showSlide = function(index) {
    currentSlide = index;
    showCurrentSlide();
  };
  setInterval(() => {
    window.nextSlide();
  }, 5000);
  // Khởi tạo slide đầu tiên
  slideshow.src = images[0];
  dots[0].classList.add('active-dot');
  // Xử lý hiển thị/ẩn mật khẩu
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  togglePassword.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.textContent = '🔓';
    } else {
      passwordInput.type = 'password';
      this.textContent = '🔒';
    }
  });
  // Xử lý form đăng nhập
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');
    if (email === savedEmail && password === savedPassword) {
      window.location.href = 'dashboard.html';
    } else {
      alert('Sai email hoặc mật khẩu!');
    }
  });
  // Tự động điền email nếu có trong localStorage
  var savedEmail = localStorage.getItem('userEmail');
  if(savedEmail) {
    document.getElementById('username').value = savedEmail;
  }
  // Hiệu ứng chuyển trang khi nhấn Đăng ký
  var signupBtn = document.querySelector('.signup a');
  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(function() {
      window.location.href = 'register.html';
    }, 500);
  });
});
