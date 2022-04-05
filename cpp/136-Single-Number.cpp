class Solution {
public:
    int swap(int& a, int& b) {
        a = a^b;
        b = a^a;
    }
};