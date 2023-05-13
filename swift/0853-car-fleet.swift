/**
 * Question Link: https://leetcode.com/problems/car-fleet/
 */

class CarFleet {
    func carFleet(_ target: Int, _ position: [Int], _ speed: [Int]) -> Int {
        var stack = [Double]()

        let pair = zip(position, speed)
            .map { ($0, $1) }
            .sorted { $0.0 > $1.0 }

        for (p, s) in pair {
            stack.append(Double(target - p) / Double(s))

            guard stack.count >= 2 else { continue }

            let suffix = stack.suffix(2)
            if suffix.last! <= suffix.first! {
                stack.removeLast()
            }
        }

        return stack.count
    }
}