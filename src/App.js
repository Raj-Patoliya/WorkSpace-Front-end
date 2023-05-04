import "bootstrap/dist/css/bootstrap.css";
import Home from "./component/page/Home";
import Register from "./component/ui/Register";
import Login from "./component/ui/login";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectList from "./component/page/project-list";
import { DialogDemo } from "./component/ui/Project/create-project-modal";
import Work from "./component/page/Work";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const FirstPage = () => {
    return isLoggedIn ? <Home /> : <Login />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/login" element={<FirstPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/project-list" element={<ProjectList />}></Route>
        <Route path="/work" element={<Work />}></Route>
        <Route path="/modal" element={<DialogDemo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
