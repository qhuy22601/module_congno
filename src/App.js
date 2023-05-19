import logo from './logo.svg';
import './App.css';
import AppContainer from './AppContainer';
import Header from './component/Header';
function App() {
  return (
    <div style={{ display: "flex", flexDirection:"column" }}>
      <div>
        <Header />
      </div>
      <div style={{marginTop:70}}>
        <AppContainer />
      </div>
    </div>
  );
}

export default App;
