import logo from "./logo.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import toast, { Toaster, ToastBar } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectButton />
        <button onClick={() => {}}>Click</button>
      </header>
      <Toaster />
    </div>
  );
}

export default App;
