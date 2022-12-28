def can_jump(nums)

    goal = nums.size()-1

    (nums.size-1).downto(0) do |j|
      goal=j if(j+nums[j]>= goal)
    end
    
    return true if(goal==0)
    return false
end