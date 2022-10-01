def max_sub_array(nums)
    sum = 0
    max = -10 * 10 * 10 * 10 - 1

    nums.each do |num|
        sum += num
        max = sum > max ? sum : max

        sum = 0 if  sum < 0
    end 

    max
end
