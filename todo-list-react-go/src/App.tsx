import useSWR from "swr";
import AddTodo from "./components/AddTodo";

export interface Todo {
  name: string;
}

function App() {
  const fetcher = (url:string) => fetch(url).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR<Todo[]>("http://localhost:8080", fetcher);

  // Conditional rendering
  return (
    <div>
      {error ? (
        <div>Error: {error.message}</div>
      ) : data ? (
        data.map((todo) => {
          return <p key={todo.name}>{todo.name}</p>; // Add a unique key
        })
      ) : (
        <div>Loading...</div>
      )}
      <AddTodo mutate={mutate} />
    </div>
  );
}

export default App;
