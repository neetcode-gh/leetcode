def largest_rectangle_area(heights)
    max_area = 0
    stack = []

    heights.each_with_index do |h, idx|
        start = idx
        while !stack.empty? && stack[-1][1] > h
            index, height = stack.pop
            max_area = [height * (idx - index), max_area].max
            start = index
        end
        stack << [start, h]
    end
    
    stack.each do |idx, height|
        max_area = [height * (heights.length - idx), max_area].max
    end
    max_area
end