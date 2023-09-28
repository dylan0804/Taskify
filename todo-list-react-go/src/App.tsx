
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import { ComplexNavbar } from "./components/Header";
import { DefaultSidebar } from "./components/Sidebar";
import useSWR from "swr";
import { Todo } from "./Todo";
// import TodoList from "./components/TodoList"; // Assuming you have a component for displaying the todo list

function App() {

  const userEmail = localStorage.getItem("currentEmail")

  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR<Todo[]>(`http://localhost:8080/api/todos/${userEmail}`, fetcher);

  return (
   <>
   <BrowserRouter>
      {/* <ComplexNavbar /> */}
      <div className="flex bg-[#FAF9F6]">
      <DefaultSidebar />

      <Routes>
        <Route path="/" element={<Home todos={data || []} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<AddTodo mutate={mutate} />} />
      </Routes>
      </div>
   </BrowserRouter>

   </>
  );
}

export default App;
