import React , {useState} from 'react'
import axios from 'axios';
const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        };
          
        axios.post(' http://localhost:3000/registrationform', {name,password,email})
        .then(res => console.log("Registered successfully!!"))
        .catch(err => console.log(err));
    }
    
  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label >Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} required/> <br /><br />
        <label>Password: </label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} required /> <br /><br />
        <label >Email: </label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} required/> <br /><br />
        <button type='submit'>Register</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      
    </div>
  )
    
}

export default Register
