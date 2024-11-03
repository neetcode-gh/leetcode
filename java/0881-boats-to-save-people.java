class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int boatsNeeded = 0;
        int lightIdx = 0;
        int heavyIdx = people.length-1;
        while (lightIdx <= heavyIdx) {
            if (people[lightIdx] + people[heavyIdx] <= limit) 
                lightIdx++;
            heavyIdx--;
            boatsNeeded++;
        }
        return boatsNeeded;
    }
}