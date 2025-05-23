// Mock API sử dụng localStorage
const mockApi = {
    // Khởi tạo dữ liệu mẫu nếu chưa có
    init: function() {
      if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(initialData.tasks));
      }
      if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(initialData.projects));
      }
      if (!localStorage.getItem('reports')) {
        localStorage.setItem('reports', JSON.stringify(initialData.reports));
      }
      if (!localStorage.getItem('journals')) {
        localStorage.setItem('journals', JSON.stringify(initialData.journals));
      }
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(initialData.users));
      }
      if (!localStorage.getItem('notifications')) {
        localStorage.setItem('notifications', JSON.stringify(initialData.notifications));
      }
      if (!localStorage.getItem('meetings')) {
        localStorage.setItem('meetings', JSON.stringify(initialData.meetings));
      }
    },
  
    // Lấy tất cả dữ liệu của một loại
    getAll: function(type) {
      const data = localStorage.getItem(type);
      return data ? JSON.parse(data) : [];
    },
  
    // Lấy một mục theo ID
    getById: function(type, id) {
      const items = this.getAll(type);
      return items.find(item => item.id === id);
    },
  
    // Thêm mục mới
    add: function(type, item) {
      const items = this.getAll(type);
      // Tạo ID mới
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      const newItem = { ...item, id: newId, createdAt: new Date().toISOString() };
      items.push(newItem);
      localStorage.setItem(type, JSON.stringify(items));
      return newItem;
    },
  
    // Cập nhật mục
    update: function(type, id, updates) {
      const items = this.getAll(type);
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index] = { 
          ...items[index], 
          ...updates, 
          updatedAt: new Date().toISOString() 
        };
        localStorage.setItem(type, JSON.stringify(items));
        return items[index];
      }
      return null;
    },
  
    // Xóa mục
    delete: function(type, id) {
      const items = this.getAll(type);
      const filteredItems = items.filter(item => item.id !== id);
      localStorage.setItem(type, JSON.stringify(filteredItems));
      return id;
    },
  
    // Lọc dữ liệu theo điều kiện
    filter: function(type, filterFn) {
      const items = this.getAll(type);
      return items.filter(filterFn);
    }
  };