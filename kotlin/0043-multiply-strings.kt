
class Solution {
    fun multiply(num1: String, num2: String): String {
        if (num1=="0" || num2=="0") return "0"

        val sum = IntArray(num1.length + num2.length)
        val n1 = num1.reversed()
        val n2 = num2.reversed()

        for (i in 0 until n1.length) {
            for (j in 0 until n2.length) {
                var temp = (n1[i] - '0') * (n2[j] - '0') + sum[i + j]
                sum[i + j + 1] += temp / 10
                sum[i + j] = temp % 10
            }
        }

        return StringBuilder().apply {
            for(i in sum.lastIndex downTo 0) {
                if (this.length == 0 && sum[i] == 0) continue 
                this.append(sum[i])
            }
        }.toString()
        
    }
}
