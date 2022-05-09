# @param {Integer[]} nums
# @return {Boolean}
def contains_duplicate(nums)
  nums_hash = Hash.new
  nums.each { |value|
    case
    when nums_hash[value] != nil; return true
    else nums_hash[value] = value
    end
  }
  return false
end
