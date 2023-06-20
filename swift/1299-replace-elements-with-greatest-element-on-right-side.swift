class Solution {
    func replaceElements(_ arr: [Int]) -> [Int] {
        // Brute Force
        // var arr = arr
        // for i in 0..<arr.count {
        //     var maxValue = Int.min
        //     for j in i+1..<arr.count {
        //         maxValue = max(maxValue, arr[j])   
        //     }
        //     arr[i] = maxValue
        // }
        
        // arr[arr.count - 1] = -1

        var copyArr = arr
         var maxValue = Int.min
         copyArr[copyArr.count - 1] = -1
         for i in (1..<arr.count).reversed() {
             maxValue = max(maxValue, arr[i])
             copyArr[i - 1] = maxValue
         }

        return copyArr
    }
}