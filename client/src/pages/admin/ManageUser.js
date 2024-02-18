import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'


const ManageUser = () => {
    const [users, setUsers] = useState([]);

    const GetallUsers = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/auth/get-all-users");
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetallUsers();
    }, [])

    const myDate = (value) => {
        const date = value.slice(0, "yyyy-mm-dd".length);
        return date;
    }

    console.log(users);
    return (
        <Layout>
            <div className='d-flex m-3 p-3 gap-4'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Role</th>
                                <th scope="col">Date</th>
                                <th scope='col'>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user) => (
                                    <tr key={user._id}>
                                        <th >{user.name ? user.name : "No name"}</th>
                                        <th >{user.email}</th>
                                        <th >{user.phone}</th>
                                        <th >{user.role}</th>
                                        <th >{myDate(user.createdAt)}</th>
                                        <th >{user.address}</th>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </Layout>
    )
}

export default ManageUser