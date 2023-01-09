
def min_window(s, t)
     
    return "" if t == ""
    count_t = Hash.new(0)
    window = Hash.new(0)

    t.each_char do |c|
        count_t[c] +=1
    end

    have = 0
    need = count_t.length

    res = [-1,-1]
    result_length = 9999999999
    l = 0
    (0..s.length-1).each do |r|
        c = s[r]
        window[c] +=1

        have +=1 if ((count_t.keys.include?(c)) && (window[c] == count_t[c])) 
        while(have == need)
            if (r-l+1) < result_length
                res = [l,r]
                result_length = (r-l+1)

            end
            window[s[l]] -=1
            have -=1 if ((count_t.keys.include?(s[l])) && (window[s[l]] < count_t[s[l]]))
            l +=1
        end
    end
    l = res[0]
    r = res[1]
    if result_length != 9999999999
        return s[l..r]
    else
        return ""
    end
end