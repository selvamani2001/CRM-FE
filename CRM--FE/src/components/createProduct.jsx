import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { protecdInstance } from '../services/instance';
import { ColorRing } from 'react-loader-spinner';
import AdminNav from './Adminnav';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        product: '',
        category: '',
        description: '',
        price: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await protecdInstance.post('/admin', formData);
        
            setLoading(false);

            setFormData({
                product: '',
                category: '',
                description: '',
                price: '',
            });
      
            navigate('/myproduct');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product. Please try again.');
        }
    };

    return (
        <div>
            <AdminNav />
            <div className="container mt-4">
                <h2>Product Management</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product" className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="product"
                            name="product"
                            value={formData.product}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {loading ? (
                        <button type="submit" className="btn btn-primary"><ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#abbd81', '#f8b26a', '#849b87', '#e15b64', '#f47e60']}
                        /></button>
                    ) : (
                        <button type="submit" className="btn btn-primary">Create Product</button>
                    )}
                </form>
                 
            </div>
        </div>
    );
};

export default CreateProduct;
