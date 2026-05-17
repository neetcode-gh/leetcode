// Effective Array Logic
// Time Complexity : o(nlogn)
// Space Complexity : o(n)
function maxEnvelopes(envelopes: number[][]): number {
  envelopes = envelopes.sort((lhs, rhs) => {
    if (lhs[0] == rhs[0]) return rhs[1] - lhs[1]; // If Width are same the sort those object by height in decending order
    return lhs[0] - rhs[0]; // else sort by width in acending order
  });

  let effectiveArray: number[] = [];
  effectiveArray.push(envelopes[0][1]);
  for (let i = 1; i < envelopes.length; i++) {
    let len = effectiveArray.length;
    if (envelopes[i][1] > effectiveArray[len - 1]) {
      effectiveArray.push(envelopes[i][1]);
    } else {
      let searchIdx = binarySearch(effectiveArray, envelopes[i][1]);
      effectiveArray[searchIdx] = envelopes[i][1];
    }
  } 
  return effectiveArray.length;
}

function binarySearch(array: number[], target: number): number {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    // We should have to exit the loop when left and right crosses that's why <=
    let mid: number = Math.floor(left + (right - left) / 2);
    if (array[mid] == target) return mid;
    else if (array[mid] > target) right = mid - 1;
    else left = mid + 1;
  }
  return left;
}