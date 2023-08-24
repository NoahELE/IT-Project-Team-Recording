import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HeaderView from './views/HeaderView.tsx';
import Home from './views/HomeView';
import SigninView from "./views/SigninView.tsx";

export default function App() {
    return (
        <Router>
            <div>
                <HeaderView/>

                <div style={{marginTop: '50px'}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/user" element={<SigninView/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
