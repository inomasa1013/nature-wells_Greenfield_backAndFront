import logo from './logo.svg';
import './App.css';
import { TableField } from "./components/TableField";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
        <h1 className="title" >レーヴ日進寮出品一覧</h1>
        <TableField />
    </div>
  );
}

export default App;
