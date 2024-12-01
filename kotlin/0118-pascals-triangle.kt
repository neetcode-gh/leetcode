/*
* Solution as per channel
*/
class Solution {
    fun generate(numRows: Int): List<List<Int>> {
        val res = ArrayList<ArrayList<Int>>() 
        val temp = ArrayList<Int>() 
        for(i in 0 until numRows){
            temp.add(0,1)
            for(j in 1 until temp.size-1)
                temp.set(j, temp.get(j)+temp.get(j+1))
            res.add(ArrayList(temp))
        }
       return res
    }
}

/*
* Cool "idiomatic" Kotlin solution, making use of Kotlins functions
*/
class Solution {
    fun generate(numRows: Int) = mutableListOf<List<Int>>(listOf(1)).apply {
        for(row in 1 until numRows) 
            add(listOf(1) + this[row-1].windowed(2).map { it.sum()} + listOf(1))
    }
}
