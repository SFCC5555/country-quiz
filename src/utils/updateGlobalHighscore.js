export const updateGlobalHighscore = async (patchData) => {

    // Configuration for the PATCH request
    const requestOptions = {
        method: 'PATCH', // HTTP method
        headers: {
            'Content-Type': 'application/json' // Content type of the request body
        },
        body: JSON.stringify(patchData) // Convert the object to JSON and use it as the request body
    };

    try {
        const response = await fetch('https://country-quiz-si4d.onrender.com/api/v1/country-quiz-highscore', requestOptions); // Perform the PATCH request using fetch

        if (!response.ok) {
            throw new Error('Network response was not successful');
        }

        const data = await response.json(); // Parse the response as JSON
        console.log('Successful response:', data); // Handle successful response
    } catch (error) {
        console.error('Error in the request:', error); // Handle errors
    }
}