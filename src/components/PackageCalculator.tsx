import { useState, useEffect } from "react";

const packageDetails = {
  "Package 1": {
    price: 350,
    label: "A$350 + GST",
    features: [
      "2 themed backgrounds (1 for baby, 1 for family)",
      "10 Professional retouched images",
      "Online Gallery"
    ]
  },
  "Package 2": {
    price: 600,
    label: "A$600 + GST",
    features: [
      "4 themed backgrounds (3 for baby, 1 for family)",
      "20 Professional retouched images",
      "A4 Size Standard Photo Album",
      "Online Gallery"
    ]
  },
  "Package 3": {
    price: 725,
    label: "A$725 + GST",
    features: [
      "5 themed backgrounds (4 for baby, 1 for family)",
      "30 Professional retouched images",
      "Grandparents included",
      "200+ Unedited images",
      "Premium LAY-FLAT A4 Size Album",
      "USB Drive & Online gallery",
      "Express delivery in 72 hrs"
    ]
  },
  "Package 4": {
    price: 900,
    label: "A$900 + GST",
    features: [
      "6 themed backgrounds",
      "Grandparents included",
      "250+ Unedited images",
      "USB + Premium Canvas Wall Art (50x60cm)",
      "40 Professional retouched images",
      "Free outfit for mum",
      "Premium A3 Size LAY-FLAT Album",
      "Express delivery in 72 hrs"
    ]
  },
  "Package 5": {
    price: 1650,
    label: "A$1650 + GST",
    features: [
      "7 themed backgrounds (6 for baby, 1 lifestyle for family)",
      "50 Professional retouched images",
      "Grandparents included",
      "Free outfit for mum",
      "300+ Unedited images",
      "Luxury Flush mount A3 Size Leather Album",
      "USB + Three Premium Canvas Wall Arts (50x60cm)",
      "Express delivery in 72 hrs"
    ]
  }
} as const;

type PackageKey = keyof typeof packageDetails;

export default function PackageCalculator() {
  const [budget, setBudget] = useState(350);
  const [express, setExpress] = useState(false);
  const [wallArt, setWallArt] = useState(false);
  const [includeRelatives, setIncludeRelatives] = useState(false);
  const [relativesCount, setRelativesCount] = useState(0);
  const [suggestedPackage, setSuggestedPackage] = useState<PackageKey | "">("");
  const [minBudget, setMinBudget] = useState(350);
  const [showPackages, setShowPackages] = useState(false);

  useEffect(() => {
    let newMin = 350;
    if (express) newMin = Math.max(newMin, 725);
    if (wallArt) newMin = Math.max(newMin, 900);

    setMinBudget(newMin);
    setBudget((prev) => Math.max(prev, newMin));
  }, [express, wallArt]);

  const findPackage = () => {
    let total = budget;
    if (includeRelatives) total += relativesCount * 25;

    if (total >= 350 && total <= 599) setSuggestedPackage("Package 1");
    else if (total >= 600 && total <= 724) setSuggestedPackage("Package 2");
    else if (total >= 725 && total <= 899) setSuggestedPackage("Package 3");
    else if (total >= 900 && total < 1650) setSuggestedPackage("Package 4");
    else if (total >= 1650) setSuggestedPackage("Package 5");
    else setSuggestedPackage("");

    setShowPackages(true);
  };

  const resetCalculator = () => {
    setBudget(350);
    setExpress(false);
    setWallArt(false);
    setIncludeRelatives(false);
    setRelativesCount(0);
    setSuggestedPackage("");
    setShowPackages(false);
  };

  const totalPrice = suggestedPackage ? (packageDetails[suggestedPackage].price * 1.1).toFixed(2) : "0";
  const gst = suggestedPackage ? (packageDetails[suggestedPackage].price * 0.1).toFixed(2) : "0";

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl max-w-6xl mx-auto shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Newborn Photography Package Calculator</h1>
        <p className="text-gray-600 text-lg">Find your perfect photography package tailored to your needs and budget</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
            Your Details
          </h2>
          <div className="space-y-4">
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              placeholder="Full Name" 
              defaultValue="KULDEEP GAUR" 
            />
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              type="date" 
              placeholder="Due Date" 
              defaultValue="2025-06-10" 
            />
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              type="tel" 
              placeholder="Phone Number" 
              defaultValue="8839890025" 
            />
            <input 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              type="email" 
              placeholder="Email Address" 
              defaultValue="janegitonga10@gmail.com" 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
            Your Preferences
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-3 text-gray-700">Your Budget: A${budget}</label>
              <input
                type="range"
                min={minBudget}
                max={1650}
                step={1}
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>A${minBudget}</span>
                <span>A$1650</span>
              </div>
              <div className="text-center mt-3 text-pink-600 font-bold text-xl">A${budget}</div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-3 text-gray-700">Express Delivery Required?</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="express" 
                      onChange={() => setExpress(true)} 
                      checked={express}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="express" 
                      onChange={() => setExpress(false)} 
                      checked={!express}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-3 text-gray-700">Wall Arts Required?</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="wallArt" 
                      onChange={() => setWallArt(true)} 
                      checked={wallArt}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="wallArt" 
                      onChange={() => setWallArt(false)} 
                      checked={!wallArt}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-3 text-gray-700">Include Grandparents/Relatives?</label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="relatives" 
                      onChange={() => setIncludeRelatives(true)} 
                      checked={includeRelatives}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="relatives" 
                      onChange={() => setIncludeRelatives(false)} 
                      checked={!includeRelatives}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {includeRelatives && (
                <div>
                  <label className="block font-medium mb-2 text-gray-700">How many additional relatives?</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                    type="number"
                    value={relativesCount}
                    onChange={(e) => setRelativesCount(parseInt(e.target.value) || 0)}
                    min={0}
                    placeholder="0"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button 
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          onClick={findPackage}
        >
          Find My Perfect Package ✨
        </button>

        {suggestedPackage && (
          <div className="mt-12 bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6">
              <h3 className="text-3xl font-bold text-center mb-2">Your Recommended Package</h3>
              <p className="text-pink-100 text-center">Perfectly tailored to your preferences and budget</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white p-4 font-semibold text-xl text-center">
              Recommended: {suggestedPackage}
              {suggestedPackage === "Package 4" && (
                <div className="text-sm font-normal mt-1 opacity-90">Premium Newborn Package</div>
              )}
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  {packageDetails[suggestedPackage].features.slice(0, Math.ceil(packageDetails[suggestedPackage].features.length / 2)).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-pink-400 text-xl">●</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {packageDetails[suggestedPackage].features.slice(Math.ceil(packageDetails[suggestedPackage].features.length / 2)).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-pink-400 text-xl">●</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-right mb-6">
                <span className="bg-pink-100 text-pink-800 text-sm px-4 py-2 rounded-full font-semibold">
                  Perfect Match ✨
                </span>
              </div>

              <div className="border-t pt-6 bg-gray-50 rounded-xl p-6">
                <h4 className="text-2xl font-bold mb-4 text-gray-800">Your Quote Summary</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Selected Package:</span>
                    <span className="font-semibold">{suggestedPackage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package Price:</span>
                    <span className="font-semibold">A${packageDetails[suggestedPackage].price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (10%):</span>
                    <span className="font-semibold">A${gst}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-2xl font-bold text-amber-600">
                      <span>Total Price:</span>
                      <span>A${totalPrice}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                    Book This Package
                  </button>
                  <button 
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                    onClick={resetCalculator}
                  >
                    Reset Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPackages && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">All Available Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(packageDetails).map(([key, pkg]) => (
              <div key={key} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{key}</h3>
                  <div className="text-2xl font-bold text-amber-600 mb-1">{pkg.label}</div>
                  <div className="text-sm text-gray-500">Including GST: A${(pkg.price * 1.1).toFixed(2)}</div>
                </div>
                
                <ul className="space-y-2 text-sm mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-pink-400 text-lg">●</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                  Select {key}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}