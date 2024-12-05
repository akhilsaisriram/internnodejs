import React from "react";
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Home from "./Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
