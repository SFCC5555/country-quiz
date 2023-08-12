import { useState, useEffect } from 'react'
import { fetchData } from '../utils/fetchData'
import { generateOptions } from '../utils/generateOptions'
import quizImage from '../assets/images/undraw_adventure_4hum 1.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateScore } from '../redux/scoreSlice'
import { useSelector } from 'react-redux'
import { fetchGlobalHighscore } from '../utils/fetchGlobalHighscore'

const Quiz = () => {

  // Get the navigation function
  const navigate = useNavigate();
  
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Extract the 'score' object from the Redux store state using 'useSelector' hook
  const score = useSelector(state=>state.score);
  
  // State to store the data obtained from the API response
  const [data, setData] = useState('');

  // State to store the options generated for the quiz between the 250 countries in the data (data.length)
  const [options, setOptions] = useState(generateOptions(250));

  // State to store the type of question (0 or 1)
  const [question, setQuestion] = useState(Math.floor(Math.random() * 2));

  // State to store the index of the correct option for the current question between the four options
  const [correctOption, setCorrectOption] = useState(Math.floor(Math.random() * 4));

  // State to store the index of a wrong answer
  const [wrongAnswer, setWrongAnswer] = useState(null);

  // List of the available properties for the quiz questions
  const propertyList = ['capital','population','flag'];

  // State to store the current property being used for the questions
  const [property, setProperty] = useState(propertyList[Math.floor(Math.random() * propertyList.length)]);

  // State to indicate if the user has answered the current question
  const [answered, setAnswered] = useState(false);

  // State to indicate if the user has answered correctly and won the current question
  const [win, setWin] = useState(false);

  // Array of letters for displaying options (A, B, C, D)
  const letters = ['A', 'B', 'C', 'D'];

  // Fetch data and the Global Highscore from the respective APIs once when the component mounts and set the score to zero
  useEffect(() => {
    fetchData(setData);
    fetchGlobalHighscore(dispatch,score);
  }, []);

  const answer = (e) => {
    // Check if the question has not been answered yet
    if (!answered) {
      // Mark the question as answered to prevent multiple answers
      setAnswered(true);
  
      // Check if the clicked option matches the correctOption
      if (e.target.id == correctOption) {
        // Set 'win' state to true to indicate the answer is correct
        setWin(true);
  
        // Dispatch an action to update the currentScore in the Redux store
        dispatch(
          updateScore({
            ...score,
            currentScore: { value: score.currentScore.value + 1 },
          })
        );
      } else {
        // Set 'wrongAnswer' state to the ID of the clicked option to highlight the incorrect answer
        setWrongAnswer(e.target.id);
      }
    }
  };

  const next = () => {
    // Check if the user has won (answered correctly)
    if (win) {
      // Generate new options for the next question
      setOptions(generateOptions(data.length));
  
      // Randomly select the type of the next question (0 or 1)
      setQuestion(Math.floor(Math.random() * 2));
  
      // Randomly select the index of the correct option among the answer options
      setCorrectOption(Math.floor(Math.random() * 4));
  
      // Randomly select a property from the 'propertyList' for the next question
      setProperty(propertyList[Math.floor(Math.random() * propertyList.length)]);
  
      // Reset the 'answered' and 'win' states for the next question
      setAnswered(false);
      setWin(false);
    } else {
      // If the user hasn't won, navigate to the '/results' page
      navigate('/results');
    }
  };

  return (
    <div className="w-full sm:w-96 flex flex-col gap-3">
      <h1 className="light-text font-bold text-3xl">COUNTRY QUIZ</h1>
      {/* Quiz Questions Section */}
      <section className="relative flex flex-col gap-3 min-height w-full bg-white rounded-3xl pt-16 pb-20 px-8">
        <img className="absolute top-0 right-0 -translate-y-2/3" src={quizImage} alt="Country Quiz Image" />
        {/* Check if data is available before rendering questions */}
        {data && (
          <>
            {/* Render flag-related questions */}
            {property === 'flag' ? (
              <>
                {/* Render flag image if question is 0 type and the questions corresponding to the type (0 or 1) */}
                {question === 0 && <img src={data[options[correctOption]].flag} alt={`Flag of a country`} className="w-28" />}
                <h2 className="dark-text font-bold text-2xl">
                  {question === 0
                    ? 'Which country does this flag belong to?'
                    : `The flag of ${data[options[correctOption]].name} is`}
                </h2>

                {/* Render answer options corresponding to the type (0 or 1) */}
                <section className="flex flex-col gap-4">
                  {options.map((o, i) =>
                      <button key={o} id={i} onClick={answer} className={`w-full relative ${answered?`${correctOption===i?'correct-bg correct-border':wrongAnswer==i?'wrong-bg wrong-border':'main-border'} cursor-default`:'hover-border hover:text-white'} flex gap-8 p-2 rounded-lg`}>
                        <div id={i} >{letters[i]}</div>
                        {question === 0?
                        <div id={i} className='text-left mr-5' >{data[o].name}</div>:
                        <img id={i}  src={data[o].flag} alt={`Flag of a country`} className="w-12" />}
                        {answered&&<i className={`absolute right-2 text-lg ${correctOption==i?'bi bi-check-circle':wrongAnswer==i&&'bi bi-x-circle'}`} />}
                      </button>  
                  )}
                </section>
              </>
            ) : (
              // Render other property-related questions
              <>
                <h2 className="dark-text font-bold text-2xl">
                  {question === 0
                    ? `${property === 'population' ? (data[options[correctOption]][property] / 1000000).toFixed(3) + ' million inhabitants' : data[options[correctOption]][property]} is the ${property} of`
                    : `The ${property} of ${data[options[correctOption]].name} is`}
                </h2>

                {/* Render answer options corresponding to the type (0 or 1) with special features if property is population */}
                <section className="flex flex-col gap-4">
                  {options.map((o, i) => (
                    <button id={i} onClick={answer} key={o} className={`w-full relative ${answered?`${correctOption===i?'correct-bg correct-border':wrongAnswer==i?'wrong-bg wrong-border':'main-border'} cursor-default`:'hover-border hover:text-white'} flex gap-8 p-2 rounded-lg`}>
                      <div id={i} >{letters[i]}</div>
                      <div id={i} className='text-left mr-5' >
                        {question === 0
                          ? data[o].name
                          : property === 'population'
                          ? (data[o][property] / 1000000).toFixed(3) + ' million inhabitants'
                          : data[o][property]}
                      </div>
                      {answered&&<i className={`absolute right-2 text-lg ${correctOption==i?'bi bi-check-circle':wrongAnswer==i&&'bi bi-x-circle'}`} />}
                    </button>
                  ))}
                </section>
              </>
            )}
          </>
        )}

        {/* Render "Next" button if the question is answered */}
        {answered && <button onClick={next} className="absolute bottom-5 right-8 py-2 px-3 rounded-md font-bold text-white hover:opacity-80" style={{ backgroundColor: 'var(--hover-color)' }}>Next</button>}
      </section>
    </div>
  );
};

export { Quiz };