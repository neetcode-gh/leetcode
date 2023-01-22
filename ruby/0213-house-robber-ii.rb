# @param {Integer[]} nums
# @return {Integer}
def rob(nums)
  return nums.max if nums.size < 4

  dp = Array.new(nums.size + 3) { 0 }

  mil = 1_000_000
  dp[2] = mil
  nums.each_with_index do |num, i|
    dp[i + 3] = num + [dp[i], dp[i + 1]].max
  end

  result = [dp[-1], dp[-2]].max - mil

  dp = Array.new(nums.size + 3) { 0 }

  dp[1] = mil
  nums.each_with_index do |num, i|
    dp[i + 3] = num + [dp[i], dp[i + 1]].max
  end

  [result, [dp[-2], dp[-3]].max - mil].max
end
