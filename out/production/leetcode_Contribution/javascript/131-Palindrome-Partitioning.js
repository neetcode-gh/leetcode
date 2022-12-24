/**
 * https://leetcode.com/problems/palindrome-partitioning/
 * Time O(N * 2^N) | Space O(N^2)
 * @param {string} s
 * @return {string[][]}
 */
function partition(s, left = 0, _partition = [], partitions = []) {
    const isBaseCase = s.length <= left
    if (isBaseCase) {
        if (_partition.length) partitions.push(_partition.slice());

        return partitions
    }

    for (let right = left; right < s.length; right++) {
        if (!isPalindrome(s, left, right)) continue;

        backTrack(s, left, right, _partition, partitions)
    }

    return partitions
}

const backTrack = (s, left, right, _partition, partitions) => {
    _partition.push(s.slice(left, (right + 1)));
        partition(s, (right + 1), _partition, partitions);
    _partition.pop();
}

const isPalindrome = (str, left, right) => {
    while (left < right) {
        const isSame = str[left] === str[right];
        if (!isSame) return false;

        left++; right--;
    }

    return true;
}
