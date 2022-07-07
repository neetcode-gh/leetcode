def is_anagram(s, t)
  return false unless s.length == t.length

  hash = Hash.new(0)
  s.each_char.with_index do |_, idx|
    hash[s[idx]] += 1
    hash[t[idx]] -= 1
  end
  hash.all? { |_k, v| v.zero? }
end

# For nlogn time and O(1) space, can sort then check if equal
def is_anagram(s, t)
  s.chars.sort.join == t.chars.sort.join
end
