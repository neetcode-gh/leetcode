# @param {Integer[]} nums
# @return {String}
def largest_number(nums)
  nums.sort! {|a, b| b.to_s + a.to_s <=> a.to_s + b.to_s}.join.to_i.to_s
end