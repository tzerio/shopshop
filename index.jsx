import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Categories from "/pages/Categories"
import ShoppingList from "/pages/ShoppingList"
import { register } from "register-service-worker";

function Layout() {
  return (
    <div>
      <nav className="nav--list">
         <Link  className="navbtn" to="/">ShoppingList</Link> 
         <Link className="navbtn" to="/categories">Kategorien</Link>
      </nav>
      <Outlet />
    </div>
  )
};

function HomePage() {
  return (
    <main>
      <h2>Home</h2>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ShoppingList />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

register(`/service-worker.js`)