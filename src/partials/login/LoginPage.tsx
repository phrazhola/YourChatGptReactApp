import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PROFILE_COOKIE_NAME, TOKEN_COOKIE_NAME } from '../../common/constants';
import '../../css/additional-styles/login-page.scss';
import logo from '../../images/logo.png';
import BackGround from '../BackGround';
import Spinner from '../Spinner';
import GLogin from './GoogleLogin';

import axios from 'axios';
import Cookies from 'js-cookie';

const expiration = 10000;

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<TokenResponse | null>(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      setUser(tokenResponse);
      setTokenCookie(tokenResponse, tokenResponse.expires_in);
      await getUserInfo(tokenResponse);
      navigate('/');
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  // Set the token cookie with an expiration date
  const setTokenCookie = (token: TokenResponse, expiresIn: number) => {
    const serializedToken = JSON.stringify(token);
    const expirationDate = new Date(Date.now() + expiresIn * expiration);
    Cookies.set(TOKEN_COOKIE_NAME, serializedToken, {
      expires: expirationDate,
    });
  };

  // Set the profile cookie with an expiration date
  const setProfileCookie = (profile: any, expiresIn: number) => {
    const serializedProfile = JSON.stringify(profile);
    const expirationDate = new Date(Date.now() + expiresIn * expiration);
    Cookies.set(PROFILE_COOKIE_NAME, serializedProfile, {
      expires: expirationDate,
    });
  };

  // Get the token from the cookie
  const getTokenFromCookie = () => {
    const serializedToken = Cookies.get(TOKEN_COOKIE_NAME);
    const token = serializedToken ? JSON.parse(serializedToken) : null;
    return token;
  };

  // Get the profile from the cookie
  const getProfileFromCookie = () => {
    const serializedProfile = Cookies.get(PROFILE_COOKIE_NAME);
    const profile = serializedProfile ? JSON.parse(serializedProfile) : null;
    return profile;
  };

  const getUserInfo = async (user: TokenResponse) => {
    if (!profile) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          },
        );
        setProfile(response.data);
        setProfileCookie(response.data, user.expires_in);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setUser(getTokenFromCookie());
    setProfile(getProfileFromCookie());
  }, []);

  useEffect(() => {
    if (user) {
      // Show loader for 1 second and redirect to home page
      const timer = setTimeout(() => {
        navigate('/');
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <div className="login-page">
      <div className="background">
        <BackGround />
      </div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1 className="login-page-h1">Welcome to try the demo of ChatGPT clone!</h1>
      <h2 className="login-page-h2">
        Creating your own AI chatbot similar to ChatGPT is a straightforward process. With our well-structured and pre-built code, along with understandable explanation and instructions, you will have the power to construct your personalized ChatGPT in just 10 minutes!
      </h2>
      {user ? <Spinner /> : <GLogin login={login} />}
    </div>
  );
};

export default LoginPage;
