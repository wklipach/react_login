import '../login/Login.css';
import React from 'react';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: "", password: "", btken: false, result_login: "", errors: {name: 'ввода не было'}, errors_pwd: {name: 'ввода не было'}};

      this.onFocusName = this.onFocusName.bind(this);
      this.onFocusPassword = this.onFocusPassword.bind(this);
      this.onBlurName = this.onBlurName.bind(this);
      this.onBlurPassword = this.onBlurPassword.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onChangePwd = this.onChangePwd.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    setColorNameValidation(color) {
            let elem = document.getElementById('name');
            if (elem) {

                if (!elem.classList.contains('app_background')) {
                    elem.classList.add('app_background');
                    console.log('добавили app_background');
                }

                //elem.style.cssText = ".app_background2 { background-color: rgba(87, 85, 85, 0.7); }";
                //elem.style.cssText = 'border-bottom: 2px solid '+ color;
               // elem.style.cssText = 'background-color: rgba(87, 85, 85, 0.7';
            }
    }

    setColorPasswordValidation(color) {
            let elem = document.getElementById('password');
            if (elem) {
                elem.style.cssText = 'border-bottom: 2px solid '+ color;
            }
    }

    handleValidation(){

        let fields = this.state;
        let errors = {};
        this.setState({errors: errors});

        //Name
        if(!fields["name"]){
            errors["name"] = "Введите телефон или почтовый адрес";
            this.setColorNameValidation('#F2512D');
            return false;
        }

        const sMailOrPhone = fields["name"].toString().trim();

        // теперь с убранными пробелами
        if (sMailOrPhone.length === 0) {
            errors["name"] = "Введите телефон или почтовый адрес";
            this.setState({errors: errors});
            this.setColorNameValidation('#F2512D');
            return false;
        }

        // не телефон и не почта
        if(fields["name"].match(/^[a-zA-Z]+$/)) {
            errors["name"] = "Введены только буквы";
            this.setState({errors: errors});
            console.log('Введены только буквы');
            this.setColorNameValidation('#F2512D');
            return false;
        }

        //есть почта
        const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(sMailOrPhone)) {
            console.log('Это почта');
            this.setColorNameValidation('#57B535');
            return true;
        }

        console.log('Это не почта');

        // условность - если нет букв считаем что это телефон
        if (!(/[a-zа-яё]/i.test(sMailOrPhone))){
            console.log('Это телефон');
            this.setColorNameValidation('#57B535');
            return true;
        }

        console.log('Почта или телефон непонятны');
        errors["name"] = 'Почта или телефон непонятны';
        this.setState({errors: errors});
        return false;
    }

    onChange(e) {
      const val = e.target.value;
      this.setState({name: val});
   }

    onBlurName(e) {
        this.handleValidation();
    }

    onBlurPassword(e) {
        let fields = this.state;
        let errors_pwd = {};
        this.setState({errors_pwd: errors_pwd});

        if (!fields["password"]) {
            errors_pwd["password"] = "Введите пароль";
            this.setState({errors_pwd: errors_pwd});
            this.setColorPasswordValidation('#F2512D');
            return false;
        }

        if (fields["password"].length < 3 ) {
            errors_pwd["password"] = "Введите пароль более двух символов";
            this.setState({errors_pwd: errors_pwd});
            this.setColorPasswordValidation('#F2512D');
            return false;
        }

        // если все хорошо
        this.setColorPasswordValidation('#57B535');
        return true;
    }

    onFocusName(e) {
        this.setColorNameValidation('#E1D3C1');
    }

    onFocusPassword(e) {
        this.setColorPasswordValidation('#E1D3C1');
    }



    onChangePwd(e) {
    const val = e.target.value;
    this.setState({password: val});
 }

    handleSubmit(e){
        e.preventDefault()

        if (Object.keys(this.state.errors).length !== 0) {
            console.log('красим красную полоску в телефоне!');
            this.setColorNameValidation('#F2512D');
            return;
        }

        if (Object.keys(this.state.errors_pwd).length !== 0) {
            console.log('красим красную полоску в пароле!');
            this.setColorPasswordValidation('#F2512D');
            return;
        }




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

                            <input type="text" id="name" value={this.state.name} onFocus={this.onFocusName}
                                                                                 onBlur={this.onBlurName}
                                                                                 onChange={this.onChange}
                                    placeholder={'Email или телефон'} className={'login__form__input'}/>

                            <input type="text" id="password" value={this.state.password}
                                                                                  onFocus={this.onFocusPassword}
                                                                                  onBlur = {this.onBlurPassword}
                                                                                  onChange={this.onChangePwd}
                                   placeholder={'Пароль'} className={'login__form__input'}/>

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
                                <p>Ответ от API:</p>
                                <p>{this.state.result_login}</p>
                                <button click="back()">Назад</button>
                        </form>
                   );
                }

            }

  }


  export default Login;
  