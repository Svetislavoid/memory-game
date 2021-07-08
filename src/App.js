
import { useSelector } from 'react-redux';

// styles
import '@/App.css';

// components
import Home from '@/pages/Home/Home';
import Game from '@/pages/Game/Game';
import Scoreboard from '@/pages/Scoreboard/Scoreboard';

const App = () => {
  const page = useSelector((state) => state.pageRouter.page);

  return (
    <div className="app">
      {
        page === 'home' &&
        <Home />
      }
      {
        page === 'game' &&
        <Game />
      }
      {
        page === 'scoreboard' &&
        <Scoreboard />
      }
    </div>
  );
}

export default App;
