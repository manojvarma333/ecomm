import React from 'react';
import Navbar from '../components/common/Navbar';
import ProductGrid from '../components/products/ProductGrid';
import productImage from '../assets/coming-soon-typography-vector-design (1).jpg';

const LandingPage = () => {
    // Mock data for products to display on the landing page
    const products = [
        { id: 1, name: 'Handcrafted Pottery Vase', price: '1200', image: productImage },
        { id: 2, name: 'Woven Wall Hanging', price: '1850', image: productImage },
        { id: 3, name: 'Organic Spice Blend', price: '450', image: productImage },
        { id: 4, name: 'Bamboo Kitchen Utensils', price: '800', image: productImage },
        { id: 5, name: 'Hand-painted Fabric', price: '2500', image: productImage },
        { id: 6, name: 'Herbal Wellness Tea', price: '350', image: productImage },
        { id: 7, name: 'Beaded Jewelry Set', price: '3200', image: productImage },
        { id: 8, name: 'Clay Cooking Pot', price: '1500', image: productImage },
    ];

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
                                                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
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
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 