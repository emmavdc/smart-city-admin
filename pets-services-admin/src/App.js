import "./App.css";
import Main from "./component/mainPage/MainPage";

function App() {
  sessionStorage.clear();
  return (
      <Main></Main>
    );
}

export default App;
