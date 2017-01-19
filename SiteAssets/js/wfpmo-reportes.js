var GuidListaIniciativas		 ='{2546F01E-08A8-4D85-A933-028731B71063}';
var GuidListTipoOrganización	 = '{293C7015-C70A-4693-9E44-FD3A78C8372F}';
var GuidListOrganizacion		 = '{F0E40B09-8427-4458-80C7-44CB4DBA1F28}';
var GuidListAreaEspecialista	 = '{A194B4BD-BD99-4078-AF2E-F8EAC3AEB05A}'; 
var GuidListIniciativaEstado	 = '{5D79A550-A47E-4BF6-98A6-5EEE92312861}';
var urlRevisionGestionIniciativa = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-revision-gestion-iniciativa.html';
var urlDetalleIniciativa 		 = '/sites/PGTI/areas/SSI/catalogo_aplicaciones/RegistroIniciativas/desa/paginas/wfpmo-detalle-iniciativa-reporte.html';
var idRegistro ='';
var anioActual = '';
var anioAterior = '';
var IdArray	= new Array();
var fechaActual = new Date();

$(document).ready(function()
{
		//$('#dvData').hide();
		idRegistro = $.trim(urlParam("ID"));
			
			if(idRegistro!='')
			{
				RetornaPopUpDetalleIniciativa(idRegistro)
			}
			
			CargaSelectAnio();
			//creaSelect('sltDivision',GuidListTipoOrganización,'ID','Title','ID');
			creaSelectDivision('sltDivision',GuidListOrganizacion,'ID','Title','ID');
			creaSelect('sltAreaEjecucion',GuidListAreaEspecialista,'ID','Title','ID');
			creaSelect('sltAreaEspecista',GuidListAreaEspecialista,'ID','Title','ID');
			CargaTablaIniciativas();
		//$('#btnBuscar').click();
			
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


function CargaSelectAnio(){

	var hoy = new Date();
	anioActual = hoy.getFullYear();
	anioAterior = hoy.getFullYear()-1;
	
	$('#sltAnio').append("<option value="+anioAterior+">"+anioAterior+"</option>");
	$('#sltAnio').append("<option value="+anioActual+">"+anioActual+"</option>");
}

function creaSelect(nomObj,nomLista,campo1,campo2,campo3){ // carga select
	
		var select = $("#"+nomObj+"");
		var CQ = "<Query>"
				   +"<Where>"
				      +"<Eq>"
				         +"<FieldRef Name='Activo' />"
				         +"<Value Type='Boolean'>1</Value>"
				      +"</Eq>"
				   +"</Where>"
				+"</Query>";

		
	    $().SPServices({
	        operation: "GetListItems",
	        async: false,
	        listName: nomLista,
	        CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
	        CAMLQuery: CQ,
	        completefunc: function (xData, Status) {
	        	select.html('');
				select.append("<option value='0'>Seleccionar...</option>");
	        		
	                $(xData.responseXML).SPFilterNode("z:row")
	                	.each(function() {   
	                   		//select.append("<option value='"+$(this).attr("ows_"+campo2+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                   		select.append("<option value='"+$(this).attr("ows_"+campo1+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                });
	        }
	    });
}
function creaSelectDivision(nomObj,nomLista,campo1,campo2,campo3){ // carga select
	
		var select = $("#"+nomObj+"");
		var CQ = "<Query>"
				   +"<Where>"
				      +"<Eq>"
				         +"<FieldRef Name='Activo' />"
				         +"<Value Type='Boolean'>1</Value>"
				      +"</Eq>"
				   +"</Where>"
				+"</Query>";

		
	    $().SPServices({
	        operation: "GetListItems",
	        async: false,
	        listName: nomLista,
	        CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
	        CAMLQuery: CQ,
	        completefunc: function (xData, Status) {
	        	select.html('');
				select.append("<option value='0'>Seleccionar...</option>");
	        		
	                $(xData.responseXML).SPFilterNode("z:row")
	                	.each(function() {   
	                   		//select.append("<option value='"+$(this).attr("ows_"+campo2+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                   		select.append("<option value='"+$(this).attr("ows_"+campo2+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                });
	        }
	    });
}


function creaSelectOrganizacion(nomObj,nomLista,campo1,campo2,campo3){ // carga select
	
		var select = $("#"+nomObj+"");
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Eq>"
				            +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE' />"
				            +"<Value Type='Lookup'>"+campo3+"</Value>"
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
	       // CAMLViewFields: "<ViewFields><FieldRef Name='"+campo1+"'></FieldRef><FieldRef Name='"+campo2+"'></FieldRef></ViewFields>",
	        CAMLQuery: CQ,
	        completefunc: function (xData, Status) {
	        	select.html('');
				select.append("<option value='0'>Seleccionar...</option>");
	        		
	                $(xData.responseXML).SPFilterNode("z:row")
	                	.each(function() {   
	                   		//select.append("<option value='"+$(this).attr("ows_"+campo2+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                   		select.append("<option value='"+$(this).attr("ows_"+campo1+"")+"'>" + $(this).attr("ows_"+campo2+"") + "</option>");
	                });
	        }
	    });
}

function CargaTablaIniciativas(){
/*	$('#tblExcel tbody').remove(); 
	$('#tblExcel').DataTable().destroy();
	
	$('#tablaIniciativas tbody').remove(); 
	$('#tablaIniciativas').DataTable().destroy(); 
*/	
	
	var op = '';
	var mes  = $('#sltMes').val();
	var anio = $('#sltAnio').val();
	var division = $('#sltDivision').val();
	var areaEspecialista = $('#sltAreaEspecista').val();
	var areaEjecucion = $('#sltAreaEjecucion').val();
	var estado = $('#sltEstado').val();
	//alert(estado);
	
	
	if(mes != 0 && anio == 0){
	//debugger;
		var fchadesde = anioAterior+'-'+mes+'-01';
		var fchahasta = anioActual+'-'+mes+'-31';
	}
	
	if(mes == 0 && anio != 0){
		var fchadesde = anio+'-01-01';
		var fchahasta = anio+'-12-31';
	}
	
	if(mes != 0 && anio != 0){
		var fchadesde = anio+'-'+mes+'-01';
		var fchahasta = anio+'-'+mes+'-31';
	}
	
	if(mes == 0 && anio == 0){
		var fchadesde = anioAterior+'-01-01';
		var fchahasta = anioActual+'-12-31';
	}



	//var CQ = "<Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query>";
	
	//TRAE TODO
	//if(division == 0 && areaEspecialista ==0 && areaEjecucion ==0 && estado==0){
	if(areaEspecialista ==0 && areaEjecucion ==0 && estado==0){

		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<Leq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				         +"</Leq>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}		
	
	
	//DIVISIÓN//
//	if(division != 0 && areaEspecialista ==0 && areaEjecucion ==0 && estado==0){ 
/*	if(areaEspecialista ==0 && areaEjecucion ==0 && estado==0){ 
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				           +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				     //    +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				          /*  +"<Eq>"
				               +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				               +"<Value Type='Lookup'>"+division+"</Value>"
				            +"</Eq>"*/
				     //    +"</And>"
				    
				/*  +"</And>"
				   +"</Where>"
				+"</Query>";
	} */
	
	//DIVISIÓN - AREAESPECIALISTA//
//	if(division !=0 && areaEspecialista !=0 && areaEjecucion ==0 && estado==0){
	if(areaEspecialista !=0 && areaEjecucion ==0 && estado==0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				           // +"<And>"
				           /*    +"<Eq>"
				                  +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+division+"</Value>"
				               +"</Eq>"*/
				               +"<Eq>"
				                  +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				               +"</Eq>"
				          //  +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";

	}	
	
	//DIVISIÓN-AREAESPECIALISTA-AREAEJECUCIÓN//
//	if(division !=0 && areaEspecialista!=0 && areaEjecucion !=0 && estado==0){
	if(areaEspecialista!=0 && areaEjecucion !=0 && estado==0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<And>"
				             /*  +"<Eq>"
				                  +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+division+"</Value>"
				               +"</Eq>"*/
				              // +"<And>"
				                  +"<Eq>"
				                     +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				                     +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				                  +"</Eq>"
				                  +"<Eq>"
				                     +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				                     +"<Value Type='Lookup'>"+areaEjecucion +"</Value>"
				                  +"</Eq>"
				             //  +"</And>"
				            +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
	
	//DIVISIÓN-AREAESPECIALISTA-AREAEJECUCIÓN-ESTADO//
//	if(division !=0 && areaEspecialista!=0 && areaEjecucion !=0 && estado!=0){
	if(areaEspecialista!=0 && areaEjecucion !=0 && estado!=0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<And>"
				              /* +"<Eq>"
				                  +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+division+"</Value>"
				               +"</Eq>"*/
				             //  +"<And>"
				                  +"<Eq>"
				                     +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				                     +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				                  +"</Eq>"
				                  +"<And>"
				                     +"<Eq>"
				                        +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				                        +"<Value Type='Lookup'>"+areaEjecucion+"</Value>"
				                     +"</Eq>"
				                     +"<Eq>"
				                        +"<FieldRef Name='Estado' />"
				                        +"<Value Type='Text'>"+estado+"</Value>"
				                     +"</Eq>"
				                  +"</And>"
				              // +"</And>"
				            +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	
	}
	
	//AREAESPECIALISTA//
//	if(division ==0 && areaEspecialista!=0 && areaEjecucion ==0 && estado==0){
	if(areaEspecialista!=0 && areaEjecucion ==0 && estado==0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<Eq>"
				               +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				               +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				            +"</Eq>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	
	}
	
	//AREAESPECIALISTA-AREAEJECUCION//
//	if(division ==0 && areaEspecialista!=0 && areaEjecucion !=0 && estado==0){
	if(areaEspecialista!=0 && areaEjecucion !=0 && estado==0){
		var CQ = "<Query>"
			   		+"<Where>"
				     +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<And>"
				               +"<Eq>"
				                  +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				               +"</Eq>"
				               +"<Eq>"
				                  +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+areaEjecucion+"</Value>"
				               +"</Eq>"
				            +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
	
	//AREAESPECIALISTA-AREAEJECUCIÓN-ESTADO//
//	if(division ==0 && areaEspecialista!=0 && areaEjecucion !=0 && estado!=0){
	if(areaEspecialista!=0 && areaEjecucion !=0 && estado!=0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<And>"
				               +"<Eq>"
				                  +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				               +"</Eq>"
				               +"<And>"
				                  +"<Eq>"
				                     +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				                     +"<Value Type='Lookup'>"+areaEjecucion+"</Value>"
				                  +"</Eq>"
				                  +"<Eq>"
				                     +"<FieldRef Name='Estado' />"
				                     +"<Value Type='Text'>"+estado+"</Value>"
				                  +"</Eq>"
				               +"</And>"
				            +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
		
		//AREAEJECUCIÓN-ESTADO//
//		if(division ==0 && areaEspecialista==0 && areaEjecucion !=0 && estado!=0){
		if(areaEspecialista==0 && areaEjecucion !=0 && estado!=0){
		var CQ = "<Query>"
			   		+"<Where>"
				     +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<And>"
				               +"<Eq>"
				                  +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
				               +"</Eq>"
				               +"<Eq>"
				                  +"<FieldRef Name='Estado' />"
				                  +"<Value Type='Text'>"+estado+"</Value>"
				               +"</Eq>"
				            +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
		
		//DIVISIÓN-ESTADO//
//		if(division !=0 && areaEspecialista==0 && areaEjecucion ==0 && estado!=0){
		if(areaEspecialista==0 && areaEjecucion ==0 && estado!=0){
		var CQ = "<Query>"
			   		+"<Where>"
				     +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				           // +"<And>"
				              /* +"<Eq>"
				                  +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+division +"</Value>"
				               +"</Eq>"*/
				               +"<Eq>"
				                  +"<FieldRef Name='Estado' />"
				                  +"<Value Type='Text'>"+estado+"</Value>"
				               +"</Eq>"
				       //     +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
		
		//DIVISIÓN-AREAEJECUCIÓN//
//		if(division !=0 && areaEspecialista==0 && areaEjecucion !=0 && estado==0){
		if(areaEspecialista==0 && areaEjecucion !=0 && estado==0){
		var CQ = "<Query>"
			   		+"<Where>"
				     +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				           // +"<And>"
				             /*  +"<Eq>"
				                  +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+division +"</Value>"
				               +"</Eq>"*/
				               +"<Eq>"
				                  +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+areaEjecucion +"</Value>"
				               +"</Eq>"
				          //  +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
		
		//DIVISIÓN-AREAESPECIALISTA-ESTADO//
//		if(division !=0 && areaEspecialista!=0 && areaEjecucion ==0 && estado!=0){
		if(areaEspecialista!=0 && areaEjecucion ==0 && estado!=0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<And>"
				             /*  +"<Eq>"
				                 +"<FieldRef Name='TipoOrganizacion' LookupId='TRUE'/>"
				                  +"<Value Type='Lookup'>"+division +"</Value>"
				               +"</Eq>"*/
				               //+"<And>"
				                  +"<Eq>"
				                     +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				                     +"<Value Type='Lookup'>"+areaEjecucion+"</Value>"
				                  +"</Eq>"
				                  +"<Eq>"
				                     +"<FieldRef Name='Estado' />"
				                     +"<Value Type='Text'>"+estado+"</Value>"
				                  +"</Eq>"
				               //+"</And>"
				            +"</And>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
		
		//AREAEJECUCION//
//		if(division == 0 && areaEspecialista ==0 && areaEjecucion !=0 && estado==0){
		if(areaEspecialista ==0 && areaEjecucion !=0 && estado==0){
		var CQ = "<Query>"
				   +"<Where>"
				      +"<And>"
				         +"<Geq>"
				            +"<FieldRef Name='Created' />"
				           +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
				         +"</Geq>"
				         +"<And>"
				            +"<Leq>"
				               +"<FieldRef Name='Created' />"
				               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
				            +"</Leq>"
				            +"<Eq>"
				               +"<FieldRef Name='AreaEjecucion' LookupId='TRUE'/>"
				               +"<Value Type='Lookup'>"+areaEjecucion+"</Value>"
				            +"</Eq>"
				         +"</And>"
				      +"</And>"
				   +"</Where>"
				+"</Query>";
	}
		//AREAESPECIALISTA-ESTADO//
//		if(division ==0 && areaEspecialista !=0 && areaEjecucion ==0 && estado!=0){
		if(areaEspecialista !=0 && areaEjecucion ==0 && estado!=0){
			var CQ = "<Query>"
				   		+"<Where>"
					     +"<And>"
					         +"<Geq>"
					            +"<FieldRef Name='Created' />"
					            +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
					         +"</Geq>"
					         +"<And>"
					            +"<Leq>"
					               +"<FieldRef Name='Created' />"
					               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
					            +"</Leq>"
					            +"<And>"
					               +"<Eq>"
					                  +"<FieldRef Name='AreaEspecialista' LookupId='TRUE'/>"
					                  +"<Value Type='Lookup'>"+areaEspecialista+"</Value>"
					               +"</Eq>"
					               +"<Eq>"
					                  +"<FieldRef Name='Estado' />"
					                  +"<Value Type='Text'>"+estado+"</Value>"
					               +"</Eq>"
					            +"</And>"
					         +"</And>"
					      +"</And>"
					   +"</Where>"
					+"</Query>";
		}
		
		//ESTADO//
//		if(division == 0 && areaEspecialista ==0 && areaEjecucion ==0 && estado !=0){
		if(areaEspecialista ==0 && areaEjecucion ==0 && estado !=0){
			var CQ = "<Query>"
					   +"<Where>"
					      +"<And>"
					         +"<Geq>"
					            +"<FieldRef Name='Created' />"
					           +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchadesde+"</Value>"
					         +"</Geq>"
					         +"<And>"
					            +"<Leq>"
					               +"<FieldRef Name='Created' />"
					               +"<Value IncludeTimeValue='FALSE' Type='DateTime'>"+fchahasta+"</Value>"
					            +"</Leq>"
					            +"<Eq>"
					               +"<FieldRef Name='Estado' />"
					               +"<Value Type='Text'>"+estado+"</Value>"
					            +"</Eq>"
					         +"</And>"
					      +"</And>"
					   +"</Where>"
					+"</Query>";  
		}



	
	IdArray.length=0;		
	var contador = 0;
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListaIniciativas,
		CAMLQuery:CQ, 
		completefunc: function(xData, Status)
						{
							var liHtml ="<tbody id='tableBody'>";
							var liHtmlReporte =  "<tbody id='tableBodyReporte'>";
							var tdDivision='';
							var tdSindicato='';
							var tdTipoActividad='';
							//alert(Status);
							if (Status == "success") 
								{		
									var strCorrelativo='';
									var fechaIngreso="";									
									var strNegocio='';
									var strOrganizacion='';
									var strIngresadaPor='';
									var strNombre='';
									var strEstado='';
									var strCliente='';
									var strSponsor='';
									var strTipoOrganizacion='';
									var strAreaEspecialista=''
									var strAReaEjecucion = '';
									
									var continua=true;
									
									$(xData.responseXML).SPFilterNode("z:row").each(function() 
									{	
										if(division!='0')
										{
											var org= $(this).attr("ows_Organizacion").split(';#');
											var resultado=org.indexOf(division);
											if(resultado!=-1)
											{
												continua=true;
											}else{continua=false;}
										}
										else{continua=true;}
										
										if(continua)
										{
												var ID =$(this).attr("ows_ID");
												//IdArray.push(ID); 
												strCorrelativo=$(this).attr("ows_Correlativo");
												
												
												if(($(this).attr("ows_Author")) != '' && (typeof $(this).attr("ows_Author") != 'undefined')){
													strIngresadaPor=$(this).attr("ows_Author").split(';#')[1].split('(')[0];
												}
												
												
												
												fechaIngreso="";
												if(($(this).attr("ows_Created")!="")&&(typeof $(this).attr("ows_Created")!='undefined')){
													fechaIngreso=moment($(this).attr("ows_Created")).format('DD/MM/YYYY').substring(0,10);
												}
		
												if(($(this).attr("ows_Negocio")) != '' && (typeof $(this).attr("ows_Negocio") != 'undefined')){
													strNegocio=$(this).attr("ows_Negocio").split(';#')[1];
												}	
													
												strOrganizacion='';
												var strOrganizacion2='';
												var Organizacion = $(this).attr("ows_Organizacion").split(';#');
																					
																						
												for (i = 1; i < Organizacion.length; i++) {
													strOrganizacion = strOrganizacion + Organizacion[i] + '<br/>';
													strOrganizacion2= strOrganizacion2+ Organizacion[i] + ';';
													
													i++;
													//debugger;
												}
												
												
		
												//strOrganizacion=$(this).attr("ows_Organizacion");//.split(';#')[1];
												strNombre=$(this).attr("ows_Nombre");
												strEstado=$(this).attr("ows_Estado");
												
												if(($(this).attr("ows_Cliente") != '') && (typeof $(this).attr("ows_Cliente") != 'undefined')){
													strCliente=$(this).attr("ows_Cliente").split(';#')[1].split('(')[0];
												}
												
												if(($(this).attr("ows_Sponsor") != '') && (typeof $(this).attr("ows_Sponsor") !='undefined')){
													strSponsor=$(this).attr("ows_Sponsor").split(';#')[1].split('(')[0];
												}
												
												if(( $(this).attr("ows_TipoOrganizacion") !='') && (typeof $(this).attr("ows_TipoOrganizacion") != 'undefined')){
													strTipoOrganizacion=$(this).attr("ows_TipoOrganizacion").split(';#')[1];
												}
												
												
												
												if(( $(this).attr("ows_AreaEspecialista")!='') && (typeof $(this).attr("ows_AreaEspecialista")!='undefined')){
													strAreaEspecialista = $(this).attr("ows_AreaEspecialista").split(';#')[1];
												}
												
												if(($(this).attr("ows_AreaEjecucion")!='') && (typeof $(this).attr("ows_AreaEjecucion")!='undefined')){
													strAReaEjecucion = $(this).attr("ows_AreaEjecucion").split(';#')[1];
												}
												
												
												var tdResponsable= TraeResponsable(ID);
		
												
												liHtml =liHtml+"<tr>"; 
												liHtml =liHtml+"<td style='text-align:left;width:11%;'><a href='javascript:RetornaPopUpDetalleIniciativa("+$(this).attr("ows_ID")+");'> "+strCorrelativo+"</a></td>"; 
												liHtml =liHtml+"<td style='text-align:left;width:16%;'>" + strNombre + "</td>";
												liHtml =liHtml+"<td style='text-align:left;width:16%;'>" + strIngresadaPor + "</td>";
												liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strOrganizacion+ "</td>";
												liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + strNegocio + "</td>";
												liHtml =liHtml+"<td style='text-align:left;width:16%;'>" + tdResponsable+ "</td>";
												liHtml =liHtml+"<td style='text-align:left;width:10%;'>" + fechaIngreso + "</td>";
												liHtml =liHtml+"<td style='text-align:left;width:11%;'>" + strEstado + "</td>";
												liHtml =liHtml+"</tr>";									
												
												
												
												
												
												/*var resultArray = new Array();
												if(typeof resultArray[0] != 'undefined'){
													estadoIniciativa = resultArray[0];
												}
												
												
												if(typeof resultArray[1] != 'undefined'){
													var comentario = resultArray[1];
												}else{
													var comentario = '';
												}
												
												if(typeof resultArray[2] != 'undefined'){
													var diasEstado = resultArray[2];
												}else{
													var diasEstado = '';
												}
												*/
												
												/*
												debugger;
												//console.log(estadoIniciativa);
												//debugger;
												for(var i=0; i<resultArray.length;i++){
													
													liHtmlReporte =liHtmlReporte+"<tr>";
													liHtmlReporte =liHtmlReporte+"<td>"+strCorrelativo+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strNombre+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strIngresadaPor+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strCliente+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strSponsor+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strOrganizacion2+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strNegocio+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strAreaEspecialista+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strAReaEjecucion+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+comentario[i] +"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+diasEstado[i] +"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+estadoIniciativa[i]+"</td>";
													liHtmlReporte =liHtmlReporte +"</tr>";	
													
													debugger;
												}
												*/
												liHtmlReporte+=generaReporte(ID,strCorrelativo,strNombre,strIngresadaPor,strCliente,strSponsor,strOrganizacion2,strNegocio,strAreaEspecialista,strAReaEjecucion);
												
												contador++;
												
												
												}
									});
			    				}
			    			//console.log($("#dvData").parent().html());
				    	 	$("#tablaIniciativas").append(liHtml+"</tbody>");
							$("#tblExcel").append(liHtmlReporte+"</tbody>");
							
	    				}
	   });
	   

    datatable('tablaIniciativas');
    datatableExportExcel('tblExcel');
    if(contador>0){$('.dataTables_empty').hide();}
	//$('.buttons-excel').click();
}

function RetornaPopUpDetalleIniciativa(idIniciativa){

	
	var url = urlDetalleIniciativa+ "?ID=" +idIniciativa;
	levantaPopup(url);
}




function levantaPopup(urlIniciativa){


var option  = { 
				title:"WFPMO - Reportes",
				allowMaximize:false,
				showMaximized:false,
				showClose:true,
				//autoSize:true,
				//width:515,
				width:800,
				height:280,
				//scroll:0,
				//center:1,resizable:1,scroll:0,status:0,maximize:1,minimize:1,
				dialogReturnValueCallback: callbackMethod,
				url:urlIniciativa
			};
			
			
			SP.UI.ModalDialog.showModalDialog(option);
}



function callbackMethod(dialogResult, returnValue) {

	if(dialogResult == 0)
	{ 
	if(typeof  $('#tableBody')!='undefined')
	{ 
		$('#tableBody').remove();
	}
	 CargaTablaIniciativas();
	 
	}  	
}

function datatable(nombre){

	$('#'+nombre).DataTable( {
	 // "dom": 'Rlfrtip'
	 //	"dom": 'Bfrtip'
	 	"dom":'lrtip'
	 	,"bSortClasses": false
	 	,"bStateSave": false
	  	,"aaSorting": [[ 0, "desc" ]]
	    ,"bInfo": false
	    ,"destroy": true
	   /* ,buttons: [
						{
							extend        : 'excel',
							exportOptions: {modifier: { selected: true }}
						}
													
					   ] */
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

function datatableExportExcel(nombre){

	$('#'+nombre).DataTable( {
	 // "dom": 'Rlfrtip'
	 	"dom": 'Bfrtip'
	 //	"dom":'lrtip'
	 	,"bSortClasses": false
	 	,"bStateSave": false
	  	,"aaSorting": [[ 0, "desc" ]]
	    ,"bInfo": false
	    ,"destroy": true
	    ,buttons: [
						{
							extend        : 'excel',
							exportOptions: {modifier: { selected: true }}
						}
													
					   ] 
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





function validaUsuarioEnGrupo(grupo) // verifica si un usuario se encuentra dentro de un grupo
{
	 var valida=false; //retorna true cundo se encuentra y false cuando no.
     var loggedinUserGroup="";
     $().SPServices({  
        operation: "GetGroupCollectionFromUser",  
        userLoginName: $().SPServices.SPGetCurrentUser(),  
        async: false,  
        completefunc: function(xData, Status) 
        { 	
            $(xData.responseXML).find("Group").each(function(){
              loggedinUserGroup= $(this).attr("Name");
              //console.log(loggedinUserGroup);
              if(loggedinUserGroup==grupo){	
              	valida=true;
              }
            });
         }
     }); 
     return valida;
}

function ejecutaExportExcel(){
	//alert(IdArray);
	//CargaTablaExcel(IdArray);
	//fnExcelReport('dvData','Reporte');
	$('.buttons-excel').click();
}


function TraeResponsable(id){

	//var estado = new Array();
	var tdResponsable = '';
	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='IniciativaID' />"
			         +"<Value Type='Number'>"+id+"</Value>"
			      +"</Eq>"
			   +"</Where>"
			+"</Query>";
			
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListIniciativaEstado,
		CAMLQuery: CQ,
		completefunc: function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    /*	var	iniciativaEstado = $(this).attr("ows_Estado");
		    	var	comentario = $(this).attr("ows_Comentario"); 
		    	var	diasEstado = $(this).attr("ows_diasDeEstado");       	
				estado.push(iniciativaEstado);
				estado.push(comentario);
				estado.push(diasEstado);	*/
				//debugger;	
				tdResponsable = $(this).attr("ows_Responsable");
			});
			
		}
    });

	return tdResponsable;

}

function BuscaIniciativas(){
	
	var mes  = $('#sltMes').val();
	var anio = $('#sltAnio').val();
	
	if(mes !=0 && anio == 0){
		alert('Debe seleccionar un año');
	}else{
		$('#tblExcel tbody').remove(); 
		$('#tblExcel').DataTable().destroy();
	
		$('#tablaIniciativas tbody').remove(); 
		$('#tablaIniciativas').DataTable().destroy();
		CargaTablaIniciativas();
	}

} 




function generaReporte(id,strCorrelativo,strNombre,strIngresadaPor,strCliente,strSponsor,strOrganizacion2,strNegocio,strAreaEspecialista,strAReaEjecucion){

var estado = new Array();

var liHtmlReporte="";

	var CQ = "<Query>"
			   +"<Where>"
			      +"<Eq>"
			         +"<FieldRef Name='IniciativaID' />"
			         +"<Value Type='Number'>"+id+"</Value>"
			      +"</Eq>"
			   +"</Where>"
			+"</Query>";
			
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: GuidListIniciativaEstado,
		CAMLQuery: CQ,
		completefunc: function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
		    	var	iniciativaEstado = $(this).attr("ows_Estado");
		    	var	comentario = $(this).attr("ows_Comentario"); 
		    	console.log($(this).attr("ows_diasDeEstado"));
		    	var	diasEstado = $(this).attr("ows_diasDeEstado");
		    	var fchaEstado = $(this).attr("ows_fechaEstado");       	
				var tdResponsable = $(this).attr("ows_Responsable");
				/*estado.push(iniciativaEstado);
				estado.push(comentario);
				estado.push(diasEstado);	*/
				
				if(typeof iniciativaEstado=='undefined')
				{
					iniciativaEstado="";
				}
				if(typeof comentario =='undefined')
				{
					comentario ="";
				}
				
				if(typeof diasEstado =='undefined'){
					
					var dateA	= moment(fechaActual).format('YYYY-MM-DD');
					var dateB	= moment(fchaEstado).format('YYYY-MM-DD');
		
					diasEstado  = moment(dateA).diff(moment(dateB), 'day');

					
					//diasEstado ="";
					console.log(diasEstado);
					
				}

				liHtmlReporte =liHtmlReporte+"<tr>";
													liHtmlReporte =liHtmlReporte+"<td>"+strCorrelativo+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strNombre+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strIngresadaPor+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strCliente+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strSponsor+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strOrganizacion2+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strNegocio+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strAreaEspecialista+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+strAReaEjecucion+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+comentario+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+tdResponsable+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+diasEstado+"</td>";
													liHtmlReporte =liHtmlReporte+"<td>"+iniciativaEstado+"</td>";
													liHtmlReporte =liHtmlReporte +"</tr>";
				
			});
			
		}
    });

	return liHtmlReporte;

}