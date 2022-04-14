export default {
    Query: {
        users: (_, { userId }, { read }) => {
            return read('users').filter( user => userId ? user.userId == userId : true )
        }
    },

    User: {
        order: (parent, _, { read }) => {
            return read('orders').find( order => order.userId == parent.userId )
        }
    },

    Mutation: {
        addUser: (_, { userName, contact }, { read, write }) => {
            const users = read('users')
            const newUser = {
                userId: users.length ? +users.at(-1).userId + 1 : 1,
                username: userName,
                contact 
            }

            users.push(newUser)
            write('users', users)

            return {
                status: 201,
                message: 'User is added successfully!',
                data: newUser
            }
        },
        editUserName: (_, { userId, oldUserName, newUserName }, { read, write }) => {
            const users = read('users')
            const isUserExist = users.find( user => user.username == oldUserName && user.userId == userId)

            if( !isUserExist ) {
                return {
                    status: 400,
                    message: "User is not found!",
                    data: null
                }
            }

            isUserExist.username = newUserName
            write('users', users)
            return {
                status: 200,
                message: "Username is updated successfully!",
                data: isUserExist
            }
            
        },

        editUserContact: (_, { userId, username, newUserContact }, { read, write }) => {
            const users = read('users')
            const isUserExist = users.find( user => user.username == username && user.userId == userId)

            if( !isUserExist ) {
                return {
                    status: 400,
                    message: "User is not found!",
                    data: null
                }
            }

            isUserExist.contact = newUserContact
            write('users', users)
            return {
                status: 200,
                message: "User's contact is updated successfully!",
                data: isUserExist
            }
            
        }
    }
}