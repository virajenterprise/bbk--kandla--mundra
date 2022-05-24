
window.onload=function(){
    updateshipperlist();    
}
function checkshippername(){
    var shipper=selectedid(document.getElementById("shippername"));
    if(typeof shipper==='undefined'){
        var text="Shipper not found in records";
        if(confirm(text) == true){
            displaymodal(document.getElementById("addshipper"));
        }else{
            alert("Please add Shipper Name From List");
        }        
    }
}
function createjob(){
    var shipperid=selectedid(document.getElementById('shippername'));
    if(typeof shipperid==='undefined'){
        alert("Please Add Shipper Name From List");
        return;
    }
    var jobno=document.getElementById('jobno');    
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
    var fdata="jobno="+jobno.value+"&shippername="+shipperid+"&invoiceno="+invoiceno.value+"&shippingbillno="+shippingbillno.value+"&shippingbilldate="+shippingbilldate.value+"&dischargeport="+dischargeport.value+"&loadingport="+loadingport.value+"&evnumber="+evnumber.value+"&vesselname="+vesselname.value+"&berthno="+berthno.value+"&WharfageEntryNo="+WharfageEntryNo.value+"&WharfageEntryDate="+WharfageEntryDate.value;
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
    removetbodies(tbodies);
    //while(tbodies[0])tbodies[0].parentNode.removeChild(tbodies[0]);
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
            cell2.innerHTML=myobj.shipper_name;
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
    removetbodies(tbodies);
    //while(tbodies[0])tbodies[0].parentNode.removeChild(tbodies[0]);
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj1=JSON.parse(this.responseText);
            var myobj=myobj1[0];
            var myobj2=myobj1[1];            
            myobj.forEach((myobj,index)=>{
                document.getElementById("jobnoid").value=myobj.jobtable_id;
                document.getElementById("jobno").value=myobj.jobno;
                document.getElementById("shippername").value=myobj.shipper_name;
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
                var cell11=rows.insertCell(10);
                var button=document.createElement('button');
                var button2=document.createElement('button');
                button.setAttribute("class","w3-button w3-input w3-teal");
                button2.setAttribute("class","w3-button w3-input w3-red");
                button.setAttribute("onclick","editmarksdetails(this)");
                button2.setAttribute("onclick","deletemarksdetails(this)");
                button.innerHTML="Edit";
                button2.innerHTML="Delete";
                cell1.setAttribute("class","w3-hide");
                cell2.setAttribute("class","w3-border w3-center");
                cell3.setAttribute("class","w3-border w3-center");
                cell4.setAttribute("class","w3-border w3-center");
                cell5.setAttribute("class","w3-border w3-center");
                cell6.setAttribute("class","w3-border w3-center");
                cell7.setAttribute("class","w3-border w3-right-align");
                cell8.setAttribute("class","w3-border w3-right-align");
                cell9.setAttribute("class","w3-border w3-center");
                cell10.setAttribute("class","w3-border");
                cell11.setAttribute("class","w3-border");
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
                cell11.appendChild(button2);
            });
            table.appendChild(tbody);
            hidemodal(document.getElementById("modal1shippername"));
            document.getElementById("addButton").removeAttribute("disabled");
            document.getElementById("marksid").value="";
            document.getElementById("marks").value="";
            document.getElementById("packing").value="";
            document.getElementById("bagscount").value="";
            document.getElementById("eachbagnmt").value="";
            document.getElementById("eachbaggmt").value="";
            document.getElementById("warehouselocation").value="";
            countbagsmt();
            tabletotal();
        }
    }
    xhttp.open("GET","/selectjobsearched?jobno="+jobno,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();    
}
function addmarkspacking(x){
    var jobnoid=document.getElementById("jobnoid").value;    
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
                jobnoid.value="";
                marks.value="";
                packing.value="";
                bags.value="";
                ebnw.value="";
                ebgw.value="";
                location.value="";
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
                var cell11=rows.insertCell(10);
                var button=document.createElement('button');
                var button2=document.createElement('button');
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
                cell11.setAttribute("class","w3-border");                
                button.innerHTML="Edit"
                button2.innerHTML="Delete"
                button.setAttribute("class","w3-button w3-teal w3-input");
                button2.setAttribute("class","w3-button w3-red w3-input");
                button.setAttribute("onclick","editmarksdetails(this)");
                button2.setAttribute("onclick","deletemarksdetails(this)");
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
                cell11.appendChild(button2);
            });
            table.appendChild(tbody);
            tabletotal();
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
function updateshipperlist(){
    var list=document.getElementById("shippernamelist");
    list.innerHTML="";
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            myobj.forEach((myobj,index)=>{
                var option=document.createElement("option");
                option.id=myobj.shippermaster_id;
                option.innerHTML=myobj.shipper_name;                
                list.appendChild(option);
            });
        }
    }
    xhttp.open("GET","/shipperlistupdate",true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function addshipper(){
    var shippername=document.getElementById("shippernameadd");    
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            alert("Shipper Added");
            document.getElementById("shippername").value=shippername.value;
            hidemodal(document.getElementById("addshipper"));
            updateshipperlist();
        }
    }
    xhttp.open("POST","/shippernameadd",true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send("shippername="+shippername.value);
}
function updateshipper(){
    var shipperid=selectedid(document.getElementById('shippername'));
    console.log(shipperid);
    if(typeof shipperid==='undefined'){
        alert("Please Add Shipper Name From List");
        return;
    }
    var jobnoid=document.getElementById("jobnoid");
    var jobno=document.getElementById('jobno');    
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
    var fdata="jobno="+jobno.value+"&shippername="+shipperid+"&invoiceno="+invoiceno.value+"&shippingbillno="+shippingbillno.value+"&shippingbilldate="+shippingbilldate.value+"&dischargeport="+dischargeport.value+"&loadingport="+loadingport.value+"&evnumber="+evnumber.value+"&vesselname="+vesselname.value+"&berthno="+berthno.value+"&WharfageEntryNo="+WharfageEntryNo.value+"&WharfageEntryDate="+WharfageEntryDate.value+"&jobnoid="+jobnoid.value;
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=this.responseText;
            if(myobj=='updated.'){
                alert("Updated.");
                document.getElementById('shippername').setAttribute("disabled","disabled");
                jobno.setAttribute("disabled","disabled");
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
                document.getElementById("editupdate").setAttribute("disabled","disabled");
            }else{
                alert("error in Update");
            }
        }
    }
    xhttp.open("PUT","/updateshipper",true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send(fdata);
}
function countbagsmt(){
    var bags=document.getElementById("bagscount").value;
    var eachbagnmt=document.getElementById("eachbagnmt").value;
    var eachbaggmt=document.getElementById("eachbaggmt").value;
    var ttlnmt=document.getElementById("ttlbagnmt");
    var ttlgmt=document.getElementById("ttlbaggmt");
    ttlnmt.value=parseFloat((bags*eachbagnmt/1000)).toFixed(3);
    ttlgmt.value=parseFloat((bags*eachbaggmt/1000)).toFixed(3);
}
function tabletotal(){
    var rows=document.getElementById("markstable").getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var i=0;
    var bags=0;
    while(i<rows.length){
        bags=bags+parseFloat(rows[i++].getElementsByTagName('td')[3].innerHTML);
    }
    document.getElementById("markstable").getElementsByTagName('tfoot')[0].getElementsByTagName('th')[1].innerHTML=bags;
    var j=0;
    var nmt=0;
    while(j<rows.length){
        nmt=nmt+parseFloat(rows[j++].getElementsByTagName('td')[6].innerHTML);
    }
    document.getElementById("markstable").getElementsByTagName('tfoot')[0].getElementsByTagName('th')[4].innerHTML=nmt.toFixed(3);
    var h=0;
    var gmt=0;
    while(h<rows.length){
        gmt=gmt+parseFloat(rows[h++].getElementsByTagName('td')[7].innerHTML);
    }
    document.getElementById("markstable").getElementsByTagName('tfoot')[0].getElementsByTagName('th')[5].innerHTML=gmt.toFixed(3);
}
function editmarksdetails(x){    
    document.getElementById("marksid").value=x.parentNode.parentNode.childNodes[0].innerHTML;
    document.getElementById("marks").value=x.parentNode.parentNode.childNodes[1].innerHTML;
    document.getElementById("packing").value=x.parentNode.parentNode.childNodes[2].innerHTML;
    document.getElementById("bagscount").value=x.parentNode.parentNode.childNodes[3].innerHTML;
    document.getElementById("eachbagnmt").value=x.parentNode.parentNode.childNodes[4].innerHTML;
    document.getElementById("eachbaggmt").value=x.parentNode.parentNode.childNodes[5].innerHTML;
    document.getElementById("warehouselocation").value=x.parentNode.parentNode.childNodes[8].innerHTML;
    document.getElementById("addButton").setAttribute("disabled","disabled");
    document.getElementById("editButton").removeAttribute("disabled");
    var row=x.parentNode.parentNode;
    var tbody=x.parentNode.parentNode.parentNode;
    tbody.removeChild(row);
    var buttons=tbody.getElementsByTagName("button");
    var i=0;
    while(i<buttons.length){
        buttons[i++].setAttribute("disabled","disabled");
    }
    countbagsmt();
    tabletotal();
}
function editmarkspacking(x){
    var marksid=x.parentNode.parentNode.childNodes[0].childNodes[0];
    var marks=x.parentNode.parentNode.childNodes[1].childNodes[0];
    var packing=x.parentNode.parentNode.childNodes[2].childNodes[0];
    var bags=x.parentNode.parentNode.childNodes[3].childNodes[0];
    var ebnmt=x.parentNode.parentNode.childNodes[4].childNodes[0];
    var ebgmt=x.parentNode.parentNode.childNodes[5].childNodes[0];
    var loc=x.parentNode.parentNode.childNodes[8].childNodes[0];
    var tbody=x.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("tbody")[0];    
    var fdata="marksid="+marksid.value+"&marks="+marks.value+"&packing="+packing.value+"&bags="+bags.value+"&ebnmt="+ebnmt.value+"&ebgmt="+ebgmt.value+"&loc="+loc.value;    
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            marksid.value="";
            marks.value="";
            packing.value="";
            bags.value="";
            ebnmt.value="";
            ebgmt.value="";
            loc.value="";
            countbagsmt();
            myobj.forEach((myobj,index)=>{
                var row=tbody.insertRow(-1);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                var cell4=row.insertCell(3);
                var cell5=row.insertCell(4);
                var cell6=row.insertCell(5);
                var cell7=row.insertCell(6);
                var cell8=row.insertCell(7);
                var cell9=row.insertCell(8);
                var cell10=row.insertCell(9);
                var cell11=row.insertCell(10);
                var button=document.createElement("button");
                var button1=document.createElement("button");
                button.setAttribute("class","w3-button w3-input w3-teal w3-input");
                button1.setAttribute("class","w3-button w3-input w3-red w3-input");
                button.setAttribute("onclick","editmarksdetails(this)");
                button1.setAttribute("onclick","deletemarksdetails(this)");
                button.innerHTML="Edit";
                button1.innerHTML="Delete";
                cell1.setAttribute("class","w3-hide");
                cell2.setAttribute("class","w3-border w3-center");
                cell3.setAttribute("class","w3-border w3-center");
                cell4.setAttribute("class","w3-border w3-center");
                cell5.setAttribute("class","w3-border w3-center");
                cell6.setAttribute("class","w3-border w3-center");
                cell7.setAttribute("class","w3-border w3-center");
                cell8.setAttribute("class","w3-border w3-center");
                cell9.setAttribute("class","w3-border w3-center");
                cell10.setAttribute("class","w3-border w3-center");
                cell11.setAttribute("class","w3-border w3-center");
                cell1.innerHTML=myobj.markspacking_ID;
                cell2.innerHTML=myobj.makrs;
                cell3.innerHTML=myobj.packing;
                cell4.innerHTML=myobj.bags;
                cell5.innerHTML=myobj.eachbagNweigh.toFixed(3);
                cell6.innerHTML=myobj.eachbagGweigh.toFixed(3);
                cell7.innerHTML=(myobj.bags*myobj.eachbagNweigh/1000).toFixed(3);
                cell8.innerHTML=(myobj.bags*myobj.eachbagGweigh/1000).toFixed(3);
                cell9.innerHTML=myobj.location;
                cell10.appendChild(button);
                cell11.appendChild(button1);
            });
            var buttons=tbody.getElementsByTagName("button");
            var i=0;
            while(i<buttons.length){
                buttons[i++].removeAttribute("disabled");
            }
            document.getElementById("editButton").setAttribute("disabled","disabled");
            document.getElementById("addButton").removeAttribute("disabled");
            tabletotal();
        }
    }
    xhttp.open("PUT","/editmarkspacking",true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send(fdata);
}
function deletemarksdetails(x){
    var marksid=x.parentNode.parentNode.childNodes[0].innerHTML;
    var row=x.parentNode.parentNode;
    var tbody=x.parentNode.parentNode.parentNode;
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            tbody.removeChild(row);
            tabletotal();
        }
    }
    xhttp.open("delete","/deletemarksdetails?marksid="+marksid,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();    
}
function displayjobfromvesselname(){
    var vesselname=document.getElementById("VesselNameSelected");
    var selectobject=document.getElementById("jobnoselected");
    selectobject.innerHTML="";
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            myobj.forEach((myobj,indes)=>{
                var options=document.createElement("option");
                options.value=myobj.jobno;
                options.innerHTML=myobj.jobno;
                selectobject.appendChild(options);
            });
        }
    }
    xhttp.open("GET","/getjobdetails?vesselname="+vesselname.value,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function displaymarksfromjobno(){
    var jobno=document.getElementById("jobnoselected").value;
    var selectobject=document.getElementById("markspackingselected");
    selectobject.innerHTML=""
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);            
            myobj.forEach((myobj,index)=>{
                var options1=document.createElement("option");
                options1.innerHTML=myobj.makrs+"-"+myobj.packing+"-"+myobj.location;
                options1.value=myobj.markspacking_ID;
                selectobject.appendChild(options1);                
            });displaydetailssecondcontainerjoball();
        }
    }
    xhttp.open("GET","/getmarkspackingdetails?jobno="+jobno,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function creategatepass(){
    var gatepassid=document.getElementById("gatePassID");
    if((gatepassid.value).length>0){
        var markspackingselected=document.getElementById("markspackingselected");
        if(markspackingselected.value==""){
            alert("Please Enter Job and Marks Details");
            return;
        }
        var bagsgatepass=document.getElementById("bagsgatepass");
        if(bagsgatepass.value==""){
            alert("Please Enter Bags ");
            return;}
        var gatepassid=document.getElementById("gatePassID");
        var table=document.getElementById("gatepassupdatetable");
        var tbodies=table.getElementsByTagName("tbody");        
        var fdata="markspackingselected="+markspackingselected.value+"&bagsgatepass="+bagsgatepass.value+"&gatepassid="+gatepassid.value;
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState==4&&this.status==200){
                var myobj=JSON.parse(this.responseText);
                console.log(myobj);
                myobj.forEach((myobj,index)=>{                    
                    var row=tbodies[tbodies.length-1].insertRow(-1);                    
                    var cell1=row.insertCell(0);
                    var cell2=row.insertCell(1);
                    var cell3=row.insertCell(2);
                    var cell4=row.insertCell(3);
                    var cell5=row.insertCell(4);
                    var cell6=row.insertCell(5);                    
                    var cell8=row.insertCell(6);
                    var button1=document.createElement("button");
                    cell1.setAttribute("class","w3-hide");
                    cell2.setAttribute("class","w3-border w3-center");
                    cell3.setAttribute("class","w3-border w3-left-align");
                    cell3.setAttribute("colspan","2");
                    cell4.setAttribute("class","w3-border w3-center");
                    cell5.setAttribute("class","w3-border w3-right-align");
                    cell6.setAttribute("class","w3-border w3-right-align");                    
                    cell8.setAttribute("class","w3-border");                    
                    button1.setAttribute("class","w3-button w3-input w3-deep-orange");                    
                    button1.setAttribute("onclick","deletegatepassgrid(this)");                    
                    button1.innerHTML="Del";
                    cell1.innerHTML=myobj.gatepassGrid_ID;
                    cell2.innerHTML=myobj.jobno;
                    cell3.innerHTML=myobj.makrs+"-"+myobj.packing+"-"+myobj.location;
                    cell4.innerHTML=myobj.bags;
                    cell5.innerHTML=(myobj.bags*myobj.eachbagNweigh/1000).toFixed(3);
                    cell6.innerHTML=(myobj.bags*myobj.eachbagGweigh/1000).toFixed(3);                    
                    cell8.appendChild(button1);
                });
                tablecalc1(table);
                displaydetailssecondcontainermarkswise();
            }
        }
        xhttp.open("POST","/updategatepass",true);
        xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
        xhttp.send(fdata);
    }else{
        var truckno=document.getElementById("truckno");
        if(truckno.value==""){
            alert("Please Entery Truck No");
            return;
        }
        var markspackingselected=document.getElementById("markspackingselected");
        if(markspackingselected.value==""){
            alert("Please Enter Job and Marks Details");
            return;
        }
        var bagsgatepass=document.getElementById("bagsgatepass");
        if(bagsgatepass.value==""){
            alert("Please Enter Bags ");
            return;
        }
        var table=document.getElementById("gatepassupdatetable");
        var tbodies=table.getElementsByTagName("tbody");
        removetbodies(tbodies);
        var fdata="truckno="+truckno.value+"&markspackingselected="+markspackingselected.value+"&bagsgatepass="+bagsgatepass.value;        
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
            if(this.readyState==4&&this.status==200){
                var tbody=document.createElement("tbody");
                var myobj=JSON.parse(this.responseText);                
                    myobj.forEach((myobj,index)=>{                    
                    var row=tbody.insertRow(-1);
                    var cell1=row.insertCell(0);
                    var cell2=row.insertCell(1);
                    var cell3=row.insertCell(2);
                    var cell4=row.insertCell(3);
                    var cell5=row.insertCell(4);
                    var cell6=row.insertCell(5);                    
                    var cell8=row.insertCell(6);                    
                    var button1=document.createElement("button");
                    cell1.setAttribute("class","w3-hide");
                    cell2.setAttribute("class","w3-border w3-center");
                    cell3.setAttribute("class","w3-border w3-left-align");
                    cell3.setAttribute("colspam","2");
                    cell4.setAttribute("class","w3-border w3-center");
                    cell5.setAttribute("class","w3-border w3-right-align");
                    cell6.setAttribute("class","w3-border w3-right-align");                    
                    cell8.setAttribute("class","w3-border");                    
                    button1.setAttribute("class","w3-button w3-input w3-deep-orange");                    
                    button1.setAttribute("onclick","deletegatepassgrid(this)");                    
                    button1.innerHTML="Del";
                    cell1.innerHTML=myobj.gatepassGrid_ID;
                    cell2.innerHTML=myobj.jobno;
                    cell3.innerHTML=myobj.makrs+"-"+myobj.packing+"-"+myobj.location;
                    cell4.innerHTML=myobj.bags;
                    cell5.innerHTML=(myobj.bags*myobj.eachbagNweigh/1000).toFixed(3);
                    cell6.innerHTML=(myobj.bags*myobj.eachbagGweigh/1000).toFixed(3);                    
                    cell8.appendChild(button1);
                    document.getElementById("gatePassID").value=myobj.gatepass_ID;
                });
                table.appendChild(tbody);
                tablecalc1(table);
                displaydetailssecondcontainermarkswise();
            }
        }
        xhttp.open("POST","/createnewgatepass",true);
        xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
        xhttp.send(fdata);
    }
}
function searcholdgatepassbtn(){
    var truckno=document.getElementById("searchtrknum");
    var shippername=document.getElementById("searchnumship");
    var jobno=document.getElementById("searchnumjob");
    var date=document.getElementById("searchnumdate");
    var table=document.getElementById("searcholdgatepasstable");
    removetbodies(table.getElementsByTagName("tbody"));    
    var fdata="truckno="+truckno.value+"&shippername="+shippername.value+"&jobno="+jobno.value+"&date="+date.value;
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            myobj.forEach((myobj,index)=>{
                var tbody=document.createElement("tbody");
                var row=tbody.insertRow(-1);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                var cell4=row.insertCell(3);
                var cell5=row.insertCell(4);
                var cell6=row.insertCell(5);
                var cell7=row.insertCell(6);
                var cell8=row.insertCell(7);
                var cell9=row.insertCell(8);                
                var button=document.createElement("button");                
                cell1.setAttribute("class","w3-border");
                cell1.setAttribute("style","white-space: nowrap;");
                cell2.setAttribute("class","w3-border");
                cell2.setAttribute("style","white-space: nowrap;");
                cell3.setAttribute("class","w3-border");
                cell4.setAttribute("class","w3-border");
                cell5.setAttribute("class","w3-border");
                cell5.setAttribute("style","white-space: nowrap;");
                cell6.setAttribute("class","w3-border");
                cell7.setAttribute("class","w3-border");
                cell8.setAttribute("class","w3-border");
                cell9.setAttribute("class","w3-border");                
                button.setAttribute("class","w3-button w3-teal w3-input");
                button.setAttribute("onclick","selectsearcholdgatepassbtn(this)");
                button.innerHTML="Select";                
                cell1.innerHTML=myobj.gatepass_ID;
                cell2.innerHTML=myobj.TruckNo;
                cell3.innerHTML=myobj.jobno;
                cell4.innerHTML=myobj.shipper_name;
                cell5.innerHTML=myobj.datetime;
                cell6.innerHTML=myobj.makrs;
                cell7.innerHTML=myobj.packing;
                cell8.innerHTML=myobj.location;
                cell9.appendChild(button);                
                table.appendChild(tbody);
                truckno.value="";
                shippername.value="";
                jobno.value="";
                date.value="";
            });
        }
    }
    xhttp.open("GET","/searcholdgatepassbtn?"+fdata,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function selectsearcholdgatepassbtn(x){
    var gatepassno=x.parentNode.parentNode.childNodes[0].innerHTML;
    var table=document.getElementById("gatepassupdatetable");
    removetbodies(table.getElementsByTagName("tbody"));
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            var myobj1=myobj[0];
            var myobj2=myobj[1];
            myobj1.forEach((myobj1,index)=>{
                document.getElementById("gatePassID").value=myobj1.gatepass_ID;
                document.getElementById("gpdate").value=new Date(myobj1.datetime);
                document.getElementById("VesselNameSelected").value=myobj1.VesselName;
                displayjobfromvesselname();
                document.getElementById("truckno").value=myobj1.TruckNo;                
            });
            var tbody=document.createElement("tbody");            
            myobj2.forEach((myobj2,index)=>{                
                var row=tbody.insertRow(-1);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                var cell4=row.insertCell(3);
                var cell5=row.insertCell(4);
                var cell6=row.insertCell(5);                
                var cell8=row.insertCell(6);                
                var button1=document.createElement("button");
                cell1.setAttribute("class","w3-border w3-hide");
                cell2.setAttribute("class","w3-border w3-center");
                cell3.setAttribute("class","w3-border w3-left-align");
                cell3.setAttribute("colspan","2");
                cell4.setAttribute("class","w3-border w3-center");
                cell5.setAttribute("class","w3-border w3-right-align");
                cell6.setAttribute("class","w3-border w3-right-align");                
                cell8.setAttribute("class","w3-border");                
                button1.setAttribute("class","w3-button w3-deep-orange");                
                button1.setAttribute("onclick","deletegatepassgrid(this)");
                button1.innerHTML="Del";
                cell1.innerHTML=myobj2.gatepassGrid_ID;
                cell2.innerHTML=myobj2.jobno;
                cell3.innerHTML=myobj2.makrs+"-"+myobj2.packing+"-"+myobj2.location;
                cell4.innerHTML=myobj2.bags;
                cell5.innerHTML=(myobj2.bags*myobj2.eachbagNweigh/1000).toFixed(3);
                cell6.innerHTML=(myobj2.bags*myobj2.eachbagGweigh/1000).toFixed(3);                
                cell8.appendChild(button1);
                table.appendChild(tbody);
                hidemodal(document.getElementById("searcholdgatepass"));                
            });
            tablecalc1(table);
        }
    }
    xhttp.open("GET","/selectsearcholdgatepassbtn?gatepassno="+gatepassno,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function tablecalc1(x){    
    var tbodies=x.getElementsByTagName("tbody");    
    var rows=tbodies[0].getElementsByTagName("tr");    
    var i=0;
    var j=0;
    var h=0;
    var bags=0;
    var nmt=0;
    var gmt=0;
    while(i<rows.length){        
        bags=bags+parseFloat(rows[i++].getElementsByTagName("td")[3].innerHTML);
    }
    while(j<rows.length){        
        nmt=nmt+parseFloat(rows[j++].getElementsByTagName("td")[4].innerHTML);
    }
    while(h<rows.length){        
        gmt=gmt+parseFloat(rows[h++].getElementsByTagName("td")[5].innerHTML);
    }
    x.getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[1].innerHTML=bags;
    x.getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[2].innerHTML=nmt.toFixed(3);
    x.getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[3].innerHTML=gmt.toFixed(3);
}
function deletegatepassgrid(x){
    var row=x.parentNode.parentNode;
    var table=x.parentNode.parentNode.parentNode;    
    var gridid=row.childNodes[0].innerHTML;    
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=this.responseText;
            if(myobj=="Deleted"){
                table.removeChild(row);
                tablecalc1(table.parentNode);
                displaydetailssecondcontainermarkswise();
            }
        }
    }
    xhttp.open("delete","/deletegatepassgrid?gridid="+gridid,true);
    xhttp.setRequestHeader('Content-Type','applcation/X-www-form-urlencoded');
    xhttp.send();
    
}
function displaydetailssecondcontainerjoball(){
    var jobno=document.getElementById("jobnoselected");    
    var div=document.getElementById("secondContainer");
    div.innerHTML="";
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            var myobj1=myobj[0];
            var myobj2=myobj[1];
            myobj2.forEach((myobj2,index)=>{
                myobj1.forEach((myobj1,index)=>{
                var br=document.createElement("br");
                var divCellRow1=document.createElement("div");                
                var divrow1Cell1=document.createElement("div");
                var divrow1Cell2=document.createElement("div");
                var divrow1Cell3=document.createElement("div");
                divCellRow1.setAttribute("class","w3-row-padding");                
                divrow1Cell1.setAttribute("class","w3-col l8 w3-khaki w3-border");
                divrow1Cell1.setAttribute("style","font-weight: bold");
                divrow1Cell2.setAttribute("class","w3-col l2 w3-khaki w3-border");
                divrow1Cell2.setAttribute("style","font-weight: bold");
                divrow1Cell3.setAttribute("class","w3-col l2 w3-khaki w3-border");
                divrow1Cell3.setAttribute("style","font-weight: bold");
                divrow1Cell1.innerHTML="Shipper Name";
                divrow1Cell2.innerHTML="Job No";
                divrow1Cell3.innerHTML="Inv No";
                var divCellRow2=document.createElement("div");
                divCellRow2.setAttribute("class","w3-row-padding w3-blue-grey");
                var divrow2cell1=document.createElement("div");
                divrow2cell1.setAttribute("class","w3-col l8 w3-border");                
                divrow2cell1.innerHTML=myobj1.shipper_name;
                var divrow2cell2=document.createElement("div");
                divrow2cell2.setAttribute("class","w3-col l2 w3-border");
                divrow2cell2.innerHTML=myobj1.jobno;
                var divrow2cell3=document.createElement("div");
                divrow2cell3.setAttribute("class","w3-col l2 w3-border");
                divrow2cell3.innerHTML=myobj1.invoiceno;
                var divCellRow3=document.createElement("div");
                divCellRow3.setAttribute("class","w3-row-padding");
                var divrow3cell1=document.createElement("div");
                divrow3cell1.setAttribute("class","w3-col l12  w3-border");
                divrow3cell1.innerHTML="Marks:-"+myobj2.makrs+"---"+myobj2.packing+"---"+myobj2.location;
                var divCellRow4=document.createElement("div");
                divCellRow4.setAttribute("class","w3-row-padding");
                var divrow4cell1=document.createElement("div");
                divrow4cell1.setAttribute("class","w3-col l3  w3-border");
                var divrow4cell2=document.createElement("div");
                divrow4cell2.setAttribute("class","w3-col l3  w3-border w3-blue-grey");
                divrow4cell2.setAttribute("style","text-align: right;");
                divrow4cell2.innerHTML="Bags";
                var divrow4cell3=document.createElement("div");
                divrow4cell3.setAttribute("class","w3-col l3  w3-border w3-blue-grey");
                divrow4cell3.setAttribute("style","text-align: right;");
                divrow4cell3.innerHTML="NMT";
                var divrow4cell4=document.createElement("div");
                divrow4cell4.setAttribute("class","w3-col l3  w3-border w3-blue-grey");
                divrow4cell4.setAttribute("style","text-align: right;");
                divrow4cell4.innerHTML="GMT";
                var divCellRow5=document.createElement("div");
                divCellRow5.setAttribute("class","w3-row-padding");
                var divrow5cell1=document.createElement("div");
                divrow5cell1.setAttribute("class","w3-col l3  w3-border");
                divrow5cell1.setAttribute("style","text-align: right; ");
                divrow5cell1.innerHTML="Total";
                var divrow5cell2=document.createElement("div");
                divrow5cell2.setAttribute("class","w3-col l3  w3-border");
                divrow5cell2.setAttribute("style","text-align: right;");
                divrow5cell2.innerHTML=myobj2.bags;
                var divrow5cell3=document.createElement("div");
                divrow5cell3.setAttribute("class","w3-col l3  w3-border");
                divrow5cell3.setAttribute("style","text-align: right;");
                divrow5cell3.innerHTML=parseFloat(myobj2.bags*myobj2.eachbagNweigh/1000).toFixed(3);
                var divrow5cell4=document.createElement("div");
                divrow5cell4.setAttribute("class","w3-col l3  w3-border");
                divrow5cell4.setAttribute("style","text-align: right;");
                divrow5cell4.innerHTML=parseFloat(myobj2.bags*myobj2.eachbagGweigh/1000).toFixed(3);
                var divCellRow6=document.createElement("div");
                divCellRow6.setAttribute("class","w3-row-padding");
                var divrow6cell1=document.createElement("div");
                divrow6cell1.setAttribute("class","w3-col l3  w3-border");
                divrow6cell1.setAttribute("style","text-align: right;");
                divrow6cell1.innerHTML="Carting Done";
                var divrow6cell2=document.createElement("div");
                divrow6cell2.setAttribute("class","w3-col l3  w3-border");
                divrow6cell2.setAttribute("style","text-align: right;");
                divrow6cell2.innerHTML=myobj2.bagscarted;
                var divrow6cell3=document.createElement("div");
                divrow6cell3.setAttribute("class","w3-col l3  w3-border");
                divrow6cell3.setAttribute("style","text-align: right;");
                divrow6cell3.innerHTML=parseFloat(myobj2.bagscarted*myobj2.eachbagNweigh/1000).toFixed(3);
                var divrow6cell4=document.createElement("div");
                divrow6cell4.setAttribute("class","w3-col l3  w3-border");
                divrow6cell4.setAttribute("style","text-align: right;");
                divrow6cell4.innerHTML=parseFloat(myobj2.bagscarted*myobj2.eachbagGweigh/1000).toFixed(3);
                var divCellRow7=document.createElement("div");
                divCellRow7.setAttribute("class","w3-row-padding");
                var divrow7cell1=document.createElement("div");
                divrow7cell1.setAttribute("class","w3-col l3  w3-border");
                divrow7cell1.setAttribute("style","text-align: right;");
                divrow7cell1.innerHTML="Balance";
                var divrow7cell2=document.createElement("div");
                divrow7cell2.setAttribute("class","w3-col l3  w3-border w3-blue-grey");
                divrow7cell2.setAttribute("style","text-align: right;");
                divrow7cell2.innerHTML=parseFloat(myobj2.bags-myobj2.bagscarted);
                var divrow7cell3=document.createElement("div");
                divrow7cell3.setAttribute("class","w3-col l3  w3-border w3-blue-grey");
                divrow7cell3.setAttribute("style","text-align: right;");
                divrow7cell3.innerHTML=parseFloat((myobj2.bags*myobj2.eachbagNweigh/1000)-(myobj2.bagscarted*myobj2.eachbagNweigh/1000)).toFixed(3);
                var divrow7cell4=document.createElement("div");
                divrow7cell4.setAttribute("class","w3-col l3  w3-border w3-blue-grey");
                divrow7cell4.setAttribute("style","text-align: right;");
                divrow7cell4.innerHTML=parseFloat((myobj2.bags*myobj2.eachbagGweigh/1000)-(myobj2.bagscarted*myobj2.eachbagGweigh/1000)).toFixed(3);
                div.appendChild(divCellRow1);
                div.appendChild(divCellRow2);
                div.appendChild(divCellRow3);
                div.appendChild(divCellRow4);
                div.appendChild(divCellRow5);
                div.appendChild(divCellRow6);
                div.appendChild(divCellRow7);
                div.appendChild(br);
                divCellRow1.appendChild(divrow1Cell1);
                divCellRow1.appendChild(divrow1Cell2);
                divCellRow1.appendChild(divrow1Cell3);
                divCellRow2.appendChild(divrow2cell1);
                divCellRow2.appendChild(divrow2cell2);
                divCellRow2.appendChild(divrow2cell3);
                divCellRow3.appendChild(divrow3cell1);
                divCellRow4.appendChild(divrow4cell1);
                divCellRow4.appendChild(divrow4cell2);
                divCellRow4.appendChild(divrow4cell3);
                divCellRow4.appendChild(divrow4cell4);
                divCellRow4.appendChild(divrow5cell1);
                divCellRow4.appendChild(divrow5cell2);
                divCellRow4.appendChild(divrow5cell3);
                divCellRow4.appendChild(divrow5cell4);
                divCellRow4.appendChild(divrow6cell1);
                divCellRow4.appendChild(divrow6cell2);
                divCellRow4.appendChild(divrow6cell3);
                divCellRow4.appendChild(divrow6cell4);
                divCellRow4.appendChild(divrow7cell1);
                divCellRow4.appendChild(divrow7cell2);
                divCellRow4.appendChild(divrow7cell3);
                divCellRow4.appendChild(divrow7cell4);
                });                
            });
        }
    }
    xhttp.open("GET","/secondcontainerdetailsjoball?jobno="+jobno.value,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}
function displaydetailssecondcontainermarkswise(){
    var marksid=document.getElementById("markspackingselected");
    var div=document.getElementById("secondContainer");
    div.innerHTML="";
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            var myobj=JSON.parse(this.responseText);
            console.log(myobj);
            myobj.forEach((myobj,index)=>{
                var br=document.createElement("br");
                var divRow1=document.createElement("div")
                divRow1.setAttribute("class","w3-row-padding");
                var divRow2=document.createElement("div");
                divRow2.setAttribute("class","w3-row-padding w3-blue-grey");
                var divRow3=document.createElement("div");
                divRow3.setAttribute("class","w3-row-padding");
                var divRow4=document.createElement("div");
                divRow4.setAttribute("class","w3-row-padding");
                var divRow5=document.createElement("div");
                divRow5.setAttribute("class","w3-row-padding");
                var divRow6=document.createElement("div");
                divRow6.setAttribute("class","w3-row-padding");
                var divRow7=document.createElement("div");
                divRow7.setAttribute("class","w3-row-padding");
                var divRow1cell1=document.createElement("div");
                divRow1cell1.setAttribute("class","w3-col l8 w3-khaki w3-border");
                divRow1cell1.setAttribute("style","font-weight: bold");
                var divRow1cell2=document.createElement("div");
                divRow1cell2.setAttribute("class","w3-col l2 w3-khaki w3-border");
                divRow1cell2.setAttribute("style","font-weight: bold");
                var divRow1cell3=document.createElement("div");
                divRow1cell3.setAttribute("class","w3-col l2 w3-khaki w3-border");
                divRow1cell3.setAttribute("style","font-weight: bold");
                var divRow2cell1=document.createElement("div");
                divRow2cell1.setAttribute("class","w3-col l8 w3-border");
                divRow2cell1.setAttribute("style","font-weight: bold");
                var divRow2cell2=document.createElement("div");
                divRow2cell2.setAttribute("class","w3-col l2 w3-border");
                divRow2cell2.setAttribute("style","font-weight: bold");
                var divRow2cell3=document.createElement("div");
                divRow2cell3.setAttribute("class","w3-col l2 w3-border");
                divRow2cell3.setAttribute("style","font-weight: bold");
                var divRow3cell1=document.createElement("div");
                divRow3cell1.setAttribute("class","w3-col l12 w3-border");
                var divRow4cell1=document.createElement("div");
                divRow4cell1.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow4cell2=document.createElement("div");
                divRow4cell2.setAttribute("class","w3-col l3 w3-border w3-right-align w3-blue-grey");
                var divRow4cell3=document.createElement("div");
                divRow4cell3.setAttribute("class","w3-col l3 w3-border w3-right-align w3-blue-grey");
                var divRow4cell4=document.createElement("div");
                divRow4cell4.setAttribute("class","w3-col l3 w3-border w3-right-align w3-blue-grey");
                var divRow5cell1=document.createElement("div");
                divRow5cell1.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow5cell2=document.createElement("div");
                divRow5cell2.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow5cell3=document.createElement("div");
                divRow5cell3.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow5cell4=document.createElement("div");
                divRow5cell4.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow6cell1=document.createElement("div");
                divRow6cell1.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow6cell2=document.createElement("div");
                divRow6cell2.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow6cell3=document.createElement("div");
                divRow6cell3.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow6cell4=document.createElement("div");
                divRow6cell4.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow7cell1=document.createElement("div");
                divRow7cell1.setAttribute("class","w3-col l3 w3-border w3-right-align");
                var divRow7cell2=document.createElement("div");
                divRow7cell2.setAttribute("class","w3-col l3 w3-border w3-right-align w3-blue-grey");
                var divRow7cell3=document.createElement("div");
                divRow7cell3.setAttribute("class","w3-col l3 w3-border w3-right-align w3-blue-grey");
                var divRow7cell4=document.createElement("div");
                divRow7cell4.setAttribute("class","w3-col l3 w3-border w3-right-align w3-blue-grey");
                divRow1cell1.innerHTML="Shipper Name";
                divRow1cell2.innerHTML="Job No";
                divRow1cell3.innerHTML="Inv No";
                divRow2cell1.innerHTML=myobj.shipper_name;
                divRow2cell2.innerHTML=myobj.jobno;
                divRow2cell3.innerHTML=myobj.invoiceno;
                divRow3cell1.innerHTML="Marks:-"+myobj.makrs+"---"+myobj.packing+"---"+myobj.location;
                divRow4cell1.innerHTML="";
                divRow4cell2.innerHTML="Bags";
                divRow4cell3.innerHTML="NMT";
                divRow4cell4.innerHTML="GMT";
                divRow5cell1.innerHTML="Total";
                divRow5cell2.innerHTML=myobj.bags;
                divRow5cell3.innerHTML=(myobj.nmt).toFixed(3);
                divRow5cell4.innerHTML=(myobj.gmt).toFixed(3);
                divRow6cell1.innerHTML="Carting Done";
                divRow6cell2.innerHTML=myobj.gatspasscarted;
                divRow6cell3.innerHTML=(myobj.gnmt).toFixed(3);
                divRow6cell4.innerHTML=(myobj.ggmt).toFixed(3);
                divRow7cell1.innerHTML="Balance";
                divRow7cell2.innerHTML=parseFloat(myobj.bags-myobj.gatspasscarted);
                divRow7cell3.innerHTML=parseFloat(myobj.nmt-myobj.gnmt).toFixed(3);
                divRow7cell4.innerHTML=parseFloat(myobj.gmt-myobj.ggmt).toFixed(3);
                div.appendChild(divRow1);
                div.appendChild(divRow2);
                div.appendChild(divRow3);
                div.appendChild(divRow4);
                div.appendChild(divRow5);
                div.appendChild(divRow6);
                div.appendChild(divRow7);
                div.appendChild(br);
                divRow1.appendChild(divRow1cell1);
                divRow1.appendChild(divRow1cell2);
                divRow1.appendChild(divRow1cell3);
                divRow2.appendChild(divRow2cell1);
                divRow2.appendChild(divRow2cell2);
                divRow2.appendChild(divRow2cell3);
                divRow3.appendChild(divRow3cell1);
                divRow4.appendChild(divRow4cell1);
                divRow4.appendChild(divRow4cell2);
                divRow4.appendChild(divRow4cell3);
                divRow4.appendChild(divRow4cell4);
                divRow5.appendChild(divRow5cell1);
                divRow5.appendChild(divRow5cell2);
                divRow5.appendChild(divRow5cell3);
                divRow5.appendChild(divRow5cell4);
                divRow6.appendChild(divRow6cell1);
                divRow6.appendChild(divRow6cell2);
                divRow6.appendChild(divRow6cell3);
                divRow6.appendChild(divRow6cell4);
                divRow7.appendChild(divRow7cell1);
                divRow7.appendChild(divRow7cell2);
                divRow7.appendChild(divRow7cell3);
                divRow7.appendChild(divRow7cell4);
            });
        }
    }
    xhttp.open("GET","secondcontainerdetailsmarksselected?marksid="+marksid.value,true);
    xhttp.setRequestHeader('Content-Type','application/X-www-form-urlencoded');
    xhttp.send();
}