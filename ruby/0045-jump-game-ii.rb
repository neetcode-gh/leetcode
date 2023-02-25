def jump(nums)

    result = 0
    l = r = 0

    while (r< nums.size()-1)
        farthest = 0
        (l..r).each do |i|
            farthest = [farthest,(i + nums[i])].max
        end
        l= r+1
        r = farthest
        result +=1
    end

    return result
end