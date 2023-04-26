import "bootstrap/dist/css/bootstrap.css";
import Home from "./component/page/Home";
import Register from "./component/ui/Register";
import Login from "./component/ui/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectList from "./component/page/project-list";
function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/project" element={<ProjectList />}></Route>
        <Route path="*" element={<ProjectList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
