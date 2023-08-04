import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Quiz } from './components/Quiz'
import { Results } from './components/Results'
import { ExternalLink } from './components/ExternalLink'
import { Highscores } from './components/Highscores'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/results' element={<Results />} />
      </Routes>
      <ExternalLink />
      <Highscores />
    </BrowserRouter>
  )
}

export default App
