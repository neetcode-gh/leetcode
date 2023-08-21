class Solution {
    func numRescueBoats(_ people: [Int], _ limit: Int) -> Int {
        let sortedPeople = people.sorted()

        var boats = 0
        var l = 0; var r = sortedPeople.count - 1

        while l <= r {
          var remaining = limit - sortedPeople[r]
          r -= 1
          boats += 1

          if l <= r && remaining >= sortedPeople[l] {
            l += 1
          }
        }

        return boats
    }
}