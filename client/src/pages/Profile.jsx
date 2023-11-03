import { useSelector ,useDispatch} from "react-redux";
import { useRef, useState, useEffect } from "react";
import { storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Axios from "axios";
import {updateUserError,updateUserStart,updateUserSuccess,deleteUserError,deleteUserSuccess, deleteUserStart} from '../redux/userSlice/userSlice.js'

export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess,setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (image) {
      handleImageUpload(image)
    }
  }, [image]);


  const handleImageUpload = async () => {
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.floor(progress))
    },
    (error) => {
      setImageError(true)
      console.log(error);
    },
    () => {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => 
        setFormData({...formData,profileImage:downloadUrl}))
    });
  }

  const handleChange = (e) => {
   setFormData({...formData,[e.target.id]:e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await Axios.post(`/api/user/update/${currentUser._id}`, formData);
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true);
    }
    catch (error) {
      console.log(error);
      dispatch(updateUserError(error));
    }
  }
  
  const handleDelete = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await Axios.delete(`/api/user/delete/${currentUser._id}`)
      dispatch(deleteUserSuccess(res.data))
      
    } catch (err) {
      console.log(err);
      dispatch(deleteUserError())
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
       
        <img src={formData.profileImage || currentUser.profileImage} alt="Profile Image"
          className="h-40 w-40 rounded-full self-center  cursor-pointer object-cover mt-2" onClick={()=>fileRef.current.click()}/>
        <p className="self-center text-sm">
          {imageError ? (<span className="text-red-700">Error uploading image</span>) :
            imagePercent > 0 && imagePercent < 100 ? (<span className="text-slate-700">{`Uploading image...${imagePercent}%`}</span>) :
              imagePercent === 100 ? (<span className="text-green-600">Image Uploaded Successfully</span>) : ("")}
         </p>
        <input defaultValue={currentUser.name} type="text" placeholder="Username" id="name" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
       
        <input defaultValue={currentUser.email} type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70">Update</button>
      
      </form>
      {loading && <p>Loading...</p>}
      <div className="flex justify-between my-3">
        <span onClick={handleDelete} className="text-red-600 cursor-pointer">Delete account?</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
      </div>
       <div className='text-center'>
                {error && <p className='text-red-700 animate-blink'>{error}</p>}
                {updateSuccess && <p className='text-green-800 animate-blink'>Updated Successfully</p>}
            </div>
    </div>
  )
}


{
  /*
  Firebase storage rules configuration for uploading image
  service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 *1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
      
    }
  }
}
  */
}
