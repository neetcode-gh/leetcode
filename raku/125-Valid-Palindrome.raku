use v6.c;

class Solution {
    method isPalindrome(Str:D $s --> Bool:D) {
        sub isAlphanum { $^char ~~ 'a'..'z' or $^char ~~ 'A'..'Z' or $^char ~~ '0'..'9' }

        my ($l, $r) = 0, $s.chars - 1;

        while $l < $r {
            while $l < $r and not isAlphanum $s.substr($l, 1) { $l += 1 }
            while $r > $l and not isAlphanum $s.substr($r, 1) { $r -= 1 }

            if $s.substr($l, 1).lc ne $s.substr($r, 1).lc {
                return False 
            }

            $l += 1;
            $r -= 1;
        }

        return True
    }
}
