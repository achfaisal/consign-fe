// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import UserPosts from "./pages/UserPosts";
import EditPost from "./pages/EditPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("Username");
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:9002/logout");
      setIsLoggedIn(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.get("http://localhost:9002/current", {
          withCredentials: true,
        });
        setUsername(response.data.data.username);
        setName(response.data.data.name);
        setIsLoggedIn(true);
        setIsLoaded(true);
      } catch (error) {
        console.log("API /current Error :", error);
        setIsLoaded(true);
        setIsLoggedIn(false);
      }
    };
    user();

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9002/posts/all");
        const unsortedPost = response.data.data;
        const sortedPost = unsortedPost.sort((a, b) => (a.id < b.id ? 1 : -1));
        setPosts(sortedPost);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [name, isLoggedIn]);

  return (
    <Router>
      <div>
        {isLoaded && name !== "" && (
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} name={name} />
        )}
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/post/:id" element={<Post />} />
          <Route
            path="/register"
            element={<Register isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/my-posts"
            element={<UserPosts username={username} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/edit-post"
            element={<EditPost isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
