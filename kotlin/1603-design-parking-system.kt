class ParkingSystem(big: Int, medium: Int, small: Int) {

    val spaces = intArrayOf(big, medium, small)

    fun addCar(carType: Int): Boolean {
        if (spaces[carType - 1] > 0) {
            spaces[carType - 1]--
            return true
        }
        return false
    }

}
