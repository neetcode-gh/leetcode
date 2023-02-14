# @param {String} s
# @param {String} t
# @return {Boolean}
def is_subsequence(s, t)
    return true if s.length == 0
    return false if t.length == 0
        
    if s[0] == t[0]
        is_subsequence(s[1..-1], t[1..-1])
    else
        is_subsequence(s, t[1..-1])
    end
end