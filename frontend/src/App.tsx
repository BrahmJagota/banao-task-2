import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'

function App() {

  return (
    <AuthContextProvider>
    <div>
          <Login />
    </div>
    </AuthContextProvider>
  )
}

export default App
