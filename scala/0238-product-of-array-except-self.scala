object Solution {
    def productExceptSelf(nums: Array[Int]): Array[Int] = {

        val result = Array.fill[Int](nums.length)(1)

        var prefix = 1
        for(i <- nums.indices) {
            result(i) = prefix
            prefix = prefix * nums(i)
        }

        var postfix = 1
        for(i <- nums.length-1 to 0 by -1) {
            result(i) = result(i) * postfix
            postfix = postfix * nums(i)
        }

        result
    }
}