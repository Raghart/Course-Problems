import Author from './Models/AuthorSchema.js'
import Book from './Models/BookSchema.js'
import User from './Models/UserSchema.js'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import jwt from 'jsonwebtoken'

const pubsub = new PubSub() 

const booksAuthors = async (array) => {
  return await Promise.all(array.map(async (book) => {
  const author = await Author.findOne({ _id: book.author });
  return { ...book, author };
  }))
}

const resolvers = {
    Query: {
      bookCount: async (author) => Book.collection.countDocuments({ author: author }),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (Object.keys(args).length === 0 || !args.genre) {
  
          try {
            const allBooks = await Book.find({}).lean()
            const books = await booksAuthors(allBooks)
            return books
  
          } catch (error) {
            throw new GraphQLError("Error trying to map all the authors with their respective books", {
              invalid: args
            })
          }
        }
  
        if (args.genre) {
  
          try{
            const cursor = Book.collection.find({ genres: {"$in": ([args.genre])} })
            const booksArray = await cursor.toArray();
            const books = booksAuthors(booksArray)
            return books
  
          } catch (error) {
            throw new GraphQLError("Error trying to find the Genre in the list of Genres", {
              invalid: args
            })
          }
        }
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
       let author = await Author.findOne({ name: args.author })
        
        if (!author){
          const NewAuthor = new Author({ name: args.author })
          author = NewAuthor
          NewAuthor.save()
        }
        const newBookDB = new Book({ ...args, author: author._id })
        const newBookRes = {
          title: newBookDB.title,
          published: newBookDB.published,
          author: { name: author.name },
          genres: newBookDB.genres,
          _id: newBookDB._id
        }

        if (!currentUser) {
          throw new GraphQLError('Error user not authenticated', {
            extensions: {
              code: 'Bad_User_Input'
            }
          })
        }
        
        try{
          await newBookDB.save()
        
        } catch (error) {
          throw new GraphQLError("Error trying to add the new book in MongoDB", {
            invalid: args
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: newBookRes })
        
        return newBookRes
      },
      addAuthor: async (root, args, {currentUser} ) => {
        const newAuthor = new Author({ ...args })

        if (!currentUser) {
          throw new GraphQLError("Error Authenticating the User", {
            invalid: args
          })
        }
  
        try{
          await newAuthor.save()
        } catch (error) {
  
          throw new GraphQLError("Error al intentar guardar el nuevo autor en MONGODB", {
            invalid: args
          })
        }
  
        return newAuthor
      },
      editAuthor: async (root, args, {currentUser} ) => {
        if (!currentUser) {
          throw new GraphQLError("Error trying to Authenticate the User", {
            invalid: args
          })
        }

        try{
          const author = Author.findOneAndUpdate({ name: args.name }, {born: args.setBornTo}, {new: true})
          
          if (!author) {
            return null
          }
  
          return author
        } catch (error) {
          throw new GraphQLError("Error trying to update the birthyear of an existing Author", {
            invalid: args
          })
        }
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username })

        return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'Bad_User_Input',
              invalidArgs: args.name,
              error
            }
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
          throw new GraphQLError('Wrong credentials', {
            extensions: {
              code: 'Bad_User_Input'
            }
          })
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken , process.env.JWT_SECRET) }
      }
    },
    Author: {
      bookCount: async (root) => Book.collection.countDocuments({ author: root._id })
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator(['BOOK_ADDED'])
      },
    },
}

export default resolvers
