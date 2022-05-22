var isAnagram = function(s, t) {
  if (s.length !== t.length) {
      return false
  }
  const ss = Array.from(s).reduce((prev, curr) => {
      if (!prev[curr]) {
          prev[curr] = 1
      } else {
          prev[curr] += 1
      }
      return prev
  }, {});
  const tt = Array.from(t).reduce((prev, curr) => {
      if (!prev[curr]) {
          prev[curr] = 1
      } else {
          prev[curr] += 1
      }
      return prev
  }, {});
  for (let char of t) {
      if (tt[char] !== ss[char]) {
          return false
      }            
  }
  return true
};

console.log(isAnagram('cal', 'lac'))

