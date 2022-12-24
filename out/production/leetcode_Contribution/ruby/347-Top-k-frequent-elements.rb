def top_k_frequent(nums, k)
  hash = Hash.new(0)
  max_freq = 0
  nums.each do |num|
    hash[num] += 1
    max_freq = hash[num] if hash[num] > max_freq
  end
  counts = Array.new(max_freq + 1) { [] }
  hash.each { |k, v| counts[v] << k }
  top_k = []
  max_freq.downto(1) do |n|
    return top_k if k <= 0
    next if counts[n].empty?

    top_k.concat(counts[n].take(k))
    k -= counts[n].length
  end
  top_k
end
