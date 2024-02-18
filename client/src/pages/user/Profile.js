import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

const Profile = () => {
    return (
        <>
            <Layout>
                <div className='d-flex m-3 p-3 gap-4'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        profile
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Profile