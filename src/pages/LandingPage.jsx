import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import ProductGrid from '../components/products/ProductGrid';
import productImage from '../assets/coming-soon-typography-vector-design (1).jpg';

const LandingPage = () => {
    const [products, setProducts] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
            const token = localStorage.getItem('buyerToken');
        if(token){
            axios.get('/api/recommendations',{headers:{Authorization:`Bearer ${token}`}})
                 .then(r=>{
                    const mapped=r.data.map(p=>({id:p._id,name:p.name,price:p.price,image:p.images?.[0]||productImage}));
                    setRecommended(mapped);
                 }).catch(()=>{});
        }
    }, []);

    const fetchProducts = async (query = '') => {
        const res = await axios.get(`/api/products${query}`);
        const mapped = res.data.map(p => ({
            id: p._id,
            name: p.name,
            price: p.price,
            image: p.images[0] || productImage,
        }));
        setProducts(mapped);
    };

    // Search functionality moved to buyer dashboard


    const categories = [
        'Handicrafts',
        'Apparel',
        'Home Decor',
        'Food Items',
        'Jewelry',
        'Pottery',
        'Wellness',
        'Kitchenware'
    ];

    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar for Filters */}
                    <aside className="w-full lg:w-1/4">
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Filters</h3>
                            
                            {/* Category Filter */}
                            <div>
                                <h4 className="font-semibold mb-2">Category</h4>
                                <ul className="space-y-1">
                                    {categories.map(category => (
                                        <li key={category}>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="rounded text-blue-600 focus:ring-blue-500"
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={() => {
                                                        setSelectedCategories((prev) => {
                                                            const next = prev.includes(category)
                                                                ? prev.filter((c) => c !== category)
                                                                : [...prev, category];
                                                            // fetch products for first page
                                                            const query = next.length ? `?category=${encodeURIComponent(next[0])}` : '';
                                                            fetchProducts(query);
                                                            return next;
                                                        });
                                                    }}
                                                />
                                                <span>{category}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 border-t pt-6">
                                <h4 className="font-semibold mb-2">Availability</h4>
                                <ul>
                                    <li>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                            <span>Include Out of Stock</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold">All Products</h1>
                            <div>
                                <label htmlFor="sort" className="sr-only">Sort by</label>
                                <select id="sort" className="border rounded-lg px-3 py-2 focus:outline-blue-500">
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest Arrivals</option>
                                </select>
                            </div>
                        </div>
                        <ProductGrid products={products} />
                    </main>

                    {recommended.length>0 && (
                        <section className="mt-12">
                          <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
                          <ProductGrid products={recommended} />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 