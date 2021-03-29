import '../login/Login.css';
import React from 'react';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: "", password: "", btken: false, result_login: ""};
 
      this.onChange = this.onChange.bind(this);
      this.onChangePwd = this.onChangePwd.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    onChange(e) {
      const val = e.target.value;
      this.setState({name: val});
   }

   onChangePwd(e) {
    const val = e.target.value;
    this.setState({password: val});
 }

    handleSubmit(e){
        e.preventDefault()
       // const input = {phone_or_mail: this.state.name, password: this.state.password, device: ""};
        //alert('A form was submitted: ' + JSON.stringify(input));

        const data = new FormData();
        data.append('phone_or_mail', this.state.name);
        data.append('password', this.state.password);
        data.append('device', '' );
        for (const [k,v] of data) {console.log(k,v)}

        fetch('https://api.iq.academy/api/account/login', {
            method: "POST",
            body: data
         }).then(res => res.json())
         .then(
             (response) => {
                    this.setState({result_login: JSON.stringify(response)});
                    this.setState({btken : !this.state.btken});
                    console.log(this.state.result_login);
                    // <Route path="/account" component={Account} />

             }
         ).catch(error => console.error('Error:', error));
    }    


    back() {
        this.setState({btken : !this.state.btken});
    }
   
    render() {

        if (!this.state.btken) {
            return (
                <form onSubmit={this.handleSubmit} className={'login__form'}>
                    <span className={'login__form__title'}>Вход</span>


                    <input type="text" value={this.state.name} onChange={this.onChange} placeholder={'Email или телефон'} className={'login__form__input'}/>


                    <input type="text" value={this.state.password} onChange={this.onChangePwd} placeholder={'Пароль'} className={'login__form__input'}/>


                    <input type="submit" value="Отправить" className={'login__submit__button'}/>

                    <div className={'login__questions'}>
                        <span className={'login__no-login'}>Нет аккаунта?</span>
                        <span className={'login__register'}>Регистрация</span>
                    </div>

                </form>


            );
        }

        if (this.state.btken) {
            return (
                <form>
                        <p>Результат:</p>
                        <p>{this.state.result_login}</p>
                        <button click="back()">Назад</button>
                </form>                
           );
        }

    }
  }


  export default Login;
  