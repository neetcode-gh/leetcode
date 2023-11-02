class Solution {
    fun isRobotBounded(instructions: String): Boolean {
        var dirX = 0
        var dirY = 1
        var x = 0
        var y = 0

        for (d in instructions) {
            if (d == 'G') {
                x += dirX
                y += dirY
            } else if (d == 'L') {
                dirX = -1 * dirY.also { dirY = dirX }
            } else {
                dirX = dirY.also { dirY = -1 * dirX }
            }
        }

        return (x to y) == (0 to 0) || (dirX to dirY) != (0 to 1)
    }
}
