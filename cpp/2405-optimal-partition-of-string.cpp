class Solution {
public:
    int partitionString(string s) {
        vector<int> lastSeen(26, -1);
        int count = 1, substringStart = 0;

        for (int i = 0; i < s.length(); i++) {
            if (lastSeen[s[i] - 'a'] >= substringStart) {
                count++;
                substringStart = i;
            }
            lastSeen[s[i] - 'a'] = i;
        }

        return count;
    }
};


class Solution {
  public:
    int minPartitions(std::string s) {
        // Set to keep track of characters in the current substring
        std::unordered_set<char> currentChars;
        // Variable to count the number of partitions
        int partitionCount = 0;

        // Iterate over each character in the string
        for (char c : s) {
            // If the character is already in the set, it means we've encountered a duplicate
            if (currentChars.find(c) != currentChars.end()) {
                // Increment the partition count and start a new substring
                partitionCount++;
                currentChars.clear();
            }
            // Add the current character to the set
            currentChars.insert(c);
        }

        // There will be at least one partition at the end if currentChars is not empty
        if (!currentChars.empty()) {
            partitionCount++;
        }

        return partitionCount;
    }
};
