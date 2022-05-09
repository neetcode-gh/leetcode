# @param {Integer[]} nums
# @param {Integer} k
# @return {Integer[]}
def top_k_frequent(nums, k)
  dict = {}
  count = []
  nums.each { |value| if dict[value] then dict[value] = dict[value] + 1 else dict[value] = 1 end }
  dict.each do |key, value|
    if count[value] != nil
      count[value] = count[value].push(key)
    else count[value] = [key]     end
  end
  result = []
  counter = 0
  index = count.length
  while (counter < k && index >= 0)
    if (count[index] != nil)
      result = result + count[index]
      counter = result.length
    end
    index -= 1
  end
  return result
end
