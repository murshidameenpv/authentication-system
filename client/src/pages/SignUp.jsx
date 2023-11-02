import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        //Spread operator to keep previous value of form data
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
        //to prevent default submission
        e.preventDefault()
            setLoading(true)
            setError(false)
        try {
            const res = await axios.post('/api/auth/signup', formData);
            console.log(res.data);
            navigate('/sign-in')
        } catch (err) {
            console.log(err);
            setError(true)
        } finally {
            setLoading(false);//if it is true coz previous request we have to set it to true
        }

    }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Username" id="name" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
                <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
                <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70">Sign Up</button>
            </form>
            {loading && <p>Loading...</p>}
            <div className="font-light justify-center flex gap-4 py-2">
                <p>Have an account?</p>
                <Link to='/sign-in'>
                <span className="text-blue-500">Sign In</span>
                </Link>
            </div>
            <div className='text-center'>
                {error && <p className='text-red-500 animate-blink'>An error Occurred while Signing up!</p>}
            </div>
            
        </div>
    )
}