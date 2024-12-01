def permute(nums)
    return [[]] if nums.empty?
    
    perms = []
    
    (0...nums.length).each do |i|
        el = nums[i]
        rest = nums.take(i) + nums.drop(i + 1)
        new_perms = permute(rest).map { |perm| perm.unshift(el) }
        perms.concat(new_perms)
    end
    
    perms
end