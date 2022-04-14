import { ApolloServer } from 'apollo-server'
import model from './utils/model.js'
import { schema } from './modules/index.js'

const server = new ApolloServer( {
    context: ( {req, res} ) => model,
    schema
} )


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})