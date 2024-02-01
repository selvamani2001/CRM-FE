import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navlink from './Navbar/Navbar';

function Products() {
  const productData = [
    {
      product: 'Phone',
      category: 'Samsung Galaxy A34 5G',
      price: '40,000',
      description: 'A high-end smartphone with advanced features. The Phone model includes a powerful camera, long-lasting battery, and a sleek design. Stay connected in style.',
      imageUrl: 'https://i.postimg.cc/JnF4cJT8/th.jpg'
    },
    {
      product: 'Earphones',
      category: 'Boat',
      price: 3999,
      description: 'Wireless earphones with great sound quality. These Earphones provide a comfortable fit and deliver crystal-clear audio for an immersive listening experience.',
      imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.E0HqFb3QUflcVW2tgRROUwHaHa&pid=Api&P=0&h=180'
    },
    {
      product: 'Laptop',
      category: 'ASUS',
      price: '1,29,999',
      description: 'Powerful laptop for productivity and gaming. The Laptop comes with high-performance specifications, a large display, and a stylish design, making it perfect for work.',
      imageUrl: 'https://i.postimg.cc/sXbKF6nN/laptop.jpg'
    },
    {
      product: 'Smartwatch',
      category: 'Noise',
      price: '2,999',
      description: 'Fitness tracker with smartwatch features. The Smartwatch helps you stay active and organized. It includes fitness tracking, notifications, and a sleek design suitable for any occasion.',
      imageUrl: 'https://i.postimg.cc/Tw5qcjRq/sw.jpg'
    },
    {
      product: 'Camera',
      category: 'Samsung',
      price: '49,999',
      description: 'Professional DSLR camera with high-resolution sensor. Capture stunning images with the Camera advanced features. Ideal for photographers who demand exceptional image quality.',
      imageUrl: 'https://i.postimg.cc/3NHpCPfY/ca.jpg'
    },
    {
      product: 'Tablet',
      category: 'Red mi',
      price: '22,999',
      description: 'Portable tablet with a vibrant display. The Tablet offers a compact design, powerful performance, and a vibrant display for an enjoyable multimedia good experience on the go.',
      imageUrl: 'https://i.postimg.cc/26N3PnQx/ta.jpg'
    },
    {
      product: 'Wireless Speaker',
      category: 'Sony',
      price: '9,999',
      description: 'Bluetooth speaker for immersive audio experience. The Wireless Speaker delivers high-quality sound wirelessly. Perfect for parties, gatherings, or enjoying music at home.',
      imageUrl: 'https://i.postimg.cc/YSDBF79L/th-1.jpg'
    },
    {
      product: 'Fitness Tracker',
      category: 'Wearables',
      price: 499,
      description: 'Track your daily activities with this fitness tracker. The Fitness Tracker monitors your steps, heart rate, and sleep patterns. Stay fit and motivated with this wearable device.',
      imageUrl: 'https://i.postimg.cc/66y1HS6w/th-2.jpg'
    },
    {
      product: 'Gaming Console',
      category: 'Gaming',
      price: '59,999',
      description: 'Latest gaming console with high-performance. The Gaming Console offers cutting-edge graphics, game library, and an immersive gaming experience for enthusiasts.',
      imageUrl: 'https://i.postimg.cc/SKSTbQ82/Sony-Play-Station-4-Pro-Gaming-Console.png'
    },
  ];
  const navigate=useNavigate()
  const handleTicket = () => {
   navigate('/create')
  }
  
  return (
    
    <div className='container-f bg-light'>
      <Navlink />
      <div>
        <h1 className='text-center mb-4 mt-4'>All Products</h1>
      </div>
      <div className='row'>
        {productData.map((product, index) => (
          <div key={index} className='col-md-4 mb-4'>
            <div className='card'>
              <h3 className='card-title text-center fs-2 mt-2 text-danger'>{product.product}</h3>
              <img
                src={product.imageUrl}
                alt={product.product}
                className='img-product img-fluid mx-auto mt-3'
                style={{ maxWidth: '100%', height: '190px' }}
              />

              <div className='card-body '>
                <p className='card-text'>Brand: {product.category}</p>
                <p className='card-text'>Price :<span className='text-success'> Rs. {product.price}</span></p>
                <p>Details :</p>
                <p className='card-text des'>{product.description}</p>
                <div className='d-flex '>
                  <button onClick={handleTicket} className='btn btn-info mx-auto'>Enquire</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  
  );
}

export default Products;