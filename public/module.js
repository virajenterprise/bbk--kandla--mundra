function selectedid(x){    
    if(x.list==null){
        return undefined;
    }else{
        var datalist=x.list.options;        
        var i=0;
        var j=0;
        var datalist2optionsidarr=[];
        var datalist2optionstextarr=[];
        while(i<datalist.length){
            datalist2optionsidarr.push(datalist[i++].id);
        }        
        while(j<datalist.length){
            datalist2optionstextarr.push(datalist[j++].innerText);
        }
        return datalist2optionsidarr[datalist2optionstextarr.indexOf(x.value)];
    }
}
function hidemodal(x){
    x.style.display="none";
}
function displaymodal(x){
    var inputs=x.getElementsByTagName('input');    
    var i=0;
    while(i<inputs.length){
        inputs[i++].value="";        
    }
    var tbody=x.getElementsByTagName('tbody');
    removetbodies(tbody);
    x.style.display="block";
    inputs[0].focus();
}
function removetbodies(x){
    while(x[0])x[0].parentNode.removeChild(x[0]);
}
