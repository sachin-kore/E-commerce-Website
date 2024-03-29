import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

export const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/product/getall-products");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <>
            <Layout>
                <div className='d-flex m-3 p-3 gap-4'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img
                                            src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                            <p className="card-text">$ {p.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}
