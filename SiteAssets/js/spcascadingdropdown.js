/* Copyright (c) 2010 IT-Idea
* Anita Boerboom
* http://www.itidea.nl
* 30-11-2010
*/


(function($){
 $.fn.itidea_spcascadingdropdown = function(options) {

    var defaults = {
        relationshipList: "Cities",//The name of the list which contains the parent/child relationships.
        relationshipParentList : "Countries",//The name of the list which contains the parent items.
        relationshipParentListColumn : "Title", //The StaticName of the values column in the parent list. 
        relationshipListChildColumn : "Title",////The StaticName of the child column in the relationshipList
        relationshipListParentColumn : "Country",//The StaticName of the parent column in the relationshipList
        childdropdown : "cities",//The id of the child dropdownlist
        promptText: "--Select item--" // The default text displayed in the dropdownlists
    };
    
    var options = $.extend(defaults, options);   

    var k = 0;
    var parentArray = [];
    var childArray = [];

    return this.each(function() {

    var parentdropdown=this.id;

    fillDefaults(parentdropdown, parentArray, options.relationshipParentList, options.relationshipParentListColumn);
    fillDefaults(options.childdropdown, childArray, options.relationshipList, options.relationshipListChildColumn);
        
    $('select').change(function(e) { 
        if(this.id == parentdropdown)
        {
            $('#' + options.childdropdown + ' option').each(function(i, option)
            { 
                $(option).remove(); 
            });
            j=0;
            childArray.length = 0;

            if(this[this.selectedIndex].value != 0)
            {
                countrySelected = this[this.selectedIndex].text;
                query = "<Query><Where><Eq><FieldRef Name='" + options.relationshipListParentColumn + "' />" + "<Value Type='Lookup'>" + countrySelected + "</Value></Eq></Where><OrderBy><FieldRef Name='" + options.relationshipListChildColumn + "' Ascending='True' /></OrderBy></Query>";
                $().SPServices({  
                    operation: "GetListItems",  
                    async: false,  
                    listName: options.relationshipList,  
                    CAMLViewFields: '<ViewFields></ViewFields>',  
                    CAMLQuery: query,  
                    completefunc: function(xData, Status) {  
                    $(xData.responseXML).find("[nodeName= z:row]").each(function() {  
                        childArray[j] = $(this).attr('ows_' + options.relationshipListChildColumn);  
                        j = j + 1;  
                    });   
                    fillAppropriateDropdown('#' + options.childdropdown, childArray);
                    }
                }); 
             }
             else
             {
                fillDefaults(options.childdropdown, childArray, options.relationshipList, options.relationshipListChildColumn);
             }
        }
    });    
        
     function fillDefaults(dropdownName, arrayToUse, listName, columnName)
     {
        k=0;
         $().SPServices({  
            operation: "GetListItems",  
            async: false,  
            listName: listName,  
            CAMLViewFields: '<ViewFields></ViewFields>',  
            CAMLQuery: '<Query><OrderBy><FieldRef Name=\'' + columnName + '\' Ascending=\'True\' /></OrderBy></Query>',  
            completefunc: function(xData, Status) {  
                $(xData.responseXML).find("[nodeName= z:row]").each(function() {  
                    arrayToUse[k] = $(this).attr('ows_' + columnName);  
                    k = k + 1;  
                });   
            fillAppropriateDropdown('#' + dropdownName, arrayToUse);
            }
        }); 
     }
     
     function fillAppropriateDropdown(dropdownName, arrayToUse) {
        $.each(arrayToUse,
            function() {
                $(dropdownName).append('<option value="' + this + '">' + this + '</option>');
            });
            $(dropdownName).prepend("<option value='0' selected='true'>" + options.promptText + "</option>");
            $(dropdownName).find("option:first")[0].selected = true;
            }
    });

 };
})(jQuery);