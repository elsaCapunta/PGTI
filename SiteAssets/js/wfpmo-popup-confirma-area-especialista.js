var guiListAreaEspecialista = '{A194B4BD-BD99-4078-AF2E-F8EAC3AEB05A}';



$(document).ready(function(){

	creaSelect('sltAreaEspecialista',guiListAreaEspecialista );
				
});

function creaSelect(nomObj,nomLista){ // carga select
	
		var select = $("#"+nomObj+"");
	
		
	    $().SPServices({
	        operation: "GetListItems",
	        async: false,
	        listName: nomLista,
	        completefunc: function (xData, Status) {
	        
				select.append("<option value='0'>Seleccionar...</option>");
	        		
	                $(xData.responseXML).SPFilterNode("z:row")
	                	.each(function() {   
	                   		select.append("<option value='"+$(this).attr("ows_ID")+"'>" + $(this).attr("ows_Title") + "</option>");
	                });
	        }
	    });
}



function CerrarPopUp(){
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel,'cancel');
}
