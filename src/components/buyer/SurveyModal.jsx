import React, { useState } from 'react';

const SurveyModal = ({ onSubmit }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    'Handicrafts',
    'Apparel',
    'Home Decor',
    'Food Items',
    'Jewelry',
    'Pottery',
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save these preferences
    console.log('Selected categories:', selectedCategories);
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome!</h2>
        <p className="text-gray-600 text-center mb-6">
          Help us personalize your experience by selecting categories you're interested in.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryToggle(category)}
                className={`p-4 rounded-lg text-center font-semibold transition ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
          >
            Save Preferences & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyModal; 