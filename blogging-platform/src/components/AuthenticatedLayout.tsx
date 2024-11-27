import React from "react";
import { Outlet } from "react-router-dom";
import { TokenRefreshProvider } from "../contexts/TokenRefreshContext";

const AuthenticatedLayout: React.FC = () => {
    return (
        <TokenRefreshProvider>
            <Outlet />
        </TokenRefreshProvider>
    );
};

export default AuthenticatedLayout;