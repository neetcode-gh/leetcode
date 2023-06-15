var UndergroundSystem = function() {
    this.stationSystem = {};
    this.averageTime = {};
};

/** 
 * https://leetcode.com/problems/design-underground-system
 * Time O(1) | Space O(1)
 * @param {number} id 
 * @param {string} stationName 
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
    this.stationSystem[id] = [stationName, '', t, ''];
};

/** Time O(1) | Space O(1)
 * @param {number} id 
 * @param {string} stationName 
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
    const user = this.stationSystem[id];
    //1 is the position where we store end station
    // 3 is the position where we store end time
    user[1] = stationName;
    user[3] = t; 
    console.log(user);
    const stationHash = `${user[0]}-${user[1]}`;
    // console.log(stationHash, this.stationHash);
    if(this.averageTime[stationHash]) {
        this.averageTime[stationHash][0] += 1;
        this.averageTime[stationHash][1] += user[3] - user[2];
    } else {
        this.averageTime[stationHash] = [];
        this.averageTime[stationHash][0] = 1;
        this.averageTime[stationHash][1] = user[3] - user[2];
    }
};

/** Time O(1) | Space O(1)
 * @param {string} startStation 
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
    // console.log(this.averageTime);
    const [rounds, totalHours] = this.averageTime[`${startStation}-${endStation}`];
    return totalHours / rounds;
};

/** 
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
