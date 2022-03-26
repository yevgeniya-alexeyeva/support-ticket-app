import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewTicket from "./pages/NewTicket";
import PrivetRoute from "./components/PrivetRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivetRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
