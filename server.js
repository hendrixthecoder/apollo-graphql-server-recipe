import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers.js'
import { config } from 'dotenv'
import { logger } from './utils/logger.js'
config() //load the .env variables

const MONGODB_URI = process.env.MONGODB_URI

const server = new ApolloServer({
    typeDefs,
    resolvers
})

try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    logger.log('Connected to MongoDB successfuly!');

    const { url } = await startStandaloneServer(server, { listen: { port: process.env.PORT } })
    logger.error(`🚀  Server ready at: ${url}`);

} catch (error) {
    error(`Error connecting to MongoDB: ${error}`)
}
