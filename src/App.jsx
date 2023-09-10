import { useSelector } from "react-redux";
import ForgetPassword from "./components/ForgetPassword";
import ProtectedPage from "./components/ProtectedPage";
import Verified from "./components/Verified";
import Home from "./pages/Home";
import Auth from "./pages/auth"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Spinner from "./components/Spinner";
import ResetPassword from "./components/ResetPassword";
import PurchasePreview from "./pages/PurchaseOrder/PurchasePreview";
import TestComp from "./pages/Summary/TestComp";
import SummaryPreview from "./pages/Summary/SummaryPreview";



function App() {
  const { loading } = useSelector(state => state.loaders)

  return (
    <>
      <div className="">
        {loading && <Spinner />}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedPage><Home /></ProtectedPage>} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/process-summary/:id' element={<SummaryPreview />} />
            <Route path='/purchase-order-preview/:id' element={<PurchasePreview />} />
            <Route path='/users/confirm/:token' element={<Verified />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/users/:id/reset-password/:token' element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
