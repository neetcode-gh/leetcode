function partition(s) {
  let res = [];
  let part = [];

  function dfs(i) {
    if (i >= s.length) {
      res.push(part.slice());
      return;
    }

    for (let j = i; j < s.length; j++) {
      if (isPali(s, i, j)) {
        part.push(s.slice(i, j + 1));
        dfs(j + 1);
        part.pop();
      }
    }
  }

  dfs(0);
  return res;

  function isPali(s, l, r) {
    while (l < r) {
      if (s[l] != s[r]) {
        return false;
      }
      l = l + 1;
      r = r - 1;
    }
    return true;
  }
}
