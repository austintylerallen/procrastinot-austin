import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/actions/profileActions';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { logoutUser, deleteUser } from '../redux/actions/authActions';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use correct state values for userId and userName
  const userId = useSelector((state) => state.auth?.user?._id || ''); 
  const userName = useSelector((state) => state.auth?.user?.username || 'User');

  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    console.log('UserID:', userId); // Log the userId to check if it's available
    if (userId) {
      axiosInstance
        .get(`/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    if (userId) {
      dispatch(updateProfile(userId, userData)); 
    }
  };

  const handleDeleteProfile = () => {
    console.log('Delete Profile UserID:', userId); // Check if userId is passed here
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This action is irreversible.'
    );
    if (confirmDelete && userId) {
      dispatch(deleteUser(userId)); // Dispatch delete user action
      navigate('/auth'); // Redirect to login page
    }
  };

  return (
    <section className="hero is-fullheight is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-centered">
            <div className="column is-full">
              <header>
                <h1 id="profile-title" className="title" style={{ color: 'white' }}>
                  Hello, {userName}
                </h1>
              </header>
              <section className="profile-text">
                <p style={{ color: 'white' }}>
                  We hope that you have been enjoying Procrastinot. We are always
                  striving for improvement and would love your suggestions.
                </p>
                <a style={{ color: '#3AB0FF' }} href="mailto:mauryhughesiv@gmail.com">
                  Please feel free to send us an email.
                </a>
              </section>
              <footer className="profile-text mt-4">
                <p style={{ color: 'white' }}>
                  We also understand that sometimes you want to explore other
                  options. So if you want to delete your profile, we understand.
                  Hope that you make it back sometime though!
                </p>
                <button
                  className="button is-danger mt-4"
                  onClick={handleDeleteProfile}
                  data-id={userId}
                  style={{ color: 'white' }}
                  disabled={!userId} // Disable button if userId is not available
                >
                  Delete Profile
                </button>
              </footer>
              <section className="mt-6">
                <h2 className="text-3xl mb-4" style={{ color: 'white' }}>Update Your Information</h2>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
                    style={{ color: 'white' }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-todo"
                    style={{ color: 'white' }}
                  />
                  <button
                    type="button"
                    onClick={handleUpdateProfile}
                    className="button bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                    disabled={!userId} // Disable button if userId is not available
                  >
                    Update Profile
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
