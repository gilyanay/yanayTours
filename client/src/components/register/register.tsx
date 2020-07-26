import React, { Component, ChangeEvent } from "react";
import { RegistrationForm } from "../../models/registrationForm";
import axios from "axios";
import "./register.css"

interface RegisterState {
    userName: string,
    password: string,
    firstName:string,
    lastName:string,
    confirmPassword: string,
    isUserNameValid:boolean,
    isPasswordValid:boolean,
    isFirstNameValid:boolean,
    isLastNameValid:boolean,
    isPasswordConfirm:boolean,
    errMassage:{
        userName:string,
        password:string,
        confirmPassword:string,
        firstName:string,
        lastName:string
    },
    isFormValid:boolean
}

export default class Register extends Component <any,RegisterState>{

    constructor(props:any){
        super(props)
        this.state={
            userName: "",
            password: "",
            firstName:"",
            lastName:"",
            confirmPassword:"",
            isUserNameValid:false,
            isPasswordValid:false,
            isFirstNameValid:false,
            isLastNameValid:false,
            isPasswordConfirm:false,
            errMassage:{
                userName:"",
                password:"",
                confirmPassword:"",
                firstName:"",
                lastName:""
            },
            isFormValid:false
        }
    }


    private register= async () => {
        try{
            let registrationForm=new RegistrationForm(this.state.userName,this.state.password,this.state.firstName,this.state.lastName)
            console.log(registrationForm)
            await axios.post<any>("http://localhost:3001/users/register", registrationForm);
            alert("thank you for your registration")
            this.props.history.push('/home')
        }catch (err) {
            alert(err.message);
            console.log(err);

        }
    }

    private cancelRegistration=()=>{
        this.props.history.push('/home')
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const userName = args.target.value;
        this.setState({ userName }, this.validUserName);
    }

    public validUserName=()=>{
        let isUserNameValid=true
        let errMassage = {...this.state.errMassage}
        if(this.state.userName===""){
            isUserNameValid=false;
            errMassage.userName="user name is required";
        }
       else if(this.state.userName.length<=4){
            isUserNameValid=false;
            errMassage.userName="user name must be at least 4 characters long";
        }
        this.setState({isUserNameValid , errMassage},this.validForm)
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password },this.validPassword);
    }

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


    private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {
        const firstName = args.target.value;
        this.setState({ firstName } , this.validFirstName);
    }

    public validFirstName=()=>{
        let isFirstNameValid=true;
        let errMassage = {...this.state.errMassage}
        if(this.state.firstName===""){
            isFirstNameValid=false;
            errMassage.firstName=" first name is required"
        }
        this.setState({isFirstNameValid , errMassage}, this.validForm)
    }

    private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
        const lastName = args.target.value;
        this.setState({ lastName },this.validLastName);
    }

    public validLastName=()=>{
        let isLastNameValid=true;
        let errMassage = {...this.state.errMassage}
        if(this.state.lastName===""){
            isLastNameValid=false;
            errMassage.lastName=" last name is required"
        }

        this.setState({isLastNameValid , errMassage}, this.validForm)
    }


    public validForm=()=>{
        const {isUserNameValid, isPasswordValid, isPasswordConfirm, isFirstNameValid,isLastNameValid} = this.state;

        this.setState({isFormValid: isUserNameValid && isPasswordValid && isPasswordConfirm && isFirstNameValid && isLastNameValid })

    }
  

    public render() {
        return (
            <section className="register">
                <h1>Registration Form </h1>
                <form >
                    <input type="text" required  name="username" placeholder="user name"  onChange={this.setUserName}/><br />
                      <span hidden={this.state.isUserNameValid===true}>{this.state.errMassage.userName}</span><br />
                    <input type="password" required placeholder="password" name="password" onChange={this.setPassword}/><br />
                    <span hidden={this.state.isPasswordValid===true}>{this.state.errMassage.password}</span><br />
                    <input  type="password" required placeholder="confirm password" name="confirmPassword" onChange={this.setConfirmPassword} /><br />
                    <span hidden={this.state.isPasswordConfirm===true}>{this.state.errMassage.confirmPassword}</span><br /> 
                    <input type="text" name="firstname"  required placeholder="first name" onChange={this.setFirstName}/><br />
                    <span hidden={this.state.isFirstNameValid===true}>{this.state.errMassage.firstName}</span><br /> 
                    <input type="text" name="lasttname" required placeholder="last name" onChange={this.setLastName}/><br />
                    <span hidden={this.state.isLastNameValid===true}>{this.state.errMassage.lastName}</span><br /> 
                    <div className="row justify-content-center">
                        <button disabled={!this.state.isFormValid} type="button" value="register" onClick={this.register}>register</button>
                        <button type="button" onClick={this.cancelRegistration}>cancel</button>
                    </div>
                </form>
            </section>

        )
    }
}