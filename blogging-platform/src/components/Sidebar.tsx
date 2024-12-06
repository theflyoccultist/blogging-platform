import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';

const apiUrl = import.meta.env.VITE_API_URL;

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const response = await axios.post(`${apiUrl}/auth/logout`, null, {
          withCredentials: true,
        })

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('logout failed', error);
      }
    };

    return (
        <div style={{ height: '100vh', position: 'fixed', left: 0, top: 0, width: '250px', zIndex: 5, }}>
          <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" className={""} breakpoint={0} toggled={false} minWidth={""} maxWidth={""}>
            <CDBSidebarHeader>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Sidebar
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem>Dashboard</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>Tags</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>Metrics</CDBSidebarMenuItem>
                </CDBSidebarMenu>
            </CDBSidebarContent>
    
            <CDBSidebarFooter className="text-decoration-underline">
              <div
                style={{
                  padding: '20px 5px',
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <a onClick={handleLogout}>Logout</a>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      );
    };

  export default Sidebar