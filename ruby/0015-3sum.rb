def three_sum(nums)
  sums = []
  nums.sort! # This is to get rid of duplicate solutions
  nums.each_with_index do |num, idx|
    next if idx.positive? && num == nums[idx - 1]

    left = idx + 1
    right = nums.length - 1
    while left < right
      case num + nums[left] + nums[right] <=> 0
      when 1
        right -= 1
      when 0
        sums << [num, nums[left], nums[right]]
        left += 1
        left += 1 while nums[left] == nums[left - 1] && left < right
      when -1
        left += 1
      end
    end
  end
  sums
end
