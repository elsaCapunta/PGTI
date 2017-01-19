var guidListNegocio 		 = '{821D5F6C-F2AE-4681-A355-A97D8AAF375D}';
var guidListTipoOrganizacion = '{293C7015-C70A-4693-9E44-FD3A78C8372F}';
var guidListIniciativa 		 = '{2546F01E-08A8-4D85-A933-028731B71063}';
var guiListIniciativaEstado  = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';


var urlPantallaComprobacion  = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-pantalla-comprobacion.html';
var urlPantallaCorrecion	 = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-corregir-rechazar-iniciativa.html';
var urlVerHistorial 		 = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-popupVisualiza-Historial.html';
var urlPopUpAreaEspecialista = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-popup-confirmacion-arera-especialista.html';

var contDocIniciativa		 = 0;
var totalDocIniciativa		 = 0;
var idRegistro				 = '';
var cpref					 = 0;
var estado					 = '';
var fechaActual	 			 = new Date();

var iniciativaID 			 = '';

$(document).ready(function(){

	var queryStringValores = $().SPServices.SPGetQueryString();
		iniciativaID 		   = queryStringValores["ID"];
		
		cargaIniciativa(iniciativaID);
		
		
		var args   = window.frameElement.dialogArgs;
			estado = args.estado;
			
			if(estado == 'AE'){
				$('#btnAceptar').hide();
				$('#btnModficar').hide();
			}
				
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
		listName: guidListIniciativa,
		CAMLQuery: CQ,
		completefunc: function (xData, Status) {
			//alert(Status);
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    	var id					= $(this).attr("ows_ID");
		    	var	tdNombre   			= $(this).attr("ows_Nombre");
		    	var fchaEstimacion		= $(this).attr("ows_FechaEstimacion");
		    	
		    	debugger;
		    	if($(this).attr("ows_Author") !='' && typeof $(this).attr("ows_Author") !='undefined'){
		    		var	tdResponsable   	= $(this).attr("ows_Author").split(';#')[1];
		    	}else{
		    		var	tdResponsable   	= '';
		    	}
		    	
		    	if($(this).attr("ows_Cliente") !='' && typeof $(this).attr("ows_Cliente") !='undefined'){
		    		var	tdCliente	= $(this).attr("ows_Cliente").split(';#')[1]; 
		    	}else{
		    		var	tdCliente	= '';
		    	}
		    	
		    	if($(this).attr("ows_Sponsor") !='' && typeof $(this).attr("ows_Sponsor") !='undefined'){
		    		var	tdSponsor  	= $(this).attr("ows_Sponsor").split(';#')[1]; 
		    	}else{
		    		var	tdSponsor	= '';
		    	}
		    	
		    	if($(this).attr("ows_Negocio") !='' && typeof $(this).attr("ows_Negocio") !='undefined'){
		    		var	tdNegocio  			= $(this).attr("ows_Negocio").split(';#')[1]; 
		    	}else{
		    		var	tdNegocio	= '';
		    	}
		    	
		    	if($(this).attr("ows_TipoOrganizacion") !='' && typeof $(this).attr("ows_TipoOrganizacion") !='undefined'){
		    		var	tdTipoOrganizacion	= $(this).attr("ows_TipoOrganizacion").split(';#')[1]; 
		    	}else{
		    		var	tdTipoOrganizacion	= '';
		    	}
		    	
		    	var strOrganizacion		='';		    	
		    	
		    	if($(this).attr("ows_Organizacion") !='' && typeof $(this).attr("ows_Organizacion")!='undefined'){
		    		var Organizacion	    = $(this).attr("ows_Organizacion").split(';#');
		    	}else{
		    		var Organizacion	    = '';
		    	}
		    	
		    	
				for (i = 1; i < Organizacion.length; i++) {
					//debugger;
					if(typeof Organizacion[i] != 'number'){					
						strOrganizacion = strOrganizacion +Organizacion[i]+'<br />';
					}
					i++;
				} 

		    	
		    	
		    	if(typeof $(this).attr("ows_CostoServicios") != 'undefined'){
		    		var CostoServicio		= $(this).attr("ows_CostoServicios").split('.')[0];
		    	}else{
		    		var CostoServicio		= 0;
		    	}
		    	
		    	if(typeof $(this).attr("ows_CostoInfraestructura") != 'undefined'){
		    		var CostoInfraestructura= $(this).attr("ows_CostoInfraestructura").split('.')[0];
		    	}else{
		    		var CostoInfraestructura= 0;
		    	}
		    	
		    	if(typeof $(this).attr("ows_CostoLicencias") != 'undefined'){
		    		var CostoLicencia		= $(this).attr("ows_CostoLicencias").split('.')[0];
		    	}else{
		    		var CostoLicencia		= 0;
		    	}

				if(typeof $(this).attr("ows_CostoLogistica") != 'undefined'){
		    		var CostoLogistica		= $(this).attr("ows_CostoLogistica").split('.')[0];
		    	}else{
		    		var CostoLogistica		= 0;
		    	}

		    	if(typeof $(this).attr("ows_CostoContingencia") != 'undefined'){
		    		var CostoContingencia	= $(this).attr("ows_CostoContingencia").split('.')[0];
		    	}else{
		    		var CostoContingencia		= 0;
		    	}
				
				if(typeof $(this).attr("ows_OtrosCostos") != 'undefined'){
		    		var OtrosCostos			= $(this).attr("ows_OtrosCostos").split('.')[0];
		    	}else{
		    		var OtrosCostos		= 0;
		    	}
			
				if(typeof $(this).attr("ows_CostoSistemaProduccion") != 'undefined'){
		    		var CostoProduccion		= $(this).attr("ows_CostoSistemaProduccion").split('.')[0];
		       	}else{
		    		var CostoProduccion		= 0;
		    	}
	
				if(typeof $(this).attr("ows_OtrosCostosOperacion") != 'undefined'){
		    		var OtrosCostosOpera	= $(this).attr("ows_OtrosCostosOperacion");
		       	}else{
		    		var OtrosCostosOpera		= '';
		    	}
		    	var Meses				= $(this).attr("ows_TiempoEstimado").split('.')[0];
		    	var FechaInicio			= $(this).attr("ows_FechaInicio");
		    	var tdAreaEspecialista  = $(this).attr("ows_AreaEspecialista").split(';#')[1];


		    	
		    	getAttachmentFiles(guidListIniciativa,id,printAttachmentsCompromisos);

				
				console.log($(this).attr("ows_Organizacion"));
				
				
				$('#responsableIniciativa').text(tdResponsable);
				$('#txtNombre').val(tdNombre);
				$('#txtCliente').val(tdCliente);
				$('#txtSponsor').val(tdSponsor);
				$('#txtNegocioCliente').val(tdNegocio);
				$('#txttipoOrganizacion').html(strOrganizacion);
				$('#txtAreaEspecialista').val(tdAreaEspecialista);
				$('#fchaEstimacion').val(moment(fchaEstimacion).format('DD/MM/YYYY'));
				
				
				$('#inputCostosServicios').val(CostoServicio);
				$('#inputCostoLogistica').val(CostoLogistica);
				$('#inputCostoInfraestructura').val(CostoInfraestructura);
				$('#inputCostoContingencia').val(CostoContingencia);
				$('#inputCostoLicencias').val(CostoLicencia);
				$('#inputOtrosCostos1').val(OtrosCostos);
				$('#inputCostoProduccion').val(CostoProduccion);
				
				var total = parseInt(CostoServicio)+parseInt(CostoLogistica)+parseInt(CostoInfraestructura)+parseInt(CostoContingencia)+parseInt(CostoLicencia);
				$('#inputTotal').val(total);
				
				$('#inputOtrosCostos').text(OtrosCostosOpera);
				$('#inputEstimacionMeses').val(Meses);
				$('#fchainicio').val(moment(FechaInicio).format('DD/MM/YYYY'));
				
				
			});
			
		}
    });
   



}


/*********************************** INICIO FUNCIONES MOSTRAR ARCHIVOS **********************************************/

function getAttachmentFiles(listName,listItemId,complete){

	$("#documentosAnterioresIniciativa").empty();
   	$().SPServices({
        operation: "GetAttachmentCollection",
        async: false,
        listName: listName,
        ID: listItemId,
        completefunc: function(xData, Status) {
            var attachmentFileUrls = [];    
            $(xData.responseXML).find("Attachment").each(function() {
               var url = $(this).text();
               attachmentFileUrls.push(url);
            });
            complete(attachmentFileUrls);
        }
   });
   
}

function printAttachmentsCompromisos(urls){
//debugger;
	for(var i =0; i< urls.length; i++){
        console.log(urls[i]); 
        var nombreDoc=urls[i].split('/').pop();
		var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a></div>"
		//var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a><img class='icono_eliminarDoc'  style='background-image:url(\"../SiteAssets/img/btn-cancela.png\"); width:15px;height:15px;vertical-align: middle; ' onclick='eliminarDocCompromisos($(this))'/></div>"
		$("#documentosAnterioresIniciativa").append(tag);
    
    };    
}


/************************************************************ FIN FUNCIONES MOSTRAR ARCHIVOS *******************************************************************/



/******************************************************** INICIO FUNCIONES DE LEVANTA POPUP   ******************************************************************/

function VerHistorial(){
	levantaPopupHistorial();
}

function RetornapopupAreaespecialista(){
	levantaPopupAsignaAreaEspecialista();
}

function RetornaPopUpCorreccion(){
	levantaPopupCorrecion();
}


function levantaPopupCorrecion(){

	var option  = { 
					title:"Correción de Iniciativa",
					allowMaximize:false,
					showMaximized:false,
					showClose:false,
					//autoSize:true,
					//width:515,
					width:480,
					height:220,
					scroll:0,
					args: {	
							estado:'RGIC',
							id: iniciativaID,
							//etapa:'VC'
						  },
					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlPantallaCorrecion+'?ID='+iniciativaID 
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}





function levantaPopupHistorial(){

	var option  = { 
					title:"Historial",
					allowMaximize:false,
					showMaximized:false,
					showClose:false,
					//autoSize:true,
					//width:515,
					width:800,
					height:300,
					scroll:0,
					args: {	
							id: iniciativaID
						  },
					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlVerHistorial
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupAsignaAreaEspecialista(){

	var option  = { 
					title:"Área Especialista",
					allowMaximize:false,
					showMaximized:false,
					showClose:false,
					autoSize:false,
					width:500,
					height:160,
					scroll:0,
					args: {	
							id: iniciativaID,
							estado:'RGI'
						  },
					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlPantallaComprobacion+'?ID='+iniciativaID

				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}



function callbackMethod(dialogResult, returnValue) {
	if(dialogResult == 0){
			
	}else{
		
		SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
	}

}



/********************************************** FIN FUNCIONES DE LEVANTA POPUP   ******************************************************************/




/******************************************* INICIO FUNCIONES ACEPTA ****************************************************/

function validaDatos(){

					
}

function registraIniciativa(){
	registraSolicitud();
	grabarDocumentosIniciativa(iniciativaID);
	Cerrar();
	 

}

function registraSolicitud(){

	AddList(guiListIniciativaEstado,[
									['IniciativaID',iniciativaID],
									['Estado','Aprobada cliente'],
									['Comentario','Aprobada cliente']
									]); 
									
	UpdateList(guidListIniciativa,[
									["Estado", 'Aprobada cliente']
									]);


}

function AddList(lista, datos){  // uptade datos lista

	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "New",
	        listName: lista,
	        ID:iniciativaID,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	        	
	        	if(Status=='success'){
	        			
				}
				
	       }
	     });


}

function UpdateList(lista, datos){  // uptade datos lista

	
	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "Update",
	        listName: lista,
	       // CAMLQuery: CQ,
	        ID:iniciativaID,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	       	if(Status=='success'){
	       		eliminarDocAntiguosCompromisos();	
	       	}

	       
	       }
	     });


}



/******************************************* FIN FUNCIONES ACEPTA ****************************************************/



/********************************************** INICIO FUNCIONES DE LOS BOTONES   ******************************************************************/

function Aprueba(){

	validaDatos();
}

function Corrige(){

	levantaPopupCorrecion();
}

function Rechaza(){

	levantaPopupRechaza();
}


function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
}


/********************************************** FIN FUNCIONES DE LOS BOTONES   ******************************************************************/


