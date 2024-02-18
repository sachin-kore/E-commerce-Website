import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div>
                <h3 className='text-center '>Admin Panel</h3>
                <ul className="list-group">
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item " aria-current="true">Create Category</NavLink >
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item">Create Product</NavLink >
                    <NavLink to="/dashboard/admin/all-products" className="list-group-item">All Products</NavLink >
                    <NavLink to="/dashboard/admin/manage-users" className="list-group-item">Users</NavLink >

                </ul>
            </div>
        </>
    )
}

export default AdminMenu