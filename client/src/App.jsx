import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/auth";

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
      </Routes>
    </>
  );
}

export default App;
