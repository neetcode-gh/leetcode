//Tricky problem but easy
//this video was helpful https://www.youtube.com/watch?v=wT7gcXLYoao&ab_channel=takeUforward

class Solution {

  //Time complexity O(N^2) becuase of remove method
  public String getPermutation(int n, int k) {
    StringBuilder kthPerm = new StringBuilder();
    int fact = 1;
    //this list will contain all the values from 1 to n for reference
    ArrayList<Integer> list = new ArrayList<>();
    for (int i = 1; i < n; i++) {
      fact = fact * i;
      list.add(i);
    }
    list.add(n);
    k--;
    while (true) {
      kthPerm.append(list.get(k / fact));
      list.remove(k / fact);
      if (list.size() == 0) break;
      k = k % fact;
      fact = fact / (list.size());
    }
    return kthPerm.toString();
  }

  {
    //Bruteforce solution (gives TLE) similar to Next Permutation problem no.31

    //         public String getPermutation(int n, int k) {
    //         int[] num = new int[n];
    //         for (int i = 1; i<=n; i++) {
    //             num[i-1] = i;
    //         }
    //         for (int i = 1; i<k; i++) {
    //             nextPermutation(num);
    //         }
    //         return numToString(num);
    //     }

    //     public void nextPermutation(int[] nums) {
    //         int pivot = nums.length-1;
    //         while (pivot>0 && nums[pivot]<nums[pivot-1]) {
    //             pivot--;
    //         }
    //         pivot--;
    //         int j = nums.length-1;
    //         while (j>0 && nums[j]<nums[pivot]) {
    //             j--;
    //         }
    //         System.out.println(pivot+" "+j);
    //         swap(nums, j, pivot);
    //         reverse(nums, pivot+1);
    //     }

    //     public void reverse(int[] num, int start) {
    //         int end = num.length-1;
    //         while (start<end) {
    //             int temp = num[start];
    //             num[start] = num[end];
    //             num[end] = temp;
    //             start++;
    //             end--;
    //         }
    //     }

    //     public void swap(int[] num, int i, int j) {
    //         int temp = num[i];
    //         num[i] = num[j];
    //         num[j] = temp;
    //     }

    //     public String numToString(int[] arr) {
    //         StringBuilder sb = new StringBuilder();
    //         for (int num: arr)
    //             sb.append(num);
    //         return sb.toString();
    //     }

  }
}
