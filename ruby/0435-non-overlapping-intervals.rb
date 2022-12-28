def erase_overlap_intervals(intervals)
    intervals.sort!
    res = 0
    prev_end = intervals[0][1]
    (1..intervals.size()-1).each do |i|
        if intervals[i][0] >= prev_end
            prev_end = intervals[i][1]
        else
            res +=1
            prev_end = [intervals[i][1],prev_end].min
        end
    end
    return res
end