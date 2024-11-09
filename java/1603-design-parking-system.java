class ParkingSystem {

    int[] space;

    public ParkingSystem(int big, int medium, int small) {
        this.space = new int[] { big, medium, small };
    }

    public boolean addCar(int carType) {
        if (this.space[carType - 1] == 0) {
            return false;
        }
        this.space[carType - 1]--;
        return true;
    }
}