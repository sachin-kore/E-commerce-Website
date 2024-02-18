import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner"

export const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/user-auth"
                // one more way , { 
                //     headers: {
                //         "authorization": auth?.token
                //     }
                // }
            )
            if (res?.data?.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }

        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />;
}