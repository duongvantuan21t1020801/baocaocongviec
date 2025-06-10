// Xử lý slideshow
let slideIndex = 0;
const slides = ["assets/image/image1.jpg", "assets/image/image2.jpg", "assets/image/image3.jpg", "assets/image/image4.jpg"];
const slideshow = document.getElementById("slideshow");
const dots = document.querySelectorAll(".dot");

// Hiển thị slide theo chỉ số với hiệu ứng fade
function showSlide(index) {
  slideIndex = index;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  
  // Thêm hiệu ứng fade mượt mà hơn
  slideshow.style.opacity = 0;
  slideshow.style.transform = 'scale(0.98)';
  
  setTimeout(() => {
    slideshow.src = slides[slideIndex];
    slideshow.style.opacity = 1;
    slideshow.style.transform = 'scale(1)';
    
    // Cập nhật trạng thái active cho dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active-dot", i === slideIndex);
    });
  }, 300);
}

// Chuyển đến slide tiếp theo
function nextSlide() {
  showSlide(slideIndex + 1);
}

// Quay lại slide trước
function prevSlide() {
  showSlide(slideIndex - 1);
}

// Tự động chuyển slide
function autoSlide() {
  nextSlide();
  setTimeout(autoSlide, 5000);
}

// Xử lý đăng nhập
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo slideshow
  showSlide(0);
  setTimeout(autoSlide, 5000);
  
  // Xử lý hiển thị/ẩn mật khẩu
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
  });
  
  // Xử lý form đăng nhập
  const loginForm = document.getElementById('login-form');
  
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Giả lập đăng nhập thành công
    console.log('Đăng nhập với:', { username, password, remember });
    
    // Chuyển hướng đến trang dashboard
    window.location.href = 'dashboard.html';
  });
  
  // Xử lý đăng nhập với Google
  const googleBtn = document.querySelector('.google-btn');
  
  googleBtn.addEventListener('click', function() {
    console.log('Đăng nhập với Google');
    // Thực hiện xác thực Google OAuth (giả lập)
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  });
});