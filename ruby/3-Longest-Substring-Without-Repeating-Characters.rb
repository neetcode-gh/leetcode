def length_of_longest_substring(s)
  return 1 if s.length == 1
  return 0 if s.length.zero?

  window = []
  appear = {}
  max = 0
  s.each_char do |c|
    if appear.key?(c)
      while appear.key?(c)
        appear.delete(window.shift)
      end
    end
    window << c
    appear[c] = c
    max = window.length if window.length > max
  end
  max
end
