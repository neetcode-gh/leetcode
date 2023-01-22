def spiral_order(matrix)
    result = []
    left = 0
    right = matrix[0].length
    top = 0
    bottom = matrix.length

    while left < right && top < bottom

        (left..right-1).each do |i|
            result.append(matrix[top][i])
        end

        top +=1

        (top..bottom-1).each do |i|
            result.append(matrix[i][right-1])
        end

        right -=1

        break unless (left < right && top < bottom)

        (right-1).downto(left).each do |i|
            result.append(matrix[bottom-1][i])
        end

        bottom -=1

        (bottom-1).downto(top).each do |i|
            result.append(matrix[i][left])
        end

        left +=1

    end

    return result
end