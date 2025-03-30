// components/ProductDetail.js - Component for product detail pages
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import SensoryFeaturesList from './SensoryFeaturesList';
import SizeGuide from './SizeGuide';
import AudienceInfo from './AudienceInfo';
import RelatedProducts from './RelatedProducts';
import EducationalContext from './EducationalContext';

const ProductDetail = ({ product, relatedProducts }) => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Find available sizes for the selected color
  const availableSizes = product.variants
    .filter(variant => variant.color === selectedColor)
    .map(variant => variant.size);

  // Find available colors
  const availableColors = [...new Set(product.variants.map(variant => variant.color))];

  // Find the selected variant
  const selectedVariant = product.variants.find(
    variant => variant.color === selectedColor && variant.size === selectedSize
  );

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (!selectedVariant) {
      alert('Selected variant is not available');
      return;
    }

    // Implementation for Shopify cart functionality
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variantId: selectedVariant.id,
          quantity,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show success message or redirect to cart
        router.push('/cart');
      } else {
        alert('Error adding to cart: ' + data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Product Image Gallery */}
        <div className="flex flex-col">
          <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 aspect-w-1 aspect-h-1">
            {product.mainImage && (
              <Image
                src={urlFor(product.mainImage).url()}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
                priority
              />
            )}
          </div>
          
          {/* Image thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images && product.images.map((image, index) => (
              <div key={index} className="relative rounded-md overflow-hidden bg-gray-100 aspect-w-1 aspect-h-1">
                <Image
                  src={urlFor(image).width(150).url()}
                  alt={`${product.title} - image ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-center object-cover cursor-pointer"
                  onClick={() => setMainImage(image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0 lg:ml-8">
          {/* Collections */}
          <div className="flex space-x-2 mb-2">
            {product.collections && product.collections.map((collection) => (
              <span 
                key={collection._id} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {collection.title}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
          
          {/* Price */}
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl text-gray-900">${product.price}</p>
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <div className="mt-4">
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>
          )}

          {/* Audience Tags */}
          {product.targetAudience && product.targetAudience.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.targetAudience.map((audience) => (
                <span 
                  key={audience} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                >
                  {getAudienceDisplay(audience)}
                </span>
              ))}
            </div>
          )}

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="flex items-center space-x-3 mt-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`relative p-0.5 rounded-full flex items-center justify-center ${
                    selectedColor === color
                      ? 'ring-2 ring-indigo-500 ring-offset-2'
                      : ''
                  }`}
                  style={{ backgroundColor: getColorHex(color) }}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedSize(''); // Reset size when color changes
                  }}
                >
                  <span className="sr-only">{color}</span>
                  <span 
                    aria-hidden="true" 
                    className="h-8 w-8 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowSizeGuide(true)}
              >
                Size guide
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`py-2 px-4 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 text-gray-900 bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <select
              id="quantity"
              name="quantity"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              Add to cart
            </button>
          </div>

          {/* Sensory Features */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Sensory-Friendly Features</h3>
            <div className="mt-2 text-sm text-gray-600">
              <SensoryFeaturesList sensoryFeatures={product.sensoryFeatures} materialInfo={product.materialInfo} />
            </div>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['description', 'details', 'educational', 'care'].map((tab) => (
              <button
                key={tab}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab(tab)}
              >
                {getTabLabel(tab)}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-indigo max-w-none">
              {renderPortableText(product.description)}
            </div>
          )}

          {activeTab === 'details' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Product details</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Material</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.materialInfo?.composition || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Design Elements</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {product.designElements && product.designElements.length > 0
                      ? product.designElements.map(element => getDesignElementDisplay(element)).join(', ')
                      : 'Not specified'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Design Style</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {getDesignStyleDisplay(product.designStyle) || 'Not specified'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Print Method</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {getPrintMethodFromDesignStyle(product.designStyle)}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === 'educational' && (
            <div>
              <EducationalContext product={product} />
              <AudienceInfo audiences={product.targetAudience} />
            </div>
          )}

          {activeTab === 'care' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Care Instructions</h3>
              <div className="mt-4 text-sm text-gray-600">
                {product.careInstructions || 'Machine wash cold, tumble dry low. Do not bleach. Iron if needed on low heat, inside out.'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuide onClose={() => setShowSizeGuide(false)} productType={product.productType} />
      )}
    </div>
  );
};

// Helper functions
function getAudienceDisplay(audienceCode) {
  const audienceMap = {
    'slps': 'SLPs',
    'sped-teachers': 'Special Ed Teachers',
    'rbts-bcbas': 'Behavior Analysts',
    'parents': 'Parents',
    'aac-users': 'AAC Users',
    'autism-community': 'Autism Community',
    'general-public': 'General Public'
  };
  return audienceMap[audienceCode] || audienceCode;
}

function getDesignElementDisplay(elementCode) {
  const elementMap = {
    'aac-device': 'AAC Device',
    'pecs-cards': 'PECS Cards',
    'sign-language': 'Sign Language',
    'speech-bubbles': 'Speech Bubbles',
    'neurodiversity-symbol': 'Neurodiversity Symbol',
    'communication-board': 'Communication Board',
    'heart-emotion': 'Heart/Emotion',
    'text-only': 'Text Only'
  };
  return elementMap[elementCode] || elementCode;
}

function getDesignStyleDisplay(styleCode) {
  const styleMap = {
    'typography': 'Typography-focused',
    'illustrative': 'Illustrative',
    'minimalist': 'Minimalist',
    'watercolor': 'Watercolor',
    'hand-drawn': 'Hand-drawn'
  };
  return styleMap[styleCode] || styleCode;
}

function getPrintMethodFromDesignStyle(styleCode) {
  const printMethodMap = {
    'typography': 'Water-based screen printing',
    'illustrative': 'DTG (Direct-to-Garment)',
    'minimalist': 'Water-based screen printing',
    'watercolor': 'DTG (Direct-to-Garment)',
    'hand-drawn': 'DTG (Direct-to-Garment)'
  };
  return printMethodMap[styleCode] || 'Water-based screen printing';
}

function getColorHex(colorName) {
  const colorMap = {
    'white': '#ffffff',
    'black': '#000000',
    'navy': '#000080',
    'gray': '#808080',
    'pink': '#ffc0cb',
    'light blue': '#add8e6',
    'purple': '#800080'
  };
  return colorMap[colorName.toLowerCase()] || '#ffffff';
}

function getTabLabel(tab) {
  const tabLabels = {
    'description': 'Description',
    'details': 'Product Details',
    'educational': 'Educational Context',
    'care': 'Care Instructions'
  };
  return tabLabels[tab] || tab;
}

// This is a simplified version of portable text rendering
// In a real implementation, you would use the @portabletext/react package
function renderPortableText(blocks) {
  if (!blocks) return <p>No description available</p>;
  
  return (
    <div>
      {blocks.map((block, index) => {
        if (block._type === 'block') {
          return <p key={index}>{block.children.map(child => child.text).join('')}</p>;
        }
        return null;
      })}
    </div>
  );
}

export default ProductDetail;
