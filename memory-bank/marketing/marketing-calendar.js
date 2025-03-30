// utils/marketingCalendar.js - Marketing calendar utility functions

/**
 * Marketing calendar for Different Not Less Apparel
 * Based on the 2025 Strategic Marketing Calendar document
 */

// Define key marketing seasons
const MARKETING_SEASONS = {
  AUTISM_ACCEPTANCE: {
    name: 'Autism Acceptance Month',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    primaryCollection: 'different-not-less',
    primaryAudience: ['parents', 'teachers', 'general-public'],
    keyMessage: 'Celebrating neurodiversity and different ways of communicating',
    hashTags: ['#DifferentNotLess', '#AutismAcceptance', '#NeurodiversityMovement']
  },
  BETTER_HEARING_SPEECH: {
    name: 'Better Hearing & Speech Month',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    primaryCollection: 'your-words-matter',
    primaryAudience: ['slps', 'teachers'],
    keyMessage: 'Celebrating communication professionals and their impact',
    hashTags: ['#BHSM', '#YourWordsMatter', '#SpeechTherapy', '#CommunicationMatters']
  },
  BACK_TO_SCHOOL: {
    name: 'Back to School Season',
    startDate: '2025-08-01',
    endDate: '2025-08-31',
    primaryCollection: 'teacher-collection',
    primaryAudience: ['teachers', 'slps'],
    keyMessage: 'Setting up successful communication for the new academic year',
    hashTags: ['#BackToSchool', '#InclusiveClassroom', '#TeacherStyle']
  },
  AAC_AWARENESS: {
    name: 'AAC Awareness Month',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    primaryCollection: 'aac-collection',
    primaryAudience: ['slps', 'teachers', 'parents'],
    keyMessage: 'Celebrating all forms of communication technology and support',
    hashTags: ['#AACAwareness', '#AACfamily', '#CommunicationForAll']
  },
  HOLIDAY: {
    name: 'Holiday Season',
    startDate: '2025-11-25',
    endDate: '2025-12-25',
    primaryCollection: null, // All collections
    primaryAudience: null, // All audiences
    keyMessage: 'Inclusive holiday celebrations and gift-giving',
    hashTags: ['#InclusiveHoliday', '#CommunicationGifts', '#MeaningfulGiving']
  }
};

// Weekly content themes for each marketing season
const CONTENT_THEMES = {
  AUTISM_ACCEPTANCE: [
    { week: 1, theme: 'What is Autism Acceptance?', contentTypes: ['educational', 'product-focused', 'community'] },
    { week: 2, theme: 'Embracing Neurodiversity', contentTypes: ['educational', 'user-stories', 'product-focused'] },
    { week: 3, theme: 'Communication Diversity', contentTypes: ['educational', 'product-focused', 'professional-resources'] },
    { week: 4, theme: 'Autism Advocacy', contentTypes: ['community', 'user-stories', 'calls-to-action'] }
  ],
  BETTER_HEARING_SPEECH: [
    { week: 1, theme: 'Celebrating SLPs', contentTypes: ['professional-spotlight', 'product-focused', 'educational'] },
    { week: 2, theme: 'Communication Access', contentTypes: ['educational', 'product-focused', 'professional-resources'] },
    { week: 3, theme: 'AAC Implementation', contentTypes: ['educational', 'user-stories', 'product-focused'] },
    { week: 4, theme: 'Communication Champions', contentTypes: ['professional-spotlight', 'community', 'calls-to-action'] }
  ],
  BACK_TO_SCHOOL: [
    { week: 1, theme: 'Classroom Setup', contentTypes: ['educational', 'product-focused', 'professional-resources'] },
    { week: 2, theme: 'Communication Supports', contentTypes: ['educational', 'product-focused', 'professional-resources'] },
    { week: 3, theme: 'Teacher Appreciation', contentTypes: ['professional-spotlight', 'product-focused', 'community'] },
    { week: 4, theme: 'Inclusive Education', contentTypes: ['educational', 'user-stories', 'calls-to-action'] }
  ],
  AAC_AWARENESS: [
    { week: 1, theme: 'AAC Basics', contentTypes: ['educational', 'product-focused', 'professional-resources'] },
    { week: 2, theme: 'AAC Success Stories', contentTypes: ['user-stories', 'community', 'product-focused'] },
    { week: 3, theme: 'AAC Implementation', contentTypes: ['educational', 'professional-resources', 'product-focused'] },
    { week: 4, theme: 'AAC Advocacy', contentTypes: ['community', 'calls-to-action', 'user-stories'] }
  ],
  HOLIDAY: [
    { week: 1, theme: 'Gift Guide Launch', contentTypes: ['product-focused', 'educational', 'promotional'] },
    { week: 2, theme: 'Professional Gifting', contentTypes: ['product-focused', 'professional-spotlight', 'promotional'] },
    { week: 3, theme: 'Inclusive Celebrations', contentTypes: ['educational', 'community', 'product-focused'] },
    { week: 4, theme: 'Last-Minute Gifts', contentTypes: ['product-focused', 'promotional', 'community'] }
  ]
};

// Content types with descriptions
const CONTENT_TYPES = {
  'educational': {
    description: 'Educational content about AAC, autism, or communication',
    platforms: ['blog', 'instagram', 'pinterest', 'facebook'],
    frequency: 'high',
    exampleFormats: ['infographics', 'carousel posts', 'blog articles', 'resource downloads']
  },
  'product-focused': {
    description: 'Content showcasing products and their features',
    platforms: ['instagram', 'facebook', 'pinterest', 'email'],
    frequency: 'high',
    exampleFormats: ['product photos', 'styling suggestions', 'feature highlights', 'collections']
  },
  'user-stories': {
    description: 'Stories and testimonials from customers and community members',
    platforms: ['blog', 'instagram', 'facebook'],
    frequency: 'medium',
    exampleFormats: ['customer spotlights', 'testimonial graphics', 'use case scenarios']
  },
  'professional-spotlight': {
    description: 'Highlighting professionals in SLP, education, and related fields',
    platforms: ['blog', 'instagram', 'facebook'],
    frequency: 'medium',
    exampleFormats: ['day-in-the-life features', 'professional interviews', 'workplace spotlights']
  },
  'professional-resources': {
    description: 'Resources specifically designed for professional audience segments',
    platforms: ['blog', 'pinterest', 'email'],
    frequency: 'medium',
    exampleFormats: ['downloadable guides', 'implementation resources', 'professional development']
  },
  'community': {
    description: 'Content fostering community engagement and interaction',
    platforms: ['instagram', 'facebook'],
    frequency: 'medium',
    exampleFormats: ['conversation starters', 'polls', 'user-generated content prompts']
  },
  'promotional': {
    description: 'Sales, discounts, and promotional content',
    platforms: ['email', 'instagram', 'facebook'],
    frequency: 'low',
    exampleFormats: ['sale announcements', 'discount codes', 'limited-time offers']
  },
  'calls-to-action': {
    description: 'Content encouraging specific actions beyond purchasing',
    platforms: ['blog', 'instagram', 'facebook'],
    frequency: 'low',
    exampleFormats: ['advocacy prompts', 'resource sharing', 'community involvement']
  }
};

// Platform-specific content strategies
const PLATFORM_STRATEGIES = {
  'instagram': {
    contentMix: {
      'product': 40,
      'educational': 30,
      'user-generated': 20,
      'behind-the-scenes': 10
    },
    postingFrequency: '5x weekly + daily stories',
    keyFeatures: ['Shopping tags', 'Carousel educational posts', 'Reels demonstrations'],
    growthStrategy: 'Influencer partnerships with SLPs, teachers, and autism advocates'
  },
  'facebook': {
    contentMix: {
      'product': 30,
      'educational': 40,
      'community': 20,
      'events': 10
    },
    postingFrequency: '4x weekly + group engagement',
    keyFeatures: ['Facebook Shop', 'Groups engagement', 'Live product launches'],
    growthStrategy: 'Targeted ads to professional groups and parent communities'
  },
  'pinterest': {
    contentMix: {
      'product': 50,
      'educational': 30,
      'activity-ideas': 20
    },
    postingFrequency: '10x weekly',
    keyFeatures: ['Shopping pins', 'Idea pins for communication activities'],
    growthStrategy: 'SEO-optimized boards targeting therapy and education searches'
  },
  'tiktok': {
    contentMix: {
      'product': 20,
      'educational': 30,
      'trends': 30,
      'behind-the-scenes': 20
    },
    postingFrequency: '3x weekly',
    keyFeatures: ['Educational content', 'day-in-the-life of communication professionals'],
    growthStrategy: 'Hashtag challenges, professional influencer partnerships'
  },
  'email': {
    contentMix: {
      'product': 40,
      'educational': 30,
      'promotional': 20,
      'community': 10
    },
    frequency: {
      'newsletter': 'weekly',
      'promotional': 'as needed'
    },
    segmentation: ['profession', 'purchase history', 'interests'],
    keyFeatures: ['Personalized product recommendations', 'educational downloads']
  },
  'blog': {
    contentMix: {
      'educational': 50,
      'professional-resources': 30,
      'user-stories': 20
    },
    postingFrequency: '2x weekly',
    keyFeatures: ['Comprehensive educational resources', 'SEO optimization', 'downloadable content'],
    growthStrategy: 'Content hub strategy focusing on key educational topics'
  }
};

/**
 * Get current or upcoming marketing season
 * @param {Date} date - Date to check (defaults to current date)
 * @returns {Object|null} Marketing season object or null if no active season
 */
function getCurrentMarketingSeason(date = new Date()) {
  const currentDate = date.toISOString().split('T')[0];
  
  // Check for active seasons
  for (const [key, season] of Object.entries(MARKETING_SEASONS)) {
    if (currentDate >= season.startDate && currentDate <= season.endDate) {
      return { key, ...season };
    }
  }
  
  // If no active season, find the next upcoming one
  let nextSeason = null;
  let minDiff = Infinity;
  
  for (const [key, season] of Object.entries(MARKETING_SEASONS)) {
    if (currentDate < season.startDate) {
      const diff = new Date(season.startDate) - date;
      if (diff < minDiff) {
        minDiff = diff;
        nextSeason = { key, ...season, daysUntil: Math.floor(diff / (1000 * 60 * 60 * 24)) };
      }
    }
  }
  
  return nextSeason;
}

/**
 * Get content themes for a specific marketing season
 * @param {string} seasonKey - Season key (e.g., 'AUTISM_ACCEPTANCE')
 * @returns {Array|null} Array of weekly themes or null if invalid season
 */
function getSeasonThemes(seasonKey) {
  return CONTENT_THEMES[seasonKey] || null;
}

/**
 * Generate content calendar for a specific date range
 * @param {Date} startDate - Start date for calendar
 * @param {Date} endDate - End date for calendar
 * @returns {Array} Array of content calendar items
 */
function generateContentCalendar(startDate, endDate) {
  const calendar = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const season = getCurrentMarketingSeason(currentDate);
    if (season) {
      // Get the week number within the season
      const seasonStartDate = new Date(season.startDate);
      const daysSinceSeasonStart = Math.floor((currentDate - seasonStartDate) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(daysSinceSeasonStart / 7) + 1;
      
      // Get the theme for this week
      const weeklyThemes = getSeasonThemes(season.key);
      const theme = weeklyThemes?.find(t => t.week === weekNumber) || null;
      
      if (theme) {
        // Add content items for this day based on the theme
        calendar.push({
          date: new Date(currentDate),
          season: season.name,
          theme: theme.theme,
          contentSuggestions: generateDailyContent(currentDate.getDay(), theme.contentTypes)
        });
      }
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return calendar;
}

/**
 * Generate content suggestions for a specific day based on day of week and content types
 * @param {number} dayOfWeek - Day of week (0-6, where 0 is Sunday)
 * @param {Array} contentTypes - Array of content type keys
 * @returns {Array} Array of content suggestions
 */
function generateDailyContent(dayOfWeek, contentTypes) {
  const suggestions = [];
  
  // Assign platforms based on day of week
  let platforms;
  switch (dayOfWeek) {
    case 0: // Sunday
      platforms = ['instagram', 'facebook']; // Light content day
      break;
    case 1: // Monday
      platforms = ['instagram', 'pinterest', 'facebook', 'email']; // Newsletter day
      break;
    case 2: // Tuesday
      platforms = ['instagram', 'tiktok', 'blog']; // Educational content day
      break;
    case 3: // Wednesday
      platforms = ['instagram', 'pinterest', 'facebook']; // Mid-week engagement
      break;
    case 4: // Thursday
      platforms = ['instagram', 'tiktok', 'blog']; // Professional content day
      break;
    case 5: // Friday
      platforms = ['instagram', 'facebook', 'pinterest']; // Product feature day
      break;
    case 6: // Saturday
      platforms = ['instagram', 'pinterest']; // Shopping day
      break;
  }
  
  // Generate a content suggestion for each platform
  platforms.forEach(platform => {
    // Filter content types that work well on this platform
    const compatibleTypes = contentTypes.filter(type => 
      CONTENT_TYPES[type].platforms.includes(platform)
    );
    
    if (compatibleTypes.length > 0) {
      // Pick a content type based on platform's content mix priorities
      const selectedType = selectContentTypeForPlatform(platform, compatibleTypes);
      
      suggestions.push({
        platform,
        contentType: selectedType,
        formatSuggestions: CONTENT_TYPES[selectedType].exampleFormats
      });
    }
  });
  
  return suggestions;
}

/**
 * Select appropriate content type for a platform based on platform strategy
 * @param {string} platform - Platform name
 * @param {Array} compatibleTypes - Array of compatible content types
 * @returns {string} Selected content type
 */
function selectContentTypeForPlatform(platform, compatibleTypes) {
  const strategy = PLATFORM_STRATEGIES[platform];
  
  if (!strategy || !strategy.contentMix) {
    // If no specific strategy, just pick a random compatible type
    return compatibleTypes[Math.floor(Math.random() * compatibleTypes.length)];
  }
  
  // Map content types to platform-specific content categories
  const contentCategories = {
    'product-focused': 'product',
    'educational': 'educational',
    'user-stories': 'user-generated',
    'professional-spotlight': 'educational',
    'professional-resources': 'educational',
    'community': 'community',
    'promotional': 'product',
    'calls-to-action': 'community'
  };
  
  // Weighted selection based on platform's content mix
  let totalWeight = 0;
  const typeWeights = compatibleTypes.map(type => {
    const category = contentCategories[type] || 'educational';
    const weight = strategy.contentMix[category] || 10;
    totalWeight += weight;
    return { type, weight };
  });
  
  // Random weighted selection
  let random = Math.random() * totalWeight;
  for (const { type, weight } of typeWeights) {
    random -= weight;
    if (random <= 0) {
      return type;
    }
  }
  
  // Fallback to first type if weights don't add up properly
  return compatibleTypes[0];
}

// Export functions for use in application
export {
  MARKETING_SEASONS,
  CONTENT_TYPES,
  PLATFORM_STRATEGIES,
  getCurrentMarketingSeason,
  getSeasonThemes,
  generateContentCalendar
};
