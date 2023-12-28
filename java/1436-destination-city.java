class Solution {
    public String destCity(List<List<String>> paths) {
        Set<String> set = new HashSet<>();
        for(List<String> path: paths){
            String city = path.get(0);
            set.add(city);
        }

        for(List<String> path: paths){
            String city = path.get(1);
            if(!set.contains(city))
                return city;
        }
        return "";
    }
}
