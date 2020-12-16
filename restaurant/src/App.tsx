import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchTable from "./components/search-table";
import { Button } from "react-bootstrap";

function App() {
  return (
    <div className="container-fuild">
      <SearchTable />
    </div>
  );
}

export default App;
