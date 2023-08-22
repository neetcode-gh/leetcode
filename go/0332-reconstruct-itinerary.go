func findItinerary(tickets [][]string) []string {

	adjMap := make(map[string][]string)

	for i := 0; i < len(tickets); i++ {
		adjMap[tickets[i][0]] = append(adjMap[tickets[i][0]], tickets[i][1])
	}

	for i := 0; i < len(tickets); i++ {
		sort.Strings(adjMap[tickets[i][0]])
	}

	res := []string{"JFK"}

	var dfs func(source string) bool

	dfs = func(src string) bool {

		if len(res) == len(tickets)+1 {
			return true
		}

		if _, ok := adjMap[src]; !ok {
			return false
		}

		destinationList := adjMap[src]

		for i, destination := range destinationList {

			adjMap[src] = append(adjMap[src][:i], adjMap[src][i+1:]...)

			res = append(res, destination)
			if dfs(destination) == true {
				return true
			}
			adjMap[src] = append(adjMap[src][:i+1], adjMap[src][i:]...)
			adjMap[src][i] = destination

			res = res[:len(res)-1]
		}

		return false
	}

	dfs("JFK")
	return res
}
