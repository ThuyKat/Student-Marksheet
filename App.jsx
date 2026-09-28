import MarksheetForm from './pages/MarksheetForm/index'
import Dashboard from './pages/Dashboard/index';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import "./index.css"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarksheetForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    
  );
}
