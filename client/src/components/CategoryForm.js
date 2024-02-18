import React from 'react'

const CategoryForm = ({ updatedName, setUpdatedName, handleUpdate }) => {
    return (
        <>
            <form onSubmit={handleUpdate}>
                <div className="mb-3 w-50" >
                    <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} type='text' className="form-control" />
                </div>
                <button className='btn btn-primary'>Update</button>
            </form>
        </>
    )
}

export default CategoryForm