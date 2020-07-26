import React, { Component } from "react";
import { Vacation } from "../../models/Vacation";
import axios from "axios";
import axiosService from "../../Authorization/axiosService"
import { Unsubscribe } from "redux";
import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';
import "./vacations.css"
import Moment from 'react-moment';
import 'moment-timezone';




interface VacationsState {
    vacations: Vacation[],
    filterByVacatinDestination: string

}

export default class Vacations extends Component<any, VacationsState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props)
        this.state = {
            vacations: [],
            filterByVacatinDestination: ""
        }
        this.unsubscribeStore = store.subscribe(
            // In fact, the following function is our "listener", "refresh function"
            () => this.setState(
                {
                    vacations: store.getState().vacations
                })
        );
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    // componentDidMount = ngOnInit in angular (a reserved word)
    public async componentDidMount() {
        // const socket = io();
        const response = await axiosService.get<Vacation[]>("http://localhost:3001/vacations/vacationsByUser");
        store.dispatch({ type: ActionType.GetAllVacation, payload: response.data });
        // response.data = all the vacations that were returned from the server
        this.setState({ vacations: response.data });
    }

    public onVacationDiscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let text = event.target.value;
        this.setState({ filterByVacatinDestination: text });
    }


    public async followVacation  (id:number){
        console.log(id)
        const response = await axios.post<any>("http://localhost:3001/vacations/addToTracking",id);
        console.log(response)
    }


    public render() {
        return (
            <div className="vacations">
                <div>
                <input type="text" placeholder="serch task" onChange={this.onVacationDiscriptionChange} />
                </div>
              
                {
                    this.state.vacations.filter(vacation => {
                        // There's no condition and so - YES TO ALL
                        if (this.state.filterByVacatinDestination === "") {
                            return true
                        }
                        return vacation.destination.startsWith(this.state.filterByVacatinDestination)

                    }).map(vacation =>
                        <div key={vacation.id} className="vacationArea">
                           <div id="cardHeader">
                         
                            <h4> {vacation.destination}</h4>
                            <span onClick={()=>this.followVacation(vacation.id)}>follow</span>
                           </div>
                            <div> {vacation.description}</div>
                            <div>  <Moment format="YYYY/MM/DD">{vacation.start_date}</Moment> -  <Moment format="YYYY/MM/DD">{vacation.end_date}</Moment></div>
                         
                            <img src={"http://localhost:3001/" + vacation.image} alt="" />
                            <div> {vacation.price}</div>
                        </div>
                    )
                }
            </div>
        )
    }
}