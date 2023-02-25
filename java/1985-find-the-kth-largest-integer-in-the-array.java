// Min Heap comparator for reverse priority queue
class StringNumberComparartor implements Comparator<String> {
    @Override
    public int compare(String s1, String s2) {
        if(s1.length() != s2.length()) {
            return (s1.length() - s2.length());
        }
        int len = s1.length();
        for(int i=0; i<len; i++) {
            char c1 = s1.charAt(i), c2 = s2.charAt(i);
            if(c1 == c2) { continue; }
            return (c1 - c2);
        }
        return 0;
    }
}

class Solution {
    public String kthLargestNumber(String[] nums, int k) {
        // Reverse pq to store only k elements [i.e. Min Heap]
        PriorityQueue<String> pq = new PriorityQueue<>(new StringNumberComparartor());

        for(String numStr: nums) {
            pq.add(numStr);
            if(pq.size() > k) {
                pq.remove();
            }
        }

        return pq.peek();
    }
}