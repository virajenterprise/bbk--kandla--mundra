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
                cell7.setAttribute("class","w3-border w3-center");
                cell8.setAttribute("class","w3-border w3-center");
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