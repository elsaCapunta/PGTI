var guidListNegocio 		 = '{821D5F6C-F2AE-4681-A355-A97D8AAF375D}';
var guidListTipoOrganizacion = '{293C7015-C70A-4693-9E44-FD3A78C8372F}';
var guidListIniciativa 		 = '{2546F01E-08A8-4D85-A933-028731B71063}';
var guidListIniciativaEstado = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';

var contDocIniciativa=0;
var totalDocIniciativa=0;
var idRegistro='';
//var cpref=0;
var idIniciativa = '';
var templateId = '';
var thisUserAccount ='';
$(document).ready(function(){

	var queryStringValores = $().SPServices.SPGetQueryString();
		idIniciativa		   = queryStringValores["ID"];
		
		//alert(idIniciativa);
		
		thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
	templateId = traeIdTemplate();
	funcionesFormulario();
	CargaSelect();
	cargaFomulario(idIniciativa)	
	
});


function CargaNegocioCliente(id){

	$("#sltNegocio").html('');
	//var idSelector = $("#sltTipoOrganizacion").val();
	creaSelectNegocio("sltNegocio",guidListNegocio,"ID","Nombre",id);
}


function cargaFomulario(id){

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
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    	//debugger;
		    	var	tdNombre 			= $(this).attr("ows_Nombre");      	
				var	tdCliente   		= $(this).attr("ows_Cliente");
				var tdSponsor			= $(this).attr("ows_Sponsor");
				var sltNegocioCliente	= $(this).attr("ows_Negocio").split(';#')[0];
				var sltTipoOrganizacion = $(this).attr("ows_TipoOrganizacion").split(';#')[0];
				var nomTipoOrganizacion = $(this).attr("ows_TipoOrganizacion").split(';#')[1];
				var Organizacion		= $(this).attr("ows_Organizacion").split(';#');
				var strOrganizacion		= new Array();
				
				for (i = 0; i < Organizacion.length; i++) {
					
					if(validaSoloNumerico(Organizacion[i])){					
						strOrganizacion.push(Organizacion[i]);
					}
					i++;
				}
				CargaNegocioCliente(sltTipoOrganizacion);
				
				//$("input[name='user']").pickSPUser("method", "add", '4;#John Smith');
				$('#txtNombre').val(tdNombre);
				$('#txtCliente').pickSPUser("method", "add", tdCliente);
				$('#txtSponsor').pickSPUser("method", "add", tdSponsor);
				$('#sltNegocio').val(sltNegocioCliente);
				$('#sltTipoOrganizacion').val(sltTipoOrganizacion);
			//	$('#sltOrganizacion').val(strOrganizacion);
				creaSelectCondicion('sltOrganizacion','{F0E40B09-8427-4458-80C7-44CB4DBA1F28}','ID','Nombre','TipoOrganizacion',sltTipoOrganizacion)
			//	$("#sltOrganizacion option[value='" + strOrganizacion + "']").prop("selected", true);
				$('#sltOrganizacion').val(strOrganizacion);
				
				
				getAttachmentFiles(guidListIniciativa,id,printAttachmentsCompromisos);
				$('#btnAdjuntarImg').hide();
				
				
			});
			
		}
    });
}

function validaSoloNumerico(cadena){

    var patron = /^\d*$/;
    if(!cadena.search(patron))
      return true;
    else
      return false;
} 

function funcionesFormulario(){

	$("#txtNombre").keyup(function() {
		var max_chars 	= 100;
    	var value  		= $(this).val();
        var chars1 		= $(this).val().length;        
        if (max_chars < chars1) {
        	 $(this).val(value.substring(0,max_chars));
        }
        chars1 			= $(this).val().length;
        var diff 		= max_chars - chars1;
        $('#contador1').html(diff +" Caracteres");
 
    });

	$("#txtCliente").pickSPUser({allowMultiples: false});
	$("#txtSponsor").pickSPUser({allowMultiples: false});
}

function CargaSelect(){
	
//	creaSelect("sltNegocio",guidListNegocio,"ID","Nombre");
	creaSelect("sltTipoOrganizacion",guidListTipoOrganizacion,"ID","Nombre");
	


}



/************************************************************  INICIO FUNCIONES DE SELECT **********************************************************************/

function creaSelect(nomObj,nomLista,campo1,campo2){
	var select = $("#"+nomObj+"");	
	var campo3 = campo2;
	var	filtro = "<Query><OrderBy><FieldRef Name='"+campo2+"' Ascending='True' /></OrderBy></Query>";
	
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: nomLista,
        CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
        CAMLQuery: filtro,
        completefunc: function (xData, Status) {
            if (Status == "success") {  
            	if(nomObj != "sltOrganizacion"){          
            		select.append("<option value='0' selected>Seleccione...</option>");
            	}
                $(xData.responseXML).SPFilterNode("z:row").each(function() {                 
                   select.append("<option value='"+$(this).attr("ows_"+campo1+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
                });
            }
        }
    });
}
function creaSelectCondicion(nomObj,nomLista,campo1,campo2,campoFiltro,valorFiltro){
	var select = $("#"+nomObj+"");	
	select.empty();
	var campo3 = campo2;
	var	filtro = "<Query><Where><Eq><FieldRef Name='" + campoFiltro + "' LookupId='TRUE' /><Value Type='Lookup'>" + valorFiltro + "</Value></Eq></Where><OrderBy><FieldRef Name='" + campo2 + "' Ascending='True' /></OrderBy></Query>";
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: nomLista,
        CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
        CAMLQuery: filtro,
        completefunc: function (xData, Status) {
            if (Status == "success") {  
            	if(nomObj != "sltOrganizacion"){          
            		select.append("<option value='0' selected>Seleccione...</option>");
            	}
                $(xData.responseXML).SPFilterNode("z:row").each(function() {                 
                   select.append("<option value='"+$(this).attr("ows_"+campo1+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
                });
            }
        }
    });
}

function creaSelectNegocio(nomObj,nomLista,campo1,campo2,id){ // carga select
	
		var select = $("#"+nomObj+"");
	
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Eq>"
				            +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				            +"<Value Type='Lookup'>"+id+"</Value>"
				         +"</Eq>"
				         +"<Eq>"
				            +"<FieldRef Name='Activo' />"
				            +"<Value Type='Boolean'>1</Value>"
				         +"</Eq>"
				     +"</And>"
				   +"</Where>"
				+"</Query>";

		
	    $().SPServices({
	        operation: "GetListItems",
	        async: false,
	        listName: nomLista,
	        CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
	        CAMLQuery: CQ,
	        completefunc: function (xData, Status) {
	        
				if(id==1){
					select.append("<option value='0'>Seleccionar...</option>");
				}	        		
	                $(xData.responseXML).SPFilterNode("z:row")
	                	.each(function() {   
	                   		//select.append("<option value='"+$(this).attr("ows_"+campo2+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                   		select.append("<option value='"+$(this).attr("ows_"+campo1+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                });
	        }
	    });
}



/*********************************************************  FIN FUNCIONES DE SELECT ****************************************************************************/




/********************************************************** INICIO FUNCIONES CARGAR ARCHIVOS *******************************************************************/
function gatillaInputIniciativa(){
	$("#documentosAdjuntosIniciativa input:last-child").click();
}


function validaIntervalos(){
	if(contDocIniciativa>=totalDocIniciativa){
		$("#cargando").hide();
		alert('Iniciativa Modificada.');
		Notifica(idIniciativa);
		Cerrar();
	}
	else{
		setTimeout(validaIntervalos, 500);
	}
}

function grabarDocumentosIniciativa(idIniciativa){
	   contDocIniciativa=0;
	   errorDocIniciativa=false;
	   totalDocIniciativa=$("#documentosAdjuntosIniciativa input").length-1;
	    /*----------- este evento permite adjuntar documentos en la minuta---------------*/		
	    //if($.trim(strEstadoMinuta)!='Terminado'){

	    	//var cantidad_input=$("#documentosAdjuntosMinuta input").length;
			var cantidad_input= parseInt($("#lista_iniciativa div:last-child").attr("numero"));
	    	for(i=0;i<cantidad_input;i++){
	    		if($("#documentosAdjuntosIniciativa #doc"+i).length>0){	
		    		var files=$("#documentosAdjuntosIniciativa #doc"+i).prop('files');
		    		handleFileChangeIniciativa(guidListIniciativa,idIniciativa,files);
	    		}
	    	}
	    	/*------------se reinician los campos-----------------*/
		    $("#lista_iniciativa").empty();
			$("#documentosAdjuntosIniciativa").empty();
			$("#documentosAdjuntosIniciativa").append("<input type='file' id='doc0' numero='0' onchange='nuevoInputIniciativa($(this))' style='display:none'>");
	    	/*----------------------------------------------------*/
	    //}
	    console.log('Sale de GrabarDocumentosIniciativa');
}



function handleFileChangeIniciativa(listName,itemId,files){
try{
    $("#spinner").show();
    $("#btn_clip").hide();
    
    var filereader = {},
    file = {},
    i=0;
    //loop over each file selected
    /*------------manejo de prefijo-------------*/
   /* var prefijo=$.now()+"_";
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
    //filereader.filename =prefijo+ file.name;
    filereader.filename =file.name;
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
                if(Status=='success'){                    
                   contDocIniciativa++;
                   
                }
                 	
                }
           });	  				
        };

        filereader.onabort = function() {
            alert("Se ha abortado la carga del documento.");
            $("#spinner").hide();
   			$("#btn_clip").show();
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
	$("#spinner").hide();
    $("#btn_clip").show();
}    
};

function deleteFile( itemID, fileRef, listName ) {
	console.log('intenta eliminar:'+fileRef);
	try{
			$().SPServices({
				async: false,
			    operation: "DeleteAttachment",
			    listName: listName ,
			    listItemID: itemID, //list item id
			    url: fileRef, //url of attachment that needs to be deleted
			    completefunc: function (xData, Status) {
			    
			        console.log('Deleted');
			    }
			});		
		}
	catch(ex){}
}




/*************************************************************** FIN FUNCIONES CARGAR ARCHIVOS *****************************************************************/



/*************************************************************** INICIO FUNCIONES MOSTRAR ARCHIVOS *************************************************************/

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
		//var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a></div>"
		var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a><img class='icono_eliminarDoc'  style='background-image:url(\"../SiteAssets/img/btn-cancela.png\"); width:15px;height:15px;vertical-align: middle; ' onclick='eliminarDocCompromisos($(this))'/></div>"
		$("#documentosAnterioresIniciativa").append(tag);
    
    };    
}

function eliminarDocCompromisos(obj){
//debugger;
	var url=obj.parent().children("a:first").attr("href");
	obj.parent().remove();
	$("#documentosEliminadosIniciativa").text($("#documentosEliminadosIniciativa").text()+";"+url);
	
}

function eliminarDocAntiguosCompromisos(){
		var urls=$("#documentosEliminadosIniciativa").text().split(";");
		for(i=1;i<urls.length;i++){
			deleteFile(idIniciativa,urls[i],guidListIniciativa);
		}

	$("#documentosAnterioresIniciativa").empty();
	$("#documentosEliminadosIniciativa").empty();

}




/*************************************************************** FIN FUNCIONES MOSTRAR ARCHIVOS ****************************************************************/




/*************************************************************** INICIO FUNCIONES BOTONES **********************************************************************/

function Guardar(){

	$("#cargando").show();
	validaCampos();	
	
}

function validaCampos(){
	
	var validacion ="";
		
		if(($("#txtNombre").val() == '')){
			validacion += "Debe ingresar Nombre de la Iniciativa \n";
		}
		if(($("#txtCliente").val() == '')){
			validacion += "Debe ingresar Cliente \n";
		}
		if(($("#txtSponsor").val() == '')){
			validacion += "Debe ingresar Sponsor \n";
		}
		if(($("#sltNegocio").val() == 0)){
			validacion += "Debe seleccionar un Negocio \n";
		}
		if($("#sltTipoOrganizacion").val() == 0){
			validacion += "Debe seleccionar un Tipo de Organización \n";
		}
		if($("#sltOrganizacion").val() == null){
			validacion += "Debe seleccionar una Organización \n";
		}
				
		var emptyTest = $('#documentosAnterioresIniciativa').is(':empty');
		if(emptyTest){
			totalDocIniciativa=$("#documentosAdjuntosIniciativa input").length-1;
			if(totalDocIniciativa == 0){
				validacion += "Debe adjuntar un archivo \n";
			}
		}


		if(validacion==""){
			registraSolicitud();
			grabarDocumentosIniciativa(idIniciativa);
			agregaEstado();
	       	eliminarDocAntiguosCompromisos();
			validaIntervalos(); 
			

		}else{	
			$("#cargando").hide();

			alert(validacion);
			
		}

}


function registraSolicitud(){
    var validacion = "";
	var n		   = 0;	

	var txtNombre 			= $("#txtNombre").val();
	var sltNegocio			= $("#sltNegocio").val();
	var sltTipoOrganizacion	= $("#sltTipoOrganizacion").val();
	var sltOrganizacion		= $("#sltOrganizacion").val();
	var txtCliente 			= $("#txtCliente").val();
	var txtSponsor 			= $("#txtSponsor").val();
	
	var strOrganizacion 	= sltOrganizacion.toString().replace(",", ";#data;#");
	
	while (strOrganizacion.indexOf(",") > 0){
		strOrganizacion = strOrganizacion.replace(",", ";#data;#");
	}
	
	var strEstado 	  = 'Ingresado';
	var d 			  = new Date();
	var yyyy	 	  = d.getFullYear();
	
	

			  UpdateList(guidListIniciativa,[
											["Ano", yyyy],
											["Nombre", txtNombre],
											["Negocio", sltNegocio],
											["Estado", strEstado],
											["TipoOrganizacion", sltTipoOrganizacion],
											["Organizacion", strOrganizacion],
											["Cliente", txtCliente],
											["Sponsor", txtSponsor]
											],idIniciativa);
											
     
	
}

function agregaEstado(){
	  
	 var strEstado 	  = 'Ingresado'; 
	 var fechaActual = new Date();
		
	var Datos		  		= traeIdEstado();
	var FechaEstadoAnterior = Datos[0];
	var idEstado 			= Datos[1];
	var EstadoId			= parseInt(idEstado);

	//debugger;
	var dateA	= moment(fechaActual).format('YYYY-MM-DD');
	var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
	
	var d = moment(dateA).diff(moment(dateB), 'day');
 
	  
	  UpdateList(guidListIniciativaEstado ,[['diasDeEstado',d]],EstadoId);
	 var idEstadoActual = addList(guidListIniciativaEstado , [
		  									["IniciativaID", idIniciativa],
		  									["Estado", strEstado],
		  								//	["Comentario", "Nueva iniciativa"],
		  									["Responsable","PMO"],
		  									["usuarioEditor",thisUserAccount],
		  									["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
		  									],idIniciativa);
		  									
	UpdateList(guidListIniciativa,[["idEstado",idEstadoActual]],idIniciativa);
}

function traeIdEstado(){
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='IniciativaID' />"
			        +" <Value Type='Number'>"+idIniciativa+"</Value>"
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
		listName: guidListIniciativaEstado ,
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


function UpdateList(lista, datos ,id){  // uptade datos lista

	
	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "Update",
	        listName: lista,
	      	ID:id,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	       	if(Status=='success'){
	       		
	       			
	       	}

	       
	       }
	     });


}

function addList(lista,datos){	

	var newId = '';
	$().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: lista,
        valuepairs: datos,
        completefunc: function(xData, Status) {
        
        if(Status=='success'){
        newId = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
	       		
	       		
	       	}

        
        }
        
    });
   return  newId;
}



function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
}




/****************************************************************** FIN FUNCIONES BOTONES **********************************************************************/


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
					     	//consultaActividades();
					     	//alert('ok');
					     }
				    }
  });
}




