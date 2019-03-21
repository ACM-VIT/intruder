//ready 

function disp(event,data){
    return `/*--------------------*/${event}/*--------------------*/;\n${JSON.stringify(data, null, 2)};`
}

function equalSpace(str,i){
    str=String(str)
    while(str.length<i){
        console.log(11)
        str+=' '
    }
    return(str)
}

function sortFu(a,b){
    if(a._id.score>b._id.score) return -1
    if(a._id.score<b._id.score) return 1
    else return 0
}

function pResult(data){
    if(typeof(data)==='string') return "'"+data+"'";
    var str='/*--------------------*/Result/*--------------------*/\n\n'
    str+=`\t${equalSpace('Rank',7)}${equalSpace(';',5)}${equalSpace('score',10)}${equalSpace(';',5)}${equalSpace('Username',30)}${equalSpace(';',5)}Name\n\n`
    data.forEach((teams,i)=>{
        console.log(teams)
        teams.scorers.forEach(team=>{
            str+=`\t${equalSpace(i+1,7)}${equalSpace(';',5)}${equalSpace(teams._id.score,10)}${equalSpace(';',5)}${equalSpace("'"+team.username+"'",30)}${equalSpace(';',5)}${"'"+team.name+"'"}\n`
        })
    })
    return str
}

var events=['intruderSuccess','intruded','intruderMessage']
export default function bindOn(socket, dispatch) {
    events.forEach(event => {
        socket.on(event,(data)=>{
            dispatch({
                type:'SET_STATS_VALUE',
                payload:disp(event,data)
            })
        })
    });

    socket.on('result',(data)=>{
        dispatch({
            type:'SET_STATS_VALUE',
            payload:pResult(data.sort(sortFu))
        // try{
            
        // }
        })
    })
}