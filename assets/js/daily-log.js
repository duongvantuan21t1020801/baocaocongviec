
    function switchTab(tabName) {
        const workContainer = document.getElementById('workLogsContainer');
        const personalContainer = document.getElementById('personalLogsContainer');
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        if (tabName === 'work') {
            workContainer.style.display = 'block';
            personalContainer.style.display = 'none';
            tabButtons[0].classList.add('active');
            tabButtons[1].classList.remove('active');
        } else {
            workContainer.style.display = 'none';
            personalContainer.style.display = 'block';
            tabButtons[0].classList.remove('active');
            tabButtons[1].classList.add('active');
            loadPersonalLogs();
        }
    }
    
    
    function openAddPersonalLogModal() {
        document.getElementById('addPersonalLogModal').style.display = 'flex';
        
        const now = new Date();
        document.getElementById('personalLogDate').value = now.toISOString().split('T')[0];
        document.getElementById('personalLogTime').value = now.toTimeString().slice(0, 5);
    }
    
    function closeAddPersonalLogModal() {
        document.getElementById('addPersonalLogModal').style.display = 'none';
        document.getElementById('personalLogForm').reset();
    }
    
    function savePersonalLog() {
        const form = document.getElementById('personalLogForm');
        if (form.checkValidity()) {
        
            const title = document.getElementById('personalLogTitle').value;
            const content = document.getElementById('personalLogContent').value;
            const date = document.getElementById('personalLogDate').value;
            const time = document.getElementById('personalLogTime').value;
            const mood = document.getElementById('personalLogMood').value;
            const tags = document.getElementById('personalLogTags').value;
            
           
            const imageInput = document.getElementById('personalLogImage');
            let imageUrl = '';
            
            if (imageInput.files && imageInput.files[0]) {
               
                imageUrl = 'assets/icon/avatar.jpg'; 
            }
            
      
            const newLog = {
                id: Date.now(), // Use timestamp as ID
                title,
                content,
                date,
                time,
                mood,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                imageUrl
            };
            
            
            const personalLogs = JSON.parse(localStorage.getItem('personalLogs') || '[]');
            
          
            personalLogs.push(newLog);
            
            
            localStorage.setItem('personalLogs', JSON.stringify(personalLogs));
            
            alert('Nhật ký cá nhân đã được lưu thành công!');
            closeAddPersonalLogModal();
            
            
            loadPersonalLogs();
        } else {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        }
    }
    
    function loadPersonalLogs() {
        const personalLogsList = document.getElementById('personalLogsList');
        const personalLogs = JSON.parse(localStorage.getItem('personalLogs') || '[]');
        
        
        personalLogs.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateB - dateA;
        });
        
      
        personalLogsList.innerHTML = '';
        
        
        const fromDate = document.getElementById('personalFromDate').value;
        const toDate = document.getElementById('personalToDate').value;
        const moodFilter = document.getElementById('moodFilter').value;
        
        let filteredLogs = personalLogs;
        
        if (fromDate) {
            filteredLogs = filteredLogs.filter(log => log.date >= fromDate);
        }
        
        if (toDate) {
            filteredLogs = filteredLogs.filter(log => log.date <= toDate);
        }
        
        if (moodFilter) {
            filteredLogs = filteredLogs.filter(log => log.mood === moodFilter);
        }
        
       
        if (filteredLogs.length === 0) {
            personalLogsList.innerHTML = '<div class="no-logs">Không có nhật ký nào. Hãy thêm nhật ký đầu tiên của bạn!</div>';
        } else {
            filteredLogs.forEach(log => {
                const logEntry = document.createElement('div');
                logEntry.className = 'personal-log-entry';
                
                
                const displayDate = log.date.split('-').reverse().join('/');
                
                
                logEntry.innerHTML = `
                    <div class="log-header">
                        <div class="log-date">
                            <i class="fas fa-calendar"></i>
                            <span>${displayDate}</span>
                        </div>
                        <div class="log-time">
                            <i class="fas fa-clock"></i>
                            <span>${log.time}</span>
                        </div>
                        <div class="log-mood ${log.mood}">
                            <i class="fas fa-${getMoodIcon(log.mood)}"></i>
                            ${getMoodLabel(log.mood)}
                        </div>
                    </div>
                    <div class="log-content">
                        <h4>${log.title}</h4>
                        <p>${log.content}</p>
                        ${log.imageUrl ? `
                        <div class="personal-log-image">
                            <img src="${log.imageUrl}" alt="Hình ảnh nhật ký">
                        </div>
                        ` : ''}
                        <div class="log-tags">
                            ${log.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="log-actions">
                        <button class="btn-edit" onclick="editPersonalLog(${log.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" onclick="deletePersonalLog(${log.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                personalLogsList.appendChild(logEntry);
            });
        }
    }
    
    function getMoodIcon(mood) {
        switch (mood) {
            case 'happy': return 'smile';
            case 'normal': return 'meh';
            case 'sad': return 'frown';
            case 'excited': return 'grin-stars';
            case 'tired': return 'tired';
            default: return 'smile';
        }
    }
    
    function getMoodLabel(mood) {
        switch (mood) {
            case 'happy': return 'Vui vẻ';
            case 'normal': return 'Bình thường';
            case 'sad': return 'Buồn';
            case 'excited': return 'Phấn khích';
            case 'tired': return 'Mệt mỏi';
            default: return 'Không xác định';
        }
    }
    
    function editPersonalLog(id) {
        const personalLogs = JSON.parse(localStorage.getItem('personalLogs') || '[]');
        const logToEdit = personalLogs.find(log => log.id === id);
        
        if (logToEdit) {
            document.getElementById('personalLogTitle').value = logToEdit.title;
            document.getElementById('personalLogContent').value = logToEdit.content;
            document.getElementById('personalLogDate').value = logToEdit.date;
            document.getElementById('personalLogTime').value = logToEdit.time;
            document.getElementById('personalLogMood').value = logToEdit.mood;
            document.getElementById('personalLogTags').value = logToEdit.tags.join(', ');
            
            
            openAddPersonalLogModal();
            
            
            const saveButton = document.querySelector('#addPersonalLogModal .btn-primary');
            saveButton.textContent = 'Cập nhật nhật ký';
            saveButton.onclick = function() {
                updatePersonalLog(id);
            };
        }
    }
    
    function updatePersonalLog(id) {
        const form = document.getElementById('personalLogForm');
        if (form.checkValidity()) {
          
            const title = document.getElementById('personalLogTitle').value;
            const content = document.getElementById('personalLogContent').value;
            const date = document.getElementById('personalLogDate').value;
            const time = document.getElementById('personalLogTime').value;
            const mood = document.getElementById('personalLogMood').value;
            const tags = document.getElementById('personalLogTags').value;
            
          
            const personalLogs = JSON.parse(localStorage.getItem('personalLogs') || '[]');
            
           
            const logIndex = personalLogs.findIndex(log => log.id === id);
            
            if (logIndex !== -1) {
               
                personalLogs[logIndex] = {
                    ...personalLogs[logIndex],
                    title,
                    content,
                    date,
                    time,
                    mood,
                    tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                };
                
                
                localStorage.setItem('personalLogs', JSON.stringify(personalLogs));
                
                alert('Nhật ký cá nhân đã được cập nhật!');
                const saveButton = document.querySelector('#addPersonalLogModal .btn-primary');
                saveButton.textContent = 'Lưu nhật ký';
                saveButton.onclick = savePersonalLog;
                
                closeAddPersonalLogModal();
                loadPersonalLogs();
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        }
    }
    
    function deletePersonalLog(id) {
        if (confirm('Bạn có chắc chắn muốn xóa nhật ký này?')) {
           
            const personalLogs = JSON.parse(localStorage.getItem('personalLogs') || '[]');
            
           
            const updatedLogs = personalLogs.filter(log => log.id !== id);
            
            
            localStorage.setItem('personalLogs', JSON.stringify(updatedLogs));
            
            alert('Nhật ký đã được xóa');
            loadPersonalLogs();
        }
    }
    
    function filterPersonalLogs() {
        loadPersonalLogs(); 
    }
    
   
    document.addEventListener('DOMContentLoaded', function() {
        loadLogs();
        
        switchTab('work');
    });
