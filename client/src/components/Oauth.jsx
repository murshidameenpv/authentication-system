import axios from 'axios'
import { auth, provider } from '../services/firebase.js'
import {signInWithPopup} from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice/userSlice.js';
import {useNavigate} from 'react-router-dom'
export default function Oauth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async ()=>{
        try {
            const result = await signInWithPopup(auth, provider)
            const res = await axios.post('/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                image:result.user.photoURL,
            })
            dispatch(signInSuccess(res.data))
            navigate('/')
        
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button type="button" onClick={handleGoogleClick} className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70">
            Continue with Google
        </button>
    )
}
