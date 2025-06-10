function createUsageChart() {
  const ctx = document.getElementById('usageChart').getContext('2d');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dữ liệu 1',
        data: [30, 65, 45, 70, 55, 40],
        backgroundColor: '#4169e1',
        borderRadius: 5,
        barThickness: 15,
      },
      {
        label: 'Dữ liệu 2',
        data: [45, 50, 65, 35, 60, 35],
        backgroundColor: '#00b894',
        borderRadius: 5,
        barThickness: 15,
      },
      {
        label: 'Dữ liệu 3',
        data: [55, 40, 60, 45, 50, 30],
        backgroundColor: '#54a0ff',
        borderRadius: 5,
        barThickness: 15,
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 4]
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };
  
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}

// Biểu đồ tiến độ công việc
function createProgressChart() {
  const progressChartElement = document.getElementById('progressChart');
  
  if (progressChartElement) {
    const progressChart = new Chart(progressChartElement, {
      type: 'line',
      data: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Hoàn thành',
            data: [2, 3, 5, 7, 9, 10, 12],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Đang thực hiện',
            data: [5, 4, 3, 5, 4, 3, 3],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Quá hạn',
            data: [1, 2, 1, 0, 1, 2, 2],
            borderColor: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
}

// Khởi tạo biểu đồ khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra xem element có tồn tại không trước khi tạo biểu đồ
  if (document.getElementById('usageChart')) {
    createUsageChart();
  }
  
  if (document.getElementById('progressChart')) {
    createProgressChart();
  }
});
function initCharts() {
  // Kiểm tra xem element có tồn tại không trước khi tạo biểu đồ
  if (document.getElementById('usageChart')) {
    createUsageChart();
  }
  
  if (document.getElementById('progressChart')) {
    createProgressChart();
  }
}
// Màu sắc cho biểu đồ
const chartColors = [
  '#0066B3', // Xanh dương đậm
  '#54a0ff', // Xanh dương nhạt
  '#81ecec'  // Xanh dương rất nhạt
];
