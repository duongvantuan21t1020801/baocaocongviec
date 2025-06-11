function openCreateReportModal() {
    const modal = document.getElementById('createReportModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (!document.querySelector('.report-modal .modal-footer')) {
        const modalContent = document.querySelector('.report-modal');
        const footer = document.createElement('div');
        footer.className = 'modal-footer';
        footer.innerHTML = `
            <button class="btn-secondary" onclick="closeCreateReportModal()">Hủy</button>
            <button class="btn-primary" onclick="saveReport()">Lưu nhật ký</button>
        `;
        modalContent.appendChild(footer);
    }
    const modalContent = document.querySelector('.report-modal');
    const viewportHeight = window.innerHeight;
    modalContent.style.maxHeight = (viewportHeight * 0.9) + 'px';
    const modalBody = document.querySelector('.report-modal-body');
    if (modalBody) {
        const modalHeader = document.querySelector('.report-modal .modal-header');
        const modalFooter = document.querySelector('.report-modal .modal-footer');
        const headerHeight = modalHeader ? modalHeader.offsetHeight : 0;
        const footerHeight = modalFooter ? modalFooter.offsetHeight : 0;
        const maxBodyHeight = (viewportHeight * 0.9) - headerHeight - footerHeight - 48; // 48px for padding
        modalBody.style.maxHeight = maxBodyHeight + 'px';
    }
}

function closeCreateReportModal() {
    document.getElementById('createReportModal').style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('createReportForm');
    if (form) {
        form.addEventListener('submit', handleCreateReport);
    }
    if (localStorage.getItem('openReportModalOnLoad') === 'true') {
        setTimeout(() => {
            openCreateReportModal();
            showNotification('Mở form tạo báo cáo mới', 'info');
            localStorage.removeItem('openReportModalOnLoad');
        }, 500);
    }
});
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function handleCreateReport(event) {
    event.preventDefault();
    saveReport();
    return false;
}

function saveReport() {
    const title = document.getElementById('newReportTitle').value.trim();
    const content = document.getElementById('newReportContent').value.trim();
    const date = document.getElementById('newReportDate').value;
    const time = document.getElementById('newReportTime').value;
    const type = document.getElementById('newReportType').value;
    const fileInput = document.getElementById('newReportFile');
    
    if (!title || !content || !date || !time || !type) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
        return false;
    }
    
    showNotification('Đang lưu nhật ký công việc...', 'info');
    
    setTimeout(function() {
        showNotification('Lưu nhật ký công việc thành công!', 'success');
        document.getElementById('createReportForm').reset();
        closeCreateReportModal();
    }, 1000);
    
    return true;
}