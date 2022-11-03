#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int rows = 9;
        int cols = 9;

        unordered_map<int, unordered_set<char>> rowMap;
        unordered_map<int, unordered_set<char>> colMap;
        unordered_map<int, unordered_set<char>> subBoxMap;

        for (int i = 0; i < rows; i ++) {
            for (int  j = 0; j < cols; j++) {
                char c = board[i][j];
                if (c == '.') {
                    continue;
                }

                // Key doesn't exist in rowMap; so create it
                if (rowMap.find(i) == rowMap.end()) {
                    unordered_set<char> s {c};
                    rowMap[i] = s;
                }
                // Check if char exists in row map. If it exists
                // it means we have seen char in the row; i.e.,
                // repetition. 
                else if (rowMap[i].find(c) != rowMap[i].end()) {
                    return false;
                }
                // Insert char into rowMap.
                else {
                    rowMap[i].insert(c);
                }

                // Key doesn't exist in colMap; so create it
                if (colMap.find(j) == colMap.end()) {
                    unordered_set<char> s {c};
                    colMap[j] = s;
                }
                // Check if char exists in col map. If it exists
                // it means we have seen char in the col; i.e.,
                // repetition.
                else if (colMap[j].find(c) != colMap[j].end()) {
                    return false;
                }
                // Insert char into colMap.
                else {
                    colMap[j].insert(c);
                }

                int subBoxCol = j / 3;
                int subBoxRow = (i / 3) * 3;
                int subBoxIndex = subBoxRow + subBoxCol;

                // Key doesn't exists in subBoxMap; so create it.
                if (subBoxMap.find(subBoxIndex) == subBoxMap.end()) {
                    unordered_set<char> s {c};
                    subBoxMap[subBoxIndex] = s;
                }
                // Check if char exists in subBox map. If it exists
                // it means we have seen char; i.e.,
                // repetition.
                else if (subBoxMap[subBoxIndex].find(c) != subBoxMap[subBoxIndex].end()) {
                    return false;
                }
                // Insert chart into subBoxMap.
                else {
                    subBoxMap[subBoxIndex].insert(c);
                }
            }
        }

        return true;
    }
};

int main(int argc, char const *argv[])
{
    
    return 0;
}