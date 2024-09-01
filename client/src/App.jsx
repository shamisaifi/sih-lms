<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import AuthLayout from "./layouts/auth";
import PortalLayout from "./layouts/Portal";
import { UserProvider } from "./providers/auth-provider";

import { Hero, Login, Register } from "./pages";

=======
import Navbar from "./components/Navbar"
import { Button } from "./components/ui/button"
>>>>>>> ujala
function App() {
  return (
<<<<<<< HEAD
    <UserProvider>
      <Routes>
        <Route element={<Hero />} exact path="/" />
        <Route element={<AuthLayout />} path="/">
          <Route element={<Login />} path="login" />
          <Route element={<Register />} exact path="register" />
        </Route>
        <Route element={<PortalLayout />} path="/portal" />
      </Routes>
      <Toaster />
    </UserProvider>
  );
=======
    <>
      {/* <Button variant="ghost" /> */}
      <Navbar />
      
    </>
  )
>>>>>>> ujala
}

export default App;
