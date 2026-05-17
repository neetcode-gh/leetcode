def replace_elements(arr)
    prev = -1
    (0...arr.size).reverse_each do |i|
        tmp = arr[i]
        arr[i] = prev
        prev = tmp if tmp > prev        
    end
    arr
end