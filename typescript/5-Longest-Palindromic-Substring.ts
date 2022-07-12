function longestPalindrome(s: string): string {
  let res = "";
  let resLen = 0;

  for (let i = 0; i < s.length; i++) {
    let l = i;
    let r = i;

    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > resLen) {
        res = s.slice(l, r + 1);
        resLen = r - l + 1;
      }

      l -= 1;
      r += 1;
    }

    l = i;
    r = i + 1;

    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > resLen) {
        res = s.slice(l, r + 1);
        resLen = r - l + 1;
      }

      l -= 1;
      r += 1;
    }
  }

  return res;
}
