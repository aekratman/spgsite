const batteryFrame = document.getElementById('batteryFrame');
    const batteryUnit = document.getElementById('batteryUnit');
    const percentText = document.getElementById('percentText');
    const statusText = document.getElementById('statusText');
    const spgStatusText = document.getElementById('spgStatusText');
    const voltageText = document.getElementById('voltage');
    const toggleChargeBtn = document.getElementById('toggleChargeBtn');
    const drainBtn = document.getElementById('drainBtn');

    const totalCells = 10;
    let chargeLevel = 25;
    let isCharging = true;



    statusList = ["one test", "two test", "red test", "blue test"]
    let currentIndex = 0; 
      currentIndex = (currentIndex + 1) % statusList.length;
      let spgStatus = statusList[currentIndex];

// energy cells --> add to battery frame
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      batteryFrame.appendChild(cell);
    }

    const cells = document.querySelectorAll('.cell');

    function updateHUD() {
      let color = 'var(--hud-cyan)';
      let status = isCharging ? 'CHARGING // ACTIVE' : 'STANDBY // STABLE';

      
    

      if (chargeLevel <= 20) {
        color = 'var(--hud-red)';
        status = isCharging ? 'CRITICAL // RECHARGING' : 'WARNING // LOW POWER';
      } else if (chargeLevel <= 50) {
        color = 'var(--hud-amber)';
      } else if (chargeLevel === 100) {
        status = 'CORE // FULL CAPACITY';
      }

      document.documentElement.style.setProperty('--active-color', color);

      // Toggle laser scanline animation
      if (isCharging && chargeLevel < 100) {
        batteryUnit.classList.add('charging');
      } else {
        batteryUnit.classList.remove('charging');
      }

      // Light up active cells
      const activeCount = Math.ceil((chargeLevel / 100) * totalCells);
      cells.forEach((cell, index) => {
        cell.classList.remove('active', 'pulse');
        if (index < activeCount) {
          cell.classList.add('active');
          // Pulse the leading cell while charging
          if (isCharging && index === activeCount - 1 && chargeLevel < 100) {
            cell.classList.add('pulse');
          }
        }
      });

      percentText.textContent = `${chargeLevel}%`;
      statusText.textContent = status;
      spgStatusText.textContent = spgStatus;
      voltageText.textContent = `${(10.5 + (chargeLevel / 100) * 4.3).toFixed(1)}V`;
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    //  loop

let targetRabbitVal = null;
let cycleCount = 0;

// Adjust this to control how fast the number counts up or down per second
const stepSize = 2; 

setInterval(() => {
    if (isCharging && chargeLevel < 100) {
        if (targetRabbitVal === null || Math.abs(chargeLevel - targetRabbitVal) < 0.01) {
            if (targetRabbitVal !== null && cycleCount < 10) {
                const minBounce = targetRabbitVal * 0.9;
                const maxBounce = targetRabbitVal * 1.10;
                targetRabbitVal = getRandomArbitrary(minBounce, maxBounce);
                cycleCount++;
            } else {
                targetRabbitVal = getRandomArbitrary(20, 70);
                cycleCount = 1;
            }
            targetRabbitVal = Math.min(100, Math.round(targetRabbitVal * 100) / 100);
        }

        // 2. Count up or down toward targetRabbitVal
        if (chargeLevel < targetRabbitVal) {
            chargeLevel = Math.min(targetRabbitVal, chargeLevel + stepSize);
        } else if (chargeLevel > targetRabbitVal) {
            chargeLevel = Math.max(targetRabbitVal, chargeLevel - stepSize);
        }

        // Keep clean 2-decimal precision
        chargeLevel = Math.round(chargeLevel * 100) / 100;
        updateHUD();

    } else if (!isCharging && chargeLevel > 0) {
        chargeLevel = Math.max(0, chargeLevel - 1);
        targetRabbitVal = null;
        cycleCount = 0;
        updateHUD();
    }
}, 1000);


    toggleChargeBtn.addEventListener('click', () => {
      isCharging = !isCharging;
      toggleChargeBtn.textContent = isCharging ? 'PAUSE CHARGE' : 'RESUME CHARGE';
      updateHUD();
    });

    drainBtn.addEventListener('click', () => {
      chargeLevel = Math.max(0, chargeLevel - 20);
      updateHUD();
    });

    updateHUD();


