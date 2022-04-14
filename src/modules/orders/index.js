import resolver from "../orders/resolver.js"
import { fileURLToPath } from 'url'
import { gql } from 'apollo-server'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const typeDefs = readFileSync(join(__dirname, 'schema.gql'), 'UTF-8')

export default {
    resolver,
    typeDefs: gql`${typeDefs}`
} 