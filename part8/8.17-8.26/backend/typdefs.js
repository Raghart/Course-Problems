import { gql } from 'apollo-server'

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: Int!
        genres: [String!]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
        }

    type Token {
      value: String!
    }

    type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book

    addAuthor(
        name: String!
        born: Int
    ): Author
    
    editAuthor(
        name: String!, 
        setBornTo: Int!
    ) : Author

    createUser(
        username: String!
        favoriteGenre: String!
    ): User

    login(
        username: String!
        password: String!
    ): Token
    }

    type Query {
    bookCount (author: String): Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    }

    type Subscription {
    bookAdded: Book!
    }
` 

export default typeDefs