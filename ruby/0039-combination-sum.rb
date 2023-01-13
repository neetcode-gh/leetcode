def combination_sum(candidates, target)
    @result = []
    @target = target
    @candidates = candidates
    def dfs(i, current, total)
        if total == @target
            @result.append(current.dup())
            return
        end
        if i >= @candidates.length() || total > @target
            return
        end

        current.append(@candidates[i])
        dfs(i, current, total+@candidates[i])
        current.pop()
        dfs(i+1, current, total)
    end
    
    dfs(0,[],0)
    return @result
end