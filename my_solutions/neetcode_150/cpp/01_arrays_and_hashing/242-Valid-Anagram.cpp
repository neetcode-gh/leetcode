#include <bits/stdc++.h>

using namespace std;

class Solution
{
public:
    bool isAnagram(string s, string t)
    {
        // Not anagram if string size is not equal.
        if (s.size() != t.size()) {
            return false;
        }

        unordered_map<char, int> sMap;
        unordered_map<char, int> tMap;

        for (char c: s) {
            if (sMap.find(c) == sMap.end()) {
                sMap[c] = 1;
            } else {
                sMap[c]++;
            }
        }

        for (char c: t) {
            if (tMap.find(c) == tMap.end()) {
                tMap[c] = 1;
            } else {
                tMap[c]++;
            }
        }

        unordered_map<char, int> largest = sMap.size() > tMap.size() ? sMap : tMap;

        for (auto i: largest) {
            if (tMap.find(i.first) == tMap.end() || sMap.find(i.first) == sMap.end()) {
                return false;
            }

            if (tMap[i.first] != sMap[i.first]) {
                return false;
            }
        }

        return true;
    }
};

int main(int argc, char const *argv[])
{

    return 0;
}