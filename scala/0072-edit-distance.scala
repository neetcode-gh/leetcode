object Solution {
    def minDistance(word1: String, word2: String): Int = {
        var minDisArr = Array.ofDim[Int](word1.size+2, word2.size+2)
        for(i<- 0 to word1.size; j<- 0 to word2.size){
            if(i == 0 || j == 0) minDisArr(i)(j) = i + j

            else if (word1(i-1).equals(word2(j-1)))
                minDisArr(i)(j) = minDisArr(i-1)(j-1)
            
            else 
                minDisArr(i)(j) = 1 + (minDisArr(i - 1)(j - 1) min minDisArr(i)(j - 1) min minDisArr(i - 1)(j))

        }
        minDisArr(word1.size)(word2.size)
    }
}