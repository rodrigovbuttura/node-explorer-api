function Main(props?:any) {

    let chunks: any = [];
    return new Promise((resolve,reject)=>{
        props.on('data', async (chunk?: any) => await chunks.push(chunk));
        props.on('end',async () => {
            let _data:any = await Buffer.concat(chunks).toString()||false;
            let body:any = await JSON.parse(JSON.stringify(_data))||[];
            try { 
                let _y:any = (!_data)?{}:JSON.parse(body);
                resolve(_y);
            }
            catch(e){
                reject(e);
            }
        })
    })
}

export default Main;