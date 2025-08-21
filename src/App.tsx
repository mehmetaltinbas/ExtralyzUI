import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage } from './features/auth/pages/SignInPage';
import { SignUpPage } from './features/auth/pages/SignUpPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/workspace" element={<ProtectedRoute element={<WorkspacePage />} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
