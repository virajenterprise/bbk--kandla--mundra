function displaymodal(x){
    event.preventDefault();
    var inputs=x.getElementsByTagName('input');    
    var i=0;
    while(i<inputs.length){
        document.getElementById(inputs[i++].id).value="";
    }
    x.style.display="block";
}
function hidemodal(x){
    x.style.display="none";
}

function createjob(){
    var jobno=document.getElementById('jobno');
    var shippername=document.getElementById('shippername');
    var invoiceno=document.getElementById('invoiceno');
    var shippingbillno=document.getElementById('shippingbillno');
    var shippingbilldate=document.getElementById('shippingbilldate');
    var dischargeport=document.getElementById('dischargeport');
    var loadingport=document.getElementById('loadingport');
    var evnumber=document.getElementById('evnumber');
    var vesselname=document.getElementById('vesselname');
    var berthno=document.getElementById('berthno');
    var WharfageEntryNo=document.getElementById('WharfageEntryNo');
    var WharfageEntryDate=document.getElementById('WharfageEntryDate');
    var fdata="jobno="+jobno.value+"&shippername="+shippername.value+"&invoiceno="+invoiceno.value+"&shippingbillno="+shippingbillno.value+"&shippingbilldate="+shippingbilldate.value+"&dischargeport="+dischargeport.value+"&loadingport="+loadingport.value+"&evnumber="+evnumber.value+"&vesselname="+vesselname.value+"&berthno="+berthno.value+"&WharfageEntryNo="+WharfageEntryNo.value+"&WharfageEntryDate="+WharfageEntryDate.value;
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&this.status==200){            
            var myobj=JSON.parse(this.responseText);
            console.log(myobj);            
            document.getElementById("jobnoid").value=myobj.insertId;            
            jobno.setAttribute("disabled","disabled");
            shippername.setAttribute("disabled","disabled");
            invoiceno.setAttribute("disabled","disabled");
            shippingbillno.setAttribute("disabled","disabled");
            shippingbilldate.setAttribute("disabled","disabled");
            dischargeport.setAttribute("disabled","disabled");
            loadingport.setAttribute("disabled","disabled");
            evnumber.setAttribute("disabled","disabled");
            vesselname.setAttribute("disabled","disabled");
            berthno.setAttribute("disabled","disabled");
            WharfageEntryNo.setAttribute("disabled","disabled");
            WharfageEntryDate.setAttribute("disabled","disabled");
            document.getElementById("createjobbutton").setAttribute("disabled","disabled");
            document.getElementById("addButton").removeAttribute("disabled");
        }
    }
    xhttp.open("POST","/createJob",true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send(fdata);
}
function searchjob(){
    var jobnosearch=document.getElementById("jobnosearch");
    var shippersearch=document.getElementById("shippersearch");
    var sbsearch=document.getElementById("sbsearch");
    var fdata="jobnosearch="+jobnosearch.value+"&shippersearch="+shippersearch.value+"&sbsearch="+sbsearch.value;
    var table=document.getElementById("jobsearchtable");
    var tbodies=table.getElementsByTagName("tbody");
    while(tbodies[0])tbodies[0].parentNode.removeChild(tbodies[0]);
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            var tbody=document.createElement("tbody");            
            myobj.forEach((myobj,index)=>{
            var rows=tbody.insertRow(-1);
            var cell1=rows.insertCell(0);
            var cell2=rows.insertCell(1);
            var cell3=rows.insertCell(2);
            var cell4=rows.insertCell(3);
            var button=document.createElement('button');
            cell4.setAttribute("colspan","2");
            cell1.setAttribute("class","w3-border");
            cell2.setAttribute("class","w3-border");
            cell3.setAttribute("class","w3-border");
            cell4.setAttribute("class","w3-border");
            button.setAttribute("class","w3-button w3-input w3-blue");
            button.setAttribute("onclick","selectjobsearched(this)");
            button.innerHTML="Select";
            cell1.innerHTML=myobj.jobno;
            cell2.innerHTML=myobj.shipperName;
            cell3.innerHTML=myobj.shippingbillno;
            cell4.appendChild(button);
        });
            table.appendChild(tbody);
        }
    }
    xhttp.open("GET","/searchjob?"+fdata,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function selectjobsearched(x){
    var jobno=x.parentNode.parentNode.childNodes[0].innerHTML;
    var table=document.getElementById("markstable");
    var tbodies=table.getElementsByTagName("tbody");
    while(tbodies[0])tbodies[0].parentNode.removeChild(tbodies[0]);
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj1=JSON.parse(this.responseText);
            var myobj=myobj1[0];
            var myobj2=myobj1[1];            
            myobj.forEach((myobj,index)=>{
                document.getElementById("jobnoid").value=myobj.jobtable_id;
                document.getElementById("jobno").value=myobj.jobno;
                document.getElementById("shippername").value=myobj.shipperName;
                document.getElementById("invoiceno").value=myobj.invoiceno;
                document.getElementById("shippingbillno").value=myobj.shippingbillno;
                document.getElementById("shippingbilldate").value=myobj.shippingbilldate;
                document.getElementById("dischargeport").value=myobj.dischargePort;
                document.getElementById("loadingport").value=myobj.LoadingPort;
                document.getElementById("evnumber").value=myobj.EVNumber;
                document.getElementById("vesselname").value=myobj.VesselName;
                document.getElementById("berthno").value=myobj.berthNo;
                document.getElementById("WharfageEntryNo").value=myobj.wharfageentryNo;
                document.getElementById("WharfageEntryDate").value=myobj.wharfageentryDate;                
                document.getElementById("editupdate").removeAttribute("disabled");
                document.getElementById("createjobbutton").setAttribute("disabled","disabled");
            });
            var tbody=document.createElement('tbody');
            myobj2.forEach((myobj2,index)=>{
                var rows=tbody.insertRow(-1);
                var cell1=rows.insertCell(0);
                var cell2=rows.insertCell(1);
                var cell3=rows.insertCell(2);
                var cell4=rows.insertCell(3);
                var cell5=rows.insertCell(4);
                var cell6=rows.insertCell(5);
                var cell7=rows.insertCell(6);
                var cell8=rows.insertCell(7);
                var cell9=rows.insertCell(8);
                var cell10=rows.insertCell(9);
                var button=document.createElement('button');
                button.setAttribute("class","w3-button w3-input w3-teal");
                button.innerHTML="Edit";
                cell1.setAttribute("class","w3-hide");
                cell2.setAttribute("class","w3-border w3-center");
                cell3.setAttribute("class","w3-border w3-center");
                cell4.setAttribute("class","w3-border w3-center");
                cell5.setAttribute("class","w3-border w3-center");
                cell6.setAttribute("class","w3-border w3-center");
                cell7.setAttribute("class","w3-border w3-center");
                cell8.setAttribute("class","w3-border w3-center");
                cell9.setAttribute("class","w3-border w3-center");
                cell10.setAttribute("class","w3-border");
                cell1.innerHTML=myobj2.markspacking_ID;
                cell2.innerHTML=myobj2.makrs;
                cell3.innerHTML=myobj2.packing;
                cell4.innerHTML=myobj2.bags;
                cell5.innerHTML=myobj2.eachbagNweigh.toFixed(3);
                cell6.innerHTML=myobj2.eachbagGweigh.toFixed(3);
                cell7.innerHTML=((myobj2.bags*myobj2.eachbagNweigh)/1000).toFixed(3);
                cell8.innerHTML=((myobj2.bags*myobj2.eachbagGweigh)/1000).toFixed(3);
                cell9.innerHTML=myobj2.location;
                cell10.appendChild(button);
            });
            table.appendChild(tbody);
            hidemodal(document.getElementById("modal1shippername"));
            document.getElementById("addButton").removeAttribute("disabled");
        }
    }
    xhttp.open("GET","/selectjobsearched?jobno="+jobno,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();    
}
function addmarkspacking(x){
    var jobnoid=document.getElementById("jobnoid").value;
    console.log(x.parentNode.parentNode.childNodes);
    var marks=x.parentNode.parentNode.childNodes[0].childNodes[0].value;
    var packing=x.parentNode.parentNode.childNodes[1].childNodes[0].value;
    var bags=x.parentNode.parentNode.childNodes[2].childNodes[0].value;
    var ebnw=x.parentNode.parentNode.childNodes[3].childNodes[0].value;
    var ebgw=x.parentNode.parentNode.childNodes[4].childNodes[0].value;
    var location=x.parentNode.parentNode.childNodes[7].childNodes[0].value;
    var fdata="jobnoid="+jobnoid+"&marks="+marks+"&packing="+packing+"&bags="+bags+"&ebgw="+ebgw+"&ebnw="+ebnw+"&location="+location;    
    var table=document.getElementById("markstable");
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText)
            var tbody=document.createElement("tbody");
            myobj.forEach((myobj,index)=>{
                var rows=tbody.insertRow(-1);
                var cell1=rows.insertCell(0);
                var cell2=rows.insertCell(1);
                var cell3=rows.insertCell(2);
                var cell4=rows.insertCell(3);
                var cell5=rows.insertCell(4);
                var cell6=rows.insertCell(5);
                var cell7=rows.insertCell(6);
                var cell8=rows.insertCell(7);
                var cell9=rows.insertCell(8);
                var cell10=rows.insertCell(9);
                var button=document.createElement('button');
                cell1.setAttribute("class","w3-border w3-hide");
                cell2.setAttribute("class","w3-border w3-center");
                cell3.setAttribute("class","w3-border w3-center");
                cell4.setAttribute("class","w3-border w3-center");
                cell5.setAttribute("class","w3-border w3-center");
                cell6.setAttribute("class","w3-border w3-center");
                cell7.setAttribute("class","w3-border w3-center");
                cell8.setAttribute("class","w3-border w3-center");
                cell9.setAttribute("class","w3-border w3-center");
                cell10.setAttribute("class","w3-border");
                button.innerHTML="Edit"
                button.setAttribute("class","w3-button w3-teal w3-input");
                cell1.innerHTML=myobj.markspacking_ID;
                cell2.innerHTML=myobj.makrs;
                cell3.innerHTML=myobj.packing;
                cell4.innerHTML=myobj.bags;
                cell5.innerHTML=myobj.eachbagNweigh.toFixed(3);
                cell6.innerHTML=myobj.eachbagGweigh.toFixed(3);
                cell7.innerHTML=((myobj.bags*myobj.eachbagNweigh)/1000).toFixed(3);
                cell8.innerHTML=((myobj.bags*myobj.eachbagGweigh)/1000).toFixed(3);
                cell9.innerHTML=myobj.location;
                cell10.appendChild(button);
            });
            table.appendChild(tbody);
        }
    }
    xhttp.open("POST","/addmarkspacking",true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send(fdata);
    
}
function editjob(){
    document.getElementById("jobno").removeAttribute("disabled");
    document.getElementById("shippername").removeAttribute("disabled");
    document.getElementById("invoiceno").removeAttribute("disabled");
    document.getElementById("shippingbillno").removeAttribute("disabled");
    document.getElementById("shippingbilldate").removeAttribute("disabled");
    document.getElementById("dischargeport").removeAttribute("disabled");
    document.getElementById("loadingport").removeAttribute("disabled");
    document.getElementById("evnumber").removeAttribute("disabled");
    document.getElementById("vesselname").removeAttribute("disabled");
    document.getElementById("berthno").removeAttribute("disabled");
    document.getElementById("WharfageEntryNo").removeAttribute("disabled");
    document.getElementById("WharfageEntryDate").removeAttribute("disabled");
}
