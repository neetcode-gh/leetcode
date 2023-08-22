object Solution {
  def largestNumber(nums: Array[Int]): String = {
    BigInt(nums.map(_.toString).sortWith((l, r) => l ++ r >= r ++ l).foldLeft("")(_ + _)).toString
  }
}