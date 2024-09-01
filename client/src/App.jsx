import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import AuthLayout from "./layouts/auth";
import { UserProvider } from "./providers/auth-provider";
import Portal from "./layouts/portal";

import { Hero, Login, Register } from "./pages";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<Hero />} exact path="/" />
        <Route element={<AuthLayout />} path="/">
          <Route element={<Login />} path="login" />
          <Route element={<Register />} exact path="register" />
        </Route>
        <Route element={<Portal />} path="/portal" />
      </Routes>
      <Toaster />
    </UserProvider>
  );
}

export default App;
