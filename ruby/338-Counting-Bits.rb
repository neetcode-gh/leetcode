def count_bits(n)
  bits = []
  offset = 2
  (n + 1).times do |nbr|
    bits << if nbr <= 2 || nbr == (offset * 2)
      nbr.zero? ? 0 : 1
    else
      (bits[offset] + bits[nbr - offset])
    end

    offset *= 2 if nbr == offset * 2
  end
  bits
end
