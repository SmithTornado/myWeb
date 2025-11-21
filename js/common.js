/**
 * @desc JS防抖函数，限制函数高频触发
 * @param {Function} fn - 需防抖的目标回调函数
 * @param {number} delay - 延迟时间（毫秒，默认300ms）
 * @param {boolean} [immediate=false] - 是否立即执行（true：触发时先执行一次，后续延迟防抖；false：触发后延迟执行）
 * @return {Function} 包装后的防抖函数
 * @example 
 * // 输入框搜索防抖
 * const debouncedSearch = debounce((val) => console.log('搜索:', val), 500);
 * input.addEventListener('input', (e) => debouncedSearch(e.target.value));
 */
function debounce(fn, delay = 300, immediate = false) {
  let timer = null; // 存储定时器标识
  return function (...args) {
    // 清除之前的定时器，重置延迟
    clearTimeout(timer);
    // 立即执行模式：首次触发时执行
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    // 重新设置定时器，延迟执行
    timer = setTimeout(() => {
      fn.apply(this, args);
      // 非立即执行模式下，执行后清空定时器（避免immediate重复触发）
      if (!immediate) timer = null;
    }, delay);
  };
}
