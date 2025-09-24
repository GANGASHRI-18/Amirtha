// const natural = require('natural');
// const classifier = new natural.BayesClassifier();

// // Train the classifier with some sample data
// classifier.addDocument('road hole pothole street', 'Pothole');
// classifier.addDocument('street light out broken lamp', 'Streetlight');
// classifier.addDocument('trash garbage bin full overflowing', 'Trash');
// classifier.addDocument('graffiti vandalism paint', 'Other');
// classifier.addDocument('abandoned vehicle car', 'Other');

// classifier.train();

const suggestCategory = (description) => {
  if (!description) return 'Other';

  // In a real scenario, we would use the trained classifier:
  // return classifier.classify(description.toLowerCase());

  // For now, we'll use a simple keyword-based approach
  const desc = description.toLowerCase();
  if (desc.includes('pothole') || desc.includes('hole') || desc.includes('road')) {
    return 'Pothole';
  }
  if (desc.includes('streetlight') || desc.includes('light') || desc.includes('lamp')) {
    return 'Streetlight';
  }
  if (desc.includes('trash') || desc.includes('garbage') || desc.includes('bin')) {
    return 'Trash';
  }
  return 'Other';
};

module.exports = { suggestCategory };