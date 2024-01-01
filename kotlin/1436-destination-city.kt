class Solution {
    fun destCity(paths: List<List<String>>): String {
        var fromCity: HashSet<String> = hashSetOf()
        for (path in paths)
            fromCity.add(path[0])

        var res = paths[0][1]
        for (path in paths) {
            if (path[1] !in fromCity) {
                res = path[1]
                break
            }
        }

        return res
    }
}
