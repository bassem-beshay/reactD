import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navs from "./components/Headers/Nav";
import Movie from "./components/Sections/Sections";
import FavoritesPage from "./components/Favourite/Favourite";
import Login from "./components/Login/login";
import SignUpPage from "./components/Login/Sign";
function App() {
  return (
    <Router>
      <Navs /> 
     
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
