
def is_subsequence(s, t)
  s_ptr = 0
  t_ptr = 0

  while s_ptr < s.length && t_ptr < t.length
    if s[s_ptr] == t[t_ptr]
      s_ptr += 1
    end
    t_ptr += 1
  end

  s_ptr == s.length
end

# Test Cases
puts is_subsequence("abc", "ahbgdc")  # Output: true
puts is_subsequence("axc", "ahbgdc")  # Output: false
