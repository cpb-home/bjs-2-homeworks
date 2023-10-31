//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];
  const maxCacheValuesCount = 5;
  return (...args) => {
    const hash = md5(args);
    const currentArg = cache.find((cachedItem) => cachedItem[hash]);
    if (currentArg) {
      return `Из кеша: ${currentArg[hash]}`;
    }

    const result = func(...args);
    if (cache.length < 5) {
      cache.push({[hash]: result});
    } else {
      cache.shift();
      cache.push({[hash]: result});
    }
    return `Вычисляем: ${result}`;
  };
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  wrapper.allCount = 0;
  wrapper.count = 0;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    } else {
      wrapper.count++;
      func(...args);
    }
    wrapper.allCount++;
    timeoutId = setTimeout(() => {
      wrapper.count++;
      func(...args);
    }, delay);
  }

  return wrapper;
}
