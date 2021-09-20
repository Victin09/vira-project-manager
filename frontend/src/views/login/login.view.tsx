import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

import { useUser } from '@common/context/user-context.common';
import { isAuthenticated } from '@common/auth/auth.common';

const Login = (): JSX.Element => {
    const { setEmail, setName, setIcon } = useUser();
    const [cookies, setCookie] = useCookies(['vpm-um']);
    const history = useHistory();

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated()) history.push('/project');
    }, []);

    const login = async () => {
        const result = await (
            await fetch(`${process.env.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: mail,
                    password
                })
            })
        ).json();
        if (result.access_token) {
            sessionStorage.setItem('token', result.access_token);
            setName(result.name);
            setEmail(result.email);
            setIcon(result.icon);
            setCookie('vpm-um', result);
            history.push('/');
        }
    };

    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="email@gmail.com"
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-700 hover:bg-indigo-800 text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => login()}
                        >
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-indigo-700 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                {/* <p className="text-center text-gray-500 text-xs">&copy;2021 Vira. All rights reserved.</p> */}
            </div>
        </div>
    );
};

export default Login;
