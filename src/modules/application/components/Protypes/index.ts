class Settings {

    cut(element:string,object:any){
        let arr: any[] = []
        object.split(element).map(async (e: string) => (e!=="")? arr.push(e):'')
        return arr
    }

}


export default new Settings