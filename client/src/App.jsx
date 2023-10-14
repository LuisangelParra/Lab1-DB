import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {CitiesPage} from './pages/CitiesPage';

function App(){
    return(
        <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/Cities"/>}/>
                <Route path="/Cities" element={<CitiesPage />}/>
              </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;