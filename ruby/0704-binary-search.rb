# Iteraton
def search(nums, target)
  return -1 if nums.empty?

  half = nums.length / 2
  case nums[half] <=> target
  when 1
    search(nums[0...half], target)
  when -1
    idx = search(nums[half + 1..-1], target)
    (idx == -1 ? -1 : half + 1 + idx)
  when 0
    half
  end
end

# Recursion
def search(nums, target)
  left = 0
  right = nums.length - 1
  while left <= right
    half = (left + right) / 2
    case nums[half] <=> target
    when 1
      right = half - 1
    when -1
      left = half + 1
    when 0
      return half
    end
  end
  -1
end
