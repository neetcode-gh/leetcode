# @param {Integer[]} nums
# @return {Integer[][]}
def subsets(nums)
    ans = []
    
    recurse(nums, ans, [], 0)
    
    ans
end


def recurse(nums, ans, curr, i)
    if i == nums.length
        ans << curr.clone
        return
    end
    

    curr << nums[i]
    recurse(nums, ans, curr, i + 1)

    curr.pop
    recurse(nums, ans, curr, i + 1)
end
