import TodoApp from './Components/TodoApp'
import { Routes,Route } from 'react-router-dom'
import Login from "./Pages/Login"
import Registration from "./Pages/Registration"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
      {/* <TodoApp></TodoApp> */}
      <Routes>
        <Route path="/" element={<TodoApp/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    <ToastContainer />
    </>
  )
}

export default App
