$(document).ready(function(){

/*	$("#btnExport").click(function (e) { //funciona problema con formato pero abre
	   	window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
		//window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('#dvData').html()));	  	 
	   e.preventDefault();
	}); */
	
	
	
/*	$("#btnExport").click(function(e) { //funciona problemas con formato no abre

	    var a = document.createElement('a');
	    //getting data from our div that contains the HTML table
	    var data_type = 'data:application/vnd.ms-excel';
	    var table_div = document.getElementById('dvData');
	    var table_html = table_div.outerHTML.replace(/ /g, '%20');
	    a.href = data_type + ', ' + table_html;
	    //setting the file name
	    a.download = 'Detalle-Reporte.xls';
	    //triggering the function
	    a.click();
	    //just in case, prevent default behaviour
	    e.preventDefault();
	}); */
	
});

/*function ejecutaExportExcel(){

	fnExcelReport('dvData','Reporte');

} */

/*function fnExcelReport(id, name) {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
    tab_text = tab_text + "<table border='1px'>";
    var exportTable = $('#' + id).clone();
    exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
    tab_text = tab_text + exportTable.html();
    tab_text = tab_text + '</table></body></html>';
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    var fileName = name + '.xls';
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/vnd.ms-excel;charset=ISO-8859-1;"
            });
            navigator.msSaveBlob(blob, fileName);
        }
    } else {
        $('#exportExcel').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#exportExcel').attr('download', fileName);
    }
} */