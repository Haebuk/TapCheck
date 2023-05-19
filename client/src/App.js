import logo from "./logo.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      {/* <ConnectButton /> */}
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route/>
        <Route/> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
