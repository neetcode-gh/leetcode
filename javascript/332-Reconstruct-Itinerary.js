/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
	const flight_paths = new Map();
	const flight_path_order = ["JFK"];

	tickets = tickets.sort();

	for (const [source, dest] of tickets) {
		let edges = [];
		if (flight_paths.has(source)) {
			edges = flight_paths.get(source);
		}
		edges.push(dest);
		flight_paths.set(source, edges);
	}

	const depth_first_search = (city) => {
		if (flight_path_order.length === tickets.length + 1) return true;

		const cities_to_go_to = flight_paths.get(city) || [];
		if (!cities_to_go_to.length) return false;

		const cities_copied = Array.from(cities_to_go_to);

		for (const other_city of cities_copied) {
			flight_path_order.push(other_city);
			cities_to_go_to.shift();

			if (depth_first_search(other_city)) {
				return flight_path_order;
			} else {
				flight_path_order.pop();
				cities_to_go_to.push(other_city);
			}
		}

		return false;
	};

	return depth_first_search("JFK");
};
