import { Button } from "@mantine/core";
import Header from "./components/Header";
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
// import TodoList from "./components/TodoList"; // Assuming you have a component for displaying the todo list

function App() {

  return (
   <>
   <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<AddTodo />} />
      </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
