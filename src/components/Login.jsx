import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { login } from '../redux/user/userSlice';

const Login = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(login());
      Swal.fire({
        title: 'Login Successful',
        text: 'You have successfully logged in',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Login Failed',
        text: 'You have failed to login',
        icon: 'error',
      });
    }
    navigate('/boats');
  };

  return (
    <button type="button" onClick={handleLogout} className="uppercase">
      Login with Google
    </button>
  );
};

Login.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default Login;
