import './App.css'
import Home from './components/Home'
import LogIn from './components/LogIn';
import SignUp from './components/SignUp'
import { createBrowserRouter } from 'react-router-dom';
import { RequireToken } from './const/RequireToken';

function App() {

  return (
    <>
      <Home/>
    </>
  )
}

export const Approuter = createBrowserRouter([
  {
    path:"/",
    element:<RequireToken><App/></RequireToken>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<LogIn/>
  }
])
