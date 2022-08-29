class Solution {
    func myPow(_ x: Double, _ n: Int) -> Double {
        func helper(_ x: Double, _ n: Int) -> Double {
            if x == 0 {
                return 0
            }
            
            if n == 0 {
                return 1
            } 
            
            var res = helper(x, n/2)
            res = res * res
            return n % 2 == 1 ? x*res : res
        }
        
        var res = helper(x, abs(n))
        return n >= 0 ? res : 1/res
    }
}
