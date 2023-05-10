import "bootstrap/dist/css/bootstrap.css";

import Register from "./component/ui/Register";
import Login from "./component/ui/login";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { DialogDemo } from "./component/ui/Project/create-project-modal";
import Home from "./page/Home";
import Work from "./page/Work";
import ProjectList from "./page/project-list";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const FirstPage = () => {
    return isLoggedIn ? <Home /> : <Login />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<FirstPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="projects">
          <Route index element={<ProjectList />} />
          <Route path="work/:keys" element={<Work />} />
          <Route path="*" element={<ProjectList />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
