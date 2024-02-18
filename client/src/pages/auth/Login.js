import React, { useState } from 'react'
import Layout from '../../components/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password });
            if (res.data.success) {
                toast.success(res?.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                console.log(res.data)
                toast(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast(error.response.data.message
            );

        }
    }

    return (
        <Layout title={"Login Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>
                    <div className="mb-3">
                        <input placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <input placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
                    </div>
                    <div className='d-flex flex-column gap-3'>
                        <button onClick={() => navigate("/forget-password")} type="button" className="btn btn-primary">Forget-Password</button>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default Login