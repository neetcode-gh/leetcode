# @param {Integer[]} nums
# @return {Integer}a

#shortest solution O(n)?
def find_min(nums)
  nums.min
end

#non binary-search iterative approach O(n)
def find_min(nums)
  last_num = nums.last
  nums.each.with_index do |num, i|
    return num if num <= last_num
  end
end

#using ruby's built-in binary search O(log n)
def find_min(nums)
  nums.bsearch {|num| num <= nums.last }
end

#custom binary-search O(log n)
def find_min(nums)
  result = nums[0]
  left = 0
  right = nums.length - 1

  while left <= right do
    if nums[left] < nums[right]
      return [result, nums[left]].min
    end

    mid = (left + right) / 2
    result = [result, nums[mid]].min

    if nums[mid] >= nums[left]
      left = mid + 1
    else
      right = mid - 1
    end
  end

  return result
end
