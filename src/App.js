import './App.css';
import AddTask from './Components/AddTask/AddTask';
import Navbar from './Components/Navbar/Navbar';
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComponent from './Components/Table/Table';

function App() {
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col lg="6">
        <AddTask />
        <TableComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
