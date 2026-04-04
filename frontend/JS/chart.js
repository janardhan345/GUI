// Charts Section 

const chartColors = {  
      temperature: 'orange',
      pressure: '#10b981',
      altitude: '#3b82f6',
      humidity: 'yellow'
    };
    const chartUnits = {
      temperature: '°C',
      pressure: 'hPa',
      altitude: 'm',
      humidity: '%'
    };

    function createRealtimeChart(id, label, color, unit) {
      return new Chart(document.getElementById(id), {
        type: 'line',
        data: {
          datasets: [{
            label,
            borderColor: color,
            backgroundColor: color,
            borderWidth: 2,
            data: []
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration: 5000, // Show last 5 seconds for 1Hz
                refresh: 1000,   // Update every 1000ms (1Hz)
                delay: 1000      // 1000ms delay for late data
              },
              ticks: { display: false,
               }
            },
            y: {
              ticks: {
                color,
                callback: val => `${val} ${unit}`
              }
            }
          },
          plugins: {
            legend: { labels: { color } }
          }
        }
      });
    }

    // Initialize line charts
    const charts = {
      temperature: createRealtimeChart("temperatureChart", "Temperature", chartColors.temperature, chartUnits.temperature),
      pressure: createRealtimeChart("pressureChart", "Pressure", chartColors.pressure, chartUnits.pressure),
      altitude: createRealtimeChart("altitudeChart", "Altitude", chartColors.altitude, chartUnits.altitude),
      humidity: createRealtimeChart("humidityChart", "Humidity", chartColors.humidity, chartUnits.humidity)
    };

    // Limit decimals for pressure chart y-axis to 3
    charts.pressure.options.scales.y.ticks.callback = function(val) {
      return parseFloat(val).toFixed(3) + ' ' + chartUnits.pressure;
    };

      // Initialize packet count display
      document.getElementById("packetCount").textContent = "0";

    document.addEventListener("DOMContentLoaded", function() {

      const batteryVoltageChart = new Chart(document.getElementById('batteryVoltageChart'), {
        type: 'bar',
        data: {
          labels: ['Voltage'],
          datasets: [{
            data: [0],
            backgroundColor: '#3b82f6',
            borderColor: '#3b82f6',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: false },
            y: { beginAtZero: true, max: 5, ticks: { color: '#ffffff' } }
          }
        }
      });

      const batteryCurrentChart = new Chart(document.getElementById('batteryCurrentChart'), {
        type: 'bar',
        data: {
          labels: ['Current'],
          datasets: [{
            data: [0],
            backgroundColor: '#f97316',
            borderColor: '#f97316',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: false },
            y: { beginAtZero: true, max: 2000, ticks: { color: '#ffffff' } }
          }
        }
      });

      const powerChart = new Chart(document.getElementById('powerChart'), {
        type: 'bar',
        data: {
          labels: ['Power'],
          datasets: [{
            data: [0],
            backgroundColor: '#10b981',
            borderColor: '#10b981',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: false },
            y: { beginAtZero: true, max: 10, ticks: { color: '#ffffff' } }
          }
        }
      });

      function vectorMagnitude(x, y, z) {
        return Math.sqrt(x * x + y * y + z * z).toFixed(2);
      }
      const axisColors = { x: '#f87171', y: '#60a5fa', z: '#34d399' };
      function create3AxisChart(id, label, unit) {
        return new Chart(document.getElementById(id), {
          type: 'line',
          data: {
            datasets: [
              { label: label + ' X', borderColor: axisColors.x, backgroundColor: axisColors.x + '33', data: [], borderWidth: 2, pointRadius: 0 },
              { label: label + ' Y', borderColor: axisColors.y, backgroundColor: axisColors.y + '33', data: [], borderWidth: 2, pointRadius: 0 },
              { label: label + ' Z', borderColor: axisColors.z, backgroundColor: axisColors.z + '33', data: [], borderWidth: 2, pointRadius: 0 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
              x: { type: 'realtime', realtime: { duration: 5000, refresh: 1000, delay: 1000 }, ticks: { display: false } },
              y: { ticks: { color: '#fff', callback: val => `${val} ${unit}` } }
            },
            plugins: { legend: { labels: { color: '#fff' } } }
          }
        });
      }
      const accelChart = create3AxisChart('accelChart', 'Accel', 'm/s²');
      const gyroChart = create3AxisChart('gyroChart', 'Gyro', '°/s');
      const magChart = create3AxisChart('magChart', 'Mag', 'μT');
    });