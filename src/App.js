import logo from './logo.svg';
import './App.css';
import AppContainer from './AppContainer';
import Header from './component/Header';
import Sidebar from './component/SideBar';
function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 auto", position: "sticky", width: "178px" }}>
        <Sidebar/>
      </div>
      <div style={{ flex: "1" }}>
        <AppContainer />
      </div>
    </div>
  );
}

export default App;
