import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/homepages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.util';

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
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubcribeFromAuth = null;

  componentDidMount(){
    this.unsubcribeFromAuth = auth.onAuthStateChanged( user => {
      this.setState({ currentUser: user });

      console.log('onAuthStateChanged: ',user );
    })
  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
    console.log('componentWillUnmount')
  }  
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route  path="/signin" component={SingInAndSignUpPage} />
          {/* <Route path="/hats/:id" component={HatsPageDetail} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
