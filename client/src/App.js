
import './App.css';
import { Navbar } from './Components/Navbar';

import {LendBook} from './Components/LendBook'
import {Route,BrowserRouter as Router, Routes} from 'react-router-dom'
import { Home } from './Components/Home';
import {AddBook} from './Components/AddBook';
import {ReturnBook} from './Components/ReturnBook';

function App() {
  return (
    
    <Router>
      <Navbar/>
    <Routes>
      <Route path="/" exact element={< Home/>} />
      <Route path="/lend/:id" element={<LendBook />}/>
      <Route path="/add/" element={<AddBook />}/>
      <Route path="/return/:id" element={<ReturnBook />}/>
    </Routes>
    </Router>
  );
}

export default App;
