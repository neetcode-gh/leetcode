def min_cost_climbing_stairs(cost)
  return 0 if cost.empty?
  return cost.first if cost.length == 1

  second = 0
  first = cost[-1]
  (cost.length - 2).downto(0) do |idx|
    cost1 = cost[idx] + first 
    cost2 = cost[idx] + second
    tmp = cost1 > cost2 ? cost2 : cost1
    second = first
    first = tmp
  end
  first > second ? second : first
end
