import { updateScore } from '../redux/scoreSlice'

// Function to fetch global highscore from the server
export const fetchGlobalHighscore = async (dispatch, score) => {
    try {
        // Sending a request to the specified URL
        const response = await fetch('http://localhost:3000/api/v1/country-quiz-highscore');

        // Checking if the response is not successful (status not OK)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parsing the response data as JSON
        const { highscore } = await response.json();

        // Extracting the 'value' and 'name' properties from the highscore object
        const { value, name } = highscore;

        // Dispatching the updateScore action with the new global highscore data
        dispatch(updateScore({ ...score, currentScore:{value:0}, globalHighscore: { value, name } }));
    } catch (error) {
        // Handling errors by logging them to the console
        console.error('Error fetching data:', error);
    }
};