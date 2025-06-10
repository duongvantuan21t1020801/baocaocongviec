let isLoading = false;


document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    if (localStorage.getItem('currentUser') && localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
    
    setupFormHandlers();
    setupPasswordStrength();
    setupFormValidation();
    
    
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function setupFormHandlers() {
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
}

function setupPasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

function setupFormValidation() {
    
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validatePasswordMatch);
    }
}


async function handleLogin(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');
    
   
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    setLoading(true, 'Đang đăng nhập...');
    
    try {
     
        await simulateApiCall(1500);
        
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
           
            const loginData = {
                ...user,
                lastLogin: new Date().toISOString(),
                rememberMe: !!rememberMe
            };
            
            localStorage.setItem('currentUser', JSON.stringify(loginData));
            localStorage.setItem('isLoggedIn', 'true');
            
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            }
            
            showToast('Đăng nhập thành công!', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            throw new Error('Email hoặc mật khẩu không chính xác');
        }
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setLoading(false);
    }
}


async function handleRegister(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    const formData = new FormData(e.target);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        role: formData.get('role'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        terms: formData.get('terms'),
        newsletter: formData.get('newsletter')
    };
    
 
    if (!validateRegisterForm(userData)) {
        return;
    }
    
    setLoading(true, 'Đang tạo tài khoản...');
    
    try {
       
        await simulateApiCall(2000);
        
    
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email này đã được sử dụng');
        }
        
       
        const newUser = {
            id: Date.now().toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            company: userData.company,
            role: userData.role,
            password: userData.password,
            newsletter: !!userData.newsletter,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        showToast('Tài khoản đã được tạo thành công! Đang chuyển hướng...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        setLoading(false);
    }
}


async function handleForgotPassword(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    if (!validateEmail(email)) {
        showFieldError('email', 'Vui lòng nhập email hợp lệ');
        return;
    }
    
    setLoading(true, 'Đang gửi email...');
    
    try {
        await simulateApiCall(1500);
        
        showToast('Đã gửi link đặt lại mật khẩu đến email của bạn', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        showToast('Có lỗi xảy ra, vui lòng thử lại', 'error');
    } finally {
        setLoading(false);
    }
}


async function loginWithGoogle() {
    setLoading(true, 'Đang kết nối với Google...');
    
    try {
        await simulateApiCall(1000);
        showToast('Tính năng đăng nhập Google sẽ sớm có', 'warning');
    } catch (error) {
        showToast('Không thể kết nối với Google', 'error');
    } finally {
        setLoading(false);
    }
}

async function loginWithMicrosoft() {
    setLoading(true, 'Đang kết nối với Microsoft...');
    
    try {
        await simulateApiCall(1000);
        showToast('Tính năng đăng nhập Microsoft sẽ sớm có', 'warning');
    } catch (error) {
        showToast('Không thể kết nối với Microsoft', 'error');
    } finally {
        setLoading(false);
    }
}

async function registerWithGoogle() {
    setLoading(true, 'Đang kết nối với Google...');
    
    try {
        await simulateApiCall(1000);
        showToast('Tính năng đăng ký Google sẽ sớm có', 'warning');
    } catch (error) {
        showToast('Không thể kết nối với Google', 'error');
    } finally {
        setLoading(false);
    }
}

async function registerWithMicrosoft() {
    setLoading(true, 'Đang kết nối với Microsoft...');
    
    try {
        await simulateApiCall(1000);
        showToast('Tính năng đăng ký Microsoft sẽ sớm có', 'warning');
    } catch (error) {
        showToast('Không thể kết nối với Microsoft', 'error');
    } finally {
        setLoading(false);
    }
}


function validateLoginForm(email, password) {
    let isValid = true;
    
    if (!validateEmail(email)) {
        showFieldError('email', 'Vui lòng nhập email hợp lệ');
        isValid = false;
    }
    
    if (!password || password.length < 6) {
        showFieldError('password', 'Mật khẩu phải có ít nhất 6 ký tự');
        isValid = false;
    }
    
    return isValid;
}

function validateRegisterForm(userData) {
    let isValid = true;
    
   
    if (!userData.firstName || userData.firstName.trim().length < 2) {
        showFieldError('firstName', 'Họ phải có ít nhất 2 ký tự');
        isValid = false;
    }
    
    
    if (!userData.lastName || userData.lastName.trim().length < 2) {
        showFieldError('lastName', 'Tên phải có ít nhất 2 ký tự');
        isValid = false;
    }
    
   
    if (!validateEmail(userData.email)) {
        showFieldError('email', 'Vui lòng nhập email hợp lệ');
        isValid = false;
    }
    
 
    if (!validatePhone(userData.phone)) {
        showFieldError('phone', 'Vui lòng nhập số điện thoại hợp lệ');
        isValid = false;
    }
    
  
    if (!userData.role) {
        showFieldError('role', 'Vui lòng chọn vai trò');
        isValid = false;
    }
    
   
    if (!validatePassword(userData.password)) {
        showFieldError('password', 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số');
        isValid = false;
    }
    
  
    if (userData.password !== userData.confirmPassword) {
        showFieldError('confirmPassword', 'Mật khẩu xác nhận không khớp');
        isValid = false;
    }
    
    
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox || !termsCheckbox.checked) {
        showToast('Vui lòng đồng ý với điều khoản sử dụng', 'error');
        isValid = false;
    }
    
    return isValid;
}

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    
    switch (fieldName) {
        case 'email':
            if (!validateEmail(value)) {
                showFieldError(fieldName, 'Email không hợp lệ');
                return false;
            }
            break;
        case 'phone':
            if (!validatePhone(value)) {
                showFieldError(fieldName, 'Số điện thoại không hợp lệ');
                return false;
            }
            break;
        case 'password':
            if (!validatePassword(value)) {
                showFieldError(fieldName, 'Mật khẩu không đủ mạnh');
                return false;
            }
            break;
        default:
            if (!value) {
                showFieldError(fieldName, 'Trường này là bắt buộc');
                return false;
            }
    }
    
    clearFieldError(input);
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (confirmPassword && password !== confirmPassword) {
        showFieldError('confirmPassword', 'Mật khẩu xác nhận không khớp');
    } else {
        clearFieldError(document.getElementById('confirmPassword'));
    }
}


function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthContainer = document.getElementById('passwordStrength');
    
    if (!strengthContainer) return;
    
    const strength = calculatePasswordStrength(password);
    
   
    strengthContainer.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
    
    if (password.length === 0) {
        strengthContainer.querySelector('.strength-text').textContent = 'Độ mạnh mật khẩu';
        return;
    }
    
    
    switch (strength.level) {
        case 1:
            strengthContainer.classList.add('strength-weak');
            strengthContainer.querySelector('.strength-text').textContent = 'Yếu';
            break;
        case 2:
            strengthContainer.classList.add('strength-fair');
            strengthContainer.querySelector('.strength-text').textContent = 'Trung bình';
            break;
        case 3:
            strengthContainer.classList.add('strength-good');
            strengthContainer.querySelector('.strength-text').textContent = 'Tốt';
            break;
        case 4:
            strengthContainer.classList.add('strength-strong');
            strengthContainer.querySelector('.strength-text').textContent = 'Mạnh';
            break;
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    let level = 1;
    if (score >= 3) level = 2;
    if (score >= 5) level = 3;
    if (score >= 6) level = 4;
    
    return { score, level };
}


function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorElement.classList.remove('show');
}

function setLoading(loading, message = '') {
    isLoading = loading;
    const submitButtons = document.querySelectorAll('.btn-primary');
    
    submitButtons.forEach(button => {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
            if (message) {
                const textElement = button.querySelector('.btn-text');
                if (textElement) textElement.textContent = message;
            }
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            const textElement = button.querySelector('.btn-text');
            if (textElement) {
                if (button.classList.contains('btn-login')) {
                    textElement.textContent = 'Đăng nhập';
                } else if (button.classList.contains('btn-register')) {
                    textElement.textContent = 'Tạo tài khoản';
                } else {
                    textElement.textContent = 'Gửi';
                }
            }
        }
    });
}


function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const messageElement = toast.querySelector('.toast-message');
    
    
    toast.classList.remove('success', 'error', 'warning', 'info');
    
    
    toast.classList.add(type);
    
   
    messageElement.textContent = message;
    
    
    toast.classList.add('show');
    
   
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
}


function simulateApiCall(delay = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}


if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            const emailField = document.getElementById('email');
            const rememberCheckbox = document.getElementById('rememberMe');
            
            if (emailField) emailField.value = rememberedEmail;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
    });
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeForm = document.querySelector('form:focus-within');
        if (activeForm && !isLoading) {
            e.preventDefault();
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
    
   
    if (e.key === 'Escape') {
        hideToast();
    }
});