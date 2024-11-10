class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        counter1 = Counter(nums1)
        counter2 = Counter(nums2)

        # Using defaultdict to handle missing keys more efficiently
        counter1 = defaultdict(int, counter1)
        counter2 = defaultdict(int, counter2)

        intersection = []

        for num, freq in counter1.items():
            min_freq = min(freq, counter2[num])
            if min_freq > 0:
                intersection.extend([num] * min_freq)

        return intersection
