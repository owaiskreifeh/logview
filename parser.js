
function parser(text, output){
    const lines = text.split('\n');
    let i = 0;
    let firstTime;

    document.getElementById("info").innerText = 'WORKING .... ';

    function loop(){
        let isFirst = false;
        const line = lines[i];
        // find the date and time in the line
        const time = line.match(/\d{2}:\d{2}:\d{2}/);
        if(time){
            if (!firstTime){
                firstTime = time[0];
                isFirst = true;
            }
            var timeId = diffTime(firstTime, time[0]) + window.timeoffset;
        
            let className = 'info';
            // if it has "warning:" or "error:" 
            if(line.includes('Warning:')){
                className = 'warning';
            } else if ( line.includes('Error:')){
                className = 'error';
            } else if ( line.includes('Debug:')){
                className = 'debug';
            }

            if (line.includes('Shahid') || line.includes('shahid')){
                className += ' shahid';
            }



            const s = document.createElement('span');
            let d = document.getElementById(timeId);
            if (!d){
                d = document.createElement('div');
                d.id = timeId;
            }
            if (isFirst) {
                d.className = "active";
            }

            s.className = className;
            s.innerText = timeId + "-> " + line;
            d.appendChild(s);
            output.appendChild(d);
        }
        i++;
        if(i < lines.length){
            requestAnimationFrame(loop);
        } else {
            document.getElementById("info").innerText = 'DONE';
        }
    }
   requestAnimationFrame(loop);
    
        
}


function diffTime(time1, time2){
    const time1Arr = time1.split(':');
    const time2Arr = time2.split(':');
    const time1Sec = parseInt(time1Arr[2]) + parseInt(time1Arr[1])*60 + parseInt(time1Arr[0])*3600;
    const time2Sec = parseInt(time2Arr[2]) + parseInt(time2Arr[1])*60 + parseInt(time2Arr[0])*3600;
    return time2Sec - time1Sec;
}