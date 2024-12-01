
def rotate(matrix)
    l = 0
    r = matrix.size()-1

    while l< r
        (0..(r-l-1)).each do |i|
            top = l
            bottom = r

            top_left = matrix[top][l+i]

            matrix[top][l+i] = matrix[bottom-i][l]

            matrix[bottom-i][l] = matrix[bottom][r-i]

            matrix[bottom][r-i] = matrix[top+i][r]

            matrix[top+i][r] = top_left
        end

        r -=1
        l +=1
    end
end