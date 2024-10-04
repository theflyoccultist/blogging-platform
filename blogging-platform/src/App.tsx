import './styles/App.css'
import { Button } from 'react-bootstrap';
import './styles/Auth.css'

function App() {

  return (
    <div className='centered'>
      <h2>Blogging Platform - Portal</h2>
      <p><Button variant="primary" href="/login">Login</Button></p>
      <p><Button variant="primary" href="/register">Register</Button></p>
    </div>
  )
}

export default App
