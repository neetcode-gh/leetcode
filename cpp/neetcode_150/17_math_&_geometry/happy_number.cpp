/*
    Given num, replace by sum of squares of its digits
    Repeat until 1 or endless loop, determine if ends in 1
    Ex. n = 19 -> true, 1^2 + 9^2 = 82, 8^2 + 2^2 = 68 ... 1

    Detect cycle w/ slow/fast pointer technique
    If happy will eventually be 1, else pointers will meet

    Time: O(log n)
    Space: O(1)
*/

class Solution {
public:
    bool isHappy(int n) {
        int slow = n;
        int fast = getNext(n);
        
        while (slow != fast && fast != 1) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        
        if (fast == 1) {
            return true;
        }
        return false;
    }
private:
    int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            n /= 10;
            sum += pow(digit, 2);
        }
        return sum;
    }
};
