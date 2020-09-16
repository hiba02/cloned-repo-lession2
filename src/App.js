import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/homepages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import './App.css';

const HatsPage = (props) => {
  // console.log(props);
  return <div>
    <h1>Hats Page</h1>
    <button onClick={() => props.history.push('/')}>homepage</button>  
  </div>
}

// const HatsPageDetail = (props) => {
//   // console.log(props);
//   return (
//     <div>
//       <Link to='/hats'>Go to Hats</Link>
//       <button onClick={()=> props.history.push('/hats')}>Go to Hats</button>
//       <Link to={`${props.match.url}/11`}>to hat 11</Link>
//       <h1>Hats Page Detail: {props.match.params.id}</h1>
//     </div>
//   );
// };

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          {/* <Route path="/hats/:id" component={HatsPageDetail} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
