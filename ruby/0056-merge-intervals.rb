def merge(intervals)
    intervals.sort!

    output = [intervals[0]]

    (1..intervals.size()-1).each do |i|
        last_end = output[-1][1]

        if (last_end>= intervals[i][0])
            output[-1][1] = [last_end, intervals[i][1]].max
        else
            output.append(intervals[i])
        end
    end

    return output

end