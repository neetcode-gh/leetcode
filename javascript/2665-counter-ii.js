/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    let count = init;

    increment = () => ++count;

    decrement = () => --count;

    reset = () => {
      count = init;
      return count;
    }

    return {
      increment,
      decrement, 
      reset
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
