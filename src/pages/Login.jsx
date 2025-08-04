import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(AuthContext); // ✅ lấy setUser từ context
    const [notVerified, setNotVerified] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname;
    const redirectTo = from && from.startsWith('/admin/dashboard') ? "/admin/dashboard" : "/";

    navigate(redirectTo, { replace: true });


    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const login = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            const token = data.token;

            // ✅ Lưu token và user
            localStorage.setItem("token", token);
            const user = { login }; // có thể thay bằng thông tin chi tiết từ API nếu cần
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Email or password is invalid.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        {notVerified ? (
                            <h2 className="text-center text-2xl font-semibold mb-4">Please verify your email</h2>
                        ) : (
                            <>
                                <div>
                                    <h1 className="text-3xl font-semibold">Please Login to Dashboard</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <form onSubmit={handleLogin} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                placeholder="Email or Username"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                placeholder="Password"
                                                required
                                            />
                                        </div>
                                        <div>
                                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                                            <p className="text-base mt-1">
                                                If you haven't an account. Please create here <Link to="/create-user" className="underline text-blue-600">Sign Up</Link>
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <button type="submit" className="bg-blue-500 text-white rounded px-6 py-1">Login</button>
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
