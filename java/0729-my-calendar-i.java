// Segment Tree solution

class MyCalendar {

    public CalendarNode calendar;

    public MyCalendar() {
       this.calendar = new CalendarNode(-1, -1); // dummy node
    }
    
    public boolean book(int start, int end) {
       return bookHelper(this.calendar, start, end-1); // "end-1" because "end" bound is exclusive (see example 1) 
    }

    private boolean bookHelper(CalendarNode cur, int targetStart, int targetEnd) {
        if (targetStart > cur.end) {
            // go to the right
            if (cur.right == null) {
                // we can insert event
                cur.right = new CalendarNode(targetStart, targetEnd);
                return true;
            }
            return bookHelper(cur.right, targetStart, targetEnd);
        } else if (targetEnd < cur.start) {
            // go to the left
            if (cur.left == null) {
                // we can insert event
                cur.left = new CalendarNode(targetStart, targetEnd);
                return true;
            }
            return bookHelper(cur.left, targetStart, targetEnd);
        }
        return false;
    }
}

class CalendarNode {
    public int start;
    public int end;
    public CalendarNode left;
    public CalendarNode right;

    public CalendarNode(int start, int end) {
        this.start = start;
        this.end = end;
    }
}