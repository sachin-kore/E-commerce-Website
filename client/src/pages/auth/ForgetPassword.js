import React, { useState } from 'react'
import Layout from '../../components/Layout';

export const ForgetPassword = () => {



    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    return (
        <>
            <Layout title={"Reset-password Ecommerce app"}>
                <div className="form-container" >
                    <form >
                        <h4 className="title">RETRIVE-PASSWORD FORM</h4>
                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter Your Email "
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="What is Your Favorite sports"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            REGISTER
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    )
}
