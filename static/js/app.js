const url = "../data/samples.json"

function init() {
    let dropdown = d3.select("#selDataset");
    d3.json(url).then((data) => {
        let names = data.names;
        console.log(names);
        for (let index = 0; index < names.length; index++) {
            dropdown.append("option").text(names[index]).property("value", names[index]);
        }
        buildPanel(names[0]);
        buildCharts(names[0]);
    });

}

function buildPanel(params) {
    let PANEL = d3.select("#sample-metadata");
    d3.json(url).then((data) => {

        let metadata = data.metadata;
        let x = metadata.filter(result => result.id == params);
        x = x[0]
        PANEL.html("");
        for (key in x) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${x[key]}`)
        }
    })
}

function buildCharts(params) {
    d3.json(url).then((data) => {
        let samples = data.samples;
        let x = samples.filter(result => result.id == params);
        x = x[0]
        console.log(x)
        let otu_ids = x.otu_ids;
        let sample_values = x.sample_values;
        let otu_labels = x.otu_labels;

        console.log(otu_ids,sample_values,otu_labels);

        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        let barlayout = {
            title: "Top 10 OTUs"
        };

        let bardata = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        Plotly.newPlot("bar",[bardata],barlayout);




    })

}




function buildBubbleChart(params) {
    d3.json(url).then((data) => {
        let samples = data.samples;
        let x = samples.filter(result => result.id == params);
        x = x[0]
        console.log(x)
        let otu_ids = x.otu_ids;
        let sample_values = x.sample_values;
        let otu_labels = x.otu_labels;

        console.log(otu_ids,sample_values,otu_labels);

        let barlayout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        let bardata = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        Plotly.newPlot("bubble",[bardata],barlayout);

    });

};


function optionChanged(x) {

    console.log(x)

    buildPanel(x);
    buildCharts(x);
    buildBubbleChart(x);
}

init();
