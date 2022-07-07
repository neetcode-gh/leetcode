function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  const object: { [key: string]: number } = {}

  for (let i = 0; i < s.length; i++) {
    if (s[i] in object) object[s[i]] += 1
    else object[s[i]] = 1
  }

  for (let i = 0; i < t.length; i++) {
    if (object[t[i]]) object[t[i]]--
    else return false
  }

  return true
}
