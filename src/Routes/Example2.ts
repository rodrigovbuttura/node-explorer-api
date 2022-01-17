import View from "../modules/application";

async function Main (props:any={}) {

    const body = await props.body;

    return View.Message("Successful",{
        ...body,
        key:props.keys,
        params:props.params,
    });
}

export default async function App(props:any) {
    return await View.on(Main(props),"Nome função");
}