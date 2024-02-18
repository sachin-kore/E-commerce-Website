import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (

        <div>
            <h3 className='text-center '>User Panel</h3>
            <ul className="list-group">
                <NavLink to="/dashboard/user/profile" className="list-group-item " aria-current="true">Profile</NavLink >
                <NavLink to="/dashboard/user/order" className="list-group-item">Orders</NavLink >
            </ul>
        </div>
    )
}

export default UserMenu