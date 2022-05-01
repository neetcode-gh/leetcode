# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer[]}
def two_sum(nums, target)
    nums.each_with_index do |a, i| 
        diff = target - a
        diff_index = nums.index(diff)
        if diff_index != nil && diff_index != i
            return [i,diff_index]
        end    
    end
    return []
end