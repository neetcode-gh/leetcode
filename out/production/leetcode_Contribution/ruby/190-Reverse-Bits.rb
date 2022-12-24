def reverse_bits(n)
  reversed_bits = 0
  31.downto(0) do |nbr|
    insert = ((n >> (31 - nbr)) & 1) << nbr
    reversed_bits |= insert
  end
  reversed_bits
end
