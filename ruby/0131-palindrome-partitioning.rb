def partition(s)
    @result = []
    @part = []
    @s = s

    def dfs(i)
        if i >= @s.length
            @result.append(@part.dup())
            return
        end
        (i..@s.length-1).each do |j|
            if is_palindrome(@s,i,j)
                @part.append(@s[i..j])
                dfs(j+1)
                @part.pop()
            end
        end
    end

    dfs(0)

    return @result
end


def is_palindrome(s,i,j)
    while i<j
        return false if s[i] != s[j]
        i +=1
        j -=1
    end
    return true
end