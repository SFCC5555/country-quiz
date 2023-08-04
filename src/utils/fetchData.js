// Function to fetch data from the given API and update the state with the fetched data
export const fetchData = async (setState) => {
  try {
    // Make an HTTP GET request to the specified URL
    const response = await fetch('https://restcountries.com/v2/all');
    // Check if the response is not successful
    if (!response.ok) {
      // If the response is not successful, throw an error with a message
      throw new Error('Network response was not ok');
    }
    // Parse the response body as JSON data
    const jsonData = await response.json();
    // Update the state with the fetched JSON data
    setState(jsonData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error('Error fetching data:', error);
  }
};