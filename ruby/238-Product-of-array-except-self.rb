def product_except_self(nums)
  prefix = []
  total_product = 1
  nums.each do |num|
    prefix << total_product
    total_product *= num
  end

  suffix = []
  total_product = 1
  (nums.length - 1).downto(0) do |idx|
    suffix << total_product
    total_product *= nums[idx]
  end

  nums.map.with_index { |_n, i| prefix[i] * suffix[nums.length - 1 - i] }
end

# O(1) space solution
def product_except_self(nums)
  output = []
  total_product = 1
  nums.each do |num|
    output << total_product
    total_product *= num
  end

  total_product = 1
  (nums.length - 1).downto(0) do |idx|
    output[idx] = total_product * output[idx]
    total_product *= nums[idx]
  end
  output
end
