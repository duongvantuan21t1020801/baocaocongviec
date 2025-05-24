// Module quản lý nhật ký công việc
const JournalsModule = (function() {
    // Private variables
    let journals = [];
    
    // Private functions
    function formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    // Public API
    return {
      // Lấy nhật ký theo khoảng thời gian
      getJournals: function(startDate, endDate) {
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          return journals.filter(journal => {
            const journalDate = new Date(journal.date);
            return journalDate >= start && journalDate <= end;
          });
        }
        
        return journals;
      },
      
      // Thêm nhật ký mới
      addJournal: function(journalData) {
        const journal = {
          ...journalData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        
        journals.push(journal);
        
        // Lưu vào localStorage
        this.saveJournals();
        return journal;
      },
      
      // Lưu nhật ký vào localStorage
      saveJournals: function() {
        localStorage.setItem('journals', JSON.stringify(journals));
      },
      
      // Tải nhật ký từ localStorage
      loadJournals: function() {
        const storedJournals = localStorage.getItem('journals');
        if (storedJournals) journals = JSON.parse(storedJournals);
      },
      
      // Tạo nhật ký mẫu
      generateSampleJournals: function() {
        journals = [
          {
            id: 1,
            title: 'Khảo sát hiện trạng môi trường',
            description: 'Đã tiến hành khảo sát và lấy mẫu nước thải tại nhà máy',
            date: '2024-06-10',
            startTime: '08:00',
            endTime: '11:30',
            location: 'Nhà máy A',
            user: 'Nguyễn Văn A',
            department: 'Kỹ thuật',
            attachments: [],
            createdAt: '2024-06-10T12:00:00Z'
          },
          {
            id: 2,
            title: 'Họp với khách hàng về dự án xử lý nước thải',
            description: 'Thảo luận về yêu cầu kỹ thuật và tiến độ dự án',
            date: '2024-06-11',
            startTime: '14:00',
            endTime: '16:00',
            location: 'Văn phòng công ty',
            user: 'Trần Thị B',
            department: 'Tư vấn',
            attachments: [],
            createdAt: '2024-06-11T16:30:00Z'
          }
        ];
        
        this.saveJournals();
      },
      
      // Cập nhật nhật ký
      updateJournal: function(id, updatedData) {
        const index = journals.findIndex(journal => journal.id === id);
        
        if (index !== -1) {
          // Cập nhật thông tin nhật ký
          journals[index] = {
            ...journals[index],
            ...updatedData,
            updatedAt: new Date().toISOString()
          };
          
          // Lưu vào localStorage
          this.saveJournals();
          
          return {
            success: true,
            journal: journals[index],
            message: 'Cập nhật nhật ký thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy nhật ký'
        };
      },
      
      // Xóa nhật ký
      deleteJournal: function(id) {
        const index = journals.findIndex(journal => journal.id === id);
        
        if (index !== -1) {
          journals.splice(index, 1);
          
          // Lưu vào localStorage
          this.saveJournals();
          
          return {
            success: true,
            message: 'Xóa nhật ký thành công'
          };
        }
        
        return {
          success: false,
          message: 'Không tìm thấy nhật ký'
        };
      },
      
      // Tìm kiếm nhật ký
      searchJournals: function(query) {
        if (!query) return journals;
        
        query = query.toLowerCase();
        return journals.filter(journal => 
          journal.title.toLowerCase().includes(query) || 
          journal.description.toLowerCase().includes(query) ||
          journal.location.toLowerCase().includes(query) ||
          journal.user.toLowerCase().includes(query) ||
          journal.department.toLowerCase().includes(query)
        );
      },
      
      // Render danh sách nhật ký
      renderJournalsList: function(containerId, journals) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (journals.length === 0) {
          container.innerHTML = '<div class="empty-state">Không có nhật ký nào</div>';
          return;
        }
        
        let html = '';
        journals.forEach(journal => {
          html += `
            <div class="journal-card" data-id="${journal.id}">
              <div class="journal-header">
                <h3 class="journal-title">${journal.title}</h3>
                <div class="journal-actions">
                  <button class="btn-edit" onclick="JournalsUI.editJournal(${journal.id})"><i class="fas fa-edit"></i></button>
                  <button class="btn-delete" onclick="JournalsUI.deleteJournal(${journal.id})"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div class="journal-date">
                <i class="fas fa-calendar"></i> ${formatDate(journal.date)} (${journal.startTime} - ${journal.endTime})
              </div>
              <div class="journal-location">
                <i class="fas fa-map-marker-alt"></i> ${journal.location}
              </div>
              <p class="journal-description">${journal.description}</p>
              <div class="journal-footer">
                <div class="journal-user">
                  <i class="fas fa-user"></i> ${journal.user}
                </div>
                <div class="journal-department">
                  <i class="fas fa-building"></i> ${journal.department}
                </div>
              </div>
            </div>
          `;
        });
        
        container.innerHTML = html;
      }
    };
})();

// UI Module cho nhật ký công việc
const JournalsUI = (function() {
    // Private variables
    let currentJournalId = null;
    
    // Public API
    return {
      // Khởi tạo trang nhật ký
      init: function() {
        // Tải nhật ký từ localStorage
        JournalsModule.loadJournals();
        
        // Nếu không có nhật ký, tạo dữ liệu mẫu
        if (JournalsModule.getJournals().length === 0) {
          JournalsModule.generateSampleJournals();
        }
        
        // Render danh sách nhật ký
        this.renderJournals();
        
        // Khởi tạo sự kiện
        this.initEvents();
      },
      
      // Khởi tạo sự kiện
      initEvents: function() {
        // Sự kiện tìm kiếm
        const searchInput = document.getElementById('journal-search');
        if (searchInput) {
          searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            const filteredJournals = JournalsModule.searchJournals(query);
            JournalsModule.renderJournalsList('journals-container', filteredJournals);
          });
        }
        
        // Sự kiện lọc theo ngày
        const dateFilter = document.getElementById('journal-date-filter');
        if (dateFilter) {
          dateFilter.addEventListener('change', function() {
            JournalsUI.filterJournalsByDate(this.value);
          });
        }
        
        // Sự kiện nút tạo nhật ký mới
        const createBtn = document.getElementById('btn-create-journal');
        if (createBtn) {
          createBtn.addEventListener('click', function() {
            JournalsUI.showJournalForm();
          });
        }
        
        // Sự kiện submit form
        const journalForm = document.getElementById('journal-form');
        if (journalForm) {
          journalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            JournalsUI.saveJournal();
          });
        }
      },
      
      // Render danh sách nhật ký
      renderJournals: function() {
        const journals = JournalsModule.getJournals();
        JournalsModule.renderJournalsList('journals-container', journals);
      },
      
      // Lọc nhật ký theo ngày
      filterJournalsByDate: function(dateValue) {
        let filteredJournals = [];
        
        if (dateValue === 'all') {
          filteredJournals = JournalsModule.getJournals();
        } else if (dateValue === 'today') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          filteredJournals = JournalsModule.getJournals(today.toISOString(), tomorrow.toISOString());
        } else if (dateValue === 'week') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          
          filteredJournals = JournalsModule.getJournals(weekAgo.toISOString(), today.toISOString());
        } else if (dateValue === 'month') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          
          filteredJournals = JournalsModule.getJournals(monthAgo.toISOString(), today.toISOString());
        }
        
        JournalsModule.renderJournalsList('journals-container', filteredJournals);
      },
      
      // Hiển thị form tạo/chỉnh sửa nhật ký
      showJournalForm: function(journalId) {
        currentJournalId = journalId;
        
        // Hiển thị modal
        const modal = document.getElementById('journal-modal');
        if (modal) {
          modal.style.display = 'flex';
        }
        
        // Nếu là chỉnh sửa, điền thông tin vào form
        if (journalId) {
          const journals = JournalsModule.getJournals();
          const journal = journals.find(j => j.id === journalId);
          
          if (journal) {
            document.getElementById('journal-title').value = journal.title;
            document.getElementById('journal-description').value = journal.description;
            document.getElementById('journal-date').value = journal.date;
            document.getElementById('journal-start-time').value = journal.startTime;
            document.getElementById('journal-end-time').value = journal.endTime;
            document.getElementById('journal-location').value = journal.location;
            document.getElementById('journal-user').value = journal.user;
            document.getElementById('journal-department').value = journal.department;
          }
        } else {
          // Reset form nếu là tạo mới
          document.getElementById('journal-form').reset();
        }
      },
      
      // Lưu nhật ký
      saveJournal: function() {
        const journalData = {
          title: document.getElementById('journal-title').value,
          description: document.getElementById('journal-description').value,
          date: document.getElementById('journal-date').value,
          startTime: document.getElementById('journal-start-time').value,
          endTime: document.getElementById('journal-end-time').value,
          location: document.getElementById('journal-location').value,
          user: document.getElementById('journal-user').value,
          department: document.getElementById('journal-department').value
        };
        
        if (currentJournalId) {
          // Cập nhật nhật ký
          JournalsModule.updateJournal(currentJournalId, journalData);
        } else {
          // Thêm nhật ký mới
          JournalsModule.addJournal(journalData);
        }
        
        // Đóng modal
        const modal = document.getElementById('journal-modal');
        if (modal) {
          modal.style.display = 'none';
        }
        
        // Render lại danh sách
        this.renderJournals();
      },
      
      // Chỉnh sửa nhật ký
      editJournal: function(journalId) {
        this.showJournalForm(journalId);
      },
      
      // Xóa nhật ký
      deleteJournal: function(journalId) {
        if (confirm('Bạn có chắc chắn muốn xóa nhật ký này?')) {
          JournalsModule.deleteJournal(journalId);
          this.renderJournals();
        }
      },
      
      // Render trang nhật ký
      renderJournalsPage: function() {
        return `
          <div class="journals-page">
            <div class="journal-header">
              <h3>Nhật ký công việc</h3>
              <button id="btn-create-journal" class="btn-create-report">
                <i class="fas fa-plus"></i> Tạo nhật ký mới
              </button>
            </div>
            
            <div class="journal-filter">
              <div class="filter-group">
                <label for="journal-search">Tìm kiếm</label>
                <input type="text" id="journal-search" placeholder="Nhập từ khóa...">
              </div>
              
              <div class="filter-group">
                <label for="journal-date-filter">Thời gian</label>
                <select id="journal-date-filter">
                  <option value="all">Tất cả</option>
                  <option value="today">Hôm nay</option>
                  <option value="week">7 ngày qua</option>
                  <option value="month">30 ngày qua</option>
                </select>
              </div>
            </div>
            
            <div id="journals-container" class="journals-container">
              <!-- Danh sách nhật ký sẽ được render ở đây -->
            </div>
            
            <!-- Modal form tạo/chỉnh sửa nhật ký -->
            <div id="journal-modal" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Nhật ký công việc</h3>
                  <button class="btn-close" onclick="document.getElementById('journal-modal').style.display='none'">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                
                <form id="journal-form" class="journal-form">
                  <div class="form-group">
                    <label for="journal-title">Tiêu đề</label>
                    <input type="text" id="journal-title" required>
                  </div>
                  
                  <div class="form-group">
                    <label for="journal-description">Mô tả</label>
                    <textarea id="journal-description" rows="4"></textarea>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="journal-date">Ngày</label>
                      <input type="date" id="journal-date" required>
                    </div>
                    
                    <div class="form-group">
                      <label for="journal-start-time">Thời gian bắt đầu</label>
                      <input type="time" id="journal-start-time" required>
                    </div>
                    
                    <div class="form-group">
                      <label for="journal-end-time">Thời gian kết thúc</label>
                      <input type="time" id="journal-end-time" required>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="journal-location">Địa điểm</label>
                    <input type="text" id="journal-location" required>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="journal-user">Người thực hiện</label>
                      <input type="text" id="journal-user" required>
                    </div>
                    
                    <div class="form-group">
                      <label for="journal-department">Phòng ban</label>
                      <input type="text" id="journal-department" required>
                    </div>
                  </div>
                  
                  <div class="form-actions">
                    <button type="button" class="btn-cancel" onclick="document.getElementById('journal-modal').style.display='none'">Hủy</button>
                    <button type="submit" class="btn-save">Lưu</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        `;
      }
    };
})();

// Khởi tạo module khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo module nếu đang ở trang nhật ký
  if (window.location.hash === '#journals') {
    JournalsUI.init();
  }
});