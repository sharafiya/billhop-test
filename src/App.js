import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Translator from "./components/translator-component";
class App extends Component {

  render() {
    return (
      <Router>
        <nav className="navbar">
          <h1 className="navbar-header">Rövarspråket translator </h1>
        </nav>
        <div className="page">
          <Routes>
          <Route exact path="/" element={<Translator/>} />
            <Route exact path="/home" element={<Translator/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;