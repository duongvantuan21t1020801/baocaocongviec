// Khởi tạo biểu đồ
function initCharts() {
  // Biểu đồ tiến độ công việc
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