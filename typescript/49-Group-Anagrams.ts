function groupAnagrams(strs: string[]): string[][] {
  const hash: { [key: string]: string[] } = {}

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i].split("").sort().join("")
    if (hash[str]) hash[str].push(strs[i])
    else hash[str] = [strs[i]]
  }
  return Object.values(hash)
}
