import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner"
import { toast } from "react-hot-toast";

export const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {
            try {

                const res = await axios.get("/api/v1/auth/admin-auth"
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

            } catch (error) {
                toast(error.response.data.message);
            }
        }

        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path="" />;
}