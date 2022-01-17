import View from "../../application";

interface VerifiedInt {
  status:boolean;
  error:string;
  message:string
  data?:any;
} 

async function Main(props: any = {}) {
  
  let Authorization = props.req.headers.origin;
  let HeaderAuthorization = props.req.headers.authorization;

  let Verified:VerifiedInt = {
    status:false,
    error:"unknow-authorization",
    message:"Cabeçalho não autorizado"
  };

  const Init = async (init:any=1) => {

    if(process.env?.["APP_HEADER_URL_"+init]){

      const head = process.env?.["APP_HEADER_URL_"+init];
      const origin:any = head?.split('@');

      if ((Authorization === origin[0] || origin[0].includes("://?.") 
          && origin[0].split(".")[1] == Authorization.split(".")[1])
          && (origin[1] === HeaderAuthorization)){

            Verified = {
              status:true,
              error:"Successful",
              message:"Cabeçalho autorizado",
              data:{
                autorization:origin[1],
                origin:origin[0]
              }
            }
      }
      init++;
      await Init(init);
    } 
  }
  
  await Init();
  return Verified;
}


export default async function App(props: any) {
  return await View.on(Main(props),__filename);
}