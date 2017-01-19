//var ItemUrl = "http://shpteapp.codelco.cl/sites/gadt/direcciones/dc/contabilidad/fape/Lists/FormularioDeEnajenacion/565_.000";
var ItemUrl = "http://qashpcorpapp.codelco.cl/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/Lists/Iniciativas/206_.000";
			   


$(document).ready(function()
{

$('#txtTemplateId').val(ObtieneGuidWF('PGTI - Notifica',ItemUrl));

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
	  alert(Status);
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
	alert(workflowGUID);
	return workflowGUID;
}
