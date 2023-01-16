def longest_consecutive(nums)
    set = Set.new(nums)
    set.reduce(0) do |longest, num|
        if !set.include?(num-1)
            length = 0
            while set.include?(num + length) do
                length += 1
            end
            next(longest > length ? longest : length)
        end

        longest
    end
end
