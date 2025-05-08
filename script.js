window.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard JS loaded!");
  const nameSpan = document.querySelector(".user-name");
  if (nameSpan) {
    const savedName = localStorage.getItem("userFullname");
    nameSpan.textContent = savedName || "Người dùng";
  }

  const button = document.querySelector(".user-button");
  const menu = document.getElementById("userMenu");
  if (button && menu) {
    function toggleDropdown() {
      menu.classList.toggle("show");
    }
    window.toggleDropdown = toggleDropdown;

    document.addEventListener("click", function (e) {
      if (!button.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove("show");
      }
    });
  }

  const taskList = document.querySelector(".task-list");
  if (taskList) {
    const data = localStorage.getItem("dailyTasks");
    if (data) {
      const tasks = JSON.parse(data);
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.name} <span class="badge ${task.status}">${getStatusText(task.status)}</span>`;
        taskList.appendChild(li);
      });
    } else {
      taskList.innerHTML = "<li>Không có công việc nào</li>";
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "doing": return "Đang làm";
      case "pending": return "Chưa làm";
      case "done": return "Đã xong";
      default: return "Chưa rõ";
    }
  }

  const slideshow = document.getElementById("slideshow");
  const dots = document.querySelectorAll(".dot");

  if (slideshow && dots.length) {
    const images = [
      "assets/image/image1.jpg",
      "assets/image/image2.jpg",
      "assets/image/image3.jpg",
      "assets/image/image4.jpg"
    ];
    let currentSlide = 0;

    function showSlide(index) {
      currentSlide = index;
      slideshow.src = images[currentSlide];
      dots.forEach(dot => dot.classList.remove("active"));
      dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % images.length;
      showSlide(currentSlide);
    }

    window.nextSlide = nextSlide;
    window.prevSlide = function () {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      showSlide(currentSlide);
    };
    window.showSlide = showSlide;

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
  }

  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type = passwordInput.getAttribute("type");
      passwordInput.setAttribute("type", type === "password" ? "text" : "password");
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email && password) {
        localStorage.setItem("userFullname", email);
        window.location.href = "dashboard.html";
      } else {
        alert("Vui lòng điền đầy đủ thông tin.");
      }
    });
  }
});
