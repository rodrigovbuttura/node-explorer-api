import Error from "../components/Erros";
import Protypes from "./Protypes";
import Consolog from "../../server/Log";

interface Global {
    [x:string]:any;
}
  
export = {
    
    Error : Error.Error(),
    Message : Error.Message,
    log : Consolog,
    Set : Protypes,

} as Global;