def set_zeroes(matrix)

    rows = matrix.length - 1
    cols = matrix[0].length - 1
    row_zero = false


    (0..rows).each do |r|
        (0..cols).each do |c|
            if(matrix[r][c] == 0)
                matrix[0][c] = 0
                if r > 0
                    matrix[r][0] = 0
                else
                    row_zero = true
                end
            end
        end
    end

    (1...rows+1).each do |r|
        (1..cols).each do |c|
            matrix[r][c] = 0 if ((matrix[0][c] == 0)||(matrix[r][0] == 0))
        end
    end

    if matrix[0][0] == 0
        (0..rows).each do |r|
            matrix[r][0] = 0
        end
    end

    if row_zero
        (0..cols).each do |c|
            matrix[0][c] = 0
        end
    end
end