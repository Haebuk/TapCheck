import logo from "./logo.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import toast, { Toaster, ToastBar } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TapCheck</h1>
        <ConnectButton />
      </header>
      <Toaster />
    </div>
  );
}

export default App;
