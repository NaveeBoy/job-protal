import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashCategory = () => {
    const { categories, loading } = useSelector((state) => state.categories);

    if (loading) return <div>Loading...</div>;
    
    return (
        <div>
            <h2>Job Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashCategory;
