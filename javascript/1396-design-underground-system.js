// https://leetcode.com/problems/design-underground-system/
class UndergroundSystem {
  constructor() {
    this.stationSystem = {};
    this.averageTime = {};
  }

  /**
   * Time O(1) | Space O(1)
   * Records the check-in time and station for a user.
   * @param {number} id - User ID
   * @param {string} stationName - Check-in station name
   * @param {number} t - Check-in time
   * @return {void}
   */
  checkIn(id, stationName, t) {
    this.stationSystem[id] = [stationName, '', t, ''];
  }

  /**
   * Time O(1) | Space O(1)
   * Records the check-out time and station for a user, and calculates the average time.
   * @param {number} id - User ID
   * @param {string} stationName - Check-out station name
   * @param {number} t - Check-out time
   * @return {void}
   */
  checkOut(id, stationName, t) {
    const user = this.stationSystem[id];
    user[1] = stationName;
    user[3] = t;
    const stationHash = `${user[0]}-${user[1]}`;
    if (this.averageTime[stationHash]) {
      this.averageTime[stationHash][0] += 1;
      this.averageTime[stationHash][1] += user[3] - user[2];
    } else {
      this.averageTime[stationHash] = [];
      this.averageTime[stationHash][0] = 1;
      this.averageTime[stationHash][1] = user[3] - user[2];
    }
  }

  /**
   * Time O(1) | Space O(1)
   * Returns the average time taken to travel between two stations.
   * @param {string} startStation - Start station name
   * @param {string} endStation - End station name
   * @return {number} - Average time in hours
   */
  getAverageTime(startStation, endStation) {
    const [rounds, totalHours] = this.averageTime[`${startStation}-${endStation}`];
    return totalHours / rounds;
  }
}
