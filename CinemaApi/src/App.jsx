import MainComponent from './components/MainComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import WatchVideo from './components/WatchVideo';
import SearchResults from './components/SearchResults';
import Favorite from './components/Favorite';

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
                  <Route index element={<MainComponent />} />
                  <Route path="/watch-video/:videoId" element={<WatchVideo/>} />
                  <Route path="/search-results" element={<SearchResults/>} />
                  <Route path="/favorite" element={<Favorite/>} />
        </Route>
        </Routes>
      </Router>
</>
  )}

export default App
