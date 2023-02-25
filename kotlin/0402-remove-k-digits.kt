class Solution {
    fun removeKdigits(num: String, k: Int): String {
        val stack = Stack<Char>() //monotonic stack 
        var count = k
        for(i in 0 until num.length){
            while(count > 0 && !stack.isEmpty() && num[i] < stack.peek()){
                stack.pop() //remove the larger int
                count--
            }
            stack.push(num[i])
        } 
        repeat(count){ //pop the last k integers (largest integers)
            stack.pop()
        }
        val sum = stack.joinToString("")
        return if(sum == "") "0" else sum.toBigInteger().toString() //to int to remove all leading Zeros, instead of using Strinbuilder
    }
}
