class Main {

    app: any = {};
    route: any = {};

    constructor(){
        this.init();
    }

    init(){
        ["post","get","delete","put"].map((method:any)=>{
            this.app[method] = (url?:any,fn?:any,params?:any) => {
                if(!this.route[method]){
                    this.route[method] = {}
                }
                this.route[method][url] = [fn,params];
            }
        });
    }

}

export default new Main()