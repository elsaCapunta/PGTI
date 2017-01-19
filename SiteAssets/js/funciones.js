var GuidListaIniciativas='{E358B8A6-8FEA-426A-AC78-0B71952C1A2B}'

$(document).ready(function(){
$("#txtCliente").pickSPUser({allowMultiples: false});
$("#txtSponsor").pickSPUser({allowMultiples: false});	
cargaObjetos();
});

// cierra popup
function Cerrar()
{
alert("cierre");
	SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.ok,'');
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
catch(ex){}
}

//graba iniciativas
function registraIniciativa()
{		
	var txtNombre= $.trim($("#txtNombre").val());		
	var txtCliente= $.trim($("#txtCliente").val());
	var txtSponsor= $.trim($("#txtSponsor").val());
	var sltNegCli= $.trim($("#sltNegCli").val());
	var sltDivision= $.trim($("#sltDivision").val());
	addList(GuidListaIniciativas,[["Title", txtNombre],["Cliente", txtCliente],["Sponsor", txtSponsor],["Negocio", sltNegCli],["Division", sltDivision]]);
        
}

////////////////////////////carga objetos del formulario
function cargaObjetos(){
creaSelectNivel1("sltDivision","{4D33F9FC-07E6-448E-AC61-B1F88AF2375E}","ID","Title");
creaSelectNivel1("sltNegCli","{0EAC5B98-43B5-4957-8044-5B6DC5579AB1}","ID","Title");

}

function creaSelectNivel1(nomObj,nomLista,campo1,campo2){
	var select = $("#"+nomObj+"");	
	var campo3 = campo2;
	alert("4");
	//if(nomObj == "sltEstado") campo3 = campo1; else campo3 = campo2;

    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: nomLista,
        //CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
       CAMLQuery: "<Query><Where><Eq><FieldRef Name="asignado" /><Value Type="Text">Miguel Uribe Claro</Value></Eq></Where></Query>",
        
        
        completefunc: function (xData, Status) {
                       if (Status == "success") {  
            	if(nomObj != "sltEstado"){          
            		select.append("<option value='0' selected>Seleccione...</option>");
            	}

                $(xData.responseXML).SPFilterNode("z:row").each(function() {                 
                   //select.append("<option value='"+$(this).attr("ows_"+campo3+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
                   select.append("<option value='"+$(this).attr("ows_"+campo1+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
                });
            }
        }
    });
}


