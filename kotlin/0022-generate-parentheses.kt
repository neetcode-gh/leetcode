class Solution {
    private val resultList = mutableListOf<String>()
    
    fun generateParenthesis(n: Int): List<String> {
        generateParenthesis(n * 2, "")
        return resultList
    }
    
    private fun generateParenthesis(target: Int, current: String) {
        if (current.length == target) {
            var open = 0
            var close = 0           
            for (i in 0 until current.length) {
                if (current[i] == '(') {
                    ++open
                } else {
                    ++close
                }
                if (close > open) {
                    break
                }
            }
            if (close == open) {
                resultList.add(current)
            }            
        } else {
            generateParenthesis(target, "${current}(")
            generateParenthesis(target, "${current})")
        }
    }
}