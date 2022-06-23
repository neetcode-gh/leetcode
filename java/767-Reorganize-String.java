//See this comment for explanation https://leetcode.com/problems/reorganize-string/discuss/113440/Java-solution-PriorityQueue/211009

class Solution {
    public String reorganizeString(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        for (int i = 0; i<s.length(); i++) {
            map.put(s.charAt(i), map.getOrDefault(s.charAt(i), 0)+1);
        }
        PriorityQueue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>((a,b)->b.getValue()-a.getValue());
        pq.addAll(map.entrySet());
        
        StringBuilder sb = new StringBuilder();
        
        while (!pq.isEmpty()) {
            Map.Entry<Character, Integer> temp1 = pq.poll();
            //if the character at sb's end is different from the max frequency character or the string is empty
            if (sb.length()==0 || sb.charAt(sb.length()-1)!=temp1.getKey()) {
                sb.append(temp1.getKey());
                //update the value
                temp1.setValue(temp1.getValue()-1);
            } else { //the character is same
                //hold the current character and look for the 2nd most frequent character
                Map.Entry<Character, Integer> temp2 = pq.poll();
                //if there is no temp2 i.e. the temp1 was the only character in the heap then there is no way to avoid adjacent duplicate values
                if (temp2==null) 
                    return "";
                //else do the same thing as above
                sb.append(temp2.getKey());
                //update the value
                temp2.setValue(temp2.getValue()-1);
                //if still has some value left add again to the heap
                if (temp2.getValue()!=0) 
                    pq.offer(temp2);
            }
            if (temp1.getValue()!=0) 
                pq.offer(temp1);
        }
        return sb.toString();
    }
}
