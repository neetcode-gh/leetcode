/*
    Suppose you have versions and you want to find out the first bad one, which causes all the following ones to be bad.n[1, 2, ..., n]
    You are given an API which returns whether is bad. Implement a function to find the first bad version. 

    Ex.
    Input: n = 5, bad = 4
    Output: 4

    Explanation:
    call isBadVersion(3) -> false
    call isBadVersion(5) -> true
    call isBadVersion(4) -> true

    1.- Find the number in the middle of the vector.
    2.- Takes a part (first or second), depending on whether or not the target is greater than the middel.
    3.- Change the current left or right part.
    3.- Do this process until the left reaches the right.

    Time: O(log n)
    Space: O(1)
*/

class Solution {
public:
    int firstBadVersion(int n) {
        int left = 1;
        int right = n;

        while (right > left) {
            int mid = left + (right - left) / 2;

            if (isBadVersion(mid))
                right = mid;
            else
                left = mid + 1;
        }
        return left;
    }
};
