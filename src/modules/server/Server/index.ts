import http from "http";
import Boby from "../Chunks";
import Routes from "../Route";
import UrlParams from "../Params";
import Component from "./../../application/components";
import Headers from "./../Headers";
import "../d.env";

class Main {

    SetHeader (props:any){
        props.setHeader("Access-Control-Allow-Origin", "*");
        props.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,HEAD,POST,PUT");
        props.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    }

    on ( port?: string | number ):void{

        http.createServer((req?:http.IncomingMessage|any,res?:http.ServerResponse|any)=>{

            this.SetHeader(res);

            let _URL_PARAMS_:any = {
                keys:{},
                params:UrlParams(req.url)||{}
            }

            const l = Component.Set.cut('/',req.url);
            const q = Routes.route[req.method.toLowerCase()];
            
            if(!q){
                res.end(JSON.stringify({
                    status:false,
                    error:"invalid-router",
                    message:"Rota inválida",
                }));
            }
            else {

                const p:any = (Object as any).keys(q).map((route:any)=>{
                    return Component.Set.cut('/',route).map((li:any,id:any)=>{
                        if(/:([a-z\d_]+)/.test(li)) 
                        _URL_PARAMS_.keys[li.split(':')[1]] = (/[?|&]/.test(l[id]))?l[id].split(/[?|&]/)[0]:l[id]||'';
                        return li.replace(/:([a-z\d_]+)/,l[id]);
                    }).join('/')
                });

                if(req.url!=="/favicon.ico"){
                    let totalRequest = false;
                        for(let i in p){ 
                            let isRoute = (/[?|&]/.test(p[i]))?p[i].split(/[?|&]/)[0]:p[i];
                            if("/"+isRoute===req.url.split('?')[0]){
                                (Object as any).values(q)[i][0]({
                                    end:(dataParams:any) => {
                                        res.end(JSON.stringify(dataParams))
                                    },
                                    body: Boby(req),
                                    header: async (d:any) => await Headers(d),
                                    ..._URL_PARAMS_,
                                    req, 
                                    res, 
                                });  
                                totalRequest = true
                                    break;  
                            }
                        }
                    if(!totalRequest){

                        res.end(JSON.stringify({
                                status:false,
                                error:"invalid-request",
                                message:"Rota inexistente"
                            })
                        );

                    }
                }
            }
        })
        .listen(port);
    }
}

Component.log({
    method:"START",
    status:(process.env.PORT)?true:false,
    message:(process.env.PORT)?`Load project ${process.env.APP_NAME} on PORT: ${process.env.PORT}`:"Undefined PORT in",
    error:(process.env.PORT)?__filename:".env",
});

export default new Main
