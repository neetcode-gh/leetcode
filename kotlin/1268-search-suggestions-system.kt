class Solution {
    fun suggestedProducts(products: Array<String>, searchWord: String): List<List<String>> {
        var res = mutableListOf<MutableList<String>>()
        products.sort()

        var l = 0
        var r = products.lastIndex
        for ((i, c) in searchWord.withIndex()) {
            while (l <= r && (products[l].length <= i || products[l][i] != c))
                l++
            while (l <= r && (products[r].length <= i || products[r][i] != c))
                r--

            var temp = mutableListOf<String>()
            val rem = r - l + 1
            for (j in 0 until minOf(3, rem))
                temp.add(products[l + j])
            res.add(temp)
        }

        return res
    }
}
