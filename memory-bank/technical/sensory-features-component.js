// components/SensoryFeaturesList.js
import React from 'react';
import { 
  Tag, 
  Scissor, 
  ShieldCheck, 
  Thermometer, 
  CheckCircle, 
  Star 
} from 'lucide-react';

/**
 * Component to display sensory-friendly features of products
 * 
 * @param {Object} props
 * @param {string} props.sensoryFeatures - Text description of sensory features
 * @param {Object} props.materialInfo - Material information object from Sanity
 * @returns {JSX.Element}
 */
const SensoryFeaturesList = ({ sensoryFeatures, materialInfo }) => {
  // Parse sensory features from text or use default features
  const features = sensoryFeatures ? extractFeatures(sensoryFeatures) : getDefaultFeatures();
  
  // Get material rating if available
  const sensoryRating = materialInfo?.sensoryRating || 0;
  
  return (
    <div className="space-y-4">
      {/* Display sensory comfort rating if available */}
      {sensoryRating > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sensory Comfort Rating:</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < sensoryRating 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* List of sensory features */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 text-teal-500 mr-2">
              {getFeatureIcon(feature.type)}
            </span>
            <span className="text-sm">{feature.description}</span>
          </li>
        ))}
      </ul>
      
      {/* Material composition if available */}
      {materialInfo && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Material:</span>
          <p className="text-sm text-gray-600 mt-1">{materialInfo.composition}</p>
          
          {materialInfo.certifications && materialInfo.certifications.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-700">Certifications:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {materialInfo.certifications.map((cert) => (
                  <span 
                    key={cert} 
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                  >
                    {getCertificationDisplay(cert)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Extract features from a text description
 * @param {string} text - Feature text to parse
 * @returns {Array} Array of feature objects
 */
function extractFeatures(text) {
  // Split by newlines or bullet points
  const lines = text.split(/\n|•/).filter(line => line.trim().length > 0);
  
  return lines.map(line => {
    // Try to determine feature type based on content
    let type = 'default';
    
    if (line.toLowerCase().includes('tag') || line.toLowerCase().includes('label')) {
      type = 'tagless';
    } else if (line.toLowerCase().includes('seam') || line.toLowerCase().includes('stitch')) {
      type = 'seams';
    } else if (line.toLowerCase().includes('wash') || line.toLowerCase().includes('pre-wash')) {
      type = 'prewashed';
    } else if (line.toLowerCase().includes('chemical') || line.toLowerCase().includes('oeko-tex')) {
      type = 'chemical';
    }
    
    return {
      type,
      description: line.trim()
    };
  });
}

/**
 * Get default sensory features when none are specified
 * @returns {Array} Array of default feature objects
 */
function getDefaultFeatures() {
  return [
    {
      type: 'tagless',
      description: 'Tagless design with heat-transfer labels for maximum comfort'
    },
    {
      type: 'seams',
      description: 'Minimal seams with flat-lock stitching to reduce irritation'
    },
    {
      type: 'prewashed',
      description: 'Pre-washed for immediate softness against sensitive skin'
    },
    {
      type: 'chemical',
      description: 'Free from harsh chemicals and irritants'
    },
    {
      type: 'default',
      description: 'Water-based inks for minimal texture change on fabric surface'
    }
  ];
}

/**
 * Get icon component based on feature type
 * @param {string} type - Feature type
 * @returns {JSX.Element} Icon component
 */
function getFeatureIcon(type) {
  switch (type) {
    case 'tagless':
      return <Tag className="h-5 w-5" />;
    case 'seams':
      return <Scissor className="h-5 w-5" />;
    case 'prewashed':
      return <Thermometer className="h-5 w-5" />;
    case 'chemical':
      return <ShieldCheck className="h-5 w-5" />;
    default:
      return <CheckCircle className="h-5 w-5" />;
  }
}

/**
 * Get display name for certification
 * @param {string} cert - Certification code
 * @returns {string} Display name
 */
function getCertificationDisplay(cert) {
  const certMap = {
    'oeko-tex': 'OEKO-TEX',
    'gots': 'GOTS Certified',
    'fair-trade': 'Fair Trade',
    'recycled-content': 'Recycled Content'
  };
  return certMap[cert] || cert;
}

export default SensoryFeaturesList;
