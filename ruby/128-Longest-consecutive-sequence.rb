# @param {Integer[]} nums
# @return {Integer}
def longest_consecutive(nums)
  nums_set = nums.to_set
  longestvalue = 0
  consecutivevalue = 0
  nums.each do |value|
    if (nums_set.include?(value - 1) == false)
      while (nums_set.include?(value + consecutivevalue))
        consecutivevalue += 1
      end
      longestvalue = [longestvalue, consecutivevalue].max
      consecutivevalue = 0
    end
  end
  return longestvalue
end
