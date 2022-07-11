/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let [A, B] = [nums1, nums2];
  const total = nums1.length + nums2.length;
  const half = Math.floor(total / 2);

  if (B.length < A.length) {
    [A, B] = [B, A];
  }

  let [l, r] = [0, A.length - 1];
  while (true) {
    const i = l + r;
    const j = half - i - 2;

    const Aleft = i >= 0 ? A[i] : -Infinity;
    const Aright = i + 1 < A.length ? A[i + 1] : Infinity;
    const Bleft = j >= 0 ? B[j] : -Infinity;
    const Bright = j + 1 < B.length ? B[j + 1] : Infinity;

    if (Aleft <= Bright && Bleft <= Aright) {
      if (total % 2) {
        return Math.min(Aright, Bright);
      }

      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) r = i - 1;
    else l = i + 1;
  }
};
