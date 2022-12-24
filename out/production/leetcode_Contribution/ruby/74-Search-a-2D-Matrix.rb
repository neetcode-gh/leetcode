# @param {Integer[][]} matrix
# @param {Integer} target
# @return {Boolean}
def search_matrix(matrix, target)
    l = 0
    r = matrix.length - 1
    
    while l <= r
        mid = (l + r) / 2
        row = matrix[mid]
        
        if target > row[-1]
            l = mid + 1
        elsif target < row[0]
            r = mid - 1
        else
            return binary_search(row, target)
        end
    end

    false
end

def binary_search(values, target)
    l = 0
    r = values.length - 1

    while l <= r
        mid = (l + r) / 2
        
        return true if values[mid] == target
        l = mid + 1 if values[mid] < target
        r = mid - 1 if values[mid] > target
    end

    false
end
