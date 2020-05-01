import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom'; 
import HomePage from './pages/homepage/homepgae.component';
import ShopPage from './pages/shop/shop.comp';
import Header from './components/headrer/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

class  App extends React.Component {

  
//sign in
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot=>{
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          });
        }
      
      setCurrentUser(userAuth);

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }//sign in

  render(){
  return (
    <div>
      <Header  />
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/shop' component={ShopPage}/>
      <Route exact path='/signin' render={()=> this.props.currentUser? <Redirect to='/' /> : (<SignInAndSignUpPage/>) }/>
      <Route exact path='/checkout' component={CheckoutPage} />
      </Switch>
    </div>
    
  );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})




const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
