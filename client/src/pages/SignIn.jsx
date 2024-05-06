import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
     return dispatch(signInFailure('Please fill in all fields'));
      
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
       dispatch(signInFailure(data.message));
      }
   
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

   
  
  return (
    <div className="min-h-screen mt-40">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-9" >

        {/* left */}
        <div className="flex-1">
        <Link to="/" className="font-bold dark:text-white text-4xl">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">BLOGO</span>
        SPHERE
       </Link>
       <p className="text-sm mt-5 ">
       This project is a blog website that allows users to create, read, update, and delete placement, event, toppers and webinars. The project is built using the MERN stack (MongoDB, Express, React, Node.js). It is hosted on render. The project is open source, and the code is available on GitHub.
       </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col " onSubmit={handleSubmit}>
         
            {/* <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="name@company.com"
              id="email" onChange={handleChange}
              />
            </div> */}
            {/* <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="*********"
              id="password" onChange={handleChange}
              />
            </div> */}
            {/* <Button gradientDuoTone="purpleToPink" type="submit" pill disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                  </>
                 ) : (
                  'Sign In'
              )}
            </Button> */}
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5
          ">
            <span>Don&apos;t have an account</span>
            <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}