class MinStack() {

    /** initialize your data structure here. */
    var m = MutableList(0){0}
    init{
        this.m = m
    }

    fun push(x: Int) {
        this.m.add(x)
    }

    fun pop() {
        this.m.removeAt(this.m.size-1)
    }

    fun top(): Int {
        return this.m[this.m.size-1]
    }

    fun getMin(): Int {
        return this.m.min()!!
    }

}