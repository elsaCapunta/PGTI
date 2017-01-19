var guidListaPrueba = "{155B9D72-3ADE-428A-91B6-A80716675F23}";
var ItemUrlMinutas = "http://shphm.codelco.cl/sites/rsas/Lists/Minutas/199_.000";
var ItemUrlParticipantes = "http://shphm.codelco.cl/sites/rsas/Lists/Participantes/333_.000";

var guidListaCompromisos= '{AD020E72-E583-4799-BADA-4005AD3A72CF}';
var guidListaResponsableCompromiso="{2D21A5F2-67D7-4B97-B421-33B567C76CD4}";

var ItemUrlResponsableCompromiso = window.location.protocol + '//' + window.location.host +
		  							'/sites/rsas/Lists/Responsables%20por%20%20Compromiso/287_.000';
		  
var ItemUrlCompromisos = window.location.protocol + '//' + window.location.host +
		  							'/sites/rsas/Lists/Compromisos%20Acuerdos%20e%20Informacin/317_.000';



//var templateId = "{b5c0ded2-4b23-4a98-8b11-aa7f2b0b5e25}";
//var templateId="{48d1a8e7-a15b-4242-9946-6b8b0df036a2}";
//var templateId="{9fa4fe77-ff7e-4c9e-8733-5bef4b2c00d5}";//Participantes
var templateIdNotificaCreacion="{26970d10-896c-44b5-8c71-0486da4b3328}";// Notifica Creacion
var templateIdNotificaVencimiento="{26970d10-896c-44b5-8c71-0486da4b3328}";// Notifica Vencimiento

//var templateIdNotificaCompromiso="{1240efb9-bca1-4dc6-abf7-4aa72b0299b6}";
//var templateIdNotificaCompromiso="{d264b716-33b2-437c-8800-3b5c50076c06}";
var templateIdNotificaCompromiso="{5cdf072b-59b8-4ef2-847e-8105bd12b807}";// Notifica Compromiso


var folioCompromiso='';
var diasAtrasoCompromiso='';

$(document).ready(function()
{

//var context = new SP.ClientContext();
//var relativeWebUrl = context.get_url();
//var fullWebUrl = window.location.protocol + '//' + window.location.host + relativeWebUrl ;
//alert(window.location.protocol + '//' + window.location.host);
  	//ObtieneGuidWF('RSAS-Notifica-Creacion',ItemUrlMinutas );
  	//$('#txtTemplateId').val(ObtieneGuidWF('Participantes',ItemUrlParticipantes));
  	//$('#txtTemplateId').val(ObtieneGuidWF('Correos',ItemUrlResponsableCompromiso));
  	//$('#txtTemplateId').val(ObtieneGuidWF('Correos',ItemUrlResponsableCompromiso));
	//$('#txtTemplateId').val(ObtieneGuidWF('RSAS-Notifica-Creacion',ItemUrlMinutas));
	//$('#txtTemplateId').val(ObtieneGuidWF('RSAS-Notifica-PreVencimiento-Vencimiento',ItemUrlCompromisos));
$('#txtTemplateId').val(ObtieneGuidWF('RSAS - Compromisos - Notifica',ItemUrlCompromisos));


//RSAS-Recupera-Correo-Responsable
  	//StartWorkflow(ItemUrl,ObtieneGuidWF('RSAS-Notifica-Creacion'),'');
  //	StartWorkflow(ItemUrlParticipantes,templateId,'');
  
 // StartWorkflow(ItemUrlMinutas,templateIdNotificaCreacion,'');
 
 
 
 //agregar a codigo
// $('#txtTemplateId').val(ObtieneGuidWF('RSAS-Notifica-Creacion',ItemUrlMinutas));
//$('#txtTemplateId').val(ObtieneGuidWF('RSAS - Compromisos - Notifica',ItemUrlCompromisos));
 /*
 	ObtieneDatosCompromiso(299);
	NotificaCompromisos(ObtieneGuidWF('RSAS - Compromisos - Notifica',ItemUrlCompromisos),299,diasAtrasoCompromiso);
	*/

  //alert(ObtieneBodyCompromiso(301));
  //$('#divCompromiso').append(ObtieneBodyCompromiso(301));
  
  	//EnviaNotificacionAResponsables(192);
 });
function ObtieneGuidWF(nombreFlujo,ItemUrl)
{
	var workflowGUID='';
	$().SPServices({
	  operation: "GetTemplatesForItem",
	  item: ItemUrl,
	  debug: true,
	  async: false,
	  completefunc: function (xData, Status) {
	    $(xData.responseXML).find("WorkflowTemplates > WorkflowTemplate").each(function(i,e) {
	      // hard coded workflow name
	      if ( $(this).attr("Name") == nombreFlujo ) {              
	        var guid = $(this).find("WorkflowTemplateIdSet").attr("TemplateId");        
	        if ( guid != null ) {
	          workflowGUID = "{" + guid + "}";
	          }
	        }
	      });
	  }
	});
	return workflowGUID;
}

function ActualizaCorreoParticipante(TID,IID) {

var IURL= window.location.protocol + '//' + window.location.host +
		  '/sites/rsas/Lists/Participantes/' + IID + '_.000';

//var param1= 'jvr.chavarria@gmail.com';

//var WFParameters= "<Data><paramCorreosDestino>" + param1 + "</paramCorreosDestino></Data>";
var WFParameters= "<root />";
// workflowParameters: "<root />",
  $().SPServices({
				    operation: "StartWorkflow",
				    item: IURL,
				    templateId: TID,
				    workflowParameters: WFParameters,
				    completefunc: function(xData, Status){
				     // document.getElementById(workflowDiv).innerHTML = 'Workflow Started';
					     if(Status == 'success')
					     {
					     	alert('Resultado inicio de Workflow: '+Status);
					     }
					     else
					     {
					     	alert('Resultado inicio de Workflow: '+Status);
					     }
				    }
  });
}
function NotificaCreacionAGrupoAdministradores(TID,IID) {

var IURL= window.location.protocol + '//' + window.location.host +
		  '/sites/rsas/Lists/Minutas/' + IID + '_.000';
var WFParameters= "<root />";
  $().SPServices({
				    operation: "StartWorkflow",
				    item: IURL,
				    templateId: TID,
				    workflowParameters: WFParameters,
				    completefunc: function(xData, Status){
					     if(Status == 'success')
					     {
					     	alert('Resultado inicio de Workflow: '+ Status);
					     }
					     else
					     {
					     	alert('Resultado inicio de Workflow: '+Status);
					     }
				    }
  });
}

function EnviaNotificacionAResponsables(IdMinuta)
{


var CQ="<Query><Where>"+
			  "<Eq>"+
		         "<FieldRef Name='ID_x0020_Minuta' />"+
		         "<Value Type='Text'>" + IdMinuta+ "</Value>"+
		      "</Eq>"+
		      "</Where>"+
		   "<OrderBy>"+
		      "<FieldRef Name='ID' Ascending='True' />"+
		   "</OrderBy>"+
		"</Query>";
		   
		$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListaCompromisos,
		CAMLQuery:CQ,
		completefunc: function (xData, Status) {		
			var ItemCount = $(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount");
			$(xData.responseXML).SPFilterNode("z:row").each(function() 
			{		
					var ID = $(this).attr("ows_ID");
					ObtieneDatosCompromiso(ID);
					NotificaCompromisos(templateIdNotificaCompromiso,ID,diasAtrasoCompromiso);
			});						
		}
	});
}


function NotificaCompromisos(TID,IID,diasAtrasoCompromiso) 
{
	var IURL= window.location.protocol + '//' + window.location.host +
		  '/sites/rsas/Lists/Compromisos%20Acuerdos%20e%20Informacin/' + IID + '_.000';
		  
	var WFParameters= "<Data><paramDiasAtrasoCompromiso>"+diasAtrasoCompromiso+"</paramDiasAtrasoCompromiso></Data>";

				  $().SPServices({
								    operation: "StartWorkflow",
								    item: IURL,
								    templateId: TID,
								    workflowParameters: WFParameters,
								    completefunc: function(xData, Status){
									     if(Status == 'success')
									     {
									     	alert('Resultado inicio de Workflow: '+Status);
									     }
									     else
									     {
									     	alert('Resultado inicio de Workflow: '+Status);
									     }
								    }
				  });
}
function restaFecha(f1,f2)
 {
 var aFecha1 = f1.split('/'); 
 var aFecha2 = f2.split('/'); 
 var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
 var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
 var dif = fFecha2 - fFecha1;
 var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
 return dias;
 }
function ObtieneDatosCompromiso(idCompromiso)
{

//var liHtml ="<table style='width: 400px;border:0;'><tbody>";
var hoy = moment();

var CQ="<Query>"+
		   "<Where>"+
		      "<Eq>"+
		         "<FieldRef Name='ID' />"+
		         "<Value Type='Number'>" + idCompromiso + "</Value>"+
		      "</Eq>"+
		   "</Where>"+
		"</Query>";
		
		$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListaCompromisos,
		CAMLQuery: CQ, 
		completefunc: function(xData, Status)	
						{							
							if (Status == "success") 
								{
								var correlativo='';
									$(xData.responseXML).SPFilterNode("z:row").each(function() 
									{
										if(($(this).attr("ows_correlativo")=="")&&(typeof $(this).attr("ows_correlativo")!="undefined"))
										{
											correlativo=$(this).attr("ows_correlativo");
										}
										else
										{ 
											correlativo='00'; 
										}
										

 										var fechaCompromiso=moment($(this).attr("ows_Fecha_x0020_de_x0020_Compromiso")).format('DD/MM/YYYY');
 										
										diasAtrasoCompromiso='0';
										folioCompromiso=correlativo+'-'+$(this).attr("ows_FolioMinuta").split(';#')[1];
										// alert(folioCompromiso);
										/*
										liHtml=liHtml+
														//"<tr><td colspan='2' style='text-align:center;font-weight:bold;width: 100%;background-color:#fafafa;'>Detalle</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Folio</td>"+
														"<td style='text-align:center;width: 50%;'>"+correlativo+'-'+$(this).attr("ows_FolioMinuta").split(';#')[1]+"</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Fecha Comp/Acuerdo/Info</td>"+
														"<td style='text-align:center;width: 50%;'>" + moment($(this).attr("ows_Fecha_x0020_de_x0020_Compromiso")).format('DD/MM/YYYY') + "</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Responsable(s)</td>"+
														"<td style='text-align:left;width: 50%;'>"+consultaResp(idCompromiso)+"</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Descripción</td>"+
														"<td style='width: 50%;'>"+$(this).attr("ows_Descripcion")+"</td></tr>";
										*/
										
									});
								}
						}
				});
				
		//		liHtml=liHtml+"</tbody></table>";
	//return liHtml;
}


function ObtieneBodyCompromiso(idCompromiso)
{

var liHtml ="<table style='width: 400px;border:0;'><tbody>";
var CQ="<Query>"+
		   "<Where>"+
		      "<Eq>"+
		         "<FieldRef Name='ID' />"+
		         "<Value Type='Number'>" + idCompromiso + "</Value>"+
		      "</Eq>"+
		   "</Where>"+
		"</Query>";
		
		$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListaCompromisos,
		CAMLQuery: CQ, 
		completefunc: function(xData, Status)	
						{							
							if (Status == "success") 
								{
								var correlativo='';
									$(xData.responseXML).SPFilterNode("z:row").each(function() 
									{
										if(($(this).attr("ows_correlativo")!="")&&(typeof $(this).attr("ows_correlativo")!="undefined"))
										{
											correlativo=$(this).attr("ows_correlativo");
										}
										else
										{ 
											correlativo='00'; 
										}
										
										liHtml=liHtml+
														//"<tr><td colspan='2' style='text-align:center;font-weight:bold;width: 100%;background-color:#fafafa;'>Detalle</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Folio</td>"+
														"<td style='text-align:center;width: 50%;'>"+correlativo+'-'+$(this).attr("ows_FolioMinuta").split(';#')[1]+"</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Fecha Comp/Acuerdo/Info</td>"+
														"<td style='text-align:center;width: 50%;'>" + moment($(this).attr("ows_Fecha_x0020_de_x0020_Compromiso")).format('DD/MM/YYYY') + "</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Responsable(s)</td>"+
														"<td style='text-align:left;width: 50%;'>"+consultaResp(idCompromiso)+"</td></tr>"+
														"<tr><td style='text-align:left;font-weight:bold;width: 50%;'>Descripción</td>"+
														"<td style='width: 50%;'>"+$(this).attr("ows_Descripcion")+"</td></tr>";
									
									});
								}
						}
				});
				
				liHtml=liHtml+"</tbody></table>";
	return liHtml;
}

function consultaResp(IdCompromiso){

var tblRespuesta="<table><tbody>";

	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListaResponsableCompromiso,
		CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID_x0020_Compromiso' /><Value Type='Number'>" + IdCompromiso + "</Value></Eq></Where></Query>",
		completefunc: function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function() {			
			var ID = $(this).attr("ows_ID");
			var Descripcion = '';			
			if(($(this).attr("ows_Nombre")!='')&&(typeof $(this).attr("ows_Nombre")!='undefined'))
			{		
					var Descripcion = $(this).attr("ows_Nombre");
					if(Descripcion!="")
					{
						var primerNombre=Descripcion.split(";#")[1].split("(")[0].split(" ")[2];
						var segundoNombre=Descripcion.split(";#")[1].split("(")[0].split(" ")[3];
						var primerApellido=Descripcion.split(";#")[1].split("(")[0].split(" ")[0];
						var segundoApellido=Descripcion.split(";#")[1].split("(")[0].split(" ")[1];
						 
						 Descripcion='';
						Descripcion = primerNombre+" "+segundoNombre+" "+primerApellido+" "+segundoApellido;
					}
			
			}
			else{
				if(($(this).attr("ows_NombreCompleto")!='')&&(typeof $(this).attr("ows_NombreCompleto")!='undefined')){
					Descripcion=$(this).attr("ows_NombreCompleto").split(";#")[0];
				}
			}		
			var CAI = $(this).attr("ows_Correo");
			tblRespuesta +="<tr>" +
               "<td style='text-align=left;border:0;'>"+Descripcion+"</a></td>" +                
              // "<td align='left' style='border:1px solid #fafafa'>"+CAI+"</a></td>" +		   
				"</tr>";		
			});	
			var ItemCount = $(xData.responseXML).SPFilterNode("rs:data").attr("ItemCount");
			if(ItemCount==0){
				tblRespuesta +="<tr align='middle'>" +
               "<td align='Middle' colspan='2' style='border:1px solid #fafafa'>Sin Resultados</td>" +                           
                   "</tr>";	
			}
											
		}
	});	
	tblRespuesta +="</tbody></table>";
	
	return tblRespuesta;
	
}

