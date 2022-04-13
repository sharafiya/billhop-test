import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Translator from "./components/translator-component";
class App extends Component {
  render() {
    console.log("jgjhgjhj")
    return (
      <Router>
        <nav className="navbar">
          <div className="container">
            <h1 className="navbar-header">Rövarspråket translator </h1>
          </div>
        </nav>
        <div>
          <Routes>
            <Route exact path="/" element={<Translator/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;