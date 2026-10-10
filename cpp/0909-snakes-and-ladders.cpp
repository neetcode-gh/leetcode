class Solution {
  public:
      // Function to get the row and column index of a position on the board
      std::pair<int, int> get_indexes_of(int pos, std::vector<std::vector<int>>& grid)
      {
          int grid_w = grid.front().size();
          int grid_h = grid.size();
          int r = (pos - 1) / grid_w;
          int c = (pos - 1) % grid_w;
          // Adjust column index for alternating rows
          c = r % 2 == 0 ? c : grid_w - (c + 1);
          // Adjust row index to start from the bottom of the grid
          r = grid_h - (r + 1);
          return std::make_pair(r, c);
      }

      // Function to find the minimum number of moves to reach the last cell in Snakes and Ladders
      // using BFS (Breadth-First Search).
      // BFS lets us find the shortest path in an unweighted graph.
      int snakesAndLadders(std::vector<std::vector<int>>& board)
      {
          int board_h = board.size();
          int board_w = board.front().size();
          std::vector<bool> visited((board_h * board_w) + 1, false);
          std::vector<int> dist((board_h * board_w) + 1, -1);
          std::deque<int> q;
          q.push_back(1);
          visited[1] = true;
          dist[1] = 0;

          while (!q.empty())
          {
              int curr_pos = q.front();
              q.pop_front();

              // If we reach the last cell, return the distance
              if (curr_pos == board_h * board_w) return dist[board_h * board_w];

              // Check the next 6 possible moves
              for (size_t i = 1; i <= 6; ++i)
              {
              int next_pos = curr_pos + i;
              if (next_pos > board_h * board_w) continue;

              std::pair<int, int> next_idx = get_indexes_of(next_pos, board);
              // If there's a snake or ladder, move to the destination cell
              if (board[next_idx.first][next_idx.second] != -1)
                  next_pos = board[next_idx.first][next_idx.second];

              // If the next position is not visited, mark it and update the distance
              if (!visited[next_pos])
              {
                  visited[next_pos] = true;
                  q.push_back(next_pos);
                  // dist[next_pos] indicates the number of minimum moves to reach the next position
                  dist[next_pos] = dist[curr_pos] + 1;
              }
              }
          }
          // If we can't reach the last cell, return -1
          return -1;
      }
  };
