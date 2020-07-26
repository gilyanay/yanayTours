import { Vacation } from "../models/Vacation"


export class AppState {
    public isLogedIn:boolean;
    public vacations: Vacation[]=[];
    public token : string
}