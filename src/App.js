import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import TodoPage from "./TodoPage";

function App() {
  return (
    <div className="">
      <header className="">
        <NavBar />
      </header>
      <main className="center main-class">
        <TodoPage />
      </main>
    </div>
  );
}

export default App;
