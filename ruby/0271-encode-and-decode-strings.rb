# Encodes a list of strings to a single string.
#
# @param {string[]} strs
# @return {string}
def encode(strs)
  strs.map { |str| "#{str.length}##{str}" }.join
end

# Decodes a single string to a list of strings.
#
# @param {string} s
# @return {string[]}
def decode(s)
  res = []
  i = 0

  while i < s.length
    j = i
    j += 1 while s[j] != "#"

    length = s[i...j].to_i
    start = j + 1
    res << s[start, length]
    i = start + length
  end

  res
end

# Your functions will be called as such:
# decode(encode(strs))
