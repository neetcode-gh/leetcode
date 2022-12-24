def contains_duplicate(nums)
  hash = {}
  nums.each do |num|
    return true if hash.key? num

    hash[num] = true
  end
  false
end
