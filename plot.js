var file = 'dummy_data.csv';
var data_set = $('#data-filter option:selected').val();

function getData(file) {
	Plotly.d3.csv(file, function(rows) {
		processData(rows); 
	});
}

function processData(rows) {
	var mcos_all = [];
	
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		mcos_all.push(row['Org']);
	}
	var mcos_unique = [...new Set(mcos_all)];
	
	var data = mcos_unique.map(y => {
		var d = rows.filter(r => r['Org'] === y);
		
		return {
			type: 'scatter',
			name: y,
			x: d.map(r => r['Month']),
			y: d.map(r => r[data_set]),
			mode: 'lines+markers',
			marker: {
				size: 8
			},
			text: y
		};
	});
	makePlot(data, 'plot');
}

 function makePlot(data, div) {
	for (var i = 0; i < data.length; i++) {
		if (data[i].name === 'Our Org') {
			data[i].line = {
				color: 'red',
				width: 5,
				shape: 'spline'
			}
		} else {
			data[i].line = {
				color: '#999999',
				width: 3,
				shape: 'spline'
			}
		}
	}
	
	var layout = {
		title: $('#data-filter option:selected').text(),
		titlefont: {
			color: '#E56A54',
			size: 24
		},
		font: {
			family: "'Roboto', sans-serif"
		},
		paper_bgcolor: '#f4f6ff',
		plot_bgcolor: '#f4f6ff',
		showlegend: false,
		xaxis: {
			showgrid: false
		},
		yaxis: {
			showgrid: true
		},
		hovermode: 'closest',
		hoverlabel: {
			font: {
				color: '#FFFFFF'
			}
		}
	}
	
Plotly.newPlot(div, data, layout);
}

$('#data-filter').change(function() {
	data_set = $(this).val();
	getData(file);
});