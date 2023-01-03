def hamming_weight(n)
  total_ones = 0
  until n.zero?
    total_ones += (n % 2)
    n = n >> 1
  end
  total_ones
end

# Solution utilizing & (n - 1)
def hamming_weight(n)
  total_ones = 0
  until n.zero?
    n &= (n - 1)
    total_ones += 1
  end
  total_ones
end
