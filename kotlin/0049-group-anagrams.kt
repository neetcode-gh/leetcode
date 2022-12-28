package kotlin

fun main() {

    val strs = arrayOf("eat", "tea", "tan", "ate", "nat", "bat")

    println(groupAnagrams(strs))
}

fun groupAnagrams(strs: Array<String>): List<List<String>> {
    val res: HashMap<String, MutableList<String>> = hashMapOf()

    for (s in strs){
        val count = IntArray(26)

        for (c in s){
            val index = c - 'a'
            count[index] += 1
        }

        res[count.joinToString()] = res.getOrDefault(count.joinToString(), mutableListOf()).also { it.add(s) }
    }

    return res.values.toList()
}