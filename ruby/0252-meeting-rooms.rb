def can_attend_meetings(intervals)
    intervals.sort!
    if intervals.size >=2
        (0..(intervals.size-2)).each do |i|
            if intervals[i][1] > intervals[i+1][0]
                return false
            end
        end
    end
    return true
end