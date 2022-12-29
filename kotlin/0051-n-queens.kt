class Solution {
    fun solveNQueens(n: Int): List<List<String>> {
        val cols = HashSet<Int>() //keep track of used columns, we iterate rows
        val posDia = HashSet<Int>() //...of positive diagonals R+C
        val negDia = HashSet<Int>() //...of negative diagonals R-C
        val temp: ArrayList<ArrayList<String>> = arrayListOf() // to hold our temporary distinct solution
        val res: ArrayList<ArrayList<String>> = arrayListOf() // result with each distinct solutin where each input is a solution
        fillWithQueens(0,n,res,cols,posDia,negDia,temp)
        return res
    }
    private fun fillWithQueens(
        row: Int, 
        n: Int,
        res: ArrayList<ArrayList<String>>, 
        cols: HashSet<Int>, 
        posDia: HashSet<Int>, 
        negDia: HashSet<Int>,
        board: ArrayList<ArrayList<String>>
    ){
        //if we have filled the whole board with queens
        if(row == n){
            val complete: ArrayList<String> = arrayListOf()
            for(i in 0..n-1){
                val joined = board[i].joinToString(separator = "")
                complete.add(joined)
            }
            res.add(complete)
            return
        }
        for(column in 0 until n){
            if(cols.contains(column) || posDia.contains(row+column) || negDia.contains(row-column))
                continue
            val temp = tempRow(n)
            board.add(temp)
            cols.add(column)
            posDia.add(row+column)
            negDia.add(row-column)
            board[row][column] = "Q"
            fillWithQueens(row+1,n,res,cols,posDia,negDia,board)
            cols.remove(column)
            posDia.remove(row+column)
            negDia.remove(row-column)
            board[row][column] = "."
        }
    }
    private fun tempRow(n: Int): ArrayList<String>{
        val temp: ArrayList<String> = arrayListOf()
        repeat(n){
                temp.add(".")
            }
        return temp
    }
}
