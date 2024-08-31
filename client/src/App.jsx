import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/auth";
import Portal from "./layouts/Portal";

import { Hero, Login, Register } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Hero />} exact path="/" />
        <Route element={<AuthLayout />} path="/">
          <Route element={<Login />} path="login" />
          <Route element={<Register />} exact path="register" />
        </Route>
        <Route element={<Portal />} path="/portal" />
      </Routes>
    </>
  );
}

export default App;
