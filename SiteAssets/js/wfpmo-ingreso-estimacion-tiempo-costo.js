var guidListIniciativa 		= '{2546F01E-08A8-4D85-A933-028731B71063}';
var guiListIniciativaEstado = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';

var urlVerHistorial 		= '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-popupVisualiza-Historial.html';
var templateId = '';

var estado		 ='';
var fechaActual	 = new Date();
var iniciativaID = '';
var thisUserAccount = '';

var	tdResponsable ='';
$(document).ready(function(){

	var queryStringValores = $().SPServices.SPGetQueryString();
		iniciativaID 		   = queryStringValores["ID"];
		
	var args   = window.frameElement.dialogArgs;
		estado = args.estado;
	thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
	templateId = traeIdTemplate();	
	cargaIniciativa(iniciativaID);
	cargaCalendario();
	ValidaSoloNumero();
	ValidaDescripcion();
				
				
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
			
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    	var id					= $(this).attr("ows_ID");
		    	var	tdNombre   			= $(this).attr("ows_Nombre");
		    	var fchaEstimacion		= $(this).attr("ows_FechaEstimacion");
		    	
				
				if(typeof $(this).attr("ows_Author") != '' && typeof $(this).attr("ows_Author") !='undefined'){
					tdResponsable   	= $(this).attr("ows_Author").split(';#')[1];
				}
				
				if(typeof $(this).attr("ows_Cliente") != '' && typeof $(this).attr("ows_Cliente") !='undefined'){
					var	tdCliente  	= $(this).attr("ows_Cliente").split(';#')[1];
				}else{
					var	tdCliente  	= '';
				}
				
				if(typeof $(this).attr("ows_Sponsor") != '' && typeof $(this).attr("ows_Sponsor") !='undefined'){
					var	tdSponsor  	= $(this).attr("ows_Sponsor").split(';#')[1];
				}else{
					var	tdSponsor	= '';
				}
				
				if(typeof $(this).attr("ows_Negocio") != '' && typeof $(this).attr("ows_Negocio") !='undefined'){
					var	tdNegocio  	= $(this).attr("ows_Negocio").split(';#')[1];
				}else{
					var	tdNegocio 	= '';
				}
				
				if(typeof $(this).attr("ows_TipoOrganizacion") != '' && typeof $(this).attr("ows_TipoOrganizacion") !='undefined'){
					var	tdTipoOrganizacion	= $(this).attr("ows_TipoOrganizacion").split(';#')[1];
				}else{
					var	tdTipoOrganizacion	= '';
				}

				if(typeof $(this).attr("ows_AreaEspecialista") != '' && typeof $(this).attr("ows_AreaEspecialista") !='undefined'){
					var tdAreaEspecialista  = $(this).attr("ows_AreaEspecialista").split(';#')[1];
				}else{
					var	tdAreaEspecialista	= '';
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


				
				
				/******************************* INPUT CON VALORES **************************************/
				
				if(typeof $(this).attr("ows_CostoServicios") != 'undefined'){
					var inputCostoServicios = $(this).attr("ows_CostoServicios").split('.')[0];
				}
				
				if(typeof $(this).attr("ows_CostoLogistica") != 'undefined'){
					var inputCostoLogistica = $(this).attr("ows_CostoLogistica").split('.')[0];
				}
				
				if(typeof $(this).attr("ows_CostoInfraestructura") != 'undefined'){
					var inputCostoInfraestr = $(this).attr("ows_CostoInfraestructura").split('.')[0];
				}

				if(typeof $(this).attr("ows_CostoContingencia") != 'undefined'){
					var inputCostoContingen = $(this).attr("ows_CostoContingencia").split('.')[0];
				}
				
				if(typeof $(this).attr("ows_CostoLicencias") != 'undefined'){
					var inputCostoLicencias = $(this).attr("ows_CostoLicencias").split('.')[0];
				}
				
				if(typeof $(this).attr("ows_OtrosCostos") != 'undefined'){
					var inputOtrosCostos	= $(this).attr("ows_OtrosCostos").split('.')[0];
				}

				if(typeof $(this).attr("ows_CostoSistemaProduccion") != 'undefined'){
					var inputCostoProduccio = $(this).attr("ows_CostoSistemaProduccion").split('.')[0];
				}
				
				if(typeof $(this).attr("ows_OtrosCostosOperacion") != 'undefined'){
					var inputOtrosCostosOpe = $(this).attr("ows_OtrosCostosOperacion");
				}
				
				if(typeof $(this).attr("ows_TiempoEstimado") != 'undefined'){
					var inputEstimacionMese = $(this).attr("ows_TiempoEstimado").split('.')[0];
				}
				
				if(typeof $(this).attr("ows_FechaInicio") != 'undefined'){
					var inputFechaInicio	= $(this).attr("ows_FechaInicio");
				}

				
				/***************************************************************************************/
				
   				getAttachmentFiles(guidListIniciativa,id,printAttachmentsCompromisos);

				$('#responsableIniciativa').text(tdResponsable);
				$('#txtNombre').val(tdNombre);
				$('#txtCliente').val(tdCliente);
				$('#txtSponsor').val(tdSponsor);
				$('#txtNegocioCliente').val(tdNegocio);
				$('#txttipoOrganizacion').html(strOrganizacion);
				$('#txtAreaEspecialista').val(tdAreaEspecialista);
				$('#fchaEstimacion').val(moment(fchaEstimacion).format('DD/MM/YYYY'));
				
				
				if(typeof inputCostoServicios != 'undefined' && typeof inputCostoLogistica != 'undefined'){
					
					$('#inputCostosServicios').val(inputCostoServicios);
					$('#inputCostoLogistica').val(inputCostoLogistica);
					$('#inputCostoInfraestructura').val(inputCostoInfraestr);
					$('#inputCostoContingencia').val(inputCostoContingen);
					$('#inputCostoLicencias').val(inputCostoLicencias);
					$('#inputOtrosCostos1').val(inputOtrosCostos);
					
					$('#inputCostoProduccion').val(inputCostoProduccio);
					$('#inputOtrosCostos').text(inputOtrosCostosOpe);
					
					$('#inputEstimacionMeses').val(inputEstimacionMese);
					$('#fchainicio').val(moment(inputFechaInicio).format('DD/MM/YYYY'));
					suma();
				}else{
					/********** INPUT INICIADOS EN '0' **************/
					$('#inputCostosServicios').val('0');
					$('#inputCostoLogistica').val('0');
					$('#inputCostoInfraestructura').val('0');
					$('#inputCostoContingencia').val('0');
					$('#inputCostoLicencias').val('0');
					$('#inputOtrosCostos1').val('0');
					$('#inputCostoProduccion').val('0');
					$('#inputTotal').val('0');
					$('#inputOtrosCostos').val('');
					$('#inputEstimacionMeses').val('0');
				
				}
				
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
	for(var i =0; i< urls.length; i++){
        var nombreDoc=urls[i].split('/').pop();
		var tag="<div  class ='archivoAdjunto'><a  target='_blank' href='"+urls[i]+"' style='padding: 5px;'>"+nombreDoc+"</a></div>"
		$("#documentosAnterioresIniciativa").append(tag);
    
    };    
}




/*********************************** FIN FUNCIONES MOSTRAR ARCHIVOS **********************************************/




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

	$("#fchainicio").datepicker({
	  changeMonth: true,
	  changeYear: true,
	  showOn: "button",
	  buttonImage: "../SiteAssets/img/calendar.gif",
	  buttonImageOnly: true,
	 // maxDate: '+1d',
	  minDate:moment(fechaActual).add('days', 1).format('DD/MM/YYYY'),
	  buttonText: "Selecione Fecha Desde"
	});
}


/******************************************* INICIO FUNCIONES ACEPTA ****************************************************/

function ingresaFechaEstimacion(){

		$("#cargando").show();

		var costoServicio  = $('#inputCostosServicios').val();
		var costoLogistica = $('#inputCostoLogistica').val();
		var costoInfraestr = $('#inputCostoInfraestructura').val();
		var costoContingen = $('#inputCostoContingencia').val();
		var costoLicencia  = $('#inputCostoLicencias').val();
		var otrosCostos1   = $('#inputOtrosCostos1').val();
		var total 		   = $('#inputTotal').val();
		
		var costoProduccion= $('#inputCostoProduccion').val();
		//debugger;
		var otrosCostosOpe = $('#inputOtrosCostos').val();
		/*var aux = '';
			if(otrosCostosOpe.indexOf('>')!=-1){
				aux = otrosCostosOpe.replace('>',' ');
			}else{
				aux = otrosCostosOpe;
			}
			
			if(otrosCostosOpe.indexOf('<')!=-1){
				aux = otrosCostosOpe.replace('<',' ');
			}else{
				aux = otrosCostosOpe;
			}*/

			
		/*	otrosCostosOpe = otrosCostosOpe.replace("<","");
			otrosCostosOpe = otrosCostosOpe.replace(">",""); */
			
		var meses 		   = $('#inputEstimacionMeses').val();
		var fchaInicio	   = $('#fchainicio').val();
		
		var diaInicio=fchaInicio.split('/')[0];
		var mesInicio=fchaInicio.split('/')[1];
		var anoInicio=fchaInicio.split('/')[2];
		
		var fchInicio  = anoInicio+'-'+mesInicio+'-'+diaInicio;
		
		var fechaActual = new Date();
		
		var Datos		  		= traeIdEstado();
		var FechaEstadoAnterior = Datos[0];
		var idEstado 			= Datos[1];
		var EstadoId			= parseInt(idEstado);

		
		var dateA	= moment(fechaActual).format('YYYY-MM-DD');
		var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
		
		var d = moment(dateA).diff(moment(dateB), 'day');


		
		if(total > 0 && meses > 0 && fchaInicio !=''){
		 	UpdateList(guidListIniciativa,[
									 ['Estado','Validación Cliente'],
									 ['CostoServicios',costoServicio],
									 ['CostoInfraestructura',costoInfraestr],
									 ['CostoLicencias',costoLicencia],
									 ['CostoLogistica',costoLogistica],
									 ['CostoContingencia',costoContingen],
									 ['OtrosCostos',otrosCostos1],
									 ['CostoSistemaProduccion',costoProduccion],
									 ['OtrosCostosOperacion',otrosCostosOpe],
									 ['TiempoEstimado',meses],
									 ['FechaInicio',fchInicio]
									 ],iniciativaID);
			UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
			
			tdResponsable = tdResponsable.split('(')[0];							
			AddList(guiListIniciativaEstado,[
									['IniciativaID',iniciativaID],
									['Estado','Validación Cliente'],
								//	['Comentario','Validación Cliente'],
									['Responsable',tdResponsable],
									["usuarioEditor",thisUserAccount],
									["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
									]); 
									
			
		}else{
			$("#cargando").hide();
			alert('Debe ingresar todos los datos');
		}		
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
	        			$("#cargando").hide();
		        		alert('Estimación de Tiempo y Costo – Área Especialista ingresada.');
		        		Notifica(iniciativaID);
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
	        
	        //	alert(Status);
	        }
	     });
}




/******************************************* FIN FUNCIONES ACEPTA ****************************************************/



/********************************************** INICIO FUNCIONES DE LOS BOTONES   ******************************************************************/

function Aceptar(){
	
	ingresaFechaEstimacion();
}


function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
}


/********************************************** FIN FUNCIONES DE LOS BOTONES   ******************************************************************/

/********************************************** INICIO FUNCIONES HISTORIAL  ******************************************************************/

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




/********************************************** FIN FUNCIONES HISTORIAL  ******************************************************************/

function suma(){

	var add = 0;
      $('.amt').each(function() {
          if (!isNaN($(this).val())) {
              add += Number($(this).val());
          }else{
          	alert('Ingrese solo números');
          	$(this).val(0);
          }
      });
      $('#inputTotal').val(add);	
	
} 

function ValidaDescripcion(){

	$('.sinMayorMenor').keyup(function (){
           // this.value = (this.value + '').replace(/[^0-9][^A-Z][^a-z]/g, ''); [A-ZñÑa-z ] 
            //this.value = (this.value + '').replace(/[^A-ZñÑa-z0-9 ]/g, '');
            this.value = (this.value + '').replace(/[<|>]/g, '');

          });
}



function ValidaSoloNumero(){

	$('.solo-numero').keyup(function (){
           // this.value = (this.value + '').replace(/[^0-9][^A-Z][^a-z]/g, ''); [A-ZñÑa-z ] 
            //this.value = (this.value + '').replace(/[^A-ZñÑa-z0-9 ]/g, '');
           // this.value = (this.value + '').replace(/[<|>]/g, '');
           this.value = (this.value + '').replace(/[^0-9]/g, '');

          });
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
					     	//alert(Status);
					     }
				    }
  });
}


