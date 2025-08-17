import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { WorkspacePage } from './pages/WorkspacePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/workspace" element={<WorkspacePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
