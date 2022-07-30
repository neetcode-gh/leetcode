class Solution {
    fun isValid(s: String): Boolean {
        if (s.length % 2 == 1) return false

        val map = hashMapOf('(' to ')', '[' to ']', '{' to '}')
        val stack = Stack<Char>()

        for (c in s) {
            if (map.containsKey(c))
                stack.push(c)
            else if (stack.isEmpty() || map[stack.pop()] != c)
                return false
        }
        return stack.isEmpty()
    }
}
