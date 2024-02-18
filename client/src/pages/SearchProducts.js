import React from 'react'
import { useSearch } from '../context/SearchContext'
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const SearchProducts = () => {
    const [values] = useSearch();
    return (
        <Layout title={"Search results"}>

            <h1 className='text-center'>Search Results</h1>
            {
                values?.results.length < 1
                    ? "No product found"
                    : <h4 className='text-center'>{

                        "Found" + " " + values?.results.products.length + " " + "Products"
                    }</h4>
            }
            <div className='d-flex flex-wrap m-4'>
                {
                    values?.results?.products?.map((p) => (
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


        </Layout>
    )
}

export default SearchProducts