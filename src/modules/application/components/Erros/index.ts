import ServerError from "./types/Server";

interface ErrorClausesInt {
    message:string
    error:string
    status:boolean
}

interface ErrorInt {
    [x:string]:ErrorClausesInt
}

class Main {
    
    Error(){
        return {
            ...ServerError,
        } as ErrorInt
    }

    Message(errorName:any,result:any=[]){
        const error = new Main().Error();
        return {
            ...error[errorName],
            data:result
        }
    }
}

export default new Main