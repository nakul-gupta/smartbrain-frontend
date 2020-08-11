import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import PageLinkForm from './components/PageLinkForm/PageLinkForm';
import Rank from './components/Rank/Rank';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import './components/Logo/Logo.css';
import './components/ImageRecognition/ImageRecognition.css'
import Particles from 'react-particles-js';


const options = {
   particles: {
     number: {
       value: 60,
       density: {
         enable: true,
         value_area: 800,
       }
     }
   }
};

const initialState =  {
  input: '',
  imageURL: '',
  box: {},
  route: 'sign_in',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      }
    });
  }

  calculateFaceLocation = (data) => {
    const box_info = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("img");
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      left_col: box_info.left_col * width,
      top_row: box_info.top_row * height,
      right_col: width - (box_info.right_col * width),
      bottom_row: height - (box_info.bottom_row * height),
    };
  }
  

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  displayFacebox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('http://localhost:3001/imageurl/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('http://localhost:3001/image/', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json()).then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}));
        }).catch(console.log);
      }
      this.displayFacebox(this.calculateFaceLocation(response))
    })
    .catch(err => {console.log(err)});
  }

  onRouteChange = (route) => {
    if(route === "sign_out") {
      this.setState(initialState);
    }
    else if (route === 'home') {
      this.setState({ 
        isSignedIn: true,
        imageURL: '',
        box: {}
      })
    }
    this.setState({route: route});
  }

  render() {
    const { imageURL, box, route, isSignedIn, user } = this.state;
    const { name, entries } = user;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        <Particles className='particles' params={options} />
        { this.state.route === 'home' ? 
          <div>
            <Logo /> 
            <Rank name={name} entries={entries}/>
            <PageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <ImageRecognition box={box} imageURL={imageURL}/>
          </div> : route === 'sign_in' ?
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> :
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>}
      </div>
    );
  }
  
}

export default App;
