def get_sum(a, b)
  mask = 0xffffffff
  until b.zero? # until no carries left
    tmp = (a & b) << 1 # carries
    a = (a ^ b) & mask # addition w/o carries
    b = tmp & mask
  end
  a = ~(a ^ mask) if a > (mask >> 1)
  a
end

# Ugly Solution
def get_sum(a, b)
  mask = 0xffffffff # 32 bit maximum
  res = 0
  carry = 0
  32.times do |n|
    bit_a = (a >> n) & 1
    bit_b = (b >> n) & 1

    if (bit_a | bit_b).zero?
      if carry == 1
        carry -= 1
        res |= (1 << n)
      end
    elsif (bit_a & bit_b) == 1
      if carry == 1
        res |= (1 << n)
      else
        carry += 1
      end
    elsif carry.zero?
      res |= (1 << n)
    end
  end
  res &= mask
  if (res >> 31) & 1 == 1
    # XOR flips rightmost 32, then NOT flips all bits
    res = ~(res ^ mask)
  end
  res
end
