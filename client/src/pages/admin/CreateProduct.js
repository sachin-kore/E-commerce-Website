import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const CreateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const navigate = useNavigate();


    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/getAll-categories");
            if (data.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const CreateProduct = async (e) => {
        e.preventDefault();
        const Formdata = new FormData();
        Formdata.append("name", name)
        Formdata.append("description", description)
        Formdata.append("price", price);
        Formdata.append("quantity", quantity);
        Formdata.append("category", category);
        Formdata.append("photo", photo);
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/product/create-product", Formdata);
            if (data.success) {
                toast.success(data.message);

                navigate("/dashboard/admin/all-products");
            }
            else {
                toast.error(data.message);
                console.log(data);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <Layout>
            <div className='d-flex m-3 p-3 gap-4'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Create product</h1>
                    <div className=' m-1 w-75'>
                        <div className='mb-3'>
                            <Select
                                placeholder="Select a Category"
                                size='large'
                                bordered={false}
                                className='form-select m-1'
                                onChange={(value) => setCategory(value)}
                            >
                                {
                                    categories?.map((item) => (
                                        <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                    )

                                    )}
                            </Select>
                        </div>
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12'>{photo ? photo.name : "Upload photo"}
                                <input
                                    name="photo"
                                    type='file'
                                    hidden
                                    accept='images/*'
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                            </label>
                        </div>
                        <div className='mb-3'>
                            {photo && (
                                <div className='text-center'>
                                    <img src={URL.createObjectURL(photo)} alt='' height={"200px"} className="img img-responsive" />
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <input
                                placeholder='Enter Product Name'
                                className='form-control'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <textarea
                                placeholder='Enter Product desc'
                                className='form-control'
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <input
                                placeholder='Enter Product Price'
                                className='form-control'
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <input
                                placeholder='Enter Product Quantity'
                                className='form-control'
                                value={quantity}
                                type='number'
                                onChange={(e) => setQuantity(e.target.value)} />
                        </div>

                        <div className='mb-3'>
                            <Select
                                bordered={false}
                                placeholder="Select Shipping "
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                            >
                                <Option value="0">Yes</Option>
                                <Option value="1">No</Option>
                            </Select>
                        </div>
                        <div>
                            <button type='button' onClick={CreateProduct} className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct;