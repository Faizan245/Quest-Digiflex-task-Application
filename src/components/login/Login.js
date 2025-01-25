import { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import axios from 'axios';

const api = process.env.REACT_APP_API_ENDPOINT;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear any previous errors

    // Basic validations before making API request
    if (!email || !password) {
      setError('Both email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      console.log(api)
      const response = await axios.post(`${api}/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log(data);

      dispatch(login(data));
      const userToken = data.accessToken;
      localStorage.setItem('token', userToken);

      if (data.userData.status === 'owner') {
        navigate('/owner');
      } else if (data.userData.status === 'employee') {
        navigate('/employee');
      }
    } catch (err) {
      console.error(err);

      // Handling specific errors
      if (err.response) {
        // Server responded with a status other than 200 range
        if (err.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (err.response.status === 400) {
          setError('Bad request. Please check your input.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else if (err.request) {
        // No response received from the server
        setError('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col gap-10 items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex text-[#C2C3CC] flex-col gap-5 w-[500px] max-lg:w-[350px] shadow-lg rounded-[40px] p-[50px]'>
        <div className='flex flex-col gap-3'>
          <label htmlFor="email" className='font-bold text-[20px] max-lg:text-[16px]'>Email</label>
          <input
            className='border border-[#D79314] text-black max-lg:text-[14px] rounded-xl py-[10px] pl-[30px]'
            type="text"
            id="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-3 relative'>
          <label htmlFor="password" className='font-bold text-[20px] max-lg:text-[16px]'>Password</label>
          <input
            className='border border-[#D79314] text-black max-lg:text-[14px] rounded-xl py-[10px] pl-[30px]'
            type={passwordVisible ? 'text' : 'password'}
            placeholder='password'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaRegEyeSlash
            onClick={togglePasswordVisibility}
            className={` ${passwordVisible ? "text-[#C2C3CC]" : "text-[#D79314]"} text-[20px] absolute right-[0px] bottom-[0px] mb-[10px] mr-[30px]`}
          />
        </div>
        <div className='bg-custom-gradient text-center py-[10px] max-lg:py-[5px] rounded-xl cursor-pointer'>
          <button type="submit" className='text-[#fff] text-[24px] max-lg:text-[20px] font-semibold' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <p className='max-lg:text-[14px]'>By continuing you agree to our Terms & Privacy Policy</p>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Login;
