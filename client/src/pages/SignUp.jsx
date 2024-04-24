import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }


  }
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">BLOGO</span>
            SPHERE

          </Link>
          <p className="text-sm mt-5">This is a demo project. you can sign up with your email and password or with Google</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your user" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="demo@gmail.com" id="email" onChange={handleChange} />
            </div><div>
              <Label value='Your password' />
              <div className='relative'>
                <TextInput
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  placeholder='**********'
                  id='password'
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='absolute top-1/2 right-3 transform -translate-y-1/2'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      {/* Eye Shape */}
                      <circle cx='12' cy='12' r='6'></circle>
                      {/* Pupil */}
                      <circle cx='12' cy='12' r='2'></circle>
                    </svg>

                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      {/* Eye Shape */}
                      <circle cx='12' cy='12' r='6'></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading} >
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : ('Sign Up'
                )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have a account</span>
            <Link to="/sign-in" className="text-blue-500">Sign In</Link>

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



