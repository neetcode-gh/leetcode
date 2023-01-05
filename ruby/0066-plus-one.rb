def plus_one(digits)    
    digits.reverse!
    carry = 1
    i = 0

    while(carry ==1)
        if (i<digits.length)
            if (digits[i]==9)
                digits[i]=0
            else
                digits[i] +=1
                carry = 0
            end
        else
            digits.append(1)
            carry = 0
        end
        i+=1
    end

    return digits.reverse!
end