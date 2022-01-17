import fs from "fs";
import Component from "./components";

interface Global {
  (x:any,y:any):any
}

class Main {
  
  Message:Global;
  Set:Global;

  constructor(){
    this.Message = Component.Message
    this.Set = Component.Set
  }

  async on(instance: any, local: any = 'No name') {

    try {

      const roadInstance: any = await instance;
      const Message = roadInstance && typeof roadInstance == "string" ? Component.Message(roadInstance, []) : roadInstance;

        if(process.env.BACKLOG==="ON"){

          let lines:any;
          let stats:any;
          
          if(fs.existsSync(local)) {
            lines = fs.readFileSync(local, 'utf8').match(/\n/g)?.length;
            stats = fs.statSync(local).size;
          }
  
          Component.log({
            method:"TEST",
            status:Message.status,
            message:Message.message,
            error:local,
            details:{
              lines,
              stats,
            }
          });
        }

        return Message;

    } 
    catch (err) {

      Component.log({
        method:"FAIL",
        status:false,
        message:"",
        error:local +' '+ err,
      });

      return Component.Message("Error");

    }
  }
}

const main = new Main()
export default main;
