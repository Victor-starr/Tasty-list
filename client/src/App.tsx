import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AuthGuard from "./guard/AuthGuard";
import GuestGuard from "./guard/GuestGuard";
import Logout from "./pages/auth/Logout";
import Catalog from "./pages/recipes/Catalog";
import Create from "./pages/recipes/Create";
import Details from "./pages/recipes/Details";
import Edit from "./pages/recipes/Edit";
import Search from "./pages/recipes/Search";
import Profile from "./pages/auth/Profile";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/search" element={<Search />} />
      <Route path="/recipes">
        <Route index element={<Catalog />} />
        <Route path=":id" element={<Details />} />
      </Route>
      <Route element={<AuthGuard />}>
        <Route path="/recipes/create" element={<Create />} />
        <Route path="/recipes/:id/edit" element={<Edit />} />
        <Route path="/auth/profile" element={<Profile />} />
        <Route path="/auth/logout" element={<Logout />} />
      </Route>
      <Route element={<GuestGuard />}>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
