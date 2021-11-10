import "./App.css";
import GridComponent from "./Grid";
import URLFormComponent from "./UrlForm";

function App() {
  return (
    <div className="App">
      <div className="container mt-2">
        <URLFormComponent />
        <GridComponent />
      </div>
    </div>
  );
}

export default App;
