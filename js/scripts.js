
const lineMarkersLogo= {
  name: 'newplotlylogo',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" data-name="Layer 1" id="Layer_1"><defs><style>.cls-1,.cls-2{fill:none;stroke:#1d1d1b;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-1{fill-rule:evenodd;}</style></defs><title/><polyline class="cls-1" points="1 1 1 47 47 47"/><circle class="cls-2" cx="8" cy="24" r="2"/><circle class="cls-2" cx="20" cy="30" r="2"/><circle class="cls-2" cx="31" cy="21" r="2"/><circle class="cls-2" cx="42" cy="25" r="2"/><line class="cls-2" x1="10" x2="18" y1="25" y2="29"/><line class="cls-2" x1="22" x2="29" y1="29" y2="22"/><line class="cls-2" x1="33" x2="40" y1="22" y2="24"/></svg>`
}


var config = {
  responsive: true, 
  displaylogo: false,
  displayModeBar: true,
  locale: 'de',
  modeBarButtonsToAdd: [
    {
      name: 'Mode',
      icon: lineMarkersLogo,
      className: 'mode',
      click: function(gd) {
        let mode = "lines";
        let attr = gd.getAttribute('data-mode');
        if(attr && attr == "lines"){
          gd.setAttribute('data-mode', 'markers');
          mode = "lines"
        }else{
          gd.setAttribute('data-mode', 'lines');
          mode = "lines+markers"
        }

        Plotly.restyle(gd, {
          mode: mode
        })

      }}
    ],

    modeBarButtonsToRemove: ['lasso2d','resetScale2d', 'toggleSpikelines']

}

var loading = true;

function plotRange(dates) {
  var firstDate = new Date( dateCleaner(dates[3], true) );
  var lastDate = firstDate.addDays(1);
  // return responsive(null, [firstDate, lastDate]); // 2 day's dataset for mobile
  return null;
}

function windSpeedPlot(csv){
  let dates = csv[0];
  let ColumnData = csv[1];
  let x = [], yMean = [], yMax = [], dataCount = 0;
  let tempMean = 0, tempMax = 0;

  for (let index = 3; index < dates.length; index = index + 3) {
    let date = dateCleaner(dates[index]);
    let maxValue = numberConverter(ColumnData[index+1]);
    let meanValue = numberConverter(ColumnData[index]);

    /**
     * Filter
     * Skips all the empty cells
    */
    if (ColumnData[index] == "") continue;

    /**
     * Checking unwanted max values. Skip if have any
     * Here 50 is the threshold of the upper limit
     */
    if(maxValue >= 50) continue; 

    tempMean += meanValue;
    tempMax += maxValue;
    dataCount++;
    

    if(dataCount == 10){ // reset in every 10 minutes
      yMean.push(tempMean/10);
      yMax.push(tempMax/10);
      x.push(date)
      tempMean = 0;
      tempMax = 0;
      dataCount = 0;
    }
  }

  var trace1 = {
    x: x,
    y: yMean,
    type: 'scatter',
    mode: 'lines',
    name:"Mean"
  };

  var trace2 = {
    x: x,
    y: yMax,
    type: 'scatter',
    mode: 'lines',
    name:"Max"
  };
  
  var data = [trace1, trace2];

  var layout = {
    xaxis: {title: "Datum", range: plotRange(dates), },
    yaxis: {title: "m/s"},
    autosize: true,
    title: ""
  };
    
  Plotly.newPlot('wind_speed', data, layout, config);
  
}


function windDirectionPlot(csv){
  let dates = csv[0];
  let ColumnData = csv[3];
  let x = [], yMean = [];
  let tempMean = 0, dataCount = 0;

  for (let index = 3; index < dates.length; index = index + 3) {
    let date = dateCleaner(dates[index]);
    let meanValue = numberConverter(ColumnData[index]);

    /**
     * Filter
     * Skips all the empty cells
     */
     if (ColumnData[index] == "") continue;

     tempMean += meanValue;
     dataCount++;

     if(dataCount == 10){ // reset in every 10 minutes
      yMean.push(tempMean/10);
      x.push(date)
      tempMean = 0;
      dataCount = 0;
    }
  }

  var trace1 = {
    x: x,
    y: yMean,
    type: 'scatter',
    mode: 'lines',
    name:"Mean",
    
  };
  
  var data = [trace1];

  var layout = {
    xaxis: {
      title: "Datum", 
      range: plotRange(dates), 
      type: 'date'
    },
    yaxis: {title: "Degree (°)"},  
    title: ""
  };
    
  Plotly.newPlot('wind_direction', data, layout, config);
}


function temperaturePlot(csv){
  let dates = csv[0];
  let ColumnData = csv[9];
  let x = [], yMean = [], texts = [];
  let dataCount = 0, tempMean = 0;

  for (let index = 3; index < dates.length; index = index + 3) {
    let date = dateCleaner(dates[index]);
    let meanValue = numberConverter(ColumnData[index]);

    /**
     * Filter
     * Skips all the empty cells
     */
    if (ColumnData[index] == "") continue;

     tempMean += meanValue;
     dataCount++;

     if(dataCount == 10){ // reset in every 10 minutes
      yMean.push(tempMean/10);
      x.push(date)
      tempMean = 0;
      dataCount = 0;
    }
  }

  var trace1 = {
    x: x,
    y: yMean,
    text: texts,
    type: 'scatter',
    mode: 'lines',
    name:"Mean",
    
  };
  
  var data = [trace1];

  var layout = {
    xaxis: {
      title: "Datum", 
      range: plotRange(dates), 
      type: 'date'
    },
    yaxis: {title: "°C"},  
    title: ""
  };
    
  Plotly.newPlot('temperature', data, layout, config);
}

function windPressurePlot(csv){
  let dates = csv[0];
  let ColumnData = csv[5];
  let x = [], yMean = [];
  let dataCount = 0, tempMean = 0;

  for (let index = 3; index < dates.length; index = index + 3) {
    let date = dateCleaner(dates[index]);
    let meanValue = numberConverter(ColumnData[index]);

    /**
     * Filter
     * Skips all the empty cells
     */
     if (ColumnData[index] == "") continue;

     tempMean += meanValue;
     dataCount++;

     if(dataCount == 10){ // reset in every 10 minutes
      yMean.push(tempMean/10);
      x.push(date)
      tempMean = 0;
      dataCount = 0;
    }
  }

  var trace1 = {
    x: x,
    y: yMean,
    type: 'scatter',
    mode: 'lines',
    name:"Mean",
    
  };
  
  var data = [trace1];

  var layout = {
    xaxis: {
      title: "Datum", 
      range: plotRange(dates), 
      type: 'date'
    },
    yaxis: {title: "hPa"},  
    title: ""
  };
    
  Plotly.newPlot('pressure', data, layout, config);
}

function humidityPlot(csv){
  let dates = csv[0];
  let ColumnData = csv[7];
  let x = [], yMean = [];
  let dataCount = 0, tempMean = 0;

  for (let index = 3; index < dates.length; index = index + 3) {
    let date = dateCleaner(dates[index]);
    let meanValue = numberConverter(ColumnData[index]);

    /**
     * Filter
     * Skips all the empty cells
     */
     if (ColumnData[index] == "") continue;

     tempMean += meanValue;
     dataCount++;

     if(dataCount == 10){ // reset in every 10 minutes
      yMean.push(tempMean/10);
      x.push(date)
      tempMean = 0;
      dataCount = 0;
    }
  }

  var trace1 = {
    x: x,
    y: yMean,
    type: 'scatter',
    mode: 'lines',
    name:"Mean",
    
  };
  
  var data = [trace1];
 

  var layout = {
    xaxis: {
      title: "Datum", 
      range: plotRange(dates), 
      type: 'date'
    },
    yaxis: {title: "%"},  
    title: ""
  };
    
  Plotly.newPlot('humidity', data, layout, config);
}


function radiationPlot(csv){
  let dates = csv[0];
  let direkteSonn = csv[11];
  let sonnHorizontal = csv[13];
  let sonneneinstrahlung = csv[15];

  let x = [], yDirekteSonn = [], ySonnHorizontal = [], ySonneneinstrahlung = [];
  let dataCount = 0, tempDirekteSonn = 0, tempSonnHorizontal = 0, tempSonneneinstrahlung = 0;

  for (let index = 3; index < dates.length; index = index + 3) {
    let date = dateCleaner(dates[index]);

    /**
     * Filter
     * Skips all the empty cells
     */
     if (tempDirekteSonn[index] == "") continue;

     tempDirekteSonn += numberConverter(direkteSonn[index]);
     tempSonnHorizontal += numberConverter(sonnHorizontal[index]);
     tempSonneneinstrahlung += numberConverter(sonneneinstrahlung[index]);
     dataCount++;

     if(dataCount == 10){ // reset in every 10 minutes
      yDirekteSonn.push(tempDirekteSonn/10);
      ySonnHorizontal.push(tempSonnHorizontal/10);
      ySonneneinstrahlung.push(tempSonneneinstrahlung/10);
      x.push(date)
      tempDirekteSonn = 0;
      tempSonnHorizontal = 0;
      tempSonneneinstrahlung = 0;
      dataCount = 0;
    }
  }

  var trace1 = {
    x: x,
    y: yDirekteSonn,
    type: 'scatter',
    mode: 'lines',
    name: responsive("Direkte Sonneneinstrahlung (Gdir)", "(Gdir)"),
  };

  var trace2 = {
    x: x,
    y: ySonnHorizontal,
    type: 'scatter',
    mode: 'lines',
    name: responsive("Sonneneinstrahlung Horizontal (Gn00)", "(Gn00)"),
  };

  var trace3 = {
    x: x,
    y: ySonneneinstrahlung,
    type: 'scatter',
    mode: 'lines',
    name: responsive("Sonneneinstrahlung 30°- Ebene (Gn30)", "(Gn30)"),
  };
  
  var data = [trace1, trace2, trace3];

  var layout = {
    xaxis: {
      title: "Datum", 
      range: plotRange(dates), 
      type: 'date',
    },

    yaxis: {title: "W/m<sup>2</sup>"},  
    title: ""
  };
    
  Plotly.newPlot('radiation', data, layout, config);
}

function async_calls(callback){

  callback = callback || function(arg){}

  axios.get('1Woche+Max+Min.CSV')
    .then(function(response) {
      var csv = response.data;
      let data = csvJSON(csv);

      loadTable(data);
      windSpeedPlot(data);
      windDirectionPlot(data);
      temperaturePlot(data);
      windPressurePlot(data);
      humidityPlot(data);
      radiationPlot(data);

      if(loading){
        document.querySelector('.loader_wrapper').style.display = "none";
        loading = false;
      }
      callback('success');
    })
    .catch(function(error) {
      if(loading){
        document.querySelector('.loader_wrapper').style.display = "none";
        loading = false;
      }
      callback('error');
      console.log(error);
    });
}

// Load data initially in first load
async_calls();

// Force refresh
document.querySelector('.refreshButton').addEventListener('click', function(e){
  e.target.classList.add('active_refresh')
  async_calls(function(){
    e.target.classList.remove('active_refresh')

    // display toast
    let toastLiveExample = document.getElementById('liveToast');
    toastLiveExample.querySelector('.toast-body').innerHTML = 'Die Daten wurden erfolgreich aktualisiert.';
    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show()
    
  });
})

// Load data every minute
let dataFetchInterval = setInterval(function(){
  async_calls();
}, 1000 * 60);


// auto update toggle
let autoUpdateBtn = document.querySelector('.autoUpdate input');

if(! (window.localStorage.getItem('autoUpdate') == "true" )){
  autoUpdateBtn.checked = false;
  clearInterval(dataFetchInterval);
}

autoUpdateBtn.addEventListener('click', function(e){
  if(!e.target.checked){
    clearInterval(dataFetchInterval);

    // display toast
    let toastLiveExample = document.getElementById('liveToast');
    toastLiveExample.querySelector('.toast-body').innerHTML = 'Automatische Aktualisierung ausgeschaltet';
    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
  }else{
    // display toast
    let toastLiveExample = document.getElementById('liveToast');
    toastLiveExample.querySelector('.toast-body').innerHTML = 'Automatische Aktualisierung eingeschaltet';
    let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    async_calls(); // Call once the auto button activated
    dataFetchInterval = setInterval(function(){
      async_calls();
    }, 1000 * 60);
  }

  // save the state on local storage
  window.localStorage.setItem('autoUpdate', e.target.checked)
})

// Load current year on footer
document.querySelector(".dynamic_year").innerHTML = new Date().getFullYear()

// resize plots according to side nav
function resizePlot(){
  let interval = setInterval(() => {
    let width = document.querySelector('.js-plotly-plot').offsetWidth;

    document.querySelectorAll(".js-plotly-plot").forEach(function(ele, i){
      let id = ele.id;
      Plotly.relayout(id, { width: width});
    });
    
  }, 50);

  setTimeout(function(){
    clearInterval(interval);
  },500)
}

resizePlot();

// side nav
window.addEventListener('DOMContentLoaded', event => {

  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
       if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
           document.body.classList.toggle('sb-sidenav-toggled');
       }
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
          resizePlot();
      });
  }

});

Plotly.setPlotConfig({
  locale: 'de',
  displayModeBar: true,
});