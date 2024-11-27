import React, { createContext, useEffect } from 'react';
import { startTokenRefresh, stopTokenRefresh } from '../middlewares/tokenRefresher';
import { Navigate } from 'react-router-dom';

const TokenRefreshContext = createContext<null>(null);

export const TokenRefreshProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />
    }
    
    useEffect(() => {
        startTokenRefresh();

        return () => stopTokenRefresh();
    }, []);

    return (
        <TokenRefreshContext.Provider value={null}>
            {children}
        </TokenRefreshContext.Provider>
    );
};