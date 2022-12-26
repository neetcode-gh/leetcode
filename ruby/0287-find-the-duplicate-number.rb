# @param {Integer[]} nums
# @return {Integer}
def find_duplicate(nums)
    a = 0
    b = 0 
    
    loop do
        a = nums[a]
        b = nums[b]
        b = nums[b]
        
        break if a == b
    end
    
    a = 0
    loop do
        a = nums[a]
        b = nums[b]
        break if a == b
    end

    a
end
