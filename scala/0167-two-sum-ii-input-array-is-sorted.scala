object Solution {
  def twoSum(numbers: Array[Int], target: Int): Array[Int] = {
    def loop(p1: Int, p2: Int): Array[Int] = {
      if(numbers(p1) + numbers(p2) == target) Array(p1 + 1, p2 + 1)
      else if(numbers(p1) + numbers(p2) > target) loop(p1, p2 - 1)
      else loop(p1 + 1, p2)
    }
    loop(0, numbers.length - 1)
  }
}
