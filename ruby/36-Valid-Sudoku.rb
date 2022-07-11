def is_valid_sudoku(board)
  valid_rows_and_columns?(board) && valid_boxes?(board)
end

def valid_rows_and_columns?(board)
  (0...9).each do |y|
    column = []
    row = []
    (0...9).each do |x|
      row << board[y][x]
      column << board[x][y]
    end
    return false unless valid?(row) && valid?(column)
  end
  true
end

def valid?(row)
  hash = {}
  row.each do |cell|
    next if cell == '.'
    return false if hash.key? cell

    hash[cell] = true
  end

  true
end

def valid_boxes?(board)
  y_cap = 0
  until y_cap == 9
    x_cap = 0
    until x_cap == 9
      box = []
      (y_cap...(y_cap + 3)).each do |y|
        (x_cap...(x_cap + 3)).each do |x|
          box << board[y][x]
        end
        return false unless valid?(box)
      end
      x_cap += 3
    end
    y_cap += 3
  end

  true
end
