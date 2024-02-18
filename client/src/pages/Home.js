import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import Prices from "./../components/routes/Prices"
import { AiOutlineReload } from "react-icons/ai";




const Home = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/getAll-categories");
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get all count of products
    const getTotal = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("http://localhost:8000/api/v1/product/count-Allproducts");
            setLoading(false);
            if (data?.success) {
                setTotal(data?.total);
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllCategories();
        getTotal();
    }, [])

    // get all products
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/per-page-products/${page}`);
            setLoading(false)
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (page === 1) return
        loadMore();
    }, [page])


    //load more
    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:8000/api/v1/product/per-page-products/${page}`);
            setLoading(false)
            if (data?.success) {
                setProducts([...products, ...data.products]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handle filter
    const handleFilter = (value, id) => {
        let all = [...checked];
        console.log(value);
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);

    }

    // filter producta
    const FilteredProducts = async () => {
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/product/filter-product", { checked, radio });
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) FilteredProducts();
    }, [checked, radio])



    return (
        <Layout title={"All products Best Prices"}>

            <div className='row p-2'>
                <div className='col-md-2'>
                    <h4>Filter By Category</h4>
                    <div className='m-2'>
                        {
                            categories.map((category) => (
                                <div className='d-flex flex-column mt-2' key={category._id}>
                                    <Checkbox onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                        {category.name}
                                    </Checkbox>
                                </div>
                            ))
                        }
                    </div>
                    {/* filter by prices */}
                    <h4>Filter By Prices</h4>
                    <div className='m-2'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {
                                Prices?.map((el) => (
                                    <div key={el._id} className='mt-2'>
                                        <Radio value={el.array}>{el.name}</Radio>
                                    </div>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-danger ' onClick={(e) => window.location.reload()}>Reset Filters</button>
                    </div>
                </div>
                <div className='col-md-10'>
                    <h4>All Products</h4>
                    <div className='d-flex flex-wrap'>
                        {
                            products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "17rem" }}>
                                        <img
                                            src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                            <p className="card-text">$ {p.price}</p>
                                            <button className='btn btn-primary '>More Details</button>
                                            <button className='btn btn-secondary ms-1' >More Details</button>
                                        </div>

                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    <div className='mb-3'>
                        {
                            products && products.length < total && (
                                <button
                                    className="btn loadmore"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {loading ? (
                                        "Loading ..."
                                    ) : (
                                        <>
                                            {" "}
                                            Loadmore <AiOutlineReload />
                                        </>
                                    )}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;