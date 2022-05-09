# @param {String} s
# @param {String} t
# @return {Boolean}
def is_anagram(s, t)
  if s.length != t.length
    return false
  end

  index = 0; countS = {}; countT = {}

  while index < s.length
    countT[t[index]] = countT[t[index]] == nil ? 1 : 1 + countT[t[index]]
    countS[s[index]] = countS[s[index]] == nil ? 1 : 1 + countS[s[index]]
    index += 1
  end

  countS.each { |key, value| if value != countT[key]; return false end }
  return true
end
