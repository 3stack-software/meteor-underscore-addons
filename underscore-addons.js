
_.sortedIndexCmp = function(array, obj, cmp, context) {
  var high, low, mid;
  low = 0;
  high = array.length;
  while (low < high) {
    mid = (low + high) >>> 1;
    if (cmp.call(context, array[mid], obj) < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

if (!_.now) {
  //XX - from underscore 1.6.0
  _.now = Date.now || function () {
    return new Date().getTime();
  };
}
_.stoppableThrottle = function Throttle_constructor(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  var stopped = false;
  options || (options = {});

  var later = function Throttle_later() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  var fn = function Throttle_fn() {
    if(stopped) return;
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  fn.stop = function Throttle_stop(){
    if (timeout){
      clearTimeout(timeout);
      timeout = null;
    }
    stopped = true;
  };
  return fn;
};

_.stoppableDebounce = function Debounce_constructor(func, wait) {
  var timeout, args, context, timestamp, result;
  var stopped = false;

  var later = function Debounce_later() {
    if (stopped) return;
    var last = _.now() - timestamp;
    if (last < wait) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    }
  };

  var fn = function Debounce_fn() {
    if (stopped) return;
    context = this;
    args = arguments;
    timestamp = _.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };

  fn.stop = function Debounce_stop(){
    if(timeout){
      clearTimeout(timeout);
      timeout = null;
    }
    stopped = true
  };
  return fn;
};
