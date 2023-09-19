export type Pokemon = {
    name: string;
    url: string;
    krName:string;
    id:number;
    sprites:string;
    front_default:string;
    other:any;
    dream_world:string;
};
export type KrType = (typeName: string)=> {
    id:number;
    name:string;
    krName:string;
    color:string;
    imgS:string;
    imgL:string;
}| undefined;