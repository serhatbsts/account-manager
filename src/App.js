import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Appbar from "./components/Appbar";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import CreateUserPage from "./components/CreateUserPage/CreateUserPage";
import UserPage from "./components/UserPage/UserPage";
import EditPage from "./components/EditPage/EditPage";
import CreateAccountPage from './components/CreateAccountPage/CreateAccountPage.js';
import DepositWithdrawPage from "./components/DepositWithdrawPage/DepositWithdrawPage";


function App() {
  return (
     <div className="App">
         <Router>
         <Appbar/>
             <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/login" element={<LoginPage/>}/>
             <Route path="/createUser" element={<CreateUserPage/>}/>
             <Route path="/userPage" element={<UserPage/>}/>
             <Route path="/editPage" element={<EditPage/>}/>
                 <Route path="/createAccount" element={<CreateAccountPage />} />
                 <Route path="/depositWithdrawPage" element={<DepositWithdrawPage/>}/>
             </Routes>
         </Router>
     </div>
  );
}

export default App;
