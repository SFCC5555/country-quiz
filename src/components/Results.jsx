import { useState } from 'react';
import resultsImage from '../assets/images/undraw_winners_ao2o 2.svg'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateScore } from '../redux/scoreSlice';
import { updateGlobalHighscore } from '../utils/updateGlobalHighscore';

const Results = () => {
  // Get the 'dispatch' function from the Redux store
  const dispatch = useDispatch();

  // Get the 'score' object from the Redux store state using 'useSelector' hook
  const score = useSelector(state => state.score);

  // State variables for new record name form
  const [newRecord, setNewRecord] = useState(score.currentScore.value > score.localHighscore.value);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  // Handler for input change in the new record name form
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError(false);
  }

  // Function to update the highscores value and name when a new record is set
  const newRecordName = () => {
    // Check if the input value is not empty
    if (inputValue.length > 0) {
      // Check if the current score is greater than the global highscore
      if (score.currentScore.value > score.globalHighscore.value) {
        // If the current score is higher, update both local and global highscores with the new name
        dispatch(
          updateScore({
            ...score,
            localHighscore: { value: score.currentScore.value, name: inputValue },
            globalHighscore: { value: score.currentScore.value, name: inputValue },
          })
        );

        updateGlobalHighscore({value: score.currentScore.value, name: inputValue})

      } else {
        // If the current score is not higher than the global highscore, update only the local highscore with the new name
        dispatch(
          updateScore({
            ...score,
            localHighscore: { value: score.currentScore.value, name: inputValue },
          })
        );
      }

      // Save the new local highscore to the localStorage as a JSON string
      localStorage.setItem(
        'localHighscore',
        JSON.stringify({ value: score.currentScore.value, name: inputValue })
      );

      // Hide the new record input form
      setNewRecord(false);
    } else {
      // Show an error message if the input value is empty
      setError(true);
    }
  };

  return (
    // Main container for the Results component
    <div className="w-full sm:w-96 flex flex-col gap-3">
      <h1 className="light-text font-bold text-3xl">COUNTRY QUIZ</h1>
      {/* Results Section */}
      <section className="relative flex flex-col items-center gap-3 min-height w-full bg-white dark-text rounded-3xl pt-8 pb-20 px-8">
        {/* Image for results section */}
        <img className="w-2/3 mb-4" src={resultsImage} alt="Country Quiz Image" />
        <h2 className='text-4xl font-bold'>Results</h2>
        {/* Display the user's score */}
        <p className='font-medium' >You got <span className={`font-bold text-2xl ${score.currentScore.value === 0 ? 'wrong' : 'correct'}-text`}>{score.currentScore.value}</span>{` correct answer${score.currentScore.value !== 1 ? 's' : ''}`}</p>

        {/* Conditional rendering based on new record */}
        {newRecord ?
          // If it's a new record, show the new record name form
          <section className='flex flex-col gap-2'>
            <h3 className={`font-semibold ${score.currentScore.value > score.globalHighscore.value ? 'hover' : 'main'}-text`} >
              {score.currentScore.value > score.globalHighscore.value ? 'Global' : 'Local'} Record!
            </h3>
            <div className='flex itemsd-center gap-2'>
              {/* Input for new record name */}
              <input
                type='text'
                value={inputValue}
                onChange={handleChange}
                maxLength="20"
                className={`main-border rounded-md px-2 text-sm ${error && 'placeholder-red-500 wrong-border'}`}
                placeholder='Enter your name'
              />
              {/* Button to submit new record name */}
              <button
                onClick={newRecordName}
                className='font-bold main-border rounded-md text-sm p-1 opacity-80 hover:opacity-100'
              >OK</button>
            </div>
          </section> :
          // If it's not a new record, show the 'Try Again' button (link)
          <Link
            to={'/'}
            className='absolute bottom-5 border-2 rounded-lg px-10 py-3 font-bold opacity-80 hover:opacity-100'
            style={{ borderColor: 'var(--dark-text-color)' }}
          >Try Again</Link>
        }
      </section>
    </div>
  );
};

export { Results };