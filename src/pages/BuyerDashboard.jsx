import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import SurveyModal from '../components/buyer/SurveyModal';
import ProductGrid from '../components/products/ProductGrid';
import productImage from '../assets/coming-soon-typography-vector-design (1).jpg';

const BuyerDashboard = () => {
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

    // Mock data for products
    const allProducts = [
        { id: 1, name: 'Handcrafted Pottery', price: '450', image: productImage },
        { id: 2, name: 'Woven Scarf', price: '750', image: productImage },
        { id: 3, name: 'Herbal Tea Blend', price: '250', image: productImage },
        { id: 4, name: 'Bamboo Utensils Set', price: '350', image: productImage },
    ];

    const recommendedProducts = allProducts.slice(0, 2); // Mock recommendations

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
                        <button className="text-blue-600 hover:underline">My Cart</button>
                        <button className="text-blue-600 hover:underline">Order History</button>
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
                    {activeTab === 'all' && <ProductGrid products={allProducts} />}
                    {activeTab === 'recommended' && <ProductGrid products={recommendedProducts} />}
                </div>
            </main>
        </div>
    );
};

export default BuyerDashboard; 