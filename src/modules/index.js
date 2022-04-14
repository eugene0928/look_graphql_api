import { makeExecutableSchema } from '@graphql-tools/schema'

import userModule from './users/index.js'
import orderModule from './orders/index.js'
import foodModule from './foods/index.js'

export const schema = makeExecutableSchema({
    typeDefs: [
        userModule.typeDefs, orderModule.typeDefs, foodModule.typeDefs
    ],
    resolvers: [
        userModule.resolver, orderModule.resolver, foodModule.resolver 
    ]
})