function plotFunction() {
    var func = document.getElementById('functionInput').value;
    var deb = parseFloat(document.getElementById('a').value);
    var fin = parseFloat(document.getElementById('b').value);
    var parsedFunction = math.parse(func);
    var affunc = func.toString();
    var code = parsedFunction.compile();
    var xValues = math.range(deb, fin, 0.1).toArray();

    try {
        var yValues = xValues.map(x => code.evaluate({ x }));

        var trace = {
            x: xValues,
            y: yValues,
            mode: 'lines',
            type: 'scatter'
        };
        if (affunc.length > 10) { 
            var title = `Le courbe de <br> f(x) = ${affunc}`;
        } else {
            var title = `Le courbe de f(x) = ${affunc}`;
        }
        var layout = {
            title: title,
            xaxis: {
                title: 'x'
            },
            yaxis: {
                title: 'y'
            }
        };

        Plotly.newPlot('plot', [trace], layout);
    } catch (error) {
        console.error("Error evaluating function:", error);
    }
}
