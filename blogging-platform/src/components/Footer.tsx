import { Container, Row, Col } from 'react-bootstrap';
import Pagination from "./Pagination";
import "../styles/Footer.css"

const Footer: React.FC = () => {
    return (
        <footer className="bg-body-tertiary py-4">
            <Container>
                <Row>
                    <Col>
                        <Pagination />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;