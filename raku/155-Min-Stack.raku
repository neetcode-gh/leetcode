use v6.c;

class MinStack {
    has @!recents;
    has @!minimums;

    method push(Int $val --> Nil) {
        @!recents.push: $val;
        my $new-min = min $val, @!minimums ?? @!minimums[*-1] !! $val;
        @!minimums.push: $new-min;
    }

    method pop(--> Int:D) {
        @!recents.pop;
        @!minimums.pop;
    }

    method top(--> Int:D) {
        @!recents[*-1]
    }

    method getMin(--> Int:D) {
        @!minimums[*-1]
    }
}
