/**
  * @param intervals: an array of meeting time intervals
  * @return: sorted_array
*/
// this is just a remodelling of a function I usually use to sort integers: https://gist.github.com/DeoluA/f72b547919f85c9542ab71d461bc072c
const sortArrayOfIntervals = (intervals) => {
  
  let allPosVals = {}, allNegVals = {};

  for(let i = 0; i < intervals.length; i++) {
    let current = intervals[i];
    if(current[0] >= 0) {
      if(allPosVals[current[0]] !== undefined) {
        allPosVals[current[0]].push(current);
      }
      else allPosVals[current[0]] = [current];
    }
    else {
      if(allNegVals[current[0]*-1] !== undefined) {
        allNegVals[current[0]*-1].push(current);
      }
      else allNegVals[current[0]*-1] = [current];
    }
  };

  let sorted_intervals = [];
  sorted_intervals = [].concat.apply( sorted_intervals, Object.keys(allNegVals).reverse().map((eachVal) => allNegVals[eachVal]) );
  sorted_intervals = [].concat.apply( sorted_intervals, Object.keys(allPosVals).map((eachVal) => allPosVals[eachVal]) );
  
  return sorted_intervals;
};

/**
  * @param intervals: an array of meeting time intervals
  * @return: minimum number of meeting rooms
*/
var minMeetingRooms = (intervals) => {
  // edge case: only one room necessary
  if(intervals.length <= 1) {
    return 1;
  };

  let sorted_intervals = sortArrayOfIntervals(intervals);
  let prevEnd = sorted_intervals[0][1], numOfRooms = 1;

  for(let i = 1; i < sorted_intervals.length; i++) {

    // is the current start time LESS than the previous end time?
    if(sorted_intervals[i][0] < prevEnd) {
      // add another room
      numOfRooms++;
      // adjust the end time to the minimum
      prevEnd = Math.min(prevEnd, sorted_intervals[i][1]);
    }
    // else just adjust it normally
    else prevEnd = sorted_intervals[i][1];

  };	


  return numOfRooms;
};


// TEST CASES
/*
console.log(minMeetingRooms([[0,30],[5,10],[15,20]]));	// should return 2 - we need two meeting rooms: 1 for (0,30), (5,10) and another for (0,30),(15,20)
console.log(minMeetingRooms([[5,8],[9,15]]));	// should return 1 - we need just one meeting room
console.log(minMeetingRooms([[2,7]]));	// should return 1 - we need just one
console.log(minMeetingRooms([[0,30],[5,10],[15,20],[12,16]]));	// should return 3
*/
