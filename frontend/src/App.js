import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingLists from "./ShoppingLists";
import ShoppingListItems from "./ShoppingListItems";

function App() {

   
  return (
      <Router>
          <Routes>
              <Route path="/" element={<ShoppingLists />} />
              <Route path="/list/:id" element={<ShoppingListItems />} />
          </Routes>
      </Router>
  );
}

export default App;
