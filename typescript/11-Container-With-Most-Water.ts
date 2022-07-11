function maxArea(height: number[]): number {
  let l = 0;
  let r = height.length - 1;
  let max = 0;

  while (l < r) {
    let area = (r - l) * Math.min(height[l], height[r]);

    max = Math.max(max, area);

    if (height[l] < height[r]) {
      l += 1;
    } else {
      r -= 1;
    }
  }

  return max;
}
