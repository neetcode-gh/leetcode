$MAP = {
    2 => %w(a b c),
    3 => %w(d e f),
    4 => %w(g h i),
    5 => %w(j k l),
    6 => %w(m n o),
    7 => %w(p q r s),
    8 => %w(t u v),
    9 => %w(w x y z)    
}

# @param {String} digits
# @return {String[]}
def letter_combinations(digits)
    ans = []
   
    recurse(digits, "", ans, 0) unless digits.empty?
    
    ans
end

def recurse(digits, prefix, ans, i)
    if digits.length == prefix.length
        ans << prefix
        return
    end
    
    digit = digits[i].to_i
    
    $MAP[digit].each do |c|
        recurse(digits, prefix + c, ans, i + 1)
    end
end
