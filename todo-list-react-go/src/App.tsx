
import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import { DefaultSidebar } from "./components/Sidebar";
import useSWR from "swr";
import { Todo } from "./Todo";
import { User } from "./User";
// import TodoList from "./components/TodoList"; // Assuming you have a component for displaying the todo list

function App() {

  const userEmail = localStorage.getItem("currentEmail")

  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data: todosData, mutate } = useSWR<Todo[]>(`http://localhost:8080/api/todos/${userEmail}`, fetcher);

  const { data: userData, mutate: mutateUser } = useSWR<User>("http://localhost:8080/api/user", async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if necessary for authentication
    });
    return response.json();
  });

  return (
   <>
   <BrowserRouter>
      {/* <ComplexNavbar /> */}
      <div className="flex bg-[#FAF9F6]">
      <DefaultSidebar userData={userData} mutateUser={mutateUser} />

      <Routes>
        <Route path="/" element={<Home todosData={todosData || []} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login mutateUser={mutateUser} />} />
        <Route path="/todo" element={<AddTodo mutate={mutate} />} />
      </Routes>
      </div>
   </BrowserRouter>

   </>
  );
}

export default App;
