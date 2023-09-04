let table;

function loadTable(data){

    let index = 0;
    let length = data[1].length;

    for (let index = length; index > 0; index--) {
        let cell = data[1][index];

        if( !(cell == "" || cell == undefined)){
            length = index-2;
            break;
        }
    }

    const rowMaker = function(title, unit, columnIndex, windrichtung){
        const column = data[columnIndex];
        let min = numberConverter(column[length + 2]);
        let max = numberConverter(column[length + 1]);
        let mean = numberConverter(column[length]);
        index++;

        if(windrichtung) return [
            index,
            title,
            mean,
            unit,
            "",
            ""
        ];

        return [
            index,
            title,
            mean,
            unit,
            max,
            min
        ];
    };


    // Data table
    var tableData = [
        rowMaker("Temperatur", "°C", 9),
        rowMaker("Luftdruck", "hPa", 5),
        rowMaker("rel. Luftfeuchtigkeit", "%", 7),
        rowMaker("Windgeschwindigkeit", "m/s", 1),
        rowMaker("Windrichtung", "°" + data[4][length], 3, true),
        rowMaker("DirekteSonneneinstrahlung GDir", "W/m²", 11),
        rowMaker("Sonneneinstrahlung Horizontal Gn00", "W/m²", 13),
        rowMaker("Sonneneinstrahlung 30°- Ebene Gn30", "W/m²", 15),
    ]

    if(table) table.destroy();

    table = $('#datatable').DataTable( {
        data: tableData,
        paging: false,
        searching: false,
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: 'none',
                target: ''
            }
        }
    } );

    $('#datatable').css('width', '100%')
  
    // set latest update
     document.querySelector('.Mittelwerte').innerHTML = data[0][length];
          
}