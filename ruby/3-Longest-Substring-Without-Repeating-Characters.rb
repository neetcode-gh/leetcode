def length_of_longest_substring(s)
  return 1 if s.length == 1
  return 0 if s.length.zero?

  window = []
  appear = {}
  max = 0
  s.each_char do |c|
    appear.delete(window.shift) while appear.key?(c) if appear.key?(c)
    window << c
    appear[c] = c
    max = window.length if window.length > max
  end
  max
end
