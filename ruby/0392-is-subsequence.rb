# @param {String} s
# @param {String} t
# @return {Boolean}
def is_subsequence(s, t)
    sub_str_length = 0
    main_str_length = 0

    while sub_str_length < s.length && main_str_length < t.length  do
        if(s[sub_str_length] == t[main_str_length])
          sub_str_length+= 1 
        end
        main_str_length+= 1
    end
    sub_str_length == s.length
end