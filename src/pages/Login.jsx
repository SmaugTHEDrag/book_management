import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

export default function Login() {
    const [ErrorMessage, setErrorMessage] = useState('');
    const { signUpWithGmail, login } = useContext(AuthContext);
    const [notVerified, setNotVerified] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                const user = result.user;
                if (user.emailVerified) {
                    alert("Login successful!");
                    navigate(from, { replace: true });
                } else {
                    setNotVerified(true);
                    setErrorMessage('Please verify your email before logging in.');
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        {notVerified ? (
                            <h2 id='login-text-custom' className="text-center text-2xl font-semibold mb-4">Please verify your email</h2>
                        ) : (
                            <>
                                <div>
                                    <h1 className="text-3xl font-semibold">Please Login to Dashboard</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" required />
                                        </div>
                                        <div className="relative">
                                            <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" required />
                                        </div>
                                        <div>
                                            {ErrorMessage && <p className='text-blue-500 text-sm'>Email or Username is not valid!</p>}
                                            <p className='text-base mt-1'>If you haven't an account. Please create here <Link to='/create-user' className='underline text-blue-600'>Sign Up</Link></p>
                                        </div>
                                        <div className="relative">
                                            <button type='submit' className="bg-blue-500 text-white rounded px-6 py-1">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
