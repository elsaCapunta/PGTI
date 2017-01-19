var guidListNegocio 		 = '{821D5F6C-F2AE-4681-A355-A97D8AAF375D}';
var guidListTipoOrganizacion = '{293C7015-C70A-4693-9E44-FD3A78C8372F}';
var guidListIniciativa 		 = '{2546F01E-08A8-4D85-A933-028731B71063}';
var guiListIniciativaEstado  = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';

var urlPantallaComprobacion  = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-pantalla-comprobacion.html';
var urlPantallaCorrecion	 = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-corregir-rechazar-iniciativa.html';
var urlVerHistorial 		 = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-popupVisualiza-Historial.html';

var contDocIniciativa		 = 0;
var totalDocIniciativa		 = 0;
var idRegistro				 = '';
var cpref					 = 0;
var estado					 = '';
var fechaActual	 			 = new Date();

var iniciativaID 			 = '';
var templateId 				 = '';
var thisUserAccount 		 = '';
var nombreDoc				 = '';

$(document).ready(function(){

	var queryStringValores = $().SPServices.SPGetQueryString();
		iniciativaID 		   = queryStringValores["ID"];
		
	thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
	
	templateId = traeIdTemplate();
	cargaIniciativa(iniciativaID);
			
		
		var args   = window.frameElement.dialogArgs;
			estado = args.estado;
			//alert(estado);
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
		    	
		    	if(typeof $(this).attr("ows_Author")!='' && typeof $(this).attr("ows_Author")!='undefined'){
		    		var	tdResponsable   	= $(this).attr("ows_Author").split(';#')[1];
		    	}else{
		    		var	tdResponsable   	= '';
		    	}
		    	
		    	if(typeof $(this).attr("ows_Cliente")!='' && typeof $(this).attr("ows_Cliente")!='undefined'){
		    		var	tdCliente  	= $(this).attr("ows_Cliente").split(';#')[1]; 
		    	}else{
		    		var	tdCliente	= '';
		    	}
		    	
		    	if(typeof $(this).attr("ows_Sponsor")!='' && typeof $(this).attr("ows_Sponsor")!='undefined'){
		    		var	tdSponsor 	= $(this).attr("ows_Sponsor").split(';#')[1]; 
		    	}else{
		    		var	tdSponsor	= '';
		    	}
		    	
		    	if(typeof $(this).attr("ows_Negocio")!='' && typeof $(this).attr("ows_Negocio")!='undefined'){
		    		var	tdNegocio  	= $(this).attr("ows_Negocio").split(';#')[1];
		    	}else{
		    		var	tdNegocio	= '';
		    	}
		    	
		    	if(typeof $(this).attr("ows_TipoOrganizacion")!='' && typeof $(this).attr("ows_TipoOrganizacion")!='undefined'){
		    		var	tdTipoOrganizacion	= $(this).attr("ows_TipoOrganizacion").split(';#')[1];
		    	}else{
		    		var	tdTipoOrganizacion	= '';
		    	}
		    	
		    	if(typeof $(this).attr("ows_Organizacion")!='' && typeof $(this).attr("ows_Organizacion")!='undefined'){
		    		var Organizacion	    = $(this).attr("ows_Organizacion").split(';#');
		    	}else{
		    		var	Organizacion	= '';
		    	}
		    	
		    	var strOrganizacion		='';

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

		    	
		    	var Meses				= $(this).attr("ows_TiempoEstimado").split('.')[0]; //
		    	var FechaInicio			= $(this).attr("ows_FechaInicio");
		    	var tdAreaEspecialista  = $(this).attr("ows_AreaEspecialista").split(';#')[1];


		    	

		    	
		    	getAttachmentFiles(guidListIniciativa,id,printAttachmentsCompromisos);

				
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
	var contador = 1;
	
	if(urls.length >= 2){
		$("#imgClip").hide();
	}
	for(var i =0; i< urls.length; i++){
        console.log(urls[i]); 
        nombreDoc=urls[i].split('/').pop();
		//var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a></div>"
		var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a><img class='icono_eliminarDoc'  style='background-image:url(\"../SiteAssets/img/btn-cancela.png\"); width:15px;height:15px;vertical-align: middle; ' onclick='eliminarDocCompromisos($(this))'/></div>"
		$("#documentosAnterioresIniciativa").append(tag);
    	contador++;
    };
    console.log(contador);
	/*if(contador >= 2){
		$("#imgClip").hide();
	}   */ 
}

function eliminarDocCompromisos(obj){
//debugger;
	var url=obj.parent().children("a:first").attr("href");
	obj.parent().remove();
	$("#documentosEliminadosIniciativa").text($("#documentosEliminadosIniciativa").text()+";"+url);
	
}

function eliminarDocAntiguosCompromisos(){
debugger;
	console.log('eliminarDocAntiguosCompromisos');
		var urls=$("#documentosEliminadosIniciativa").text().split(";");
		for(i=1;i<urls.length;i++){
			deleteFile(iniciativaID,urls[i],guidListIniciativa);
		}

		$("#documentosAnterioresIniciativa").empty();
		$("#documentosEliminadosIniciativa").empty(); 
	
	
	
	
}


function gatillaInputComp(){
	//if(($("#sltEstado").val()!='2')&&($("#sltEstado").val()!='4')){
			$("#documentosAdjuntosIniciativa input:last-child").click();
	//}
}

function grabarDocumentosIniciativa(idInci){	

	   console.log('grabarDocumentosIniciativa');
	  	
		   contDocMinuta=0;
		   totalDocMinuta=$("#documentosAdjuntosIniciativa input").length-1;
		  
		   if(totalDocMinuta > 0){
	//debugger;
		    /*----------- este evento permite adjuntar documentos en los compromisos---------------*/		
		    	//var cantidad_input=$("#documentosAdjuntosComp input").length;
				var cantidad_input= parseInt($("#lista_iniciativa div:last-child").attr("numero"));
		    	for(i=0;i<cantidad_input;i++){
			    		if($("#documentosAdjuntosIniciativa #doc"+i).length>0){	
				    		var files=$("#documentosAdjuntosIniciativa #doc"+i).prop('files');
				    		handleFileChange(guidListIniciativa,iniciativaID,files);
			    		}
			    	}
			  
		    	/*------------se reinician los campos-----------------*/
		    $("#lista_iniciativa").empty();
			$("#documentosAdjuntosIniciativa").empty();
			$("#documentosAdjuntosIniciativa").append("<input type='file' id='doc0' numero='0' onchange='nuevoInput($(this))' style='display:none'>");
		    	/*----------------------------------------------------*/
	  	}else{
	  		registraSolicitud();
            $('#cargando').hide();
            alert('Gestión de iniciativa - responsable documento aprobada.');
            Notifica(iniciativaID);
            Cerrar();
	  	
	  	}


}


function deleteFile( itemID, fileRef, listName ) {
	
	
	//debugger;
	console.log('intenta eliminar:'+fileRef);
	try{
			$().SPServices({
				async: false,
			    operation: "DeleteAttachment",
			    listName: listName ,
			    listItemID: itemID, //list item id
			    url: fileRef, //url of attachment that needs to be deleted
			    completefunc: function (xData, Status) {
			    	if(Status=='success'){
			    		
			    		console.log('Deleted');
			    		
			    	}
			        
			        
			        
			    }
			});		
		}
	catch(ex){}
}

function handleFileChange(listName,itemId,files){
try{
console.log("handleFileChange");

    //debugger;
    var filereader = {},
    file = {},
    i=0;
    //loop over each file selected
    /*------------manejo de prefijo-------------*/
  /*  var prefijo=$.now()+"_";
    var prefijo2="";
    if(cpref<10){
    	prefijo2="0"+cpref;
    }
    else{
    	prefijo2=cpref;
    }
    prefijo=prefijo2+prefijo;
    cpref++; */
    /*---------------------------------------------*/
    file = files[0];			

    filereader = new FileReader();			
    filereader.filename =file.name;
  //  filereader.filename =prefijo+ file.name;

    filereader.onload = function() {				
	    var data = this.result,						
	    n=data.indexOf(";base64,") + 8; 
	     //removing the first part of the dataurl give us the base64 bytes we need to feed to sharepoint
	     data= data.substring(n);
		 console.log('name attachment:',filereader.filename);
	     $().SPServices({
            	async: false,
                operation: "AddAttachment",					
                listName: listName,
                listItemID:itemId,
                fileName: this.filename,
                attachment: data,
                completefunc: function (xData, Status) {
                if(Status=='success')
                {                    
                   
                   contDocMinuta++;
                   registraSolicitud();
                   $('#cargando').hide();
                   alert('Gestión de iniciativa - responsable documento aprobada.');
                   Notifica(iniciativaID);
                   Cerrar();
                }
                 	
                   
                }
           });	  				
        };

        filereader.onabort = function() {
            alert("Se ha abortado la carga del documento.");
            
        };

        filereader.onerror = function(e) {
            alert("Ha ocurrido un error en la carga del documento.");
            console.log('Error:'+e.target.error.message);		
        };				
		
        //fire the onload function giving it the dataurl
        filereader.readAsDataURL(file);	
}
catch(ex){
	
	alert("Ha ocurrido un error en la carga del documento.");
	
}    
};









/************************************************************ FIN FUNCIONES MOSTRAR ARCHIVOS *******************************************************************/



/******************************************************** INICIO FUNCIONES DE LEVANTA POPUP   ******************************************************************/


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
							estado:'VCC',
							id: iniciativaID,
							//etapa:'VC'
						  },
					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlPantallaCorrecion+'?ID='+iniciativaID
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupRechaza(){

	var option  = { 
					title:"Rechazo de Iniciativa",
					allowMaximize:false,
					showMaximized:false,
					showClose:false,
					//autoSize:true,
					//width:515,
					width:480,
					height:220,
					scroll:0,
					args: {	
							estado:'VCR',
							id: iniciativaID,
							//etapa:'VC'
						  },
					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlPantallaCorrecion+'?ID='+iniciativaID
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}



function callbackMethod(dialogResult, returnValue) {
	if(dialogResult == 0){
			
	}else{
		
		SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
	}
}



function VerHistorial(){

	levantaPopupHistorial();
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
					//dialogReturnValueCallback: callbackMethod,
					url:urlVerHistorial
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}





/********************************************** FIN FUNCIONES DE LEVANTA POPUP   ******************************************************************/




/******************************************* INICIO FUNCIONES ACEPTA ****************************************************/

function validaDatos(){

$('#cargando').hide();
console.log("validaDatos");
var nombreFile=$('#lista_iniciativa div span').text();//bueno


		var emptyTest = $('#documentosAnterioresIniciativa').is(':empty');
		if(emptyTest){
			totalDocIniciativa=$("#documentosAdjuntosIniciativa input").length-1;
			if(totalDocIniciativa == 0){
				$('#cargando').hide();
				alert( "Debe adjuntar un archivo \n");
			}else{
				registraIniciativa();
			}
		}else{
			if(nombreFile==nombreDoc){
			$('#cargando').hide();
				alert('El nombre del documento adjunto debe ser distinto al anterior');
			}else{
				registraIniciativa();
			}
		}			
}

function registraIniciativa(){
	
	console.log('registraIniciativa');
	grabarDocumentosIniciativa(iniciativaID);
	
	
	
	 

}

function registraSolicitud(){
//debugger;
console.log("registraSolicitud");
		var fechaActual = new Date();
		
		var Datos		  		= traeIdEstado();
		var FechaEstadoAnterior = Datos[0];
		var idEstado 			= Datos[1];
		var EstadoId			= parseInt(idEstado);

		
		var dateA	= moment(fechaActual).format('YYYY-MM-DD');
		var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
		
		var d = moment(dateA).diff(moment(dateB), 'day');

	UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
	AddList(guiListIniciativaEstado,[
									['IniciativaID',iniciativaID],
									['Estado','Aprobada cliente'],
								//	['Comentario','Aprobada cliente'],
									['Responsable','PMO'],
									["usuarioEditor",thisUserAccount],
									["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
									]); 
									
	UpdateList(guidListIniciativa,[["Estado", 'Aprobada cliente']],iniciativaID);
	eliminarDocAntiguosCompromisos();
									
	

}

function traeIdEstado(){
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='IniciativaID' />"
			        +" <Value Type='Number'>"+iniciativaID+"</Value>"
			      +"</Eq>"
			   +"</Where>"
			   +"<OrderBy>"
			      +"<FieldRef Name='ID' Ascending='False' />"
			   +"</OrderBy>"
			+"</Query>";
			
	var Datos = new Array(); 
			
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guiListIniciativaEstado,
		CAMLQuery: CQ,
		CAMLRowLimit: 1,  
		completefunc: function(xData, estado)
						{
							if(estado=="success")
							{
								
								$(xData.responseXML).SPFilterNode("z:row").each(function() 
								{
									var fchaEstado = $(this).attr("ows_fechaEstado");
									var id		   = $(this).attr("ows_ID");
									
									
									
									Datos.push(fchaEstado );
									Datos.push(id);

								})
							}
						}
	});

	return Datos;
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

function UpdateList(lista, datos,id){  // uptade datos lista

	
	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "Update",
	        listName: lista,
	       // CAMLQuery: CQ,
	        ID:id,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	       	if(Status=='success'){
	       		console.log('success UpdateList')
	       			
	       	}

	       
	       }
	     });


}



function validaIntervalos(){
	if(contDocIniciativa>=totalDocIniciativa){
		alert('Iniciativas Aprobada.');
		Cerrar();
	}
	else{
		setTimeout(validaIntervalos, 500);
	}
}



/******************************************* FIN FUNCIONES ACEPTA ****************************************************/



/********************************************** INICIO FUNCIONES DE LOS BOTONES   ******************************************************************/

function Aprueba(){
	$('#cargando').show();
	
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


function Notifica(IID) {

var IURL= window.location.protocol + '//' + window.location.host +
		//  '/sites/gadt/direcciones/dc/contabilidad/fape/Lists/FormularioDeEnajenacion/' + IID + '_.000';
		  '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Lists/Iniciativas/' + IID + '_.000';
var WFParameters= "<Data></Data>";
// workflowParameters: "<root />",
  $().SPServices({
  					async: false,
				    operation: "StartWorkflow",
				    item: IURL,
				    templateId: templateId,
				    workflowParameters: WFParameters,
				    completefunc: function(xData, Status){
					     if(Status == 'success')
					     {
					     	//alert(Status);
					     }
				    }
  });
}


