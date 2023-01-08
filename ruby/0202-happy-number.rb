def is_happy(n)
    visit = Set.new([])

    while !visit.include?(n)
        visit.add(n)
        n = sum_of_squares(n)
        return true if n==1
    end

    return false

end

def sum_of_squares(n)
 output = 0
 while n != 0
    digit = n%10
    output += (digit*digit)
    n = n/10
 end
 return output
end