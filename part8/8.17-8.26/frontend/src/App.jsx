import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "./queries/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState('')
  const client = useApolloClient()

  const Logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  useEffect(() => {
    const token = localStorage.getItem('books-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (bookAdded) => {
        try {
          const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {genre: null } });
          if (!dataInStore.allBooks.map(b => b.title).includes(bookAdded.title)) {
            client.writeQuery({
              query: ALL_BOOKS,
              variables: { genre: null},
              data: { 
                ...dataInStore,
                allBooks: [...dataInStore.allBooks, bookAdded]
              }
            })        
          }
        } catch (error) {
          console.error('Error reading cache:', error)
        }
    }

  useSubscription(BOOK_ADDED, {
    onData: ({ data: {data: { bookAdded } } }) => {
      window.alert(`New book added: ${bookAdded.title} by ${bookAdded.author.name}`)
      updateCacheWith(bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {!token && (<button onClick={() => setPage("Login")}>Login</button>)}
        {token && (
        <>
          <button onClick={() => setPage("add")}>Add Book</button>
          <button onClick={() => setPage("recommendation")}>Recommend</button>
          <button onClick={Logout}>Logout</button>
        </>
      )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />

      <Login show={page === "Login"} setToken={setToken} setPage={setPage} />

      <Recommend show={page === "recommendation" } />
    </div>
  );
};

export default App;
