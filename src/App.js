import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card";

const sneakers = [
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, src: '/img/sneakers/NikeBlazerMidSuedeGreen.png'},
  {title: 'Мужские Кроссовки Nike Air Max 270', price: 12999, src: '/img/sneakers/NikeAirMax270.png'},
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, src: '/img/sneakers/NikeBlazerMidSuedeWhite.png'},
  {title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, src: '/img/sneakers/PumaXAkaBokuFutureRider.png'},
  {title: 'Мужские Кроссовки Under Armour Curry 8', price: 15199, src: '/img/sneakers/UnderArmourCurry8.png'},
  {title: 'Мужские Кроссовки Nike Kyrie 7', price: 11299, src: '/img/sneakers/NikeKyrie7.png'},
  {title: 'Мужские Кроссовки Jordan Air Jordan 11', price: 10799, src: '/img/sneakers/NikeAirJordan11.png'},
  {title: 'Мужские Кроссовки Nike LeBron XVIII', price: 16499, src: '/img/sneakers/NikeLebronXVIII.png'},
  {title: 'Мужские Кроссовки Nike Lebron XVIII Low', price: 13999, src: '/img/sneakers/NikeLebronXVIIILow.png'},
  {title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, src: '/img/sneakers/NikeBlazerMidSuedeGreen.png'},
  {title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, src: '/img/sneakers/PumaXAkaBokuFutureRider.png'},
  {title: 'Мужские Кроссовки Nike Kyrie Flytrap IV', price: 11299, src: '/img/sneakers/NikeKyrieFlytrapIV.png'},
]
 
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
          {
            sneakers.map(obj => (<Card title={obj.title} price={obj.price} src={obj.src}/>))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
