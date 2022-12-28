def group_anagrams(strs)
  anagrams = Hash.new { |h, k| h[k] = [] }
  strs.each do |str|
    hash = Hash.new(0)
    str.each_char { |c| hash[c] += 1 }
    anagrams[hash] << str
  end
  anagrams.values
end
