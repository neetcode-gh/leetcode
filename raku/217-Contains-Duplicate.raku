use v6.c;

#
# Easily implemented as a one-liner:
#
#     @nums.Bag.total != @nums.Bag.elems
#

class Solution {
    method containsDuplicate(Int:D @nums --> Bool:D) {
        my SetHash $hs .= new;
        for @nums -> $n {
            return True if $hs{$n};
            $hs{$n} = True
        }
        return False;
    }
}
