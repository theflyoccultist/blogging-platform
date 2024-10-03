import React from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBSidebarFooter,
  } from 'cdbreact';
import { NavLink } from 'react-router-dom';


const Sidebar: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
          <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" className={""} breakpoint={0} toggled={false} minWidth={""} maxWidth={""}>
            <CDBSidebarHeader prefix={<i className="fa fa-bars"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Sidebar
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem icon="chart-line" iconType="solid">Metrics</CDBSidebarMenuItem>
                </CDBSidebarMenu>
            </CDBSidebarContent>
    
            <CDBSidebarFooter className="text-decoration-none">
              <div
                style={{
                  padding: '20px 5px',
                  textAlign: "center"
                }}
              >
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      );
    };

  export default Sidebar