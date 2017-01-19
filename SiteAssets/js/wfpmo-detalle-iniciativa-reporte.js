var GuidListaIniciativas		='{2546F01E-08A8-4D85-A933-028731B71063}';
var GuidListInniciativasEstados ='{5D79A550-A47E-4BF6-98A6-5EEE92312861}';

var iniciativaID = '';
var fechaActual = new Date();


$(document).ready(function(){
	
	var queryStringValores = $().SPServices.SPGetQueryString();
		iniciativaID 		   = queryStringValores["ID"];
	
	cargaIniciativa(iniciativaID);
	cargaEstadosIniciativa(iniciativaID);
	
});


function cargaIniciativa(id){

		var CQ = "<Query>"
				   +"<Where>"
				      +"<Eq>"
				         +"<FieldRef Name='ID' />"
				         +"<Value Type='Counter'>"+id+"</Value>"
				      +"</Eq>"
				   +"</Where>"
				+"</Query>";
		
		$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListaIniciativas,
		CAMLQuery: CQ,
		completefunc: function (xData, Status) {
			//alert(Status);
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    	var id					= $(this).attr("ows_ID");
		    	var tdCorrelativo       = $(this).attr("ows_Correlativo");
		    	var	tdResponsable   	= $(this).attr("ows_Author").split(';#')[1];
		    	var	tdNombre   			= $(this).attr("ows_Nombre");
		    	var	tdCliente  			= $(this).attr("ows_Cliente").split(';#')[1]; 
		    	var	tdSponsor  			= $(this).attr("ows_Sponsor").split(';#')[1];
		    	
				$('#txtCorrelativo').text(tdCorrelativo);
				$('#txtResponsable').text(tdResponsable);
				$('#txtNombre').text(tdNombre);
				$('#txtCliente').text(tdCliente);
				$('#txtSponsor').text(tdSponsor);
				
				
			});
			
		}
    });
   
}

function cargaEstadosIniciativa(id){

		var CQ = "<Query>"
				   +"<Where>"
				      +"<Eq>"
				         +"<FieldRef Name='IniciativaID' />"
				         +"<Value Type='Counter'>"+id+"</Value>"
				      +"</Eq>"
				   +"</Where>"
				+"</Query>";
		var liHtml ="<tbody id='tableBody'>";
		$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListInniciativasEstados,
		CAMLQuery: CQ,
		completefunc: function (xData, Status) {
		
			//alert(Status);
				$(xData.responseXML).SPFilterNode("z:row").each(function() {
				
			    	var id			  = $(this).attr("ows_IniciativaID");
			    	var tdEstado      = $(this).attr("ows_Estado");
			    	var estadoFecha   = $(this).attr("ows_fechaEstado");
			    	var tdResponsable = $(this).attr("ows_Responsable");
			    	var tdAutor		  = TraeDatos(id);
			    	
			    	if(typeof $(this).attr("ows_Comentario") != 'undefined' ){
			    		var	tdComentario  = $(this).attr("ows_Comentario");
			    	}else{
			    		var	tdComentario  = '';
			    	}
			    	
			    	if(typeof  $(this).attr("ows_diasDeEstado") != 'undefined'){
			    		var diaEstado	  = $(this).attr("ows_diasDeEstado");
			    	}else{
			    		var dateA	= moment(estadoFecha).format('YYYY-MM-DD');
			    		var dateB	= moment(fechaActual ).format('YYYY-MM-DD');
	
						var diaEstado = moment(dateB).diff(moment(dateA), 'day');

			    	}
			    	
			    	if(($(this).attr("ows_Editor")!='') && (typeof $(this).attr("ows_Editor")!='undefined')){
						var	strEditor = $(this).attr("ows_Editor").split(';#')[1].split('(')[0];
					}else{
						var	strEditor = '';
					}
			    	
			    	
			    	
			    	liHtml =liHtml+ " <tr>"; 
					liHtml =liHtml+"<td style='text-align:left;width:15%;'>" + tdEstado+ "</td>";
					liHtml =liHtml+"<td style='text-align:left;width:20%;'>" + strEditor+ "</td>";
					liHtml =liHtml+"<td style='text-align:left;width:20%;'>" + tdComentario+ "</td>";
					liHtml =liHtml+"<td style='text-align:left;width:20%;'>" + tdResponsable+ "</td>";
					liHtml =liHtml+"<td style='text-align:right;width:10%;'>"+ diaEstado+"</td>";
					liHtml =liHtml+"<td style='text-align:right;width:15%;'>" + moment(estadoFecha).format('DD/MM/YYYY')+"</td>";
					liHtml =liHtml+"</tr>";	
				});
			$("#tblHistorial").append(liHtml+"</tbody>");
		}
		
	});

}


function TraeDatos(id){
		
		var Datos = '';
		var CQ = "<Query>"
				   +"<Where>"
				      +"<Eq>"
				         +"<FieldRef Name='ID' />"
				         +"<Value Type='Counter'>"+id+"</Value>"
				      +"</Eq>"
				   +"</Where>"
				+"</Query>";
		
		$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListaIniciativas,
		CAMLQuery: CQ,
		completefunc: function (xData, Status) {
			
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    
		    	Datos = $(this).attr("ows_Author").split(';#')[1];
		    	
			});
			
		}
    });
 
	return Datos;  
}


function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel,'cancel');
}

