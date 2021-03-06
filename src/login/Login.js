import '../login/Login.css';
import React from 'react';
import logo from '../image/logo.png';
import logomob from '../image/logo-mobile.png';
import arrreg from '../image/arrow-down.svg';
import questionimg from '../image/question.png';



class Login extends React.Component {
    constructor(props) {
      super(props);

      // возможные состояния: 
      // name - почта, password - пароль, btken - признак полученного ответа, 
      // result_login - полученный ответ, errors - ошибки ввода почты, errors_pwd - ошибки ввода пароля
      this.state = {name: "", password: "", btken: false, result_login: "", errors: {name: 'ввода не было'}, errors_pwd: {name: 'ввода не было'}};

      // связываем все события с текущим контентом
      this.onFocusName = this.onFocusName.bind(this);
      this.onFocusPassword = this.onFocusPassword.bind(this);
      this.onBlurName = this.onBlurName.bind(this);
      this.onBlurPassword = this.onBlurPassword.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onChangePwd = this.onChangePwd.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    // одкрашивание поля "телефон+почта" - нижний бордер инпута в другой цвет  
    setColorNameValidation(color) {
            let elem = document.getElementById('name');
            if (elem) {
                elem.style.cssText = 'border-bottom: 2px solid '+ color;
            }
           return true;
     }

    // подкрашивание пароля - нижний бордер инпута в другой цвет 
    setColorPasswordValidation(color) {
            let elem = document.getElementById('password');
            if (elem) {
                elem.style.cssText = 'border-bottom: 2px solid '+ color;
            }
    }

    // валидация покидания поля телефон+почта 
    handleValidation(){

        // пишем пустой объект для ошибок
        let fields = this.state;
        let errors = {};
        this.setState({errors: errors});

        //при пустом поле красим поле в красный и выходим
        if(!fields["name"]){
            errors["name"] = "Введите телефон или почтовый адрес";
            this.setColorNameValidation('#F2512D');
            return false;
        }

        //убиваем пробелы
        const sMailOrPhone = fields["name"].toString().trim();

        // теперь с убранными пробелами, при пустом поле красим поле в красный и выходим
        if (sMailOrPhone.length === 0) {
            errors["name"] = "Введите телефон или почтовый адрес";
            this.setState({errors: errors});
            this.setColorNameValidation('#F2512D');
            return false;
        }

        // проверяем наличие только букв  - если так то это не телефон и не почта
        if(fields["name"].match(/^[a-zA-Z]+$/)) {
            errors["name"] = "Введены только буквы";
            this.setState({errors: errors});
            this.setColorNameValidation('#F2512D');
            return false;
        }

        //почтовая маска, если это почта красим в зеленый и выходим
        const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(sMailOrPhone)) {
            this.setColorNameValidation('#57B535');
            return true;
        }

        // условность - если нет букв считаем что это телефон и подкрышиваем в зеленый
        if (!(/[a-zа-яё]/i.test(sMailOrPhone))){
            this.setColorNameValidation('#57B535');
            return true;
        }

        // если не проходит проверок как почта или телефон считаем ввод неопределенным
        errors["name"] = 'Неопределенный ввод';
        this.setState({errors: errors});
        return false;
    }

    //запоминаем введенное поле
    onChange(e) {
      const val = e.target.value;
      this.setState({name: val});
      let elem = document.getElementById('lbl_name');
      // если что-то введено меняем плейсхолдер на маленький сверху
      if (elem) {
                if (val.length > 0) {
                        elem.style.cssText = "display: block";
                } else {
                        elem.style.cssText = "display: none";
                }
      }
   }

   // функция события покидания input почты_телефона
    onBlurName(e) {
        this.handleValidation();
    }

    // событие покидания элемента с паролем
    onBlurPassword(e) {
        let fields = this.state;
        let errors_pwd = {};

        // пишем пустой объект "ошибки в пароле"
        this.setState({errors_pwd: errors_pwd});

        // пароль пустой, красим в красный
        if (!fields["password"]) {
            errors_pwd["password"] = "Введите пароль";
            this.setState({errors_pwd: errors_pwd});
            this.setColorPasswordValidation('#F2512D');
            return false;
        }

        // пароль не менее 3 элементов, красим в красный
        if (fields["password"].length < 3 ) {
            errors_pwd["password"] = "Введите пароль более двух символов";
            this.setState({errors_pwd: errors_pwd});
            this.setColorPasswordValidation('#F2512D');
            return false;
        }

        // епри отсутствии ошибок красим пароль в зеленый
        this.setColorPasswordValidation('#57B535');
        return true;
    }

    // при фокусе нейтральное серое подкрашивание в нижней полоске input Name
    onFocusName(e) {
        this.setColorNameValidation('#E1D3C1');
    }

    // при фокусе нейтральное серое подкрашивание в нижней полоске input password
    onFocusPassword(e) {
        this.setColorPasswordValidation('#E1D3C1');
    }


    onChangePwd(e) {
    const val = e.target.value;
    this.setState({password: val});
     // если что-то введено меняем плейсхолдер на маленький сверху
     let elem = document.getElementById('lbl_pwd');
     if (elem) {
           if (val.length > 0) {
                   elem.style.cssText = "display: block";
           } else {
                   elem.style.cssText = "display: none";
           }
      }
    }

    handleSubmit(e){
        e.preventDefault()

        // если есть объект с ошибкой подкрашиваем красным имя
        if (Object.keys(this.state.errors).length !== 0) {
            this.setColorNameValidation('#F2512D');
            return;
        }

        // если есть объект с ошибкой подкрашиваем красным пароль
        if (Object.keys(this.state.errors_pwd).length !== 0) {
            this.setColorPasswordValidation('#F2512D');
            return;
        }

        // создаем объект форм-даты для отсылки 
        const data = new FormData();
        data.append('phone_or_mail', this.state.name);
        data.append('password', this.state.password);
        data.append('device', '' );
        
        // тестовое - проверка отылаемых объектов (внимание- без перебора не показывает содержимое)
        // for (const [k,v] of data) {console.log(k,v)}
        
        // отсылаем запрос на аутентиыикацию, при получении ответа 
        //при получении устанавливаем флагbtken + пишем ответ в result_login
        fetch('https://api.iq.academy/api/account/login', {
            method: "POST",
            body: data
         }).then(res => res.json())
         .then(
             (response) => {
                    this.setState({result_login: JSON.stringify(response)});
                    this.setState({btken : !this.state.btken});
             }
         ).catch(error => console.error('Error:', error));
    }    


    // возврат назад - меняем флаг и подгружаем первую страницу
    back() {
        this.setState({btken : !this.state.btken});
    }

    
    // в рендере 2 страницы - первая логин, вторая с ответом. Выбираются через флаг btken (false, true) 
    render() {

              // если не установлен флаг ответа, предлагаем аутентификацию
               if (!this.state.btken) {
                    return (
                        <div>


                           <div className={'bg'}> </div>

                           <img className={'logotype'} src= {logo} alt=''/>


                            <div className={'logotype-mobile'} >
                                <img src= {logomob} width="112" height="88" alt=''/>
                            </div>

                        <form onSubmit={this.handleSubmit} className={'login__form'}>
                            <span className={'login__form__title'}>Вход</span>

                            <input type="text" id="name" value={this.state.name}
                                                                                 onFocus={this.onFocusName}
                                                                                 onBlur={this.onBlurName}
                                                                                 onChange={this.onChange}
                                    placeholder={'Email или телефон'} className={'login__form__input'}/>
                            <label id="lbl_name" className={'login__label__email'}>Email или телефон</label>

                            <input type="text" id="password" value={this.state.password}
                                                                                  onFocus={this.onFocusPassword}
                                                                                  onBlur = {this.onBlurPassword}
                                                                                  onChange={this.onChangePwd}
                                   placeholder={'Пароль'} className={'login__form__input'}/>
                            <label id="lbl_pwd" className={'login__label__pass'}>Пароль</label>

                            <img className={'question-img'} src= {questionimg} width="25" height="25" alt=''/>

                            <input type="submit" value="Войти" className={'login__submit__button'}/>


                        </form>

                            <div className={'login__questions'}>
                                <div className={'login__no-login'}>Нет аккаунта?</div>
                                <div className={'login__register'}>Регистрация</div>
                                <div className={'arr-reg'} >
                                    <img src= {arrreg} alt=''/>
                                </div>

                            </div>


               </div>

                    );
                }

                // если установлен флаг ответа, пишем на пустую страницу ответ 
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
  