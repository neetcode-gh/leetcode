/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function(big, medium, small) {
    this.bigRemaining = big;
    this.mediumRemaining = medium;
    this.smallRemaining = small;
};

/** 
 * Time O(1) | Space O(1)
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {
    if(carType === 1 && this.bigRemaining > 0) {
        this.bigRemaining -= 1;
        return true;
    }
    if(carType === 2 && this.mediumRemaining > 0) {
        this.mediumRemaining -= 1;
        return true;
    }
    if(carType === 3 && this.smallRemaining > 0) {
        this.smallRemaining -= 1;
        return true;
    }
    return false;
};

/** 
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
