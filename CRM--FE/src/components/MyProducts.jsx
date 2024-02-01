import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNav from './Adminnav';
import { protecdInstance } from '../services/instance';

function MyProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await protecdInstance.get('/admin');
              
                setProducts(response.data.product); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); 

    return (
      <div>
          <AdminNav />
          <div className="mt-4">
                    <h3 className='text-center'>My Products</h3>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.product}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
      </div>
  )
}

export default MyProducts;