import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import All from "./pages/all";
import MyNotes from "./pages/myNotes";
import SharedWithMe from "./pages/sharedWithMe";
import { AiFillPlusCircle } from "react-icons/ai";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="m-0">
        <Routes>
          <Route path="/" element={redirect("/all")} />
          <Route path="/all" element={<All />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="/shared-with-me" element={<SharedWithMe />} />
        </Routes>
        <AiFillPlusCircle className="absolute text-6xl cursor-pointer drop-shadow-md bottom-24 right-6 text-yellow-500" />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
