class Solution {

    fun openLock(deadends: Array<String>, target: String): Int {
        val deadEndSet = hashSetOf<String>()
        deadends.forEach { deadEndSet.add(it) }
        if (target in deadEndSet || "0000" in deadEndSet) return -1
        // [ (String,Level) ]
        val queue: Queue<Pair<String, Int>> = LinkedList<Pair<String, Int>>().apply {
            add(Pair("0000", 0))
        }
        val visitedCombinations = hashSetOf<String>()

        while (queue.isNotEmpty()) {
            val (currentCombination, levelOfCurrentCombination) = queue.remove()
            if (currentCombination == target) return levelOfCurrentCombination
            // increments
            for (i in currentCombination.indices) {
                val digitAtIndex = Character.digit(currentCombination[i], 10)
                val incrementedValue = Character.forDigit((digitAtIndex + 1) % 10, 10)
                val newCombination = currentCombination.replaceCharAt(i, incrementedValue)
                if (newCombination in visitedCombinations || newCombination in deadEndSet) continue
                visitedCombinations.add(newCombination)
                queue.add(Pair(newCombination, levelOfCurrentCombination + 1))
            }
            // decrements
            for (i in currentCombination.indices) {
                val valueAtIndex = Character.digit(currentCombination[i], 10)
                val decrementedValue = Character.forDigit(
                    (valueAtIndex - 1).takeIf { valueAtIndex - 1 in 0..9 } ?: 9, 10)
                val newCombination = currentCombination.replaceCharAt(i, decrementedValue)
                if (newCombination in visitedCombinations || newCombination in deadEndSet) continue
                visitedCombinations.add(newCombination)
                queue.add(Pair(newCombination, levelOfCurrentCombination + 1))
            }
        }
        return -1
    }

    private fun String.replaceCharAt(
        index: Int,
        newChar: Char
    ): String = when (index) {
        0 -> newChar + substring(1..this.lastIndex)
        lastIndex -> substring(0 until this.lastIndex) + newChar
        else -> substring(0 until index) + newChar + substring(index + 1..this.lastIndex)
    }
}