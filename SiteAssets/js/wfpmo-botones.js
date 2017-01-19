// /sites/rsas/SitePages/rsas-tpu.html
function abrirReportes(url,NombreReporte)
{
	var option  = { 
					title:"WFPMO: Reporte " + NombreReporte,
					allowMaximize:false,
					showMaximized:false,
					showClose:true,	
					height:500,
					width:900,
					url:url
				};
			
			
	SP.UI.ModalDialog.showModalDialog(option);

}
function redireccionar(url)
{
	//window.location.replace(url);
	$(location).attr('href',url)
}