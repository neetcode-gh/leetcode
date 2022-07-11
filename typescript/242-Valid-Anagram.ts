function isAnagram(s: string, t: string) {
  if (s.length !== t.length) return false;

  let first: Array<string | null> = s.split("");
  const second = t.split("");

  for (let i = 0; i < second.length; i++) {
    const element = second[i];

    let found = first.indexOf(element);

    if (found !== -1) {
      first[found] = null;
    } else {
      return false;
    }
  }

  return true;
}
