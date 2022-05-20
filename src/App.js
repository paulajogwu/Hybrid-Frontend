import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes,  Route } from "react-router-dom";
import Details from './components/Details';
import Index from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index/>} />
        <Route path="/view/:id" element={<Details/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
