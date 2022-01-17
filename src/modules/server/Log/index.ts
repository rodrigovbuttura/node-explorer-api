const { r, g, b, w, c, m, y, k }:any = [
    ['r', 1], ['g', 2], ['b', 4], ['w', 7],
    ['c', 6], ['m', 5], ['y', 3], ['k', 0],
  ].reduce((cols, col) => ({
    ...cols,  [col[0]]: (f:any) => `\x1b[3${col[1]}m${f}\x1b[0m`
  }), {})

  export default function log({ 
    method, 
    error, 
    status, 
    message, 
    details
  }:any) {
    console.log(
      `${m('['+method+']')} ${ status ? g("Successful") : r("Invalid") }, ${ status ? w(message) : r(message||"Unexpected return in your function") }\n${c(error)}${ (details && details.lines && details.stats) ? `\n[ ${y(details.lines)+y(" lines")}, ${y(details.stats)+y(" bytes ")}]` :""}\n`
    )
  }
  
