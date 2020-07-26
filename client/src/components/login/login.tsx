import React, { Component, ChangeEvent } from "react";
import "./login.css"
import { UserLoginDetails } from "../../models/UserLoginDetails";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import socketIOClient from "socket.io-client";
import { Button , Modal} from 'react-bootstrap';
import { ChangePassword } from "../../models/ChangePassword";
import { setAxiosHeaders } from "../../Authorization/axiosService"

const ENDPOINT = "http://localhost:3001";

interface LoginState {
    userName: string,
    password: string,
    confirmPassword: string,
    isUserNameValid:boolean,
    isPasswordValid: boolean,
    isPasswordConfirm:boolean,
  show:boolean,
    errMassage:{
        userName:string,
        password:string,
        confirmPassword:string,
    },
    isFormValid:boolean
}


export default class Login extends Component<any, LoginState>{

 

    constructor(props: any) {
        super(props)
        this.state = {
            userName: "",
            password: "",
            confirmPassword:"",
            isUserNameValid: false,
            isPasswordValid:false,
            isPasswordConfirm:false,
            show: false,
            errMassage:{
                userName:"",
                password: "",
                confirmPassword:""
        
            },
            isFormValid: false,
   
        };

    }





    private login = async () => {
        try {
            let userLoginDetails = new UserLoginDetails(this.state.userName, this.state.password);
            console.log(userLoginDetails)
            const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
            const serverResponse = response.data;
            const socket = socketIOClient(ENDPOINT);
            sessionStorage.setItem("token", serverResponse.token + "")
            store.dispatch({ type: ActionType.onLogIn, payload: true });
            store.dispatch({ type: ActionType.Settoken, payload: "Bearar "  +  serverResponse.token });
            setAxiosHeaders()
            
            if (serverResponse.userType === "ADMIN") {
                this.props.history.push('/admin')
            }
            else if (serverResponse.userType === "CUSTOMER") {
                this.props.history.push('/vacations')
       
            }
        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }


    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const userName = args.target.value;
        this.setState({ userName },  this.validUserName);
    }

    public validUserName=()=>{
        let isUserNameValid=true
        let errMassage = {...this.state.errMassage}
        if(this.state.userName===""){
            isUserNameValid=false;
            errMassage.userName="user name is required";
        }
    
        this.setState({isUserNameValid , errMassage},this.validForm)
    }



    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password }, this.validPassword)}

        public validPassword=()=>{
            let validRegPass= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})")
            let isPasswordValid=true
            let errMassage = {...this.state.errMassage}
            if(this.state.password===""){
                isPasswordValid=false;
                errMassage.password="password is required";
            }
            else if(!validRegPass.test(this.state.password)){
                isPasswordValid=false;
                errMassage.password="password not valid";
            }
            this.setState({isPasswordValid , errMassage},this.validForm)
        }

    
    private setConfirmPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = args.target.value;

        this.setState({ confirmPassword },this.validConfirmPassword);
    }

    public validConfirmPassword=()=>{
        let isPasswordConfirm=true
        let errMassage = {...this.state.errMassage}
        if( this.state.confirmPassword!== this.state.password){
            isPasswordConfirm=false;
            errMassage.confirmPassword="password not confirm";
        }
        this.setState({isPasswordConfirm , errMassage},this.validForm)
    }


    public validForm=()=>{
        const {isUserNameValid, isPasswordValid} = this.state;

        this.setState({isFormValid: isUserNameValid && isPasswordValid  })

    }
    
    public changePassword= async()=>{
        let newPasswordDetails= new ChangePassword(this.state.userName, this.state.password)

        this.setState({ show: false});
        await axios.put<void>("http://localhost:3001/users/updatePassword", newPasswordDetails);
        
    }


    public lounchModal() {
        
        const handleClose = () => this.setState({ show: false});
        const handleShow = () => this.setState({ show: true});
      
        return (
          <>
          <span id="passSpan" onClick={handleShow}>forget password</span>
           
      
            <Modal show={this.state.show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form >
                    <input type="text" required  name="username" placeholder="user name"  onChange={this.setUserName}/><br />
                      <span hidden={this.state.isUserNameValid===true}>{this.state.errMassage.userName}</span><br />
                    <input type="password" required placeholder="password" name="password" onChange={this.setPassword}/><br />
                    <span hidden={this.state.isPasswordValid===true}>{this.state.errMassage.password}</span><br />
                    <input  type="password" required placeholder="confirm password" name="confirmPassword" onChange={this.setConfirmPassword} /><br />
                    <span hidden={this.state.isPasswordConfirm===true}>{this.state.errMassage.confirmPassword}</span><br /> 
        
                    
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button  onClick={handleClose}>
                  Close
                </Button>
                <Button  onClick={()=>this.changePassword()}>
                  Save Password
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }


    public render() {
        return (
            <section className={this.state.show? "login blur": "login"}>
                <div id="main">
                    <h1>Sign In</h1>
                    <div id="loginForm">
                   
                        <input type="text" placeholder="User name" name="username" onChange={this.setUserName} /><br />
                        <span hidden={this.state.isUserNameValid===true}>{this.state.errMassage.userName}</span><br />
                      <input type="password" placeholder="Password" name="password" onChange={this.setPassword} /><br />
                      <span hidden={this.state.isPasswordValid===true}>{this.state.errMassage.password}</span><br />
                        <input id="button" disabled={!this.state.isFormValid} type="button" value="login" onClick={this.login} />
                        {this.lounchModal()}
                    </div>
                    <div>
                 
                         <p>If you are not register yet, please <NavLink to="/register" exact>sign up</NavLink> </p>
                    </div>

                </div>
                <div id="aside">
                </div>

            </section>

        )
    }
}