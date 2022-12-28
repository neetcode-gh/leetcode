def two_sum(nums, target)
  hash = {}
  nums.each_with_index do |num, idx|
    return [hash[num], idx] if hash.key? num

    hash[target - num] = idx
  end
  nil
end
