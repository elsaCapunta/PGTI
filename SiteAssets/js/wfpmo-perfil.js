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
              console.log(loggedinUserGroup);
              if(loggedinUserGroup==grupo){	
              	valida=true;
              }
            });
         }
     }); 
     return valida;
}
