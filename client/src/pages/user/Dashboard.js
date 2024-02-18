import React from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/Layout'


const Dashboard = () => {
    return (
        <Layout title={"User dashboard Ecommerce -APP"}>
            <div className='d-flex m-3 p-3 gap-4'>
                <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    content
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard