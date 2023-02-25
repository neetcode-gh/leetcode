def multiply(num1, num2)

    return "0" if [num1,num2].include?("0")

    res = [0] * (num1.length + num2.length)

    num1.reverse!
    num2.reverse!

    (0..num1.length-1).each do |i|
        (0..num2.length-1).each do |j|
            digit = num1[i].to_i * num2[j].to_i
            res[i+j] += digit
            res[i+j+1] += (res[i+j]/10)
            res[i+j] = res[i+j] % 10
        end
    end

    res.reverse!
    
    return res.join.to_i.to_s
end