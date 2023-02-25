
def max_sliding_window(nums, k)
    output = []

    q = []

    l = r = 0

    while r < nums.length()
        
        while q[l] && nums[q[-1]] < nums[r]
            q.pop()
        end
        
        q.append(r)

        l +=1 if q[l] == r - k

        output.append(nums[q[l]]) if (r+1) >= k

        r +=1
    end
    return output
end