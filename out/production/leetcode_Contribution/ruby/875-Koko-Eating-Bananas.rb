# @param {Integer[]} piles
# @param {Integer} h
# @return {Integer}
def min_eating_speed(piles, h)
    l = 1
    r = piles.max
    min_speed = r
  
    while l <= r
        speed = (l + r) / 2

        time_taken = 0
        piles.each do |pile|
            time_taken += (pile / speed.to_f).ceil
        end

        if time_taken <= h
            r = speed - 1
            min_speed = speed < min_speed ? speed : min_speed     
        else
            l = speed + 1
        end
    end

    min_speed
end
