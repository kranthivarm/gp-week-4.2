import React from "react";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router basename="/checkout">
      <Routes>
        <Route path="/" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;