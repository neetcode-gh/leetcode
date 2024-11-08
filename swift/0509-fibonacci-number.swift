/**
 * Question Link: https://leetcode.com/problems/fibonacci-number/
 */

class Solution {
    func fib(_ n: Int) -> Int {
        let goldenRatio = (1 + 5.0.squareRoot()) / 2.0
        return Int(round(pow(goldenRatio, Double(n)) / 5.0.squareRoot()))
    }
}