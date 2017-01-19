var guidListNegocio = '{821D5F6C-F2AE-4681-A355-A97D8AAF375D}';
var guidListTipoOrganizacion = '{293C7015-C70A-4693-9E44-FD3A78C8372F}';
var guidListIniciativa = '{2546F01E-08A8-4D85-A933-028731B71063}';

var guiListIniciativaEstado = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';
var guidListFechaEspera		= '{2B6C1B2B-85AA-45AA-ACFD-FBAD0E591F42}';

var urlPantallaComprobacion = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-pantalla-comprobacion.html';
var urlPantallaCorrecion= '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-corregir-rechazar-iniciativa.html';
var urlVerHistorial = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-popupVisualiza-Historial.html';

var contDocIniciativa=0;
var totalDocIniciativa=0;
var idRegistro='';
var cpref=0;
var estado='';
var fechaActual	 = new Date();


var iniciativaID = '';

var templateId = '';

var accesoPerfilPMO=false;
var thisUserAccount = '';
var templateIdEstimacionFecha = '';

var idListFecha = '';

var tdAreaEspecialista ='';
$(document).ready(function(){

	var queryStringValores = $().SPServices.SPGetQueryString();
		iniciativaID 		   = queryStringValores["ID"];
		
		thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
		
		//debugger;
		templateId = traeIdTemplate();
		templateIdEstimacionFecha  = traeTemplateEstimacion();
		cargaIniciativa(iniciativaID);
		
		
		
		var args   = window.frameElement.dialogArgs;
			estado = args.estado;
			//alert(estado);
			
			
		if(estado == 'I'){
			//$('#tblEstimacionTiempo').hide();
			$('#lblAreaEspecialista').hide();
			$('#txtAreaEspecialista').hide();

			$('#btnAceptar').hide();
			$('#contineTitulo').hide();
			$('#fchaEstimacion').hide();
			
		
		}else if(estado == 'TC'){
			//$('#tblIngresoIniciativa').hide();
			cargaCalendario();
			$('#btnAprobar').hide();
			$('#btnCorregir').hide();
			//$('#btnRechazar').hide();
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
		    	debugger;  
		    	
		    	if(typeof $(this).attr("ows_Author") != '' && typeof $(this).attr("ows_Author")!='undefined'){
		    		var	tdResponsable   	= $(this).attr("ows_Author").split(';#')[1];
		    	}else{
		    		var	tdResponsable   	= '';
		    	}
		    	//alert($(this).attr("ows_Cliente"));
		    	if(typeof $(this).attr("ows_Cliente") != '' && typeof $(this).attr("ows_Cliente")!='undefined'){
		    		var	tdCliente  			= $(this).attr("ows_Cliente").split(';#')[1];
		    	}else{
		    		var	tdCliente  			= '';
		    	}

		    	if(typeof $(this).attr("ows_Sponsor") != '' && typeof $(this).attr("ows_Sponsor")!='undefined'){
		    		var	tdSponsor  			= $(this).attr("ows_Sponsor").split(';#')[1];
		    	}else{
		    		var	tdSponsor  			= '';
		    	}

		    	if(typeof $(this).attr("ows_Negocio") != '' && typeof $(this).attr("ows_Negocio")!='undefined'){
		    		var	tdNegocio  			= $(this).attr("ows_Negocio").split(';#')[1];
		    	}else{
		    		var	tdNegocio  			= '';
		    	}

		    	if(typeof $(this).attr("ows_TipoOrganizacion") != '' && typeof $(this).attr("ows_TipoOrganizacion")!='undefined'){
		    		var	tdTipoOrganizacion	= $(this).attr("ows_TipoOrganizacion").split(';#')[1];
		    	}else{
		    		var	tdTipoOrganizacion	= '';
		    	}

		    	//alert($(this).attr("ows_AreaEspecialista"));
		    	if($(this).attr("ows_AreaEspecialista") != '' && typeof $(this).attr("ows_AreaEspecialista")!='undefined'){
		    		tdAreaEspecialista  = $(this).attr("ows_AreaEspecialista").split(';#')[1];
		    	}

		    	
		    		
		    	var strOrganizacion		='';		    	
		    	
		    	if(typeof $(this).attr("ows_Organizacion") !='' && typeof $(this).attr("ows_Organizacion")!='undefined'){
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

		    	//console.log($(this).attr("ows_AreaEspecialista"));
		    	getAttachmentFiles(guidListIniciativa,id,printAttachmentsCompromisos);

				$('#responsableIniciativa').text(tdResponsable);
				$('#txtNombre').val(tdNombre);
				$('#txtCliente').val(tdCliente);
				$('#txtSponsor').val(tdSponsor);
				$('#txtNegocioCliente').val(tdNegocio);
				$('#txttipoOrganizacion').html(strOrganizacion);
				$('#txtAreaEspecialista').val(tdAreaEspecialista);
				
			//alert(accesoPerfilPMO);
				/*	if(!accesoPerfilPMO){
						$('#btnAprobar').hide();
						$('#btnCorregir').hide();
						$('#btnRechazar').hide();
					}  */
				
				
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
       // console.log(urls[i]); 
        var nombreDoc=urls[i].split('/').pop();
		var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a></div>"
		$("#documentosAnterioresIniciativa").append(tag);
    
    };    
}




/*********************************** FIN FUNCIONES MOSTRAR ARCHIVOS **********************************************/









/********************************************** INICIO FUNCIONES ASIGNA CORRELATIVO ******************************************************************/

function obtieneCorrelativo(){
	var corr = 1;
	var d = new Date();
	yyyy = d.getFullYear();
    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: guidListIniciativa,
        CAMLViewFields: "<ViewFields>"+
        					"<FieldRef Name='ID'></FieldRef>"+
        					"<FieldRef Name='CorrelativoInt'></FieldRef>"+
        					"<FieldRef Name='Ano'></FieldRef>"+
        				"</ViewFields>",
        CAMLQuery: "<Query><OrderBy><FieldRef Name='CorrelativoInt' Ascending='false' /></OrderBy></Query>",
        CAMLRowLimit: 1,
        completefunc: function (xData, Status) {
	        if (Status == "success") {            
	            $(xData.responseXML).SPFilterNode("z:row").each(function() {
	            var ano = $(this).attr("ows_Ano");
	            
		            if($.trim($(this).attr("ows_CorrelativoInt")) != ""){
			            if(ano==yyyy){			            
			            	corr = parseInt($(this).attr("ows_CorrelativoInt"))+1;
			            }else{
			            	corr = 0+1;		            	
			            }		            		           					            
		            }
	            });
	        }
        }
    });
    return corr;
}
function agregarceros(n, length)
{
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}
function addList(lista,datos){	
var newId = '';
try{
	$().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "New",
        listName: lista,
        valuepairs: datos,
        completefunc: function(xData, Status) 
        { 
       		newId = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
        }
    });
    return newId;
}
catch(ex){alert('error');}
}




/********************************************** FIN FUNCIONES  ASIGNA CORRELATIVO   ******************************************************************/



/********************************************** INICIO FUNCIONES DE LEVANTA POPUP   ******************************************************************/

function levantaPopup(){

	var option  = { 
					title:"Comprobación de Aprobación",
					allowMaximize:false,
					showMaximized:false,
					showClose:false,
					//autoSize:true,
					//width:515,
					width:500,
					height:160,
					scroll:0,
					args: {	
							estado:'VI'	
						  },

					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlPantallaComprobacion+'?ID='+iniciativaID
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
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
							estado:'C',
							id: iniciativaID
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
							estado:'R',
							id: iniciativaID
						  },
					//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
					dialogReturnValueCallback: callbackMethod,
					url:urlPantallaCorrecion+'?ID='+iniciativaID
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupRechazaTC(){

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
							estado:'RTC',
							id: iniciativaID
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



/********************************************** FIN FUNCIONES DE LEVANTA POPUP   ******************************************************************/

function cargaCalendario(){

$(function($){
    $.datepicker.regional['es'] = {
        closeText:'Cerrar',
        currentText:'Hoy',
        monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort:['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames:['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort:['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin:['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader:'Sm',
        dateFormat:'dd/mm/yy',
        firstDay:1,
        isRTL:false,
        showMonthAfterYear:false,
        yearSuffix:''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);        
});

	$("#fchaEstimacion").datepicker({
	  changeMonth: true,
	  changeYear: true,
	  showOn: "button",
	  buttonImage: "../SiteAssets/img/calendar.gif",
	  buttonImageOnly: true,
	  //maxDate: '-0d',
	  minDate:moment(fechaActual).format('DD/MM/YYYY'),
	  buttonText: "Selecione Fecha Desde"
	});

	//$('#fchaEstimacion').datepicker("setDate", moment(fechaActual).format('DD/MM/YYYY'));
	//$("#fchaEstimacion").val(moment(fechaActual).format('DD/MM/YYYY')); 

}


/******************************************* INICIO FUNCIONES ACEPTA ****************************************************/

function ingresaFechaEstimacion(){
		
		var fcha = $("#fchaEstimacion").val();
		var fechaActual = new Date();
		var Datos		  		= traeIdEstado();
		var FechaEstadoAnterior = Datos[0];
		var idEstado 			= Datos[1];
		var EstadoId			= parseInt(idEstado);
		
		var diaInicio=fcha.split('/')[0];
		var mesInicio=fcha.split('/')[1];
		var anoInicio=fcha.split('/')[2];
		var fchInicio= anoInicio+'-'+mesInicio+'-'+diaInicio;
		
		
		
		
		var dateA	= moment(fechaActual).format('YYYY-MM-DD');
		var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
		
		var d = moment(dateA).diff(moment(dateB), 'day');

		
		if(fcha != ''){
			UpdateList(guidListIniciativa,[
									 ['Estado','En estimación'],
									 ['FechaEstimacion',fchInicio]
									 ],iniciativaID);
			UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
			AddListFecha(guidListFechaEspera,[['Title',iniciativaID]]);							
			AddList(guiListIniciativaEstado,[
									['IniciativaID',iniciativaID],
									['Estado','En estimación'],
								//	['Comentario','En estimación'],
									['Responsable',tdAreaEspecialista],
									["usuarioEditor",thisUserAccount],
									["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
									]);
		}else{
		
			$("#cargando").hide();
			alert('Debe ingresar una Fecha estimada.');
		}		
}

function AddListFecha(lista, datos){  // uptade datos lista

	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "New",
	        listName: lista,
	        //ID:iniciativaID,
	        valuepairs: datos,
	        completefunc: function(xData, Status) {
	        idListFecha = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID"); 
	        	//alert(idListFecha );
	        	if(Status == 'success'){
	        			        		
	        	}
	        }
	     });


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
	        		if(estado=='TC'){
		        		$("#cargando").hide();
		        		alert('Estimación de Tiempo ingresada.');
		        		NotificaFecha(idListFecha,templateIdEstimacionFecha);
		        		Notifica(iniciativaID);
		        	}	
		        		
		        		Cerrar();
		        		
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
	        ID:id,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	        
				
	       
	       }
	     });


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







/******************************************* FIN FUNCIONES ACEPTA ****************************************************/



/********************************************** INICIO FUNCIONES DE LOS BOTONES   ******************************************************************/

function Aprueba(){

	levantaPopup();
}

function Corrige(){

	levantaPopupCorrecion();
}

function Rechaza(){

	if(estado=='TC'){
		levantaPopupRechazaTC();
	}else{
		levantaPopupRechaza();
	}
}

function Aceptar(){
	
	$("#cargando").show();
	ingresaFechaEstimacion();
}




function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
}


/********************************************** FIN FUNCIONES DE LOS BOTONES   ******************************************************************/





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
					dialogReturnValueCallback: callbackMethod,
					url:urlVerHistorial
				};
				
				
				SP.UI.ModalDialog.showModalDialog(option);
}

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

function NotificaFecha(IID,template) {

var IURL= window.location.protocol + '//' + window.location.host +
		//  '/sites/gadt/direcciones/dc/contabilidad/fape/Lists/FormularioDeEnajenacion/' + IID + '_.000';
		  '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Lists/ListaEnEstimacionFechaEspera/' + IID + '_.000';
var WFParameters= "<Data></Data>";
// workflowParameters: "<root />",
  $().SPServices({
  					async: false,
				    operation: "StartWorkflow",
				    item: IURL,
				    templateId: template,
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




