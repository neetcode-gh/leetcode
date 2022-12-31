def missing_number(nums)
  missing = 0
  (0..nums.length).each do |i|
    nbr = (nums[i].nil? ? 0 : nums[i])
    missing += (i - nbr)
  end
  missing
end

#  Solution using Gauss summation
def missing_number(nums)
  gauss = (nums.length / 2.0) * (nums.length + 1)
  nums.each { |n| gauss -= n }
  gauss.to_i
end
