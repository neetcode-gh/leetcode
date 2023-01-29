/*
* Containing the logic behind the operations, but a cleaner Kotlin solution is provided below.
* Here implement some of the logic of the functions ourselves, as in the video, to have this solution compatible with the video solution.
*/
class RandomizedSet() {

    val hs = HashSet<Int>()

    fun insert(`val`: Int): Boolean {
        if(hs.contains(`val`)) 
            return false
        else {
            hs.add(`val`)
            return true
        }
    }

    fun remove(`val`: Int): Boolean {
        if(hs.contains(`val`)){
            hs.remove(`val`)
            return true
        }else 
            return false
    }

    fun getRandom(): Int {
        return hs.random()
    }

}
 
/*
* Cleaner Kotlin solution. add() and remove()
*/
class RandomizedSet() {

    val hs = HashSet<Int>()

    fun insert(`val`: Int) = hs.add(`val`)

    fun remove(`val`: Int) = hs.remove(`val`)

    fun getRandom() = hs.random()

}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = RandomizedSet()
 * var param_1 = obj.insert(`val`)
 * var param_2 = obj.remove(`val`)
 * var param_3 = obj.getRandom()
 */
