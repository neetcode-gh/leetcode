# @param {Integer[]} nums
# @return {Integer[]}
def product_except_self(nums)
  res = []
  prefix = 1
  nums.each_with_index do |num, index|
    res[index] = prefix
    prefix *= num
  end
  postfix = 1
  nums.reverse.each_with_index do |num, index|
    res[res.length - (index + 1)] *= postfix
    postfix *= num
  end
  return res
end
