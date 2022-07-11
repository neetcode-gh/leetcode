DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]].freeze

def num_islands(grid)
  islands = 0
  memo = Array.new(grid.length) { Array.new(grid[0].length) }
  grid.each_with_index do |row, y|
    row.each_with_index do |el, x|
      if memo[y][x].nil? && el == '1'
        islands += 1
        flood_fill(grid, memo, y, x)
      end
    end
  end
  islands
end

def flood_fill(grid, memo, y, x)
  return nil if y >= grid.length || y.negative? || 
                x >= grid[0].length || x.negative? ||
                memo[y][x] != nil ||
                grid[y][x] == '0'

  memo[y][x] = true
  DIRS.each do |dy, dx|
    dy += y
    dx += x
    flood_fill(grid, memo, dy, dx)
  end
end
