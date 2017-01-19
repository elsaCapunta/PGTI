var GuidListaIniciativas='{2546F01E-08A8-4D85-A933-028731B71063}';
//var urlIniciativa="/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/SitePages/wfpmo-iniciativa-ingreso.html";
//var urlIniciativa="/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/SitePages/ingreso-iniciativa.html";
var urlIniciativa="/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Paginas/wfpmo-iniciativa-ingreso.html";
var urlUnderConstruction="/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Paginas/underconstruction.html";
var urlVisualizaIniciativa ='/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-visualizacion-iniciativa.html';
var urlIngresoTiempoCosto = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-ingreso-estimacion-tiempo-costo.html';
var urlGestionIniciativas = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-gestion-iniciativas.html';
var urlVisualizaRechazado = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-visualizacion-rechazado.html';
var urlCorrecionIniciativa= '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-iniciativa-correcion.html';
var urlRevisionGestionIniciativa = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-revision-gestion-iniciativa.html';
var urlEnEjecucionIniciativa = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-asignacion-ejecucion.html';
var urlVisualizaIniciativaPerfil = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-visualiza-iniciativa-perfil.html';
var idRegistro ='';
var tipoEstado = '';

var accesoPerfilPMO					   =false;
var accesoPerfilAreaEspecialista	   =false;
var accesoPerfilResponsableDocumento   =false;
var accesoPerfilAdministrador		   =false;
var accesoPerfilTicaNorte			   =false;
var accesoPerfilTicaSur				   =false;
var accesoPerfilSap					   =false;
var accesoPerfilIInfraestructura	   =false;
var accesoPerfilAplicaciones		   =false;
var accesoPerfilAutomatizacionRobotica =false;


var GrupoPMO = false;
var GrupoAreaEspecialista = false;
var GrupoResponsableDocumento = false;
var GrupoTicaNorte = false;
var GrupoTicaSur = false;
var GrupoSap = false;
var GrupoInfraestructura = false;
var GrupoAplicaciones = false;
var GrupoAutomatizacionRobotica = false;


var userConectado	= '';


$(document).ready(function(){

	userConectado	= $().SPServices.SPGetCurrentUser({
										fieldName: "Title",
										debug: false
							});
	//alert(userConectado);
	idRegistro = $.trim(urlParam("ID"));
	tipoEstado = $.trim(urlParam("E"));
//alert(tipoEstado);
	if(!validaUsuarioEnGrupo('Administrador-WFPMO')){
		$('#lnkConfiguracion').hide();
	}
	
	CargaVariablesAccesoUsuarioEnGrupo();
	setGruposDelUsuario();
	
		
	
	
	
/*	if(idRegistro!=''){
		switch(tipoEstado) {
			case 'Ingresado':
				RetornaLinkPopup(idRegistro)
				break;
			case 'EnCorreccion':
				RetornaPopUpIniciativaCorreccion(idRegistro);
				break;
			case 'EnEstimacionDeFecha':
				RetornaPopupTiempoCosto(idRegistro);
				break;
			case 'EnEstimacion':
				RetornaPopupTiempoCostoAreaEspecialista(idRegistro);
				break;
			case 'ValidacionCliente':
				RetornaPopUpGestionIniciativas(idRegistro);
				break;
			case 'SolicitaCambios':
				RetornaPopupTiempoCostoAreaEspecialista(idRegistro);
				break;
			case 'ValidacionClienteCorreccion':
				RetornaPopUpGestionIniciativas(idRegistro);
				break;

			default:
	 			
		}
			
	}	*/
			
	CargaTablaIniciativas();		
			
});

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function CargaVariablesAccesoUsuarioEnGrupo(){

	var WFPMOpmo 				    = 'PMO';
	var WFPMOareaEspecialista	    = 'Area-Especialista';
	var WFPMOresponsableDocumento   = 'Responsable-Documento';
	var WFPMOAdministrador		    = 'Administrador-WFPMO';
	var WFPMOticaNorte			    = 'TICA Norte';
	var WFPMOticaSur			    = 'TICA Sur';
	var WFPMOsap				    = 'SAP';
	var WFPMOinfraestructura	    = 'Infraestructura';
	var WFPMOaplicaciones		    = 'Aplicaciones';
	var WFPMOautomatizacionRobotica = 'Automatización y Robótica';

// PMO
    if(validaUsuarioEnGrupo(WFPMOpmo)|| validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilPMO=true; }
 
 //Area Especialista
	if(validaUsuarioEnGrupo(WFPMOareaEspecialista) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilAreaEspecialista=true; }

// Responsable Documento
	if(validaUsuarioEnGrupo(WFPMOresponsableDocumento) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilResponsableDocumento=true; }
	
// Tica Norte
	if(validaUsuarioEnGrupo(WFPMOticaNorte) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilTicaNorte=true; }
	
// Tica Sur
	if(validaUsuarioEnGrupo(WFPMOticaSur) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilTicaSur=true; }
	
// SAP
	if(validaUsuarioEnGrupo(WFPMOsap) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilSap=true; }
	
// Infraestructura
	if(validaUsuarioEnGrupo(WFPMOinfraestructura) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilIInfraestructura=true; }
	
// Aplicaciones
	if(validaUsuarioEnGrupo(WFPMOaplicaciones) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilAplicaciones=true; }
	
// Automatizacion y robotica
	if(validaUsuarioEnGrupo(WFPMOautomatizacionRobotica) || validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilAutomatizacionRobotica=true; }

// Administrador
	if(validaUsuarioEnGrupo(WFPMOAdministrador)){ accesoPerfilAdministrador=true; }

	
}

function validaUsuarioEnGrupo(grupo){ // verifica si un usuario se encuentra dentro de un grupo
	
	 var valida=false; //retorna true cuando se encuentra y false cuando no.
     var loggedinUserGroup="";
     $().SPServices({  
        operation: "GetGroupCollectionFromUser",  
        userLoginName: $().SPServices.SPGetCurrentUser(),  
        async: false,  
        completefunc: function(xData, Status) 
        { 	
            $(xData.responseXML).find("Group").each(function(){
             // debugger;
              loggedinUserGroup = $(this).attr("Name");
              console.log(loggedinUserGroup);
              if(loggedinUserGroup==grupo){	
              	valida=true;
              }
            });
         }
     }); 
     return valida;
}

function setGruposDelUsuario(){ 
	
	     var loggedinUserGroup="";
     $().SPServices({  
        operation: "GetGroupCollectionFromUser",  
        userLoginName: $().SPServices.SPGetCurrentUser(),  
        async: false,  
        completefunc: function(xData, Status) 
        { 	
            $(xData.responseXML).find("Group").each(function(){
             // debugger;
              loggedinUserGroup = $(this).attr("Name");
              /*console.log(loggedinUserGroup);
              if(loggedinUserGroup==grupo){	
              	valida=true;
              }*/
              
              switch(loggedinUserGroup)
              {
              	case 'TICA Norte':
              		GrupoTicaNorte=true;
              	break;
              	case 'TICA Sur':
              		GrupoTicaSur=true;
              	break;
				case 'SAP':
              		GrupoSap=true;
              	break;
              	case 'Infraestructura':
              		GrupoInfraestructura=true;
              	break;
				case 'Aplicaciones':
              		GrupoAplicaciones=true;
              	break;
              	case 'Automatización y Robótica':
              		GrupoAutomatizacionRobotica=true;
              	break;

				 }
              
            });
         }
     }); 
    
}


function AgregarIniciativa()
{
	levantaPopup();
}
function RetornaLinkPopup(idIniciativa){

	levantaPopupUrl(urlVisualizaIniciativa  + "?ID=" + idIniciativa);
}

function RetornaPopupTiempoCosto(idIniciativa){

	levantaPopupEstimacionTiempo(urlVisualizaIniciativa  + "?ID=" + idIniciativa);

}

function RetornaPopupTiempoCostoAreaEspecialista(idIniciativa){

	levantaPopupTiempoCosto(urlIngresoTiempoCosto+ "?ID=" + idIniciativa);

}

function RetornaPopUpGestionIniciativas(idIniciativa){

	levantaPopupGestionIniciativa(urlGestionIniciativas+ "?ID=" + idIniciativa);

}

function RetornaPopUpIniciativaRechazada(idIniciativa){

	levantaPopupIniciativaRechazada(urlVisualizaRechazado+ "?ID=" + idIniciativa);

}

function RetornaPopUpIniciativaCorreccion(idIniciativa){

	levantaPopupIniciativaCorrecion(urlCorrecionIniciativa+ "?ID=" + idIniciativa);

}

function RetornaPopUpRevisionGestionIniciativa(idIniciativa){

	levantaPopupRevisionGestionIniciativa(urlRevisionGestionIniciativa+ "?ID=" + idIniciativa);

}

function RetornaPopUpAsignadoEjecucion(idIniciativa){

	levantaPopupAsignadoEjecucion(urlRevisionGestionIniciativa+ "?ID=" + idIniciativa);

}

function RetornaPopUpEjecucionIniciativa(idIniciativa){

	levantaPopupEjecucionIniciativa(urlEnEjecucionIniciativa+ "?ID=" + idIniciativa);

}


function RetornaPopUpVisualizaIniciativa(idIniciativa){

	levantaPopupVisualizaIniciativa(urlVisualizaIniciativaPerfil + "?ID=" + idIniciativa);

}


function levantaPopupConstruccion()
{
var option  = { 
				title:"WFPMO - Construcción",
				allowMaximize:false,
				showMaximized:false,
				showClose:true,
				autoSize:true,
				//width:515,
				width:550,
				height:460,
				//scroll:0,
				//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
				dialogReturnValueCallback: callbackMethod,
				url:urlUnderConstruction
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}


function levantaPopup()
{
var option  = { 
				title:"WFPMO - Nueva Iniciativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				//autoSize:true,
				//width:515,
				width:550,
				height:460,
				//scroll:0,
				//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
				dialogReturnValueCallback: callbackMethod,
				url:urlIniciativa
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}
function levantaPopupUrl(_url)
{
var option  = { 
				title:"WFPMO - Iniciativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:550,
				height:330,
				args: {
						estado: 'I',
						},

				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}


function levantaPopupEstimacionTiempo(_url){
var option  = { 
				title:"WFPMO - Estimación Tiempo Costo",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:370,
				args: {
						estado: 'TC',
						},
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupTiempoCosto(_url){
var option  = { 
				title:"WFPMO - Estimación Tiempo Costo - Area Especialista",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:600,
				args: {
						estado: 'TCAE',
						},
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupGestionIniciativa(_url){
var option  = { 
				title:"WFPMO - Gestión de Iniciativas – Responsable Documento",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:600,
				args: {
						estado: 'GI',
						},
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupIniciativaRechazada(_url){
var option  = { 
				title:"WFPMO - Iniciativa Rechazada",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:430,
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupIniciativaCorrecion(_url){
var option  = { 
				title:"WFPMO - Correción Iniciativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:550,
				height:450,
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupRevisionGestionIniciativa(_url){
var option  = { 
				title:"WFPMO - Revisión Gestión Iniciativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:600,
				args: {
						estado: 'GI',
						},

				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupAsignadoEjecucion(_url){
var option  = { 
				title:"WFPMO - Asignado Ejecución",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:600,
				args: {
						estado: 'AE',
						},

				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}

function levantaPopupEjecucionIniciativa(_url){
var option  = { 
				title:"WFPMO - Ejecución Iniciativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:600,
				dialogReturnValueCallback: callbackMethod,
				url:_url
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}


function levantaPopupVisualizaIniciativa(_url){
var option  = { 
				title:"WFPMO - Visualiza Inicicativa",
				allowMaximize:false,
				showMaximized:false,
				showClose:false,
				autoSize:false,
				width:500,
				height:430,
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

function CargaTablaIniciativas()
{

	var CQ = "<Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query>";
	

	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListaIniciativas,
		CAMLQuery:CQ, 
		completefunc: function(xData, Status)
						{
							var liHtml ="<tbody id='tableBody'>";
							var tdDivision='';
							var tdSindicato='';
							var tdTipoActividad='';
							
							if (Status == "success") 
								{		
									var strCorrelativo='';
									var fechaIngreso="";									
									var strNegocio='';
									var strOrganizacion='';
									var strIngresadaPor='';
									var strNombre='';
									var strEstado='';
									
									$(xData.responseXML).SPFilterNode("z:row").each(function() 
									{	
										strCorrelativo=$(this).attr("ows_Correlativo");
										var autor = $(this).attr("ows_Author").split(';#')[1];
										
										
										//alert(autor);
										strIngresadaPor=$(this).attr("ows_Author").split(';#')[1].split('(')[0];
										fechaIngreso="";
										if(($(this).attr("ows_Created")!="")&&($(this).attr("ows_Created")!=undefined)){
											fechaIngreso=moment($(this).attr("ows_Created")).format('DD/MM/YYYY').substring(0,10);
										}

										strNegocio=$(this).attr("ows_Negocio").split(';#')[1];
										strOrganizacion='';
										var Organizacion = $(this).attr("ows_Organizacion").split(';#');
										for (i = 1; i < Organizacion.length; i++) {
											strOrganizacion = strOrganizacion + Organizacion[i] + '<br/>';
											i++;
										}
										//strOrganizacion=$(this).attr("ows_Organizacion");//.split(';#')[1];
										strNombre=$(this).attr("ows_Nombre");
										strEstado=$(this).attr("ows_Estado");
										
										if(typeof $(this).attr("ows_AreaEspecialista") != 'undefined'){
											var areaEspecialista = $(this).attr("ows_AreaEspecialista").split(';#')[1];
										}else{
											var areaEspecialista = '';
										}
										
										if(typeof $(this).attr("ows_AreaEjecucion") != 'undefined'){
											var areaEjecucion = $(this).attr("ows_AreaEjecucion").split(';#')[1];
										}else{
											var areaEjecucion = '';
										}
										
										liHtml =liHtml+ " <tr>"; 
										//debugger;
 										
 										switch(strEstado){
 											case'Ingresado':
 												if(accesoPerfilPMO){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaLinkPopup("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
 												break;
 												case'Estimación Rechazada':
 												if(accesoPerfilPMO){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaLinkPopup("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpIniciativaRechazada("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
 												break;

 											case'En estimación de fecha':
 												if(accesoPerfilAdministrador){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
	 												switch(areaEspecialista){
												              //	debugger;
												              	case 'TICA Norte':
												              		if(GrupoTicaNorte){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
												              	break;
												              	case 'TICA Sur':
												              		if(GrupoTicaSur){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'SAP':
												              		if(GrupoSap){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Infraestructura':
												              		if(GrupoInfraestructura){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Aplicaciones':
												              		if(GrupoAplicaciones){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Automatización y Robótica':
												              		if(GrupoAutomatizacionRobotica){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;

														}
 												
 													}
 												
 												
 												
 												/*if(accesoPerfilAreaEspecialista){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCosto("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}*/
												break;
 											case'En estimación':
 												if(accesoPerfilAdministrador){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
	 												switch(areaEspecialista){
												              //	debugger;
												              	case 'TICA Norte':
												              		if(GrupoTicaNorte){
												              		//alert('TICA Norte');
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
												              	break;
												              	case 'TICA Sur':
												              		if(GrupoTicaSur){
												              		//alert('TICA Sur');
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'SAP':
												              		if(GrupoSap){
												              		//alert('SAP');
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Infraestructura':
												              		if(GrupoInfraestructura){
												              		//alert('Infraestructura');
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Aplicaciones':
												              		if(GrupoAplicaciones){
												              		//alert('Aplicaciones');
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Automatización y Robótica':
												              		if(GrupoAutomatizacionRobotica){
												              		//alert('Automatización y Robótica');
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;

														}
 												
 													}

 												
 												
 												/*if(accesoPerfilAreaEspecialista){
													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}*/
												break;
 											case'Solicita Cambios':
 												if(accesoPerfilAdministrador){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
	 												switch(areaEspecialista){
												             
												              	case 'TICA Norte':
												              		if(GrupoTicaNorte){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
												              	break;
												              	case 'TICA Sur':
												              		if(GrupoTicaSur){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'SAP':
												              		if(GrupoSap){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Infraestructura':
												              		if(GrupoInfraestructura){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Aplicaciones':
												              		if(GrupoAplicaciones){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Automatización y Robótica':
												              		if(GrupoAutomatizacionRobotica){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;

														}
 												
 													} 

 											
 												/*if(accesoPerfilAreaEspecialista){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopupTiempoCostoAreaEspecialista("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}*/
												break; 
 											case'Validación Cliente':
 												if((accesoPerfilAdministrador)|| (autor == userConectado)){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpGestionIniciativas("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
												break;
 											case'Validación Cliente Corrección':
 												if((accesoPerfilAdministrador)|| (autor == userConectado)){
													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpGestionIniciativas("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
												break;
 											case'Rechazado':
 												liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpIniciativaRechazada("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												break;
 											case'En Corrección':
 												if((accesoPerfilAdministrador)|| (autor == userConectado)){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpIniciativaCorreccion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
												break;
 											case'Aprobada cliente':
 												if(accesoPerfilPMO){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpRevisionGestionIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
												break;
 											case'Asignado Ejecución':
 												if(accesoPerfilAdministrador){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
	 												switch(areaEjecucion){
												              //	debugger;
												              	case 'TICA Norte':
												              		if(GrupoTicaNorte){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
												              	break;
												              	case 'TICA Sur':
												              		if(GrupoTicaSur){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'SAP':
												              		if(GrupoSap){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Infraestructura':
												              		if(GrupoInfraestructura){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Aplicaciones':
												              		if(GrupoAplicaciones){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;
																case 'Automatización y Robótica':
												              		if(GrupoAutomatizacionRobotica){
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}else{
												              			liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												              		}
																break;

														}
 												
 													}
 												

 												
 												
 												
 												
 												/*if(accesoPerfilAreaEspecialista){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpAsignadoEjecucion("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}*/
												break;
 											case'En ejecución':
 												if(accesoPerfilPMO){
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpEjecucionIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}else{
 													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
 												}
												break;
											case 'Implementado':
													liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:RetornaPopUpVisualizaIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												break;
											/*default:
												liHtml =liHtml+"<td style='text-align:left;width:7%;'><a href='javascript:levantaPopupConstruccion();'> "+strCorrelativo+"</a></td>"; */
							        	}

																		
										liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + fechaIngreso + "</td>";
										liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strNegocio + "</td>";
										liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strOrganizacion + "</td>";
										liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strIngresadaPor + "</td>";
										liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strNombre + "</td>"; 
										liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strEstado + "</td>";
										liHtml =liHtml+"</tr>";									
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

