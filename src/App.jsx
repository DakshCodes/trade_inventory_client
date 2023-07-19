import ForgetPassword from "./components/ForgetPassword";
import Home from "./pages/Home";
import Auth from "./pages/auth"
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {

  return (
    <>
      <div className="">
        <BrowserRouter>
        <Routes>
          
          
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          {/* <Route path='/auth' element={<Auth />} /> */}
          <Route path='/forget-password' element={<ForgetPassword />} />
          
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
