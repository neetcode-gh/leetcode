# @param {Integer[][]} points
# @return {Integer}
def min_cost_connect_points(points)
  manhattan = ->(x, y) { (x[0] - y[0]).abs + (x[1] - y[1]).abs }

  to_visit = Set.new(points)

  result = 0
  bil = 1_000_000_000
  cost_to = Hash.new { bil }

  current_point = points[0]
  to_visit.delete current_point

  (points.size - 1).times do |_i|
    min = bil
    next_point = nil

    to_visit.each do |point|
      cost_to[point] = [cost_to[point], manhattan.call(current_point, point)].min
      if min > cost_to[point]
        min = cost_to[point]
        next_point = point
      end
    end

    current_point = next_point
    result += min
    to_visit.delete current_point
  end

  result
end
