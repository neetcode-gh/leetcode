
def partition_labels(s)
    last_index = Hash.new(0)

    s.each_char.with_index do |char,index|
        last_index[char] = index
    end

    result = []
    size = s_end = 0

    s.each_char.with_index do |char,index|
        size +=1
        s_end = [last_index[char],s_end].max

        if (index == s_end)
            result.append(size)
            size =0
        end
    end

    return result

end