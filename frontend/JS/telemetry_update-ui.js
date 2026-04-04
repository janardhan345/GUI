//telemetry to UI update 

        if (data.packet_count !== undefined) {
          document.getElementById("packetCount").textContent = data.packet_count;
        }

        if (data.signal !== undefined) {
          document.getElementById("signal").textContent = `SIGNAL: ${data.signal} dBm`;
        }
        if (data.data_rate !== undefined) {
          document.getElementById("dataRate").textContent = `DATA RATE: ${data.data_rate} kB/s`;
        }

        ["temperature", "pressure", "altitude", "humidity"].forEach(key => {
          if (data[key] && charts[key]) {
            charts[key].data.datasets[0].data.push({
              x: Date.now(),
              y: parseFloat(data[key])
            });
            document.getElementById(key + "Display").textContent = `${data[key]} ${chartUnits[key]}`;
          }
        });
         if (data.battery_voltage !== undefined) {
          batteryVoltageChart.data.datasets[0].data = [parseFloat(data.battery_voltage)];
          batteryVoltageChart.update();
          document.getElementById('voltageDisplay').textContent = `${data.battery_voltage} V`;
        }
        if (data.battery_current !== undefined) {
          batteryCurrentChart.data.datasets[0].data = [parseFloat(data.battery_current)];
          batteryCurrentChart.update();
          document.getElementById('currentDisplay').textContent = `${data.battery_current} mA`;
        }

        if (data.power !== undefined) {
          powerChart.data.datasets[0].data = [parseFloat(data.power)];
          powerChart.update();
          document.getElementById('powerDisplay').textContent = `${data.power} W`;
        }

        if (data.gas_resistance !== undefined) {
          document.getElementById('gasResistance').textContent = data.gas_resistance;
        }

        if (data.accel_x && data.accel_y && data.accel_z) {
          const t = Date.now();
          accelChart.data.datasets[0].data.push({ x: t, y: parseFloat(data.accel_x) });
          accelChart.data.datasets[1].data.push({ x: t, y: parseFloat(data.accel_y) });
          accelChart.data.datasets[2].data.push({ x: t, y: parseFloat(data.accel_z) });
          const mag = vectorMagnitude(+data.accel_x, +data.accel_y, +data.accel_z);
          document.getElementById('accelDisplay').textContent = `|a| = ${mag} m/s²`;
        }

        if (data.gyro_x && data.gyro_y && data.gyro_z) {
          const t = Date.now();
          gyroChart.data.datasets[0].data.push({ x: t, y: parseFloat(data.gyro_x) });
          gyroChart.data.datasets[1].data.push({ x: t, y: parseFloat(data.gyro_y) });
          gyroChart.data.datasets[2].data.push({ x: t, y: parseFloat(data.gyro_z) });
          const mag = vectorMagnitude(+data.gyro_x, +data.gyro_y, +data.gyro_z);
          document.getElementById('gyroDisplay').textContent = `|ω| = ${mag} °/s`;
          //3d sat orientation update 
          updateSatelliteOrientation(data.gyro_x, data.gyro_y, data.gyro_z);
        }
       
        if (data.mag_x && data.mag_y && data.mag_z) {
          const t = Date.now();
          magChart.data.datasets[0].data.push({ x: t, y: parseFloat(data.mag_x) });
          magChart.data.datasets[1].data.push({ x: t, y: parseFloat(data.mag_y) });
          magChart.data.datasets[2].data.push({ x: t, y: parseFloat(data.mag_z) });
          const mag = vectorMagnitude(+data.mag_x, +data.mag_y, +data.mag_z);
          document.getElementById('magDisplay').textContent = `|B| = ${mag} μT`;
        }

         document.getElementById("battery").textContent = `BATTERY: 94%`;

        if (data.latitude && data.longitude) {
          updateMap(data.latitude, data.longitude, data.altitude);
        }

