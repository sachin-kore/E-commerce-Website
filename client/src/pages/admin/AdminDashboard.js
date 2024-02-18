import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

export const AdminDashboard = () => {
    return (
        <Layout title={"Admin dashboard Ecommerce -APP"}>
            <div className='d-flex m-3 p-3 gap-4'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    content
                </div>
            </div>
        </Layout>
    )
}
