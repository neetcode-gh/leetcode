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
    const isBigCarAvailable = (carType === 1 && this.isBigRemaining > 0); 
    if(isBigCarAvailable) {
        this.isBigRemaining -= 1;
        return true;
    }
    const isMediumCarAvailable = (carType === 2 && this.isMediumRemaining > 0);
    if(isMediumCarAvailable) {
        this.isMediumRemaining -= 1;
        return true;
    }
    const isSmallCarAvailable = (carType === 3 && this.isSmallRemaining > 0);
    if(isSmallCarAvailable) {
        this.isSmallRemaining -= 1;
        return true;
    }
    return false;
  }
}


/** 
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
