import "./App.css";
import "../src/assets/wave.png";
import { Outlet, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/Container";
import Login from "./components/Login";
import Navbar from "./components/feature-components/NavBar";
import SignUp from "./components/SignUp";
import Verification from "./components/feature-components/Verification";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CreatePost />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      },
      {
        path:'/verification',
        element:<Verification/>
      }
    ],
  },
]);
function App() {
  return (
    <div className="App z-10">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
