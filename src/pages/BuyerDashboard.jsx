import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import { useNavigate } from 'react-router-dom';
import SurveyModal from '../components/buyer/SurveyModal';
import ProductGrid from '../components/products/ProductGrid';
import productImage from '../assets/coming-soon-typography-vector-design (1).jpg';

const BuyerDashboard = () => {
    const navigate = useNavigate();
    const [showSurvey, setShowSurvey] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // Simulate first login
        const hasTakenSurvey = localStorage.getItem('hasTakenSurvey');
        if (!hasTakenSurvey) {
            setShowSurvey(true);
        }
    }, []);

    const handleSurveySubmit = () => {
        localStorage.setItem('hasTakenSurvey', 'true');
        setShowSurvey(false);
    };

    const handleSurveyReset = () => {
        localStorage.removeItem('hasTakenSurvey');
        window.location.reload();
    };

    // Products state and search
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const fetchProducts = async (query = '') => {
        try {
            const res = await fetch(`/api/products${query}`);
            const data = await res.json();
            // Map to include fallback image
            const mapped = data.map(p => ({
                ...p,
                image: p.images?.[0] || productImage,
            }));
            setProducts(mapped);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const q = search.trim();
        fetchProducts(q ? `?search=${encodeURIComponent(q)}` : '');
    };

    const recommendedProducts = products.slice(0, 4); // simple placeholder

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            {showSurvey && <SurveyModal onSubmit={handleSurveySubmit} />}
            
            <main className="container mx-auto p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                    {/* --- Temporary Button for Testing --- */}
                    <button
                        onClick={handleSurveyReset}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                    >
                        Reset and Show Survey
                    </button>
                    {/* ------------------------------------ */}
                    {/* Optional: Cart and Order History links */}
                    <div className="space-x-4">
                        <button onClick={() => navigate('/cart')} className="text-blue-600 hover:underline">My Cart</button>
                        <button onClick={() => navigate('/buyer/orders')} className="text-blue-600 hover:underline">Order History</button>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`${
                                activeTab === 'all'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            All Products
                        </button>
                        <button
                            onClick={() => setActiveTab('recommended')}
                            className={`${
                                activeTab === 'recommended'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Recommended For You
                        </button>
                    </nav>
                </div>

                <div>
                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="mb-6 max-w-xl flex gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Search
                        </button>
                    </form>

                    {activeTab === 'all' && <ProductGrid products={products} />}
                    {activeTab === 'recommended' && <ProductGrid products={recommendedProducts} />}
                </div>
            </main>
        </div>
    );
};

export default BuyerDashboard; 