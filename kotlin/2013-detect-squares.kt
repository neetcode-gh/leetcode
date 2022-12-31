class DetectSquares() {
    
    val hm = HashMap<Pair<Int, Int>, Int>() // [[x, y], count]

    fun add(point: IntArray) {
        hm[point[0] to point[1]] = hm.getOrDefault(point[0] to point[1], 0) + 1
    }

    fun count(point: IntArray): Int {
        var count = 0
        val (x,y) = point
        for((k, v) in hm){
            repeat(v){ //incase of >1 occurences, we do calculations for each occurence
                val (mX, mY) = k
                if(Math.abs(mX - x) == Math.abs(mY - y) && x != mX && y != mY){
                    count += hm.getOrDefault(x to mY, 0) * hm.getOrDefault(mX to y, 0) //0 if the possible point doesnt exist
                }
            }
        }
        return count
    }

}