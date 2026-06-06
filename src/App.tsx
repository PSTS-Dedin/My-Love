import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BackgroundAudio from "@/components/BackgroundAudio";
import ClickSparkles from "@/components/ClickSparkles";
import WelcomeSplash from "@/components/WelcomeSplash";
import Home from "@/pages/Home";

export default function App() {
  return (
    <Router>
      <WelcomeSplash />
      <BackgroundAudio />
      <ClickSparkles />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
