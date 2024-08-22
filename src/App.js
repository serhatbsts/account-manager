import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Appbar from "./components/Appbar";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import CreateUserPage from "./components/CreateUserPage/CreateUserPage";
import AccountPage from "./components/AccountPage/AccountPage";

function App() {
  return (
     <div className="App">
         <Router>
         <Appbar/>
             <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/login" element={<LoginPage/>}/>
             <Route path="/createUser" element={<CreateUserPage/>}/>
             <Route path="/userPage" element={<AccountPage/>}/>
             </Routes>
         </Router>
     </div>
  );
}

export default App;
