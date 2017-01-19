var guidListIniciativa 		= '{2546F01E-08A8-4D85-A933-028731B71063}';
var guiListIniciativaEstado = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';

var templateId = '';

var estado = '';
var id	   = '';
var etapa  = '';
 
var thisUserAccount = '';

$(document).ready(function () {

	var args   = window.frameElement.dialogArgs;
		estado = args.estado;
		id	   = args.id;
		
		//alert(estado);
		
	thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
	templateId = traeIdTemplate();
		
		switch(estado){
			case 'C':
				$('#btnRechazar').hide();
			break;
			case 'R':
				$('#btnCorregir').hide();
			break;
			case 'VCC':
				$('#btnRechazar').hide();
			break;
			case 'VCR':
				$('#btnCorregir').hide();
			break;
			case 'RGIC':
				$('#btnRechazar').hide();
			break;
			case 'REI':
				$('#btnCorregir').hide();
			break;
			case 'RTC':
				$('#btnCorregir').hide();
			break;

			default:
			break;
		}
		
		
		ValidaDescripcion();
});

function Corregir(){

	$("#cargando").show();

	var txtObservaciones = $('#txtObservaciones').val();
	
	if(txtObservaciones != ''){
		
	var fechaActual = new Date();
		
		var Datos		  		= traeIdEstado();
		var FechaEstadoAnterior = Datos[0];
		var idEstado 			= Datos[1];
		var EstadoId			= parseInt(idEstado);

		
		var dateA	= moment(fechaActual).format('YYYY-MM-DD');
		var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
		
		var d = moment(dateA).diff(moment(dateB), 'day');

		var Result = traeCreador();
		var autorIniciativa = Result[0];
		var areaEjecucion = Result[1];
		switch(estado){
			case 'VCC' :
				UpdateList(guidListIniciativa,[['Estado','Solicita Cambios']],id);
				UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
							  
				var estadoId = AddList(guiListIniciativaEstado,[
										['IniciativaID',id],
										['Estado','Solicita Cambios'],
										['Comentario',txtObservaciones],
										["usuarioEditor",thisUserAccount],
										["Responsable",areaEjecucion],
										["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
										]);
				UpdateList(guidListIniciativa,[["idEstado",estadoId]],id);
				
				Notifica(id);

				Cerrar();
				break;
			case 'RGIC':
				UpdateList(guidListIniciativa,[['Estado','Validación Cliente Corrección']],id);
				UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
							  
				var estadoId =AddList(guiListIniciativaEstado,[
										['IniciativaID',id],
										['Estado','Validación Cliente Corrección'],
										['Comentario',txtObservaciones],
										["Responsable",autorIniciativa],
										["usuarioEditor",thisUserAccount],
										["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
										]);
				UpdateList(guidListIniciativa,[["idEstado",estadoId]],id);
				
				Notifica(id);

				Cerrar();
				break;
			case 'C':
			//debugger;
				UpdateList(guidListIniciativa,[['Estado','En Corrección']],id);
				UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
				var estadoId = AddList(guiListIniciativaEstado,[
										['IniciativaID',id],
										['Estado','En Corrección'],
										['Comentario',txtObservaciones],
										["usuarioEditor",thisUserAccount],
										["Responsable",autorIniciativa],
										["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
										]);
				
				UpdateList(guidListIniciativa,[["idEstado",estadoId]],id);
				
				Notifica(id);
				
				Cerrar();
				
				break;
			
			default:
				break;
		}
		
		
									
		

	}else{
		$("#cargando").show();
		alert('Debe ingresar una Observación.');
	}

}

function traeIdEstado(){
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='IniciativaID' />"
			        +" <Value Type='Number'>"+id+"</Value>"
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

function traeCreador(){
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='ID' />"
			        +" <Value Type='Number'>"+id+"</Value>"
			      +"</Eq>"
			   +"</Where>"
			+"</Query>";
			
	//var autor = '';
	var Datos = new Array(); 
			
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListIniciativa,
		CAMLQuery: CQ,
		//CAMLRowLimit: 1, 
		completefunc: function(xData, estado)
						{
							if(estado=="success")
							{
								
								$(xData.responseXML).SPFilterNode("z:row").each(function() 
								{
									//debugger;
									var autor = $(this).attr("ows_Author").split(';#')[1].split('(')[0];
									if(typeof $(this).attr("ows_AreaEspecialista") != 'undefined' ){
										var AreaEs= $(this).attr("ows_AreaEspecialista").split(';#')[1];
									}else{
										var AreaEs= '';
									}
									
									Datos.push(autor);
									Datos.push(AreaEs);
								})
							}
						}
	});

	return Datos;
}



function Rechazar(){

	var txtObservaciones = $('#txtObservaciones').val();
	
	var fechaActual = new Date();
		
		var Datos		  		= traeIdEstado();
		var FechaEstadoAnterior = Datos[0];
		var idEstado 			= Datos[1];
		var EstadoId			= parseInt(idEstado);

		
		var dateA	= moment(fechaActual).format('YYYY-MM-DD');
		var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
		
		var d = moment(dateA).diff(moment(dateB), 'day');

	
	if(txtObservaciones != ''){
	
			if(estado=='RTC'){
				UpdateList(guidListIniciativa,[['Estado','Estimación Rechazada']],id);
				UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
											
				var estadoId = AddList(guiListIniciativaEstado,[
										['IniciativaID',id],
										['Estado','Estimación Rechazada'],
										['Comentario',txtObservaciones],
										["Responsable","PMO"],
										["usuarioEditor",thisUserAccount],
										["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
										]);
				UpdateList(guidListIniciativa,[["idEstado",estadoId]],id);

				
			}else{
				UpdateList(guidListIniciativa,[['Estado','Rechazado']],id);
				UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
											
				if (estado == 'VCR'){
					var estadoId = AddList(guiListIniciativaEstado,[
											['IniciativaID',id],
											['Estado','Rechazado'],
											['Comentario',txtObservaciones],
											["usuarioEditor",thisUserAccount],
											["Responsable","Rechazado Cliente"],
											["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
											]);

				}else{
					var estadoId = AddList(guiListIniciativaEstado,[
											['IniciativaID',id],
											['Estado','Rechazado'],
											['Comentario',txtObservaciones],
											["usuarioEditor",thisUserAccount],
											["Responsable","Rechazado PMO"],
											["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
											]);
				}
				UpdateList(guidListIniciativa,[["idEstado",estadoId]],id);
			}
			Notifica(id);
			Cerrar();

	}else{
		alert('Debe ingresar una Observación.');
	}

}

function AddList(lista, datos){  // uptade datos lista
	var newId = '';
	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "New",
	        listName: lista,
	        ID:id,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	        	
	        	if(Status=='success'){
	        	newId = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
	        		$("#cargando").hide();
	        		if(estado=='C' || estado=='VCC' || estado=='RGIC' ){
		        		alert('Iniciativa fue enviada a corregir.');
		        	}else if(estado=='R' || estado=='VCR' || estado=='REI'){
		        		alert('Iniciativa fue Rechazada.');
					}	
		        		
		        		
				}
				
	       }
	     });

	return newId;
}



function UpdateList(lista, datos,idUpdate){  // uptade datos lista

	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "Update",
	        listName: lista,
	        ID:idUpdate,
	        valuepairs: datos,
	        completefunc: function(xData, Status) { 
	        
				
	       
	       }
	     });


}

function ValidaDescripcion(){

	$('.sinMayorMenor').keyup(function (){
           // this.value = (this.value + '').replace(/[^0-9][^A-Z][^a-z]/g, ''); [A-ZñÑa-z ] 
            //this.value = (this.value + '').replace(/[^A-ZñÑa-z0-9 ]/g, '');
            this.value = (this.value + '').replace(/[<|>]/g, '');

          });
}


function CerrarPopUp(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel,'cancelar');
	
}


function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');

	//top.location.reload(true);
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

