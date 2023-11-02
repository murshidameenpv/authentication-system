import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { signInStart, signInSuccess, signInFailure,updateFormData } from '../redux/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../components/Oauth';

export default function SignIn() {
    const {loading,error,formData} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) => {
          //Spread operator to keep previous value of form data
        dispatch(updateFormData({...formData,[e.target.id]:e.target.value})) // Dispatch 
    }
    
    const handleSubmit = async (e) => {
        //to prevent default submission
        e.preventDefault()
           dispatch(signInStart())
        try {
            const res = await axios.post('/api/auth/signin', formData);
            console.log(res.data);
            dispatch(signInSuccess(res.data))
            navigate('/')
        } catch (err) {
            console.log(err);
            const errorMessage = err.response ? err.response.data.message : 'Network error. Please check your internet connection and try again.';
            dispatch(signInFailure(errorMessage))
        }

    }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
                <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70">Sign In</button>
                <Oauth />
            </form>
            {loading && <p>Loading...</p>}
            <div className="font-light justify-center flex gap-4 py-2">
                <p>Don&apos;t have an account?</p>
                <Link to='/sign-up'>
                <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
            <div className='text-center'>
                {error && <p className='text-red-500 animate-blink'>{error}</p>}
            </div>
            
        </div>
    )
}