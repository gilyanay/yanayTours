export class Vacation{
    constructor( 
        public description?: string, 
        public destination?:string, 
        public image?:string , 
        public start_date?:Date , 
        public end_date?:Date , 
        public price?:number,
        public id?:number
        ){}
}