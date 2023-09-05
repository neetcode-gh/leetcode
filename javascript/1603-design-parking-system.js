/**
 * https://leetcode.com/problems/design-parking-system/
 * @class ParkingSystem
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
class ParkingSystem {
  constructor(big, medium, small) {
    this.isBigRemaining = big;
    this.isMediumRemaining = medium;
    this.isSmallRemaining = small;
  }

  /** 
   * Time O(1) | Space O(1)
   * @param {number} carType
   * @return {boolean}
   */
  addCar(carType) {
      if(carType === 1 && this.isBigRemaining > 0) {
        this.isBigRemaining -= 1;
        return true;
    }
    if(carType === 2 && this.isMediumRemaining > 0) {
        this.isMediumRemaining -= 1;
        return true;
    }
    if(carType === 3 && this.isSmallRemaining > 0) {
        this.isSmallRemaining -= 1;
        return true;
    }
    return false;
  }
  }
}

/** 
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
