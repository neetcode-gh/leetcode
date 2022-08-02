package kotlin

fun twoSum(numbers: IntArray, target: Int): IntArray {
    var l = 0
    var r = numbers.size - 1

    while(l < r) {
        val sum = numbers[l] + numbers[r]
        if(sum < target){
            l++
        } else if(sum > target){
            r--
        } else {
            return intArrayOf(l+1, r+1)
        }
    }

    return intArrayOf(-1, -1)
}