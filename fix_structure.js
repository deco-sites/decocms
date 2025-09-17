// Script to fix the ProjectGrid structure - flatten the projects array
const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('.deco/blocks/pages-My%2520New%2520Page-529958.json', 'utf8'));

// Read the extracted cards
const extractedCards = JSON.parse(fs.readFileSync('extracted_cards.json', 'utf8'));

// Find the ProjectGrid section and update it properly
for (const section of data.sections) {
  if (section.__resolveType === 'website/sections/Rendering/Lazy.tsx' && 
      section.section?.__resolveType === 'site/sections/ProjectGrid.tsx') {
    
    // Ensure we have the correct structure - projects should be a flat array of cards
    section.section.projects = extractedCards;
    
    // Remove categories if it still exists
    delete section.section.categories;
    
    // Clean up any category-specific layout settings that might not be needed
    if (section.section.layoutCategoryCard && Object.keys(section.section.layoutCategoryCard).length === 0) {
      delete section.section.layoutCategoryCard;
    }
    
    console.log('Fixed ProjectGrid structure with', extractedCards.length, 'direct project cards');
    break;
  }
}

// Write the updated JSON back to file
fs.writeFileSync('.deco/blocks/pages-My%2520New%2520Page-529958.json', JSON.stringify(data, null, 2));

console.log('Structure fixed successfully!');
