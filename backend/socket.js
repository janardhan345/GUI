 const socket = io("http://localhost:3000");
      socket.on('port_detected', (data) => {
  console.log('Port detected:', data.port);
  document.getElementById('port-display').textContent = data.port;
});


      socket.on('serial_config', (config) => {
        const baudElem = document.getElementById('baudRate');
        const portElem = document.getElementById('port');
        if (baudElem) baudElem.textContent = config.baudRate;
        if (portElem) portElem.textContent = config.port;
      });

      let isReceivingSignals = false; 
      const toggleCheckbox = document.getElementById('checkboxInput');
      const statusElement = document.getElementById("status");


      if (toggleCheckbox) {
        toggleCheckbox.checked = false; 
        
        toggleCheckbox.addEventListener('change', function() {
          isReceivingSignals = this.checked;
          
          if (isReceivingSignals) {
            statusElement.textContent = "STATUS: CONNECTED";
            statusElement.style.color = "#22c55e"; 
            console.log("Signal reception ENABLED");
          } else {
            statusElement.textContent = "STATUS: SIGNAL PAUSED";
            statusElement.style.color = "#f59e0b"; 
            console.log("Signal reception DISABLED");
          }
        });
      }

      socket.on("connect", () => {
        if (isReceivingSignals) {
          statusElement.textContent = "STATUS: CONNECTED";
          statusElement.style.color = "#22c55e";
          console.log("status: connected");
        }
      });

      socket.on("new_data", (data) => {
        if (!isReceivingSignals) {
          return; 
        } });


