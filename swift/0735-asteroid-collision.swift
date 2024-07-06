class Solution {
    func asteroidCollision(_ asteroids: [Int]) -> [Int] {
        var stack = [Int]()

        for var a in asteroids {
            while !stack.isEmpty && a < 0 && stack.last! > 0 {
                let diff = a + stack.last!
                if diff < 0 {
                    stack.popLast()
                } else if diff > 0 {
                    a = 0
                } else {
                    a = 0
                    stack.popLast()
                }
            }

            if a != 0 {
                stack.append(a)
            }
        }

        return stack
    }
}