import background from "./assets/images/background.webp";
import { Profile } from "./components/Profile";
import { TodoForm } from "./components/TodoForm";
import { TodoWrapper } from "./components/TodoWrapper";

function App() {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center h-screen pt-4 flex items-center justify-start flex-col gap-y-3"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Profile />
        <TodoForm />
        <TodoWrapper />
      </div>
    </>
  );
}

export default App;
