object Solution {
  def isValidSudoku(board: Array[Array[Char]]): Boolean = {
    import scala.collection.mutable.{Set => MSet}
    val rowSet = MSet[(Int, Char)]()
    val colSet = MSet[(Int, Char)]()
    val squareSet = MSet[(Int, Int, Char)]()

    val indices = for {
      i <- (0 to 8).toList
      j <- (0 to 8).toList
    } yield (i, j)

    indices
      .map { case (i, j) =>
        (i, j, board(i)(j))
      }
      .filter(_._3 != '.')
      .forall { case (i, j, char) =>
        if(
            rowSet.contains((i, char))
          | colSet.contains((j, char))
          | squareSet.contains((i / 3, j / 3, char))
        ) false
        else {
          rowSet += ((i, char))
          colSet += ((j, char))
          squareSet += ((i / 3, j / 3, char))
          true
        }
      }
  }
}
