/*
    This class implements a solution to find a binary string that differs from a given list of binary strings.
    
    Approach:
    1. Define a backtrack function to explore all possible binary strings of the same length as the input strings.
    2. Use a set to store the input strings to efficiently check for duplicates.
    3. Backtrack through all possible binary strings of length equal to the input strings.
    4. If a binary string is found that does not exist in the set of input strings, update the result and return.
    
    Variables:
    - result: Holds the result, initialized to an empty string.
    - backtrack(): Recursive function to generate binary strings and check for uniqueness.
    - inputStrings: Input vector of binary strings.
    - currentString: Current binary string being constructed during backtracking.
    - stringLength: Length of binary strings in the input.
    - stringSet: Set to store input binary strings for fast duplicate checking.

    Time Complexity: O(2^N * N), where N is the length of the binary strings.
        - The function 'backtrack' explores all possible binary strings of length N, which is O(2^N).
        - Checking for uniqueness in the set takes O(1) time on average.
    Space Complexity: O(2^N * N) considering the space required to store the generated binary strings during backtracking.
*/

class Solution {
public:
    string result = "";
    
    void backtrack(vector<string>& inputStrings, string& currentString, int stringLength, set<string>& stringSet) {
        if (!result.empty()) return;
        if (currentString.size() == stringLength && stringSet.find(currentString) == stringSet.end()) {
            result = currentString;
            return;
        }
        if (currentString.size() > stringLength) return;

        for (char ch = '0'; ch <= '1'; ++ch) {
            currentString.push_back(ch);
            backtrack(inputStrings, currentString, stringLength, stringSet);
            currentString.pop_back();
        }
    }
    
    string findDifferentBinaryString(vector<string>& inputStrings) {
        int stringLength = inputStrings[0].size();
        string currentString = "";
        set<string> stringSet(inputStrings.begin(), inputStrings.end());

        backtrack(inputStrings, currentString, stringLength, stringSet);
        return result;
    }
};
