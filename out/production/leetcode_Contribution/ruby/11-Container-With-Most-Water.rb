def max_area(height)
  idx_start = 0
  idx_end = height.length - 1
  max_water = 0
  while idx_start < idx_end
    challenger = (height[idx_start] > height[idx_end] ? height[idx_end] : height[idx_start])
    challenger *= (idx_end - idx_start)
    max_water = challenger if challenger > max_water

    if height[idx_start] > height[idx_end]
      idx_end -= 1
    else
      idx_start += 1
    end
  end
  max_water
end
