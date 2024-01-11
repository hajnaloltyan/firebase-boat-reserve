import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { logout } from '../redux/user/userSlice';

const Logout = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await signOut(auth);
      dispatch(logout());
      Swal.fire({
        title: 'Logout Successful',
        text: 'You have successfully logged out',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Logout Failed',
        text: 'You have failed to logout',
        icon: 'error',
      });
    }
    navigate('/boats');
  };

  return (
    <button type="button" onClick={handleLogout} className="uppercase">
      Logout
    </button>
  );
};

Logout.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default Logout;
