# @param {Integer} target
# @param {Integer[]} position
# @param {Integer[]} speed
# @return {Integer}
def car_fleet(target, position, speed)
    cars = position.zip(speed).sort_by(&:first)
    
    stack = []
    cars.each do |car|
        position, speed = car
        time = (target - position) / speed.to_f
        while !stack.empty? && stack[-1] <= time
            prev = stack.pop
        end
        stack << time
    end
    
    stack.length
end
