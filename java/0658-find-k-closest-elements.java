class Solution {
    
    public int binarySearch(int[] arr, int x) {
        int l = 0, r = arr.length-1;
        while(l < r  && r-l != 0) {
            int mid = l + ((r - l) / 2);
            if(arr[mid] == x) return mid;
            if(l == mid) {
                if(Math.abs(arr[l]-x) <= Math.abs(arr[r]-x)) return l;
                else return r;
            }
            if(arr[mid] > x) r = mid;
            else l = mid;
        }
        return l;
    }
    
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int idx = -1;
        if(x < arr[0]) idx = 0;
        else if(x > arr[arr.length-1]) idx = arr.length-1;
        else idx = binarySearch(arr, x);
        List<Integer> res = new ArrayList<>();
        res.add(arr[idx]);
        int p1 = idx-1, p2 = idx+1;
        while(p1 >= 0 && p2 < arr.length && res.size() < k) {
            int a = arr[p1], b = arr[p2];
            if((Math.abs(a-x) <= Math.abs(b-x))) {
                res.add(a);
                p1--;
            } else {
                res.add(b);
                p2++;
            }
        }
        while(p1 >= 0 && res.size() < k) {
            res.add(arr[p1--]);
        }
        while(p2 < arr.length && res.size() < k) {
            res.add(arr[p2++]);
        }
        Collections.sort(res);
        return res;
    }
}
