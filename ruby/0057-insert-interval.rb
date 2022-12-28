def insert(intervals, new_interval)
    result = []
    (0..intervals.size()-1).each do |i|
        if new_interval[1] < intervals[i][0]
            result.append(new_interval)
            result += intervals[i..]
            return result
        elsif new_interval[0] > intervals[i][1]
            result.append(intervals[i])
        else
            new_interval = [[new_interval[0],intervals[i][0]].min, [new_interval[1],intervals[i][1]].max]
        end
    end
    result.append(new_interval)
    return result
end