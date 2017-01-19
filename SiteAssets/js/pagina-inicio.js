
var urlIniciativa="/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/SitePages/ingreso-iniciativa.html";
var urlVisualizaIncidencia = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-visualizacion-iniciativa.html';
var GuidListaIniciativas='{E358B8A6-8FEA-426A-AC78-0B71952C1A2B}'


var idRegistro ='';


$(document).ready(function()
{


	CargaTablaIniciativas();
	
	}
		
	
);

function AgregarIniciativas()
{
			
		levantaPopup();
	
}

function RetornaLinkPopup(idMinuta)

{

	levantaPopupUrl(urlMinuta + "?ID=" + idMinuta);
}


function RetornaLinkPopupPDF(idMinuta)
{

	levantaPDF(urlVisualizaIncidencia + "?ID=" + idMinuta);
}

function levantaPopup()

{
var option  = { 
				title:"Nueva Iniciativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:true,
				//autoSize:true,
				//width:515,
				width:500,
				height:500,
				scroll:0,
				//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
				dialogReturnValueCallback: callbackMethod,
				url:urlIniciativa
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}
function levantaPopupUrl(_url)
{
var option  = { 
				title:"RSAS - Minuta de Reuniones",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:560,
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}
function callbackMethod(dialogResult, returnValue) {

	if(dialogResult == SP.UI.DialogResult.ok)
	{ 
	if(typeof  $('#tableBody')!='undefined')
	{ 
		$('#tableBody').remove();
	}
	CargaTablaIniciativas();
	 
	}  	
}

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    
    
    if (results==null){
       return null;
        
    }
    else{
       return results[1] || 0;
       
    }
}


function CargaTablaIniciativas()
{

var CQ = "<Query><OrderBy><FieldRef Name='FieldName_D8B10BE4_14B0_4F20_A24' Ascending='False' /></OrderBy></Query>"

	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListaIniciativas,
		CAMLQuery: CQ,		
		completefunc: function(xData, Status)
		
						{
							var liHtml ="<tbody id='tableBody'>";
							 
							 if (Status == "success") 
							 
								{	
																		
									var strTitulo='';
									
									$(xData.responseXML).SPFilterNode("z:row").each(function() 
									{	
										strTitulo=$(this).attr("ows_Title");
										
										var cliente=$(this).attr("ows_Cliente").split(';#')[1].split('(')[0];
										var strSponsor=	$(this).attr("ows_Sponsor").split(';#')[1].split('(')[0];										
										var strNegocio=$(this).attr("ows_Negocio");
										var strDivision=$(this).attr("ows_Division");
										var strEstado=$(this).attr("ows_FlujoGes");
										var strFechaEntrega=$(this).attr("ows_Fecha_x0020_Entrega_x0020_Estima");
										
										var tdLink='';
										var estadoTerminada="";
										tdLink+="<td style='text-align:center;width:2%;'><a href=\"javascript:RetornaLinkPopupPDF(" + $(this).attr("ows_ID") + ")\"><IMG  alt=\"\" src=\"../SiteAssets/img/verdoc.png\" title='vista previa documento'></IMG></a></td>";
										
										liHtml =liHtml+ " <tr>" +  
										//"<td style='text-align:center;width:12%;'>" + $(this).attr("ows_ID") + "</td>" +
										"<td style='text-align:center;width:5%;'>" + strTitulo + "</td>" +
										"<td style='text-align:center;width:5%;'>" + cliente + "</td>" +
										"<td style='text-align:center;width:5%;'>" + strSponsor + "</td>" +
										"<td style='text-align:center;width:5%;'>" + strNegocio + "</td>" +										
										"<td style='text-align:center;width:5%;'>" + strDivision + "</td>" +
										"<td style='text-align:center;width:5%;'>" + strEstado + "</td>" +
										"<td style='text-align:center;width:5%;'>" + strFechaEntrega + "</td>" +
									
				
										"</tr>";									
									});
			    				}
				    	        
							$("#tablaIniciativas").append(liHtml+"</tbody>");
	    				}
	   });
	   
	

    $('#tablaIniciativas').DataTable( {
	  "dom": 'Rlfrtip'
	  ,"aaSorting": [[ 0, "desc" ]]
	    ,"bInfo": false
	    ,"destroy": true
	    ,"language": {
			            "lengthMenu": "ver _MENU_ registros por pagina",
			            "zeroRecords": "Sin resultados",
			            "info": "Showing page _PAGE_ of _PAGES_",
			            "infoEmpty": "Sin Registros",
			            "infoFiltered": "(filtered from _MAX_ total records)",
			            "search":         "Buscar:",
			            "paginate": {
								        "first":"Primero",
								        "last":"Ultimo",
								        "next":"Siguiente",
								        "previous":"Anterior"
    								}
        			}
        
    });

    

}


function OverrideModal(){   
SP.UI.ModalDialog.showModalDialog_old = SP.UI.ModalDialog.showModalDialog;
SP.UI.ModalDialog.showModalDialog = function(options){
    options.autoSize = true;
    options.dialogReturnValueCallback = function(dialogResult){
        SP.UI.ModalDialog.RefreshPage(dialogResult);
        $("body").css("overflow","auto");
    };
    $("body").css("overflow","hidden");
    SP.UI.ModalDialog.showModalDialog_old(options);
};

$("a[id^=DlgClosed]").click(function(){
    $("body").css("overflow","auto");
});
}