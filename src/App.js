
import { useSelector } from 'react-redux';

// styles
import '@/App.css';

// components
import Home from '@/pages/Home/Home';
import Scoreboard from '@/pages/Scoreboard/Scoreboard';

const App = () => {
  const page = useSelector((state) => state.pageRouter.value);

  return (
    <div className="app">
      {
        page === 'home' &&
        <Home />
      }
      {
        page === 'scoreboard' &&
        <Scoreboard />
      }
    </div>
  );
}

export default App;
