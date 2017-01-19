var guidListIniciativa 		= '{2546F01E-08A8-4D85-A933-028731B71063}';
var guiListIniciativaEstado = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';
var idIncidencia = '';
var thisUserAccount = '';

$(document).ready(function(){	

var args   = window.frameElement.dialogArgs;
			idIncidencia = args.id;
			
	thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
	

	CargaHistoria(idIncidencia);	
});

function CargaHistoria(id){
	
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='IniciativaID' />"
			         +"<Value Type='Number'>"+id+"</Value>"
			      +"</Eq>"
			   +"</Where>"
			+"</Query>";  


	$().SPServices({	
		operation: "GetListItems",
		async: false,
		listName: guiListIniciativaEstado,
		CAMLQuery:CQ, 
		completefunc: function(xData, Status){
						
						var liHtml ="<tbody id='tableBody'>";
						
						
						if (Status == "success"){
						debugger;
								var contador=parseInt($(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount"));
								
									$(xData.responseXML).SPFilterNode("z:row").each(function() {
									
										var tdEstado 	 = $(this).attr("ows_Estado");
										
										if(typeof $(this).attr("ows_Comentario") != 'undefined'){
											var tdComentario = $(this).attr("ows_Comentario");
										}else{
											var tdComentario = '';
										}
										//alert($(this).attr("ows_Modificador"));
										if(typeof $(this).attr("ows_usuarioEditor") != 'undefined'){
											var editor 	 	 = $(this).attr("ows_usuarioEditor").split('(')[0];
										}else{
											var editor 	 	 ='';
										}
										
										if(typeof $(this).attr("ows_Responsable") != 'undefined'){
											var tdResponsable = $(this).attr("ows_Responsable");
										}else{
											var tdResponsable ='';
										}

										
										
										var datos		 = ConsultaDatos(id);
										var tdCreador	 = datos[0];
										var tdFcha 		 = datos[1];
										
										liHtml =liHtml
										liHtml+="<tr>";
										liHtml+="<td style='width:20%;text-align:left;'>"+editor+"</td>";
										liHtml+="<td style='width:20%;text-align:left;'>"+tdEstado +"</td>";
										liHtml+="<td style='width:20%;text-align:left;'>"+tdComentario+"</td>";
										liHtml+="<td style='width:20%;text-align:left;'>"+tdResponsable+"</td>";
										liHtml+="<td style='width:20%;text-align:right;'>"+tdFcha+"</td>";
										liHtml+="</tr>";
									});		
									
								}
						$("#tblhistorial").append(liHtml+"</tbody>");
				}
		});

}

function ConsultaDatos(id){

	var datos = new Array();
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
		listName: guidListIniciativa,
		CAMLQuery:CQ, 
		completefunc: function(xData, Status){
						
			if (Status == "success"){
				$(xData.responseXML).SPFilterNode("z:row").each(function() {
				
					var autor 	 	 = $(this).attr("ows_Author").split(';#')[1];
					var fchaCreacion = $(this).attr("ows_Created");
				
					datos.push(autor);
					datos.push(moment(fchaCreacion).format('DD/MM/YYYY'));
					
				});		
				
			}
				
		}
	});
	
	return datos;

}

function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel,'cancelar');

}

