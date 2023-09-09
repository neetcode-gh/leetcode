
// link to the problem https://leetcode.com/problems/pascals-triangle/
// the time complexity will basically be the number of elements in pascale tringle. roughly height of tringle * number of honeycomb in each row.
// O(n^2);

var generate = function (numRows) {
	const res = [[1]];

	for (let i = 1; i < numRows; i++) {
        res[i] = [];
		for (let k = 0; k < i + 1; k++) {
			res[i][k] = (res[i - 1][k] || 0) + (res[i - 1][k - 1] || 0);
		}
	}

    return res;
};
