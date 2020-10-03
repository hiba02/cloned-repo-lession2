import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// import {} from './redux/cart/cart.selector';

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
  // constructor(){
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubcribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;
    console.log('this.props setCurrentUser: ', setCurrentUser);
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //snapShot object 
        userRef.onSnapshot(snapShot => {
          // console.log('snapShot.data(): ',snapShot.data());
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          }, ()=>{ console.log('this.state:',this.state);  })
        });
 


        
      //  console.log('this.state:',this.state);
      } else {
        setCurrentUser(userAuth);
      }
      // createUserProfileDocument(user)
      // console.log('onAuthStateChanged:',user );
    })
  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
    console.log('componentWillUnmount')
  }  
  render() {
    return (
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route  exact path="/checkout" component={CheckoutPage} />
          {/* <Route  exact path="/signin" component={SingInAndSignUpPage} /> */}
          <Route  path="/signin" render={()=> this.props.currentUser ? (<Redirect to='/'/>):(<SingInAndSignUpPage />)} />

          {/* <Route path="/hats/:id" component={HatsPageDetail} /> */}
        </Switch>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateProps, mapDispatchToProps)(App);
