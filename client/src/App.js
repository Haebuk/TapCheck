import logo from "./logo.svg";
import "./App.css";

import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Routes, Route, useLocation, useParams, useNavigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Header } from "./components/Header";
import { QRPage } from "./pages/QRPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { SignPage } from "./pages/SignPage";

function App() {
  const location = useLocation();

  // console.log(location);

  return (
    <div className="App">
      {!location.pathname.includes("qr") && !location.pathname.includes("check") && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/qr/:hash" element={<QRPage />} />
        <Route path="/create" element={<CreateEventPage />} />
        <Route path="/check/:hash" element={<SignPage />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
