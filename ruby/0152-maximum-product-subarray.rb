# @param {Integer[]} nums
# @return {Integer}
def max_product(nums)
    
    @largest = -Float::INFINITY
    @min = 1
    @max = 1
    
    for num in nums do
        @temp = @max * num
        @max = [num * @max, num * @min, num].max
        @min = [num * @min, @temp, num].min
        @largest = [@max, @largest, num].max
    end
    
    return @largest
end