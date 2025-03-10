import React from "react";
import { Container, Row, Col } from 'react-bootstrap'

import Sidebar from '../components/Sidebar'
import NavigationBar from "../components/NavigationBar";
import Table from "../components/Table";

const BlogPosts: React.FC = () => {

    return (
        <div style={{ minHeight: "100vh", position: "relative" }}>
            <Container fluid>
                <Row className="mt-2">
                    <Col xs={12} md={3}>
                        <Sidebar />
                    </Col>
                    
                    <Col>
                        <NavigationBar />
                    </Col>

                    <Col xs={12} md={9} style={{ marginLeft: '250px', marginBottom: '80px' }}>
                        <Table />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BlogPosts;