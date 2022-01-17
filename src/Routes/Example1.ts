import View from "../modules/application";

async function Main () {
    return "Successful";
}

export default async function App() {
    return await View.on(Main(),__filename);
}