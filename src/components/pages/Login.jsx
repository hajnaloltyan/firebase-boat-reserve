import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getUserLogin } from '../../redux/usersession/usersessionsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      Swal.fire({
        title: 'Form Error',
        text: 'Name field cannot be empty',
        icon: 'error',
      });
      return;
    }
    try {
      await dispatch(getUserLogin({ name })).unwrap();
      setName('');
      Swal.fire({
        title: 'Login Successful',
        text: 'You have successfully logged in',
        icon: 'success',
      });
      navigate('/boats');
    } catch (err) {
      Swal.fire({
        title: 'Failed to login',
        text: 'User is not registered, or the name is incorrect',
        icon: 'error',
      });
    }
  };

  return (
    <section className="flex flex-col items-center gap-8 p-4 lg:w-full lg:h-screen lg:pt-[10%]">
      <h2 className="text-center text-2xl font-black uppercase mb-20">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col text-xl">
        <label htmlFor="name-input">
          Name:
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-black rounded-md ml-2 w-[70%] pl-2"
          />
        </label>
        <button type="submit" className="border-2 border-lime-400 bg-lime-400 rounded px-4 py-2 w-32 self-center my-10">Login</button>
      </form>

      <h4 className="text-lg">
        Don&apos;t have an account yet?
      </h4>

      <Link to="/signup" className="cursor-pointer border-2 border-lime-400 bg-lime-400 rounded py-2 px-4 my-2">Please sign-up</Link>
    </section>
  );
};

export default Login;
