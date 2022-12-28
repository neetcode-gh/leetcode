class Solution {
    func combinationSum(_ candidates: [Int], _ target: Int) -> [[Int]] {
        var result=[[Int]]()
        func dfs(_ i:Int, _ current:[Int], _ total:Int){
            if total==target{
                result.append(current)
                return
            }
            
            if i>=candidates.count || total>target{
                return
            }

            var current=current
            current.append(candidates[i])
            dfs(i, current,total+candidates[i])

            current.removeLast()
            dfs(i+1,current,total)
        }

        dfs(0, [], 0)
        return result
    }
}
