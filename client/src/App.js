import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoopingList from './components/ShoppingList';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <ShoopingList />
    </div>
  );
}

export default App;
