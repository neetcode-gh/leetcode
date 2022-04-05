class Solution 
{
public:
	bool searchMatrix(vector<vector<int>>& matrix, int target)
	{
		int ROWS = matrix.size();
		int COLS = matrix[0].size();

		int top = 0, bot = ROWS - 1;
		// binary search for row
		while (top <= bot)
		{
			int row = top + (bot - top) / 2;
			if (target > matrix[row][COLS - 1]) // larger than the last value, search bottom part
				top = row + 1;
			else if (target < matrix[row][0]) // smaller than the first value, search top part
				bot = row - 1;
			else // found
				break;
		}
		if (top > bot) // search failed
			return false;

		// binray search for column
		int row = top + (bot - top) / 2;
		int l = 0, r = COLS - 1;
		while (l <= r)
		{
			int m = l + (r - l) / 2;
			if (target > matrix[row][m])
				l = m + 1;
			else if (target < matrix[row][m])
				r = m - 1;
			else
				return true;
		}
		return false;
	}
};
