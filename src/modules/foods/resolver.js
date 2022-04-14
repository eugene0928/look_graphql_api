export default {
    Query: {
        foods: (_, { foodId }, { read }) => {
            return read('foods').filter( food => foodId ? food.foodId == foodId : true )
        }
    },

    Mutation: {
        addFood: (_, { foodName, foodImg }, { read, write }) => {
            const foods = read('foods')
            const validFood = foods.find( food => food.foodName == foodName )

            if( validFood ) {
                return {
                    status: 400,
                    message: "Food already exists",
                    foodData: null
                }
            }

            const newFood = {
                foodId: foods.length ? +foods.at(-1).foodId + 1 : 1,
                foodName,
                foodImg
            }
            foods.push(newFood)
            write('foods', foods)
            return {
                status: 200,
                message: "Food is added successfully!",
                foodData: newFood
            }
        },

        editFoodImg: (_, { foodId, foodImg }, { read, write }) => {
            const foods = read('foods')
            const validFood = foods.find( food => food.foodId == foodId )

            if( !validFood ) {
                return {
                    status: 404,
                    message: "Food is not found!",
                    foodData: null
                }
            }

            validFood.foodImg = foodImg
            write( 'foods', foods )
            return {
                status: 200,
                message: "Food's image is updated successfully!",
                foodData: validFood
            }
        },

        deleteFood: (_, { foodId }, { read, write }) => {
            let foods = read('foods')
            const food = foods.find( food => food.foodId == foodId )
            if( !food ) {
                return {
                    status: 404,
                    message: "Food is not found!",
                    foodData: null
                }
            }

            foods = foods.filter( food => food.foodId != foodId )
            write('foods', foods)
            return {
                status: 200,
                message: "Food is deleted successfully!",
                foodData: food
            }
        }
    }

}