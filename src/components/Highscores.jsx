import { useSelector } from "react-redux";

const Highscores = () => {
  // Extract the 'score' object from the Redux store state using 'useSelector' hook
  const score = useSelector(state => state.score);

  return (
    // Section to display highscores and current score
    <section className="absolute top-5 right-5 text-xs light-text">
      {/* Display Global Highscore */}
      <div>
        Global Highscore: {score.globalHighscore.value} {score.globalHighscore.name && '-'}{' '}
        {score.globalHighscore.name} 
        {/* Icon to represent global highscore */}
        <i className="bi bi-globe text-lg pl-3" />
      </div>

      {/* Display Local Highscore */}
      <div>
        Local Highscore: {score.localHighscore.value} {score.localHighscore.name && '-'}{' '}
        {score.localHighscore.name}
      </div>

      {/* Display Current Score */}
      <div>Score: {score.currentScore.value}</div>
    </section>
  );
};

export { Highscores };






