def longest_consecutive(nums)
  return 0 if nums.empty?

  hash = {}
  nums.each { |num| hash[num] = true }
  longest = 0
  nums.each do |num|
    next if hash[num - 1]

    challenger = 1
    loop do
      if hash[num + challenger]
        challenger += 1
      else
        break
      end
    end
    longest = challenger if challenger > longest
  end

  longest
end

# Another way to do it.
def longest_consecutive(nums)
  return 0 if nums.empty?

  hash = {}
  nums.each { |num| hash[num] = -1 }
  nums.each do |num|
    next unless hash[num] == -1

    longest_consec = 1
    loop do
      val = hash[num + longest_consec]
      case val
      when -1
        hash[num + longest_consec] = -2
        longest_consec += 1
      when nil
        hash[num] = longest_consec
        break
      else
        longest_consec += hash[num + longest_consec]
        hash[num] = longest_consec
        break
      end
    end
  end

  hash.max_by { |_k, v| v }[1]
end
