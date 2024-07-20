import { Navigate, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import TransactionPage from "./pages/TransactionPage"
import Header from "./components/ui/Header"
import { useQuery } from "@apollo/client"
import { GET_AUTH_USER } from "./graphql/queries/user.query"
import { Toaster } from "react-hot-toast"


function App() {
  const { data, loading, error } = useQuery(GET_AUTH_USER)
  console.log("Loading", loading)
  console.log("Authenticated User", data)
  console.log("Error", error)
  if(loading)return null;
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={data?.authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={data?.authUser ?  <Navigate to="/" />:<LoginPage />} />
        <Route path="/signup" element={data?.authUser ? <Navigate to="/"/>:<SignupPage />} />
        <Route path="/transaction/:id" element={data?.authUser ? <TransactionPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
