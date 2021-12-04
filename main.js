const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutid;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    
    timer.textContent = `${m}:${s}`;

    timeoutid = setTimeout(() => {
      
      countUp();
    }, 10);
  }
  
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive')
    
  }
  
  // 状態:タイマー動作中
  function setButtonStateRunning() {
    start.classList.add('inactive')
    stop.classList.remove('inactive');
    reset.classList.add('inactive')
  }
  
  // 状態:タイマー停止中
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive')
    reset.classList.remove('inactive');
  }
  
  
  setButtonStateInitial()
  
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    
    setButtonStateStopped();
    clearTimeout(timeoutid);
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    
    setButtonStateInitial()
    timer.textContent = '00:00';
    elapsedTime = 0;
  });
