import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({})
  
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
    },
    () => {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => 
        setFormData({...formData,profileImage:downloadUrl}))
    });
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
        <img src={formData.profileImage ||   currentUser.profileImage} alt="Profile Image"
          className="h-40 w-40 rounded-full self-center  cursor-pointer object-cover mt-2" onClick={()=>fileRef.current.click()}/>
        <p className="self-center text-sm">
          {imageError ? (<span className="text-red-700">Error uploading image</span>) :
            imagePercent > 0 && imagePercent < 100 ? (<span className="text-slate-700">{`Uploading image...${imagePercent}%`}</span>) :
              imagePercent === 100 ? (<span className="text-green-600">Image Uploaded Successfully</span>) : ("")}
         </p>
        <input defaultValue={currentUser.name} type="text" placeholder="Username" id="name" className="bg-slate-100 p-3 rounded-lg" />
         <input defaultValue={currentUser.email} type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" />
         <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg"/>
         <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70">Update</button>
      </form>
      <div className="flex justify-between my-3">
        <span className="text-red-600 cursor-pointer">Delete account?</span>
        <span className="text-red-600 cursor-pointer">Sign out</span>
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
