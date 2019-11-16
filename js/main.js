$(function() {
  var $div = $('#div'),
    $wrap = $('.operate-wrap'),
    $time = $('.time-wrap'),
    timer = null,
    timestamp = 0, // 计时
    clientWidth = window.innerWidth - 100,
    clientHeight = window.innerHeight,
    config = {
      algorithm: 'linear', // 策略
      startPosition: 0, // 动画开始位置
      endPosition: 1000, // 动画结束位置
      duration: 3000, // 动画持续时间
      propertyName: 'left', // 属性
    };
  var startPositionSideBar, endPositionSideBar, durationSideBar; // sidebar实例

  var animate = new Animate($div.get(0), () => {
    pauseTime();
  });
  // animate.start( 'top', 1500, 500, 'strongEaseIn' );

  $wrap.on('click', '#start', () => {
    initPosition();
    console.log('startPosition=', config.startPosition);
    console.log('endPosition=', config.endPosition);
    console.log('duration=', config.duration);
    console.log('algorithm=', config.algorithm);
    startTimer();
    $time.text('0s');
    animate.start(
      config.propertyName,
      config.endPosition,
      config.duration,
      config.algorithm,
    );
  });

  var timer = null;
  // 启动计时器
  function startTimer() {
    if (timer) return;
    timestamp = 0;
    timer = setInterval(() => {
      timestamp++;
      $time.text(timestamp + 's');
    }, 1000);
  }

  // 重置计时器
  function resetTimer() {
    $time.text('');
    clearInterval(timer);
    timer = null;
  }

  // 暂停时间计时器
  function pauseTime() {
    clearInterval(timer);
    timer = null;
  }

  // 重置
  $wrap.on('click', '#reset', () => {
    animate.reset();
    resetTimer();
    config.startPosition = 0;
    config.endPosition = 0;
    config.duration = 0;
    startPositionSideBar.update({
      from: 0,
    });
    endPositionSideBar.update({
      from: 0,
    });
    durationSideBar.update({
      from: 0,
    });
    startPositionSideBar.reset();
    endPositionSideBar.reset();
    durationSideBar.reset();
    startPositionSideBar.update({
      from: 0,
    });
    initPosition();
  });

  $('#algorithmSelect').on('change', function() {
    config.algorithm = $(this).val() || 'strongEaseOut';
  });

  init();

  // 初始化运动位置
  function initPosition() {
    $div.css(config.propertyName, config.startPosition + 'px');
  }

  // 改变开始位置、结束位置、持续时间
  function handleSlide(field, rate, value) {
    config[field] = value.from * rate;
  }

  function init() {
    $('.J_startPosition').ionRangeSlider({
      min: 0,
      max: clientWidth,
      from: config.startPosition,
      grid: true,
      skin: 'sharp',
      onChange: handleSlide.bind(null, 'startPosition', 1),
    });
    startPositionSideBar = $('.J_startPosition').data('ionRangeSlider');
    console.log(startPositionSideBar);
    $('.J_endPosition').ionRangeSlider({
      min: 0,
      max: clientWidth,
      from: config.endPosition,
      grid: true,
      skin: 'round',
      onChange: handleSlide.bind(null, 'endPosition', 1),
    });
    endPositionSideBar = $('.J_endPosition').data('ionRangeSlider');
    durationSideBar = $('.J_duration').ionRangeSlider({
      min: 0,
      max: 20,
      from: Math.floor(config.duration / 1000),
      grid: true,
      postfix: '秒',
      onChange: handleSlide.bind(null, 'duration', 1000),
    });
    durationSideBar = $('.J_duration').data('ionRangeSlider');
  }
});
