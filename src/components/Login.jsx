import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const Login = ({ setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await signInWithPopup(auth, googleProvider);
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
