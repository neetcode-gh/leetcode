class FoodRatings(foods: Array<String>, cuisines: Array<String>, ratings: IntArray) {

    val ratingsList = HashMap<String, SortedSet<Pair<Int, String>>>()
    val cuisinesList = HashMap<String, String>()
    val foodRatingsList = HashMap<String, Int>()

    init {
        for (i in foods.indices) {
            ratingsList.getOrPut(cuisines[i]) { 
                sortedSetOf(compareBy({ -it.first }, { it.second })) 
            }.apply { 
                add(ratings[i] to foods[i]) 
            }
            cuisinesList[foods[i]] = cuisines[i]
            foodRatingsList[foods[i]] = ratings[i]
        }
    }

    fun changeRating(food: String, newRating: Int) {
        val cuisine = cuisinesList[food] ?: ""
        val rating = foodRatingsList[food] ?: 1

        ratingsList[cuisine]?.let {
            it.remove(rating to food)
            it.add(newRating to food)
        }

        foodRatingsList[food] = newRating
    }

    fun highestRated(cuisine: String): String {
        return ratingsList[cuisine]?.first()?.second ?: ""
    }

}
