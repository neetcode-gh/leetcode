func canPartitionTabulation(nums []int) bool {
    sum := sum(nums)
    if sum % 2 != 0 {
        return false
    }
    
    dp := make(map[int]bool)
    dp[0] = true
    target := sum / 2
    
    for i := len(nums) - 1; i >= 0; i-- {
        nextDP := make(map[int]bool)
        for t, _ := range dp {
            if (t + nums[i]) == target {
                return true
            }
            nextDP[t + nums[i]] = true
            nextDP[t] = true
        }
        dp = nextDP
    }
    return false
}

func sum(nums []int) int {
    res := 0
    for _, num := range nums {
        res += num
    }
    return res
}



const NUM = 0
const FREQ = 1
type byNum [][]int
func (s byNum) Len() int {return len(s)}
func (s byNum) Swap(i, j int) {s[i], s[j] = s[j], s[i]}
func (s byNum) Less(i, j int) bool {return s[i][NUM] > s[j][NUM]}

func canPartitionMemoization(nums[] int) bool {
    count := make(map[int]int)
    sum := 0
    for _, n := range nums {
        count[n] += 1
        sum += n
    }
    
    if sum % 2 != 0 {
        return false
    }
    
    numsF := make([][]int, len(count))
    idx := 0
    for num, freq := range count {
        numsF[idx] = []int{num, freq}
        idx++
    }
    sort.Sort(byNum(numsF))
    visited := make([]bool, sum/2 + 1)
    visited[0] = true
    return solveCanPartition(visited, numsF, sum/2)
}

func solveCanPartition(visited []bool, nums [][]int, target int) bool {
    if visited[target] {
        return target == 0
    }
    visited[target] = true
    
    for index := predecessor(nums, target); index < len(nums); index++ {
        nums[index][FREQ]--
        if nums[index][FREQ] >= 0 && solveCanPartition(visited, nums, target - nums[index][NUM]) {
            return true
        }
        nums[index][FREQ]++
    }
    
    return false
}

func predecessor(nums [][]int, target int) int {
    l := 0
    h := len(nums) - 1
    for h - l > 1 {
        m := (h + l)/2
        if nums[m][NUM] > target {
            l = m + 1
        } else {
            h = m
        }
    }
    
    if nums[l][0] <= target {
        return l
    } else if nums[h][0] <= target {
        return h
    } else {
        return math.MaxInt32
    }
}
