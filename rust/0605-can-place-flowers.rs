impl Solution {
    // Space Complexity: O(1)
    pub fn can_place_flowers_1(flowerbed: Vec<i32>, n: i32) -> bool {
        let mut empty = if flowerbed[0] != 0 { 0 } else { 1 };
        let mut n = n;

        for f in flowerbed {
            if f != 0 {
                n -= (empty - 1) / 2;
                empty = 0;
            } else {
                empty += 1;
            }
        }

        n -= empty / 2;

        n <= 0
    }

    // Space Complexity: O(1)
    pub fn can_place_flowers_2(flowerbed: Vec<i32>, n: i32) -> bool {
        let mut flowerbed = flowerbed;
        let mut n = n;

        for i in 0..flowerbed.len() {
            if n == 0 {
                return true;
            }
            if (i == 0 || flowerbed[i - 1] == 0)
                && flowerbed[i] == 0
                && (i == flowerbed.len() - 1 || flowerbed[i + 1] == 0)
            {
                flowerbed[i] = 1;
                n -= 1;
            }
        }

        n == 0
    }

    // Space Complexity: O(n)
    pub fn other_can_place_flowers_3(flowerbed: Vec<i32>, n: i32) -> bool {
        let mut f: Vec<i32> = vec![vec![0], flowerbed, vec![0]]
            .into_iter()
            .flatten()
            .collect();
        let mut n = n;

        for i in 1..f.len() - 1 {
            if f[i - 1] == 0 && f[i] == 0 && f[i + 1] == 0 {
                f[i] = 1;
                n -= 1;
            }
        }

        n <= 0
    }
}