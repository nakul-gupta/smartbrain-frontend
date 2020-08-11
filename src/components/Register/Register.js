import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerEmail: '',
      registerPassword: '',
      name: ''
    }
  }

  onNameChange =(e) => {
    this.setState({name: e.target.value});
  }

  onEmailChange =(e) => {
    this.setState({registerEmail: e.target.value});
  }

  onPasswordChange =(e) => {
    this.setState({registerPassword: e.target.value});
  }

  onSubmit = (e) => {
    fetch('https://fast-retreat-10943.herokuapp.com/register',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        name: this.state.name
      })
    }).then(response => response.json()).then(user => {
      if(user) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }
  
  render() {
    return(
      <article className="br3 ba b--black-10 mv4 w-150 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick ={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="register"/>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;