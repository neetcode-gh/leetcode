class MyCalendarTwo {

    List<int[]> non_overlapping;
    List<int[]> overlapping;
  
    public MyCalendarTwo() {
        non_overlapping = new ArrayList<>();
        overlapping = new ArrayList<>();
    }
    
    public boolean book(int start, int end) {
        for(int[] arr: overlapping){
            int s = arr[0], e = arr[1];
            if(start < e && end > s){
                return false;
            }
        }

        for(int[] arr: non_overlapping){
            int s = arr[0], e = arr[1];
            if(start < e && end > s){
                overlapping.add(new int[]{Math.max(start, s), Math.min(end, e)});
            }
        }
        non_overlapping.add(new int[]{start, end});
        return true;
    }
}
