import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {user &&
          <Route
            path="/*"
            element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/user/:userId" element={<User />} />
                    <Route path="/newUser" element={<NewUser />} />
                    <Route path="/movies" element={<MovieList />} />
                    <Route path="/movie/:movieId" element={<Movie />} />
                    <Route path="/newMovie" element={<NewMovie />} />
                    <Route path="/lists" element={<ListList />} />
                    <Route path="/list/:listId" element={<List />} />
                    <Route path="/newlist" element={<NewList />} />
                  </Routes>
                </div>
              </>
            }
          />
        }
      </Routes>
    </Router>
  );
}

export default App;
