export const getFoods = async () => {
  try {
    // Dynamic import to fetch the local JSON data, mimicking an asynchronous API call
    const response = await import('../data/foods.json');
    
    // Simulating network latency (e.g., 600ms)
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return response.default || response;
  } catch (error) {
    console.error("Failed to fetch foods:", error);
    throw new Error("Could not load foods data.");
  }
};

export const getOffers = async () => {
  try {
    // Dynamic import to fetch the local JSON data
    const response = await import('../data/offers.json');
    
    // Simulating network latency
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return response.default || response;
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    throw new Error("Could not load offers data.");
  }
};
