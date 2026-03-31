export const getFoods = async () => {
  try {
    const savedFoods = localStorage.getItem("foods");
    if (savedFoods) {
      // Simulating network latency
      await new Promise(resolve => setTimeout(resolve, 600));
      return JSON.parse(savedFoods);
    }

    // Fallback to JSON if no localStorage data exists
    const response = await import('../data/foods.json');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const data = response.default || response;
    localStorage.setItem("foods", JSON.stringify(data));
    return data;
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
