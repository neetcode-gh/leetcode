# @param {String} s
# @return {Integer}

#simple one liner
def length_of_last_word(s)
  s.split.last.length
end

#double pointer
def length_of_last_word(s)
    left = -1
    while s[left] == ' ' do
        left -= 1
    end

    right = left
    while s[left] && s[left] != ' ' do
        left -=1
    end

    right - left
end
