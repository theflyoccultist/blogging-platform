import './styles/App.css'
import { Button } from 'react-bootstrap';


function App() {

  return (
    <>
      <h2>Blogging Platform - Portal</h2>
      <p><Button variant="primary" href="/login">Login</Button></p>
      <p><Button variant="primary" href="/register">Register</Button></p>
    </>
  )
}

export default App
