def character_replacement(s, k)
  return 0 if s.length.zero?
  return 1 if s.length == 1

  max = 0
  window = []
  dict = Hash.new(0)
  left = 0
  right = left
  while true
    break if s[right].nil?

    char = s[right]
    window << char
    dict[char] += 1
    until window.length - highest_freq(dict) <= k
      dict[window.shift] -= 1
      left += 1
    end
    max = window.length if window.length > max
    right += 1
  end
  max
end

def highest_freq(dict)
  max = 0
  dict.each { |_k, v| max = v if v > max }
  max
end
