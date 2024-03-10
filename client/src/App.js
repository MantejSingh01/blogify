import "./App.css";
import "../src/assets/wave.png";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/feature-components/CreatePost";
import Login from "./components/Login";
import Navbar from "./components/feature-components/NavBar";
import SignUp from "./components/SignUp";
import Verification from "./components/feature-components/Verification";
import Container from "./components/Container";
import ResetPassword from "./components/feature-components/ResetPassword";
import MyPosts from "./components/feature-components/MyPosts";
import ProtectedRoute from "./components/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Container />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verification",
        element: <Verification />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      { path: "/myblogs", element: <ProtectedRoute component={<MyPosts/>}/>},
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
function App() {
  return (
    <div className="App z-10">
      <Navbar />

      <CreatePost />
      <Outlet />
    </div>
  );
}

export default App;
