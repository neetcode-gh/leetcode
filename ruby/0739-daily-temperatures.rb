# @param {Integer[]} temperatures
# @return {Integer[]}
def daily_temperatures(temperatures)
    ans = Array.new(temperatures.length, 0)
    stack = []
    
    temperatures.each_with_index do |t, i|
        while !stack.empty? && t > stack[-1][:t]
            data = stack.pop
            ans[data[:i]] = i - data[:i]
        end
        
        stack << {t: t, i: i}
    end
    
    ans
end
