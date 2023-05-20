import "bootstrap/dist/css/bootstrap.css";

import Register from "./component/ui/Register";
import Login from "./component/ui/login";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { DialogDemo } from "./component/ui/Project/create-project-modal";
import Home from "./component/screens/Home";
import Work from "./component/screens/Work";
import ProjectList from "./component/screens/project-list";
import Profile from "./component/screens/Profile";
import ChatBox from "./component/ui/components/FileViewer";
import ProjectDetails from "./component/screens/ProjectDetails";
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
        <Route path="/chat" element={<ChatBox />} />
        {isLoggedIn && (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="projects">
              <Route index element={<ProjectList />} />
              {/* <Route path=":keys" element={<ProjectDetails />} /> */}

              <Route path=":keys/work" element={<Work />} />
              <Route path="*" element={<ProjectList />} />
            </Route>
          </>
        )}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
