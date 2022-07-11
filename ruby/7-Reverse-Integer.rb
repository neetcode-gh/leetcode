def reverse(x)
  max = 0xffffffff >> 1
  max_last_digit = max % 10
  max_minus_digit = max / 10
  reverse = 0
  until x.zero?
    digit = x.remainder(10)
    return 0 if reverse.abs > max_minus_digit || (reverse.abs == max_minus_digit && digit > max_last_digit)

    reverse = (reverse * 10) + digit
    x = (x / 10.0).to_i
  end
  reverse
end
