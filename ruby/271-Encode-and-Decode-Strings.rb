# Encodes a list of strings to a single string.
#
# @param {string[]} strs
# @return {string}
def encode(strs)
  strs.reduce('') do |acc, cur|
    "#{acc}\n#{cur.chars.map{_1.ord.to_s}.join(',')}"
  end[1..] + "\n"
end

# Decodes a single string to a list of strings.
#
# @param {string} s
# @return {string[]}
def decode(s)
  s.each_line.map do |nums|
    nums[...-1].split(',').map(&:to_i).map(&:chr).join('')
  end
end


# Your functions will be called as such:
# decode(encode(strs))
