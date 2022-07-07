function numIslands(grid: string[][]): number {
  let result: number = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == "1") {
        bfs(grid, i, j)
        result += 1
      }
    }
  }
  return result
}

function bfs(grid: string[][], x: number, y: number) {
  let queue: Array<Array<number>> = []
  const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  queue.push([x, y])
  while (queue.length > 0) {
    let len = queue.length
    for (let i = 0; i < len; i++) {
      let curr = queue.shift()
      for (const dir of direction) {
        let row = curr[0] + dir[0]
        let col = curr[1] + dir[1]
        if (
          row < 0 ||
          row >= grid.length ||
          col < 0 ||
          col >= grid[0].length ||
          grid[row][col] == "0"
        ) {
          continue
        }
        grid[row][col] = "0"
        queue.push([row, col])
      }
    }
  }
}

// Another solution without using bfs
function numIslands(grid: string[][]): number {
  let visited: Array<Array<boolean>> = grid.map((ele) =>
    ele.map((val) => false)
  )

  let num: number = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1" && !visited[i][j]) {
        areaOfIsland(i, j, grid, visited)
        num++
      } else visited[i][j] = true
    }
  }

  return num
}

function areaOfIsland(
  i: number,
  j: number,
  grid: Array<Array<string>>,
  visited: Array<Array<boolean>>
) {
  if (visited[i][j]) return
  visited[i][j] = true

  if (grid[i][j + 1] === "1") areaOfIsland(i, j + 1, grid, visited)
  if (grid[i][j - 1] === "1") areaOfIsland(i, j - 1, grid, visited)
  if (grid[i - 1] && grid[i - 1][j] === "1")
    areaOfIsland(i - 1, j, grid, visited)
  if (grid[i + 1] && grid[i + 1][j] === "1")
    areaOfIsland(i + 1, j, grid, visited)
}
