import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.profileImage} alt="Profile Image" className="h-40 w-40 rounded-full self-center  cursor-pointer object-cover mt-2" />
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
