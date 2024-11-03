class Heap {
    var heap = [[0]]

    var count: Int {
        heap.count - 1
    }

    var first: [Int] {
        heap[1]
    }

    func heapify(_ arr: [[Int]]) {
        heap = arr
        heap.append(arr[0])
        var cur = (heap.count - 1) / 2
        while cur > 0 {
            var i = cur
            while 2 * i < heap.count {
                if 2 * i + 1 < heap.count && heap[2 * i + 1][0] < heap[2 * i][0] && heap[i][0] > heap[2 * i + 1][0] {
                    let tmp = heap[i]
                    heap[i] = heap[2 * i + 1]
                    heap[2 * i + 1] = tmp
                    i = 2 * i + 1
                } else if heap[i][0] > heap[2 * i][0] {
                    let tmp = heap[i]
                    heap[i] = heap[2 * i]
                    heap[2 * i] = tmp
                    i = 2 * i
                } else {
                    break
                }
            }
            cur -= 1
        }
    }

    func push(_ val: [Int]) {
        heap.append(val)
        var i = heap.count - 1
        while i > 1 && heap[i][0] < heap[i / 2][0] {
            let tmp = heap[i]
            heap[i] = heap[i / 2]
            heap[i / 2] = tmp
            i = i / 2
        }
    }

    func pop() -> [Int]? {
        if heap.count == 1 {
            return nil
        }
        if heap.count == 2 {
            return heap.popLast()
        }
        let res = heap[1]
        heap[1] = heap.removeLast()
        var i = 1
        while 2 * i < heap.count {
            if 2 * i + 1 < heap.count && heap[2 * i + 1][0] < heap[2 * i][0] && heap[i][0] > heap[2 * i + 1][0] {
                let tmp = heap[i]
                heap[i] = heap[2 * i + 1]
                heap[2 * i + 1] = tmp
                i = 2 * i + 1
            } else if heap[i][0] > heap[2 * i][0] {
                let tmp = heap[i]
                heap[i] = heap[2 * i]
                heap[2 * i] = tmp
                i = 2 * i
            } else {
                break
            }
        }
        return res
    }
}

class Twitter {
    var count = 0
    var tweetMap = [Int: [[Int]]]()
    var followMap = [Int: Set<Int>]()

    init() {
        
    }
    
    func postTweet(_ userId: Int, _ tweetId: Int) {
        tweetMap[userId, default: []].append([count, tweetId])
        count -= 1
    }
    
    func getNewsFeed(_ userId: Int) -> [Int] {
        var res = [Int]()
        var heap = Heap()

        followMap[userId, default: Set<Int>()].insert(userId)
        for followeeId in followMap[userId, default: Set<Int>()] {
            if tweetMap[followeeId] != nil {
                let index = tweetMap[followeeId]!.count - 1
                let val = tweetMap[followeeId]![index]
                let count = val[0]
                let tweetId = val[1]
                heap.push([count, tweetId, followeeId, index - 1])
            }
        }

        while heap.count > 0 && res.count < 10 {
            let val = heap.pop()
            var count = val![0]
            var tweetId = val![1]
            let followeeId = val![2]
            let index = val![3]
            res.append(tweetId)

            if index >= 0 {
                let val = tweetMap[followeeId]![index]
                count = val[0]
                tweetId = val[1]
                heap.push([count, tweetId, followeeId, index - 1])
            }
        }

        return res
    }
    
    func follow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId, default: Set<Int>()].insert(followeeId)
    }
    
    func unfollow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId]?.remove(followeeId)
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * let obj = Twitter()
 * obj.postTweet(userId, tweetId)
 * let ret_2: [Int] = obj.getNewsFeed(userId)
 * obj.follow(followerId, followeeId)
 * obj.unfollow(followerId, followeeId)
 */