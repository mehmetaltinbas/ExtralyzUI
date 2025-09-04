import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "./features/auth/services/auth.service";

export function ProtectedRoute({ element }: { element: JSX.Element } ) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        authService.authorize().then(response => {
            setIsAuthenticated(response.isSuccess);
        }).catch(error => {
            setIsAuthenticated(false);
        });
    }, []);

    if (isAuthenticated === null) return <p>Loading...</p>;
    return isAuthenticated ? element : <Navigate to='/sign-in' />;
}
