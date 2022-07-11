def two_sum(numbers, target)
  idx_start = 0
  idx_end = numbers.length - 1
  while idx_start < idx_end
    case numbers[idx_start] + numbers[idx_end] <=> target
    when 1
      idx_end -= 1
    when 0
      return [idx_start + 1, idx_end + 1]
    when -1
      idx_start += 1
    end
  end
  nil
end
