class ParkingSystem {
public:
    ParkingSystem(int big, int medium, int small) : mCarSpotsLeft{big, medium, small} {}
    
    bool addCar(int carType) {
        if (mCarSpotsLeft[carType - 1] > 0) {
            mCarSpotsLeft[carType - 1]--;
            return true;
        } else {
            return false;
        }
    }

private:
    array<int, 3> mCarSpotsLeft;
};