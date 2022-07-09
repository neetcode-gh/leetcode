def single_number(nums)
  nums.inject { |accu, num| accu ^ num }
end
