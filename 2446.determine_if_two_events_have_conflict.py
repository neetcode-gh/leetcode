class Solution:
    def haveConflict(self, event1: List[str], event2: List[str]) -> bool:
        def time_to_minutes(time: str) -> int:
            """Convert time in HH:MM format to minutes since midnight."""
            hours, minutes = map(int, time.split(':'))
            return hours * 60 + minutes

        start1, end1 = map(time_to_minutes, event1)
        start2, end2 = map(time_to_minutes, event2)

        # Check if the events overlap
        return not (end1 < start2 or end2 < start1)
