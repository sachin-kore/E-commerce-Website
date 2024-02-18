import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Modal } from 'antd';
import CategoryForm from '../../components/CategoryForm'

const CreateCategory = () => {

    const [category, setCategory] = useState("");
    const [allcategory, setAllCategory] = useState([]);
    const [modelVisible, setModelVisible] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [selected, setSelected] = useState(null);

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/category/create-category", { name: category });
            if (data.success) {
                toast.success(`${category}` + " " + data.message);
                setCategory("");
                getAllCategory();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/category/getAll-categories");
            if (data.success) {
                setAllCategory(data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(data.message);
                getAllCategory();
                setModelVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCategory = async (pid) => {
        try {
            const { data } = await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success(data.message);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])
    return (
        <Layout>
            <div className='d-flex m-3 p-3 gap-4'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h3>Manage Category</h3>

                    <form onSubmit={createCategory}>
                        <div className="mb-3 w-50" >
                            <input type='text' placeholder='Create new category' value={category} className="form-control" onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    <div className='w-75'>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allcategory.map((item) => (
                                        <>
                                            <tr>
                                                <td key={item._id}>{item.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={() => { setModelVisible(true); setUpdatedName(item.name); setSelected(item); }}>Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => deleteCategory(item._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <Modal footer={null} open={modelVisible} onCancel={() => setModelVisible(false)}>
                        <CategoryForm updatedName={updatedName} setUpdatedName={setUpdatedName} handleUpdate={handleUpdateCategory} />
                    </Modal>
                </div>


            </div>
        </Layout>
    )
}

export default CreateCategory