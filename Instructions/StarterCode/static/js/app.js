function buildInformation(x_data) {
    d3.json("samples.json").then((data)=>{
    var hold_information = data.metadata;
    var array1 = hold_information.filter(sampleObj=>sampleObj.id==x_data);
    var results = array1[0];
    var metadata_panel = d3.select("#sample-metadata");
    metadata_panel.html("");
    Object.entries(results).forEach(([key, value]) => {
        metadata_panel.append("h4").text(`${key}: ${value}`);
    });

    });
    }

function buildCharts(sample) {
    d3.json("samples.json").then((data)=>{
    var grabSamples = data.samples;
    var grabArray = grabSamples.filter(sampleObj=>sampleObj.id==sample);
    var results = grabArray[0];
    var sample_values = results.sample_values;
    var otu_ids = results.otu_ids;
    var otu_labels = results.otu_labels;
    var bubbleLayout = {
        title:"Bubble Chart",
        margin:{t:0},
        hovermode:"closest",
        xaxis:{title:"Xaxis Title"},
        margin:{t:30}

    };
    var circlesData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorScale: "Inferno"
            }
        }
    ];
    Plotly.newPlot("bubble",circlesData, bubbleLayout);

    var yTick = otu_ids.slice(0,10).map(otuID =>`OTU ${otuID}`).reverse();
    var barsData = [
        {
            y: yTick,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
        
    ];
    var chartLayout = {
        title: "Horizontal Chart",
        margin: {t:30, l:60}

    };
    Plotly.newPlot("bar",barsData, chartLayout);
    });
}
function initializeFunction(){
    var selectReference = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
    var namesList = data.names
    namesList.forEach((samples) => {
        selectReference.append("option").text(samples).property("value", samples);
    });
    var sampleCall = namesList[0];
    buildCharts(sampleCall);
    buildInformation(sampleCall);
    
    });
}
function optionChanged(x) {
    buildInformation(x);
    buildCharts(x);
}
initializeFunction();
  