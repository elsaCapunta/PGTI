var guidListaMinuta="{FE2DAD37-F310-4E0D-B49D-E381E3A9E662}";
var guidListaParticipantes="{D8C5EECF-E8A1-48DC-BD5D-D4E67C0137E3}";
var guidListaCompromisos="{AD020E72-E583-4799-BADA-4005AD3A72CF}";
//var idRegistro="115"; 
var idRegistro=getParameterByName('ID');
var max_col_pagina=8;
var cont_paginas=1;
var columnas_parte1=6;
var cont_tablas_participantes=1;
var cont_tablas_compromisos=1;
var cont_total_col=0;
var contenedor;
//getDatos();
$('#tblSaveAsPdf_canvas').append(getDatos());
//getParticipantes();
//getCompromiso();

function getParameterByName( name ){
    var regexS = "[\\?&]"+name+"=([^&#]*)", 
  regex = new RegExp( regexS ),
  results = regex.exec( window.location.search );
  if( results == null ){
    return "";
  } else{
    return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
function getCompromiso(){
try{
var flag_header=false;
var contador = 0;
	$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListaCompromisos,
		CAMLViewFields: "<ViewFields>" +
							"<FieldRef Name='ID' />"+
							"<FieldRef Name='Descripcion' />"+
							"<FieldRef Name='Tipo_x0020_CAI' />"+
							"<FieldRef Name='Sponsor' />"+
							"<FieldRef Name='Participante' />"+							
							"<FieldRef Name='Fecha_x0020_de_x0020_Compromiso' />"+
							"<FieldRef Name='Fecha_x0020_de_x0020_Noticicacio' />"+
							"<FieldRef Name='Estado' />"+																																																																																						
							"</ViewFields>",
		CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID_x0020_Minuta' /><Value Type='Text'>" + idRegistro + "</Value></Eq></Where></Query>",
		completefunc: function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function() {
			
			 contador=contador+1;
			var ID = $(this).attr("ows_ID");
			var Descripcion = $(this).attr("ows_Descripcion");
			var CAI = '';
			if(($(this).attr("ows_Tipo_x0020_CAI")!='')&&(typeof  $(this).attr("ows_Tipo_x0020_CAI")!='undefined'))
			{
				CAI = $(this).attr("ows_Tipo_x0020_CAI").split(";#")[1];
			}
			var Participante = $(this).attr("ows_Participante");												       
			var FechaComp = convierteFecha($(this).attr("ows_Fecha_x0020_de_x0020_Compromiso"));
			var FechaNoti = convierteFecha($(this).attr("ows_Fecha_x0020_de_x0020_Noticicacio"));
			var Estado = '';
				var TxtEstado="";
				if(($(this).attr("ows_Estado")!='')&&(typeof  $(this).attr("ows_Estado")!='undefined')){
						Estado = $(this).attr("ows_Estado").split(";#")[1];
						TxtEstado=Estado;
					}	
       	     if((cont_total_col+3)<=max_col_pagina){// si queda espacio suficiente en la primera pagina
       	     	$("#tabla_compromisos1").show();//si tabla de participantes no excedio la primera pagina
				columnas_parte1+=2;
				flag_header=true;// se debe marcar si el encabezado a sido creado
       	     }
       	     else{
       	     	 if(((cont_total_col+3)<=max_col_pagina*cont_paginas)&&(!flag_header)){//si en la pagina queda espacio suficiente para agregar el head y este aun no ha sido creado
		       	     	flag_header=true;// se debe marcar si el encabezado a sido creado
		     			//se agrega head sin formulario
		     			cont_tablas_compromisos++;
		     			
						var form_compromisos="";
						form_compromisos+="<table id='tabla_compromisos"+cont_tablas_compromisos+"'>";
						form_compromisos+="<thead>";
						form_compromisos+="	<tr> ";
						form_compromisos+="		<td colspan='6' style=' border:0px !important '>compromisos</td>";
						form_compromisos+="	</tr>";
						form_compromisos+="	<tr>";
						form_compromisos+="		<td class='ancho_5'>N°</td>";
						form_compromisos+="		<td class='ancho_30'>Descripción</td>";
						form_compromisos+="		<td class='ancho_15'>Tipo</td>";
						form_compromisos+="		<td class='ancho_30'>Responsable</td>";
						form_compromisos+="		<td class='ancho_10'>Fecha Compromiso</td>";
						form_compromisos+="		<td class='ancho_10'>Estado</td>";
						form_compromisos+="	</tr>";
						form_compromisos+="</thead>";
						form_compromisos+="<tbody id='compromisos"+cont_tablas_compromisos+"'>";
						form_compromisos+="</tbody>";
						form_compromisos+="</table>";
						$("#form"+cont_paginas).append(form_compromisos);

	       	     }
	       	     else{// se debe crear un nuevo form para incluir el encabezado y agregar el head si es necesario
	       	     	if(((cont_total_col)<max_col_pagina*cont_paginas)&&(flag_header)){// si hay espacio y el head ya esta creado
	       	     	}
	       	     	else{
	       	     	 	if(((cont_total_col+3)>max_col_pagina*cont_paginas)&&(!flag_header)){//si hay que crear una nueva pag y agregar el head
	       	     	 			flag_header=true;// se debe marcar si el encabezado a sido creado
				     			//se agrega head sin formulario
				     			cont_tablas_compromisos++;
				     			cont_paginas++;
								var form_compromisos="";
								//form_compromisos+="<form class='page' id='form"+cont_paginas+"'>";
								form_compromisos+="<table id='tabla_compromisos"+cont_tablas_compromisos+"'>";
								form_compromisos+="<thead>";
								form_compromisos+="	<tr> ";
								form_compromisos+="		<td colspan='6' style=' border:0px !important '>compromisos</td>";
								form_compromisos+="	</tr>";
								form_compromisos+="	<tr>";
								form_compromisos+="		<td class='ancho_5'>N°</td>";
								form_compromisos+="		<td class='ancho_30'>Descripción</td>";
								form_compromisos+="		<td class='ancho_15'>Tipo</td>";
								form_compromisos+="		<td class='ancho_30'>Responsable</td>";
								form_compromisos+="		<td class='ancho_10'>Fecha Compromiso</td>";
								form_compromisos+="		<td class='ancho_10'>Estado</td>";
								form_compromisos+="	</tr>";
								form_compromisos+="</thead>";
								form_compromisos+="<tbody id='compromisos"+cont_tablas_compromisos+"'>";
								form_compromisos+="</tbody>";
								form_compromisos+="</table>";
							//	form_compromisos+="</form>";
								$("body").append(form_compromisos);

	       	     	 	}
	       	     	 	else{// si hay que crear una nueva pag pero el head ya fue creado
	       	     	 			cont_tablas_compromisos++;
				     			cont_paginas++;
								var form_compromisos="";
								//form_compromisos+="<form class='page'  id='form"+cont_paginas+"'>";
								form_compromisos+="<table id='tabla_compromisos"+cont_tablas_compromisos+"'>";
								form_compromisos+="<tbody id='compromisos"+cont_tablas_compromisos+"'>";
								form_compromisos+="</tbody>";
								form_compromisos+="</table>";
								//form_compromisos+="</form>";
								$("#form"+cont_paginas).append(form_compromisos);

	       	     	 	}
	       	     	
	       	     	}
	       	     }

       	     }
       	     
       	    // if(contador<(max_col_pagina-columnas_parte1)){
       	     	$("#compromisos"+cont_tablas_compromisos).append("<tr><td class='ancho_5'>"+contador +"</td><td class='ancho_30'>"+Descripcion +"</td><td class='ancho_15'>"+CAI+"</td><td class='ancho_30'>"+"Responsable"+"</td><td class='ancho_10'>"+FechaComp+"</td><td class='ancho_10'>"+Estado+"</td></tr>");
       	    // }

       	     //$("#tbody_compromiso"+cont_tparticipantes+"").append("<tr><td class='t_numero'>"+contador +"</td><td class='t_nombre'>"+Descripcion +"</td><td class='t_tipo'>"+CAI+"</td><td class='t_correo'>"+"Responsable"+"</td><td class='t_relator'>"+FechaComp+"</td><td class='t_relator'>"+Estado+"</td></tr>");
			});									
		}
	});	
}
catch(ex){
	alert(ex);
}
}


function validaSplitComun(val, tipo){
	var valor = $.trim(val)
	if(valor != ""){
		valor = valor.split(";#")[tipo];
	}
	return valor;
}
function convierteFecha(val){
	var fecHora = $.trim(val);
	if((fecHora != "") && (typeof fecHora !='undefined')){
		fecHora = val.substring(8,10) + "/" + val.substring(5,7) + "/" + val.substring(0,4);
	}
	return(fecHora);
}
function getDatos(){
try{
var flag=false;
var datos="";
$().SPServices({
		operation: "GetListItems",
		async: false,
		listName: guidListaMinuta, //Minuta
		CAMLRowLimit: 1,
		CAMLViewFistyle:"<FieldRef Name='ID' />"+
						"<FieldRef Name='Title' />"+
						"<FieldRef Name='Division' />"+
						"<FieldRef Name='Sindicato' />"+ 							
						"<FieldRef Name='Tipo_x0020_de_x0020_Actividad' />"+ 
						"<FieldRef Name='Fecha_x0020_de_x0020_Reunion' />"+
						"<FieldRef Name='Descripcion' />"+
						"<FieldRef Name='Fecha' />"+
						"</ViewFields>",
		CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Text'>" + idRegistro + "</Value></Eq></Where></Query>",
		completefunc: function (xData, Status) {
			$(xData.responseXML).SPFilterNode("z:row").each(function() 
			{	
					/*flag=true;
					$("#division").text(validaSplitComun($(this).attr("ows_Division"),1));	
					$("#sindicato").text(validaSplitComun($(this).attr("ows_Sindicato"),1));							
					$("#actividad").text(validaSplitComun($(this).attr("ows_Tipo_x0020_de_x0020_Actividad"),1));
					$("#fecReunion").text(convierteFecha($(this).attr("ows_Fecha_x0020_de_x0020_Reunion"))); 
					$("#fecha1").html("<b>Fecha:"+convierteFecha($(this).attr("ows_Fecha"))+"</b>"); 																		
					$("#n_minuta").html("<b>Minuta de Reunión N° "+$(this).attr("ows_Title")+"</b>");
					$("#descripcion").text($(this).attr("ows_Descripcion"));
					
					var largo_descripcion=$(this).attr("ows_Descripcion").length;
					var celdas =Math.ceil((largo_descripcion/90));
					largo_descripcion=celdas *22;
					$("#descripcion").css("height",largo_descripcion+" !important;");
					columnas_parte1=columnas_parte1+celdas;
					//var txtDescripcion 	= $.trim($(this).attr("ows_Descripcion"));
					//$("#txtDescripcion").val(txtDescripcion).keyup(); 	
					
					//strEstadoMinuta=$(this).attr("ows_Estado");
					
					//obtieneAdjuntos(idRegistro); 	*/
					
datos+="<table >";
datos+="<tbody>";
datos+="	<tr>";
datos+="		<td>Minuta de Reunión N° "+$(this).attr("ows_Title")+"</td>";
datos+="		<td>Fecha:"+convierteFecha($(this).attr("ows_Fecha"))+"</td>";
datos+="	</tr>";
datos+="	<tr>";
datos+="		<td >División</td>";
datos+="		<td >Sindicato</td>";
datos+="		<td >Tipo de Actividad</td>";
datos+="		<td >Fecha de Reunión</td>";
datos+="	</tr>";
datos+="	<tr>";
datos+="		<td id='division'>"+validaSplitComun($(this).attr('ows_Division')+"</td>";
datos+="		<td id='sindicato'>"+validaSplitComun($(this).attr("ows_Sindicato"))+"</td>";
datos+="		<td id='actividad'>"+validaSplitComun($(this).attr("ows_Tipo_x0020_de_x0020_Actividad"))+"</td>";
datos+="		<td id='fecReunion'>"+convierteFecha($(this).attr("ows_Fecha_x0020_de_x0020_Reunion"))+"</td>";
datos+="	</tr>";
datos+="	<tr>";
datos+="			<td >Descripsion</td>";
datos+="	</tr>";
datos+="	<tr>	";
datos+="		<td colspan='4'  id='descripcion'>"+$(this).attr("ows_Descripcion")+"</td>";
datos+="	</tr>";
datos+="</tbody>";
datos+="</table>";
				
			});	
							
		}
	});	
	cont_total_col+=columnas_parte1;
	return datos;
}
catch(ex){
	alert("Se ha producido un error.");
}
 if(!flag){
 	$("body").hide();
 	alert("ID incorrecto");
 }
 else{
 	$("body").show();
 }
}
function getParticipantes(){
try{
	
	var contador = 0;
		$().SPServices({
			operation: "GetListItems",
			async: false,
			listName: guidListaParticipantes,
			CAMLViewFields: "<ViewFields>" +
								"<FieldRef Name='ID' />"+
								"<FieldRef Name='Nombre' />"+
								"<FieldRef Name='Relator' />"+
								"<FieldRef Name='Tipo_x0020_Participante' />"+
								"<FieldRef Name='Correo' />"+	
								"<FieldRef Name='CorreoCodelco' />"+																																													
								"</ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID_x0020_Minuta' /><Value Type='Text'>" + idRegistro  + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
				$(xData.responseXML).SPFilterNode("z:row").each(function() {
				
		        var titulo = $(this).attr("ows_Nombre");
		        var relator = $(this).attr("ows_Relator");	  
		        var tipo = $(this).attr("ows_Tipo_x0020_Participante");
		        var correo = $(this).attr("ows_Correo");	 	
		            	              	              		        
		        if(relator == 1){result= "Si"}else{result= "No"}		        	        	       
		        contador=contador+1;
		        cont_total_col++;
	
				if(contador<(max_col_pagina-columnas_parte1)){
					$("#participantes1").append("<tr align='middle'><td >"+contador+"</td><td >"+titulo+"</td><td >"+tipo+"</td><td >"+correo+"</td><td >"+result+"</td>'</tr>");	
				}
				else{
					if( cont_total_col> (max_col_pagina*cont_paginas)){
						cont_tablas_participantes++;
						var form_participantes="";
						cont_paginas++;
						//form_participantes+="<form class='page'  id='form"+cont_paginas+"'>";
						form_participantes+="<table style='width:100%'>";
						form_participantes+="<tbody id='participantes"+cont_tablas_participantes+"'>";
						form_participantes+="</tbody>";
						form_participantes+="</table>";
						//form_participantes+="</form>";
						
						$("body").append(form_participantes);
					}
					$("#participantes"+cont_tablas_participantes).append("<tr align='middle' class='ancho_5'><td >"+contador+"</td><td class='ancho_35'>"+titulo+"</td><td class='ancho_15'>"+tipo+"</td><td class='ancho_35'>"+correo+"</td><td class='ancho_10'>"+result+"</td>'</tr>");	
				}
		      });													
			}
		});
	
		
}
catch(ex){
	alert("Se ha producido un error.");
}		
}
