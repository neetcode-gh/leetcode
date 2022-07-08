function countSubstrings(s: string): number {
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    let l = i;
    let r = i;

    while (l >= 0 && r < s.length && s[l] === s[r]) {
      res += 1;
      l -= 1;
      r += 1;
    }

    l = i;
    r = i + 1;

    while (l >= 0 && r < s.length && s[l] === s[r]) {
      res += 1;
      l -= 1;
      r += 1;
    }
  }

  return res;
}
