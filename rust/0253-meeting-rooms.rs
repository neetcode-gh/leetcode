// Interval is a struct with fields `start:i32` & `end:i32`
pub fn can_attend_meetings(intervals: Vec<Interval>) -> bool {
    let mut intervals = intervals;
    intervals.sort_unstable_by(|a, b| a.start.cmp(&b.start));

    for i in 0..intervals.len() - 1 {
        if intervals[i].end > intervals[i + 1].start {
            return false;
        }
    }

    true
}
