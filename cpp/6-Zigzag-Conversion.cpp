class Solution {
public:
    string convert(string s, int numRows) {
        int size = s.size();

        if (size == 0 || size == 1 || numRows == 1)
            return s;

        std::vector<std::string> rows(numRows);
        int row = 0;
        bool changeRow = false;

        for (size_t i = 0; i < size; i++) {
            if (s[i] != ' ')
                rows[row] += s[i];
            if (row == numRows - 1 || row == 0)
                changeRow = !changeRow;
            if (changeRow == true)
                row++;
            else
                row--;
        }
        std::string result;

        for (std::string row: rows)
            result += row;
        return result;
    }
};
