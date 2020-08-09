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
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '4545e3c366884d11843d9652ecc89ece',
});

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'sign_in',
      isSignedIn: false,
    }
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
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {this.displayFacebox(this.calculateFaceLocation(response))})
    .catch(err => {console.log(err)});
  }

  onRouteChange = (route) => {
    if(route === "sign_out") {
      this.setState({isSignedIn: false})
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { imageURL, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        <Particles className='particles' params={options} />
        { this.state.route === 'home' ? 
          <div>
            <Logo /> 
            <Rank />
            <PageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <ImageRecognition box={box} imageURL={imageURL}/>
          </div> : route === 'sign_in' ?
          <SignIn onRouteChange={this.onRouteChange}/> :
          <Register onRouteChange={this.onRouteChange}/>}
      </div>
    );
  }
  
}

export default App;
