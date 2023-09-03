/**
 * @param {number} arrivalTime
 * @param {number} delayedTime
 * @return {number}
 */
var findDelayedArrivalTime = function (arrivalTime, delayedTime) {
    let totalTime = arrivalTime + delayedTime; // initialize totalTime is the sum of arrivalTime and delayedTime

    if (totalTime == 24) { // if totalTime is equal to 24 then return 0
        return 0;
    } else if (totalTime < 24) { // if totalTime is less than 24 then return totalTime
        return totalTime;
    } else { // else return subtraction of totalTime to 24
        return totalTime - 24;
    }
};