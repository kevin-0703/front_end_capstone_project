import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailsPage";
import SearchBar from "./components/SearchBar";
import ContactPage from "./components/ContactPage";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/front-end-capstone-project/" element={<HomePage />} />
          <Route path="/movie/:title" element={<DetailPage />} />
          <Route
            path="/search"
            element={<SearchBar searchTerm="" setSearchTerm={() => {}} />}
          />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
