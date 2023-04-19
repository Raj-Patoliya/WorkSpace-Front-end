import "bootstrap/dist/css/bootstrap.css";
import Register from "./component/ui/Register";
import Login from "./component/ui/login";
import Header from "./component/ui/header";
function App() {
  return (
    <div>
      <Header />
      <Register />
      {/* <Login /> */}
    </div>
  );
}

export default App;
