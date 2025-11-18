import {Routes, Route} from "react-router";
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import toast from "react-hot-toast"

const App = () => {
  return (
  <div data-theme="nord"  className="bg-white">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/notes/:id" element={<NoteDetailPage />} />
    </Routes>
  </div> 
  );
};
export default App;
