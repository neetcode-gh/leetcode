def can_complete_circuit(gas, cost)
    return -1 if gas.sum < cost.sum

    total = start = 0

    (0..gas.size()-1).each do |i|
        total += (gas[i] - cost[i])
        if (total < 0)
            total = 0
            start = i +1
        end
    end

    return start
end