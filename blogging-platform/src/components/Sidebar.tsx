import React from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';

const Sidebar: React.FC = () => {
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
                    <CDBSidebarMenuItem>Components</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>Metrics</CDBSidebarMenuItem>
                </CDBSidebarMenu>
            </CDBSidebarContent>
    
            <CDBSidebarFooter className="text-decoration-none">
              <div
                style={{
                  padding: '20px 5px',
                  textAlign: "center"
                }}
              >
                <a href="#logout">Logout</a>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      );
    };

  export default Sidebar