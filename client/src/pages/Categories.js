import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'


const Categories = () => {
    const [categoriess, setCategoriess] = useState([]);

    const getAllcategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/getAll-categories");
            // console.log(data.categories)
            setCategoriess(data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllcategories();
    }, [])
    console.log(categoriess)
    return (
        <Layout>
            <div className='row m-2'>
                <div className=' d-flex flex-wrap'>
                    {
                        categoriess.map((x) => (
                            <div key={x._id} className='card m-2 p-2' style={{ width: "400px", height: "200px", textAlign: "center", background: "lightgray" }}>
                                <h4>{x.name}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Categories