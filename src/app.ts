import Router from "./modules/server/Route";
const { app } = Router;

import Example1 from "./Routes/Example1";
import Example2 from "./Routes/Example2";


app.post('/api/example1',async(data:any) => data.end( await Example1() ));


app.post('/api/example2/:ex2_name',async(data:any) => data.end( await Example2(data) ));


app.post('/api/example3',async(data:any) => {

    const header = await data.header(data);
    data.end(header);
    
});
