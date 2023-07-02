/**
 * https://leetcode.com/problems/design-parking-system/
 * @class ParkingSystem
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
class ParkingSystem {
  constructor(big, medium, small) {
    this.bigRemaining = big;
    this.mediumRemaining = medium;
    this.smallRemaining = small;
  }

  /** 
   * Time O(1) | Space O(1)
   * @param {number} carType
   * @return {boolean}
   */
  addCar(carType) {
    // If carType is 1 (big) and there are available big parking spaces
    if (carType === 1 && this.bigRemaining > 0) {
      this.bigRemaining -= 1;
      return true;
    }

    // If carType is 2 (medium) and there are available medium parking spaces
    if (carType === 2 && this.mediumRemaining > 0) {
      this.mediumRemaining -= 1;
      return true;
    }

    // If carType is 3 (small) and there are available small parking spaces
    if (carType === 3 && this.smallRemaining > 0) {
      this.smallRemaining -= 1;
      return true;
    }

    // If no suitable parking space is available for the given carType
    return false;
  }
}

/** 
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
