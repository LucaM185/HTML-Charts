Data = 0.4
eff = 1.12

function update(s){
    value = inputvalues(s);
    document.getElementById(s+"V").value = value;
    if(document.getElementById("autoUpdate").checked==true){
        makeChart(130)
    }
    if(document.getElementById("autoUpdate1").checked==true){
        makeChart1(130)
    }
}

function precise(x) {
    if (x > 1) {
        return Number.parseFloat(x).toPrecision(4);
    }else if(x > 0.1){
        return Number.parseFloat(x).toPrecision(3);
    }else if(x > 0.01){
        return Number.parseFloat(x).toPrecision(2);
    }else if(x > 0.001){
        return Number.parseFloat(x).toPrecision(1);
    }else{
        return Number.parseFloat(x).toPrecision(4);
    }
}



function inputvalues(str){
    if(str == "Af") {
        return precise((document.getElementById("Af").value/50*2), 4);
    }else if(str == "Cx"){
        return precise((document.getElementById("Cx").value/50*0.3), 4);
    }else if(str == "Da"){
        return precise((document.getElementById("Da").value/50*1.225), 4);
    }else if(str == "RR"){
        return precise((document.getElementById("RR").value/50*0.012), 4);
    }else if(str == "Ag"){
        return precise((document.getElementById("Ag").value/50*9.81), 4);
    }else if(str == "Ma"){
        return precise((document.getElementById("Ma").value/50*1800), 4);
    }
}


function AeroDrag(v){
    Af = inputvalues("Af");
    Cx = inputvalues("Cx");
    Da = inputvalues("Da");
    return 0.5*v*v*v*Af*Cx*Da/1000*eff;
}
function RRdrag(v){
    RR = inputvalues("RR");
    g = inputvalues("Ag");
    Massa = inputvalues("Ma");
    return v*RR*g*Massa/1000*eff;

}


function getData(v){
    v/=3.6;
    return AeroDrag(v)+RRdrag(v);
}  

function RRdata(array){
    var risultato = [];
    for(var i = 0; i<array.length; i++){
        risultato.push(RRdrag(array[i]/3.6));
    }
    return risultato;
}

function AeroData(array){
    var risultato = [];
    for(var i = 0; i<array.length; i++){
        risultato.push(AeroDrag(array[i]/3.6));
    }
    return risultato;
}

function range(n){
    v = [];
    for(var i = 0; i < n; i++){
        v.push(i);
    }
    return v;
}


function makeChart(MaxSpeed){ // Max speed in Km/h
    PlotX = range(MaxSpeed);
    var trace1 = {
        x: PlotX,
        y: RRdata(PlotX),
        name: "Rolling Resistance",
        type: 'scatter'
    };
    var trace2 = {
        x: PlotX,
        y: AeroData(PlotX),
        name: "Aero Drag",
        type: 'scatter'
    };
    var data = [trace1, trace2];
    var layout = {
        xaxis: {
            showgrid: true,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
            gridcolor: '#bdbdbd',
            gridwidth: 2,
            zerolinecolor: '#969696',
            zerolinewidth: 4,
            linecolor: '#636363',
            linewidth: 6
        },
        yaxis: {
            showgrid: true,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
            gridcolor: '#bdbdbd',
            gridwidth: 2,
            zerolinecolor: '#969696',
            zerolinewidth: 4,
            linecolor: '#636363',
            linewidth: 6
        }
    };
    Plotly.newPlot('chart', data, layout);
}

function km(array){
    var risultato = [];
    batSize = 75;
    for(var i = 0; i<array.length; i++){
        cons = (getData(array[i]));
        risultato.push(batSize/cons*array[i]);
    }
    return risultato;
}


function makeChart1(MaxSpeed){ // Max speed in Km/h
    PlotX = range(MaxSpeed);
    var trace1 = {
        x: PlotX,
        y: km(PlotX),
        name: "Range",
        type: 'scatter'
    };
    var data = [trace1];
    var layout = {
        xaxis: {
            showgrid: true,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
            gridcolor: '#bdbdbd',
            gridwidth: 2,
            zerolinecolor: '#969696',
            zerolinewidth: 4,
            linecolor: '#636363',
            linewidth: 6
        },
        yaxis: {
            showgrid: true,
            zeroline: true,
            showline: true,
            mirror: 'ticks',
            gridcolor: '#bdbdbd',
            gridwidth: 2,
            zerolinecolor: '#969696',
            zerolinewidth: 4,
            linecolor: '#636363',
            linewidth: 6
        }
    };
    Plotly.newPlot('chart1', data, layout);
}



