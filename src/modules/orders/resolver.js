export default {
    Query: {
        orders: (_, { orderId }, { read }) => {
            return read('orders').filter( order => orderId ? order.orderId == orderId : true )
        }
    },

    Mutation: {
        addOrder: (_, { userId, foodId, count }, { read, write }) => {
            const orders = read('orders')
            const users = read('users')
            const validUser = users.find( user => user.userId == userId )
            if(!validUser) {
                return {
                    status: 404,
                    message: "User is not found!",
                    data: null
                }
            }
            
            const existOrder = orders.find( order => order.userId == userId && order.foodId == foodId )
            if(existOrder) {
                existOrder.count += count
                write('orders', orders)
                return {
                    status: 200,
                    message: "Order count is updated!",
                    data: existOrder
                }
            } 


            const newOrder = {
                orderId: orders.length ? +orders.at(-1).orderId + 1 : 1,
                foodId,
                userId,
                count
            }

            orders.push(newOrder) 
            write('orders', orders)

            return {
                status: 201,
                message: 'Order is added successfully!',
                data: newOrder
            }
        },

        deleteOrder: (_, { userId }, { read, write }) => {
            const users = read('users')
            const user = users.find( user => user.userId == userId )
            if( !user ) {
                return {
                    status: 400,
                    message: "User is not found",
                    data: null
                }
            }
    
            let orders = read('orders')
            const order = orders.filter( order => order.userId == userId )
            if( !order.length ) {
                return {
                    status: 400,
                    message: "This user's order is not found",
                    data: null
                }
            } 
    
            orders = orders.filter( order => order.userId != userId )
            write('orders', orders)
            return {
                status: 200,
                message: "User's order is successfully deleted!",
                data: null
            }
        },
    },

    Order: {
        food: (parent, _, { read }) => {
            return read('foods').find( food => food.foodId == parent.foodId )
        },

        user: (parent, _, { read }) => {
            return read('users').find( user => user.userId == parent.userId )
        }
    }
}