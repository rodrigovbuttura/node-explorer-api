export default function Main (props:any) {
    let arr:any = {};
    if(/[?]/.test(props)){
        let l:any = props.split('?')[1].split('=');
        (/[&]/.test(props))
        ?arr[l[0]] = l[1].split('&')[0]
        :arr[l[0]] = l[1];
    }
    if(/[&]/.test(props)){
        props.split('&').map((e:any,i:any) =>{ 
            if(i>0){
                e = e.split('=')
                arr[e[0]] = e[1] 
            }
        })
    }
    return arr
}