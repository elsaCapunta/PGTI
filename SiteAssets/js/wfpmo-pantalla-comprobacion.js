var guiListTipoArea 		= '{F73174C2-EE4C-48BD-9C00-0DE981201143}';
var guiListAreaEspecialista = '{A194B4BD-BD99-4078-AF2E-F8EAC3AEB05A}';
var guidListIniciativa 		= '{2546F01E-08A8-4D85-A933-028731B71063}';
var guiListIniciativaEstado = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';
var guidListFechaEspera		= '{2B6C1B2B-85AA-45AA-ACFD-FBAD0E591F42}';
var guidListEstadoEjecucion = '{E8BAF1E2-502B-4E21-83A2-5AE9AECFD1EE}';
var templateId = '';
var templateIdCambioejecucion  = '';

var fechaActual   		= new Date();
var iniciativaID = '';
var estado 		 = '';
var thisUserAccount  = '';
var idListEstado = '';
$(document).ready(function(){

	var queryStringValores = $().SPServices.SPGetQueryString();
		iniciativaID 		   = queryStringValores["ID"];
		
	var args   = window.frameElement.dialogArgs;
		estado = args.estado;
		
		//alert(estado);
	thisUserAccount = $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
		
	templateId = traeIdTemplate();
	templateIdCambioejecucion   = traeTemplateCambioEjecucion();	
	
	
	getItemsTipoArea();	
	changeList();
	
	

		
});

function getItemsTipoArea(){
	var CQ = "<Query><OrderBy><FieldRef Name='Nombre' Ascending='True' /></OrderBy></Query>";
	
	$('#sltTipoArea').append($('<option>', {
	    value: 0,
	    text: 'Todas'
	})); 
	
	
	

	$().SPServices(
	{
		operation: "GetListItems",
		async: false,
		listName: guiListTipoArea ,
		CAMLQuery: CQ, 
		completefunc: function(xData, estado)
						{
							if(estado=="success")
							{
								$(xData.responseXML).SPFilterNode("z:row").each(function() 
								{
									$("#sltTipoArea").append("<option value=" + $(this).attr("ows_ID") + ">" + $(this).attr("ows_Nombre")+ "</option>");
									

								})
							}
						}
	});
	
	
	
}

function changeList(){

	$('#sltTipoArea').change(function(){
	var idAreaPopUP = $('#sltTipoArea').val();
		getItemsListAreaEspecialista(idAreaPopUP );
		
	});

}


function getItemsListAreaEspecialista(idAreaPopUP){

	$('#sltAreaEspecialista').html('');	
	$('#sltAreaEspecialista').append($('<option>', {
	    value: 0,
	    text: 'Todas'
	})); 
	
	
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='TipoArea' LookupId='TRUE'/>"
			         +"<Value Type='Lookup'>"+idAreaPopUP+"</Value>"
			      +"</Eq>"
			   +"</Where>"
			+"</Query>";

	$().SPServices(
	{
		operation: "GetListItems",
		async: false,
		listName: guiListAreaEspecialista ,
		CAMLQuery: CQ, 
		completefunc: function(xData, estado)
						{
							if(estado=="success")
							{
								$(xData.responseXML).SPFilterNode("z:row").each(function() 
								{
									$("#sltAreaEspecialista").append("<option value=" + $(this).attr("ows_ID") + ">" + $(this).attr("ows_Title")+ "</option>");
									

								})
							}
						}
	});


}




function Aprueba(){

	var TipoArea= $('#sltTipoArea').val();
	var AreaEspecialista= $('#sltAreaEspecialista').val();
	
	var textAreaEspecialista = $.trim($("#sltAreaEspecialista option:selected").html());
	var user = '';
	 user = getAllUsersFromGroup(textAreaEspecialista);
//	var userEspecialistas = user.join(';');
	user = user.substring(0,user.length-1);
	//alert(user);
	
	//var enduro = 'jalle008';
	
	if(validaCampos()){
	$("#cargando").show();
	
		
		if(estado == 'RGI'){
		
		
			UpdateList(guidListIniciativa,[
									  ['TipoAreaEjecucion',TipoArea],
									  ['AreaEjecucion',AreaEspecialista],
									  ['Estado','Asignado Ejecución'],
									  ['UsuariosAreaEjecucion',user]	
									  ],iniciativaID);
			
			AddListIniciativasEstados();
	        		

		
		}else if(estado == 'VI'){
			
			UpdateList(guidListIniciativa,[
									  ['TipoAreaEspecialista',TipoArea],
									  ['AreaEspecialista',AreaEspecialista],
									  ['Estado','En estimación de fecha'],
									  ['UsuariosAreaEspecialista',user]
									  ],iniciativaID);
									  
			AddListIniciativasEstados(); 
		}
		
		
	}else{
		bajaLoading();
		alert('Debe llenar los campos');
	}  
}

function validaCampos(){

	var correct = false;
	var tipoArea = $('#sltTipoArea').val();
	var areaEspecialista = $('#sltAreaEspecialista').val();
	
	if(tipoArea != '0' && areaEspecialista != '' && areaEspecialista !='0'){
		correct = true;
	}
	return correct;
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


function UpdateList(lista, datos, id){  // uptade datos lista

//alert('id update '+id);
//alert('datos update '+datos);
debugger;
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

function AddListIniciativasEstados(){

	var Datos		  		= traeIdEstado();
	
	var FechaEstadoAnterior = Datos[0];
	var idEstado 			= Datos[1];
	var EstadoId			= parseInt(idEstado);
	var AreaEspecialista	= $('#sltAreaEspecialista option:selected').html();
	
	//alert(AreaEspecialista);
	//debugger;
	var dateA	= moment(fechaActual).format('YYYY-MM-DD');
	var dateB	= moment(FechaEstadoAnterior).format('YYYY-MM-DD');
	
	var d = moment(dateA).diff(moment(dateB), 'day');
	
	if(estado=='RGI'){
		
		UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
		AddListEstado(guidListEstadoEjecucion,[['Title',iniciativaID]]);
		AddList(guiListIniciativaEstado,[
										['IniciativaID',iniciativaID],
										['Estado','Asignado Ejecución'],
										//['Comentario','Asignado Ejecución'],
										["Responsable",AreaEspecialista],
										["usuarioEditor",thisUserAccount],
										["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
										]);
										
	

	}else if(estado == 'VI'){
	
	
		UpdateList(guiListIniciativaEstado,[['diasDeEstado',d]],EstadoId);
		AddList(guiListIniciativaEstado,[
										['IniciativaID',iniciativaID],
										['Estado','En estimación de fecha'],
										//['Comentario','Aprobación de Iniciativa'],
										["usuarioEditor",thisUserAccount],
										["Responsable",AreaEspecialista],
										["fechaEstado",moment(fechaActual).format('YYYY-MM-DD')]
										]);
		
		
								
		
	}
}

function AddListEstado(lista, datos){  // uptade datos lista

	$().SPServices({
	        operation: "UpdateListItems",
	        async: false,
	        batchCmd: "New",
	        listName: lista,
	        //ID:iniciativaID,
	        valuepairs: datos,
	        completefunc: function(xData, Status) {
	        idListEstado = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID"); 
	        	//alert(idListEstado );
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
	        	
	        	if(Status == 'success'){
	        		$("#cargando").hide();
	        		if(estado =='VI'){
	        			alert('Iniciativa Aprobada');
	        			Notifica(iniciativaID,templateId);
	        		}else{
	        			alert('Iniciativa Asignada');
	        			NotificaEstado(idListEstado,templateIdCambioejecucion);
	        		} 
					Cerrar();
	        		
	        	}else{
	        		alert('no se aprobo');
	        	}
	        }
	     });


}





function Cancelar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel,'cancelar');
}

function Cerrar(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
}

function levantaLoading(){

	$("#cargando").show();

}

function bajaLoading(){

	$("#cargando").hide();

}

function getAllUsersFromGroup(groupName){
	
	var userInfo = '';
	var aux = new Array();
	
	$().SPServices({
		operation: "GetUserCollectionFromGroup",
		groupName: groupName,
		async: false,
		completefunc: function (xDataUser, Status) {
			$(xDataUser.responseXML).find("User").each(function() {
				//var name =$(this).attr('Name');
				//var iD  = $(this).attr("ID");
				//var userID = iD +";#"+name; 
				var email = $(this).attr('Email'); 
				aux.push(email);
				
			});
		
		}
	});
	
	for(var i=0;i<aux.length;i++){
		if(aux[i].indexOf() != ''){
			userInfo=aux[i]+','+userInfo;
		}
	} 
	
	return userInfo;
} 



function Notifica(IID,template) {

var IURL= window.location.protocol + '//' + window.location.host +
		//  '/sites/gadt/direcciones/dc/contabilidad/fape/Lists/FormularioDeEnajenacion/' + IID + '_.000';
		  '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Lists/Iniciativas/' + IID + '_.000';
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

function NotificaEstado(IID,template) {

var IURL= window.location.protocol + '//' + window.location.host +
		//  '/sites/gadt/direcciones/dc/contabilidad/fape/Lists/FormularioDeEnajenacion/' + IID + '_.000';
		  '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Lists/ListaCambioEstadoEnEjecucion/' + IID + '_.000';
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



