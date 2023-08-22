def max_sub_array(nums)
  max_sub = nums[0]
  current_sum = 0

  nums.each do |num|
    current_sum = 0 if current_sum < 0
    current_sum += num
    max_sub = [max_sub,current_sum].max
  end
  return max_sub
end