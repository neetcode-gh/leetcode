def subsets_with_dup(nums)
    @result = []
    @nums = nums.sort!

    def backtrack(i,subset)
        if i == @nums.length
            @result.append(subset.dup())
            return
        end

        subset.append(@nums[i])
        backtrack(i+1,subset)
        subset.pop()

        while ((i+1 < @nums.length) && (@nums[i] == @nums[i+1]))
            i +=1
        end

        backtrack(i+1,subset)
    end

    backtrack(0,[])

    return @result
end