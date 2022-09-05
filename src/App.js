import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Card from "./components/Card/Card";

function App() {
  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header/>

      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Search"/>
          </div>
        </div>
        
        <div className="d-flex flex-wrap">

          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>

        </div>
      </div>
    </div>
  );
}

export default App;
