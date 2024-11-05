//Time Complexity -> O(n)
//Space Complexity -> O(n)
function findAnagrams(s: string, p: string): number[] {
  if (p.length > s.length) return [];

  const anagramIndexes: number[] = [];
  const pCount = new Map<string, number>();
  const sCount = new Map<string, number>();
  for (const char of p) pCount.set(char, (pCount.get(char) || 0) + 1);
  for (let i = 0; i < p.length; i++) sCount.set(s[i], (sCount.get(s[i]) || 0) + 1);

  let l = 0;
  let r = p.length - 1;
  while (r < s.length) {
    let isAnagram = true;
    for (const [char, count] of pCount) {
      if (!sCount.has(char) || sCount.get(char) !== count) {
        isAnagram = false;
        break;
      }
    }
    if (isAnagram) anagramIndexes.push(l);

    sCount.set(s[l], (sCount.get(s[l]) || 1) - 1);
    if (sCount.get(s[l]) === 0) sCount.delete(s[l]);
    l++;

    r++;
    sCount.set(s[r], (sCount.get(s[r]) || 0) + 1);
  }

  return anagramIndexes;
}
