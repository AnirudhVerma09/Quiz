import Quiz from './components/Quiz'
import StartScreen from './components/StartScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import Results from './components/Results';


const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path='/Result' element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
