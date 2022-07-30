package kotlin

fun hammingWeight(n: Int): Int {
    var n = n
    var count = 0
    for (i in 0 .. 31){
        if(n and 1 == 1) count++
        n = n shr 1
    }

    return count
}