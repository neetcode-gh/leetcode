function reverse(x: number): number {
  let int: number = Math.abs(x)
  let result: number = 0
  while (int > 0) {
    let num: number = int % 10
    int = Math.floor(int / 10)
    result *= 10
    result += num
  }

  if (result > Math.pow(2, 31)) return 0
  return result * Math.sign(x)
}
