import '../login/Login.css';
import React from 'react';


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: "", password: "!!!"};
 
      this.onChange = this.onChange.bind(this);
      this.onChangePwd = this.onChangePwd.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    onChange(e) {
      var val = e.target.value;
      this.setState({name: val});
   }

   onChangePwd(e) {
    var val = e.target.value;
    this.setState({password: val});
 }

    handleSubmit(e) {
      e.preventDefault();
      alert("Имя: " + this.state.name + "Пароль: "+ this.state.password);
    }
 
    render() {
      return (
          <form onSubmit={this.handleSubmit}>
              <p>
                  <label>Имя:</label><br />
                  <input type="text" value={this.state.name} onChange={this.onChange}/>
              </p>

              <p>
                  <label>Пароль:</label><br />
                  <input type="text" value={this.state.password} onChange={this.onChangePwd}/>
              </p>

              <input type="submit" value="Отправить" />
          </form>
      );
    }
  }

/*
function Login() {
    return (
        <form onSubmit={this.handleSubmit}>
        <p>
            <label>Имя:</label><br />
            <input type="text" value={this.state.name} onChange={this.onChange}/>
        </p>
        <input type="submit" value="Отправить" />
    </form>
    );
  }  
*/

  export default Login;
  