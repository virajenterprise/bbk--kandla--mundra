const { query } = require("express");
const { path } = require("express/lib/application");
const req = require("express/lib/request");
const Query = require("mysql/lib/protocol/sequences/Query");
const fs=require("fs");
const fonts={
    Roboto:{
        normal: "./public/fonts/Roboto/Roboto-Regular.ttf",        
		bold: './public/fonts/Roboto/Roboto-Medium.ttf',
		italics: './public/fonts/Roboto/Roboto-Italic.ttf',
		bolditalics: './public/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
}
const PdfPrinter =require('pdfmake');
const { Certificate } = require("crypto");
const printer = new PdfPrinter(fonts);

module.exports = {
    deskPage:(req,res)=>{
        res.render('deskPage');
    },
    loadCreatjob:(req,res)=>{
        res.render('jobCreation.ejs');
    },
    Creatjobpost:(req,res)=>{
        let query="INSERT INTO jobtable (jobtable.jobno,jobtable.shipperName,jobtable.invoiceno,jobtable.shippingbillno,jobtable.shippingbilldate,jobtable.dischargePort,jobtable.LoadingPort,jobtable.EVNumber,jobtable.VesselName,jobtable.berthNo,jobtable.wharfageentryNo,jobtable.wharfageentryDate)VALUES('"+req.body.jobno+"','"+req.body.shippername+"','"+req.body.invoiceno+"','"+req.body.shippingbillno+"','"+req.body.shippingbilldate+"','"+req.body.dischargeport+"','"+req.body.loadingport+"','"+req.body.evnumber+"','"+req.body.vesselname+"','"+req.body.berthno+"','"+req.body.WharfageEntryNo+"','"+req.body.WharfageEntryDate+"')";
        let sql=conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send(results);
            }
        });
    },
    searchjob:(req,res)=>{
        let query="SELECT jobtable.jobno,shippermaster.shipper_name,jobtable.shippingbillno FROM (jobtable INNER JOIN shippermaster ON jobtable.shipperName=shippermaster.shippermaster_id) WHERE jobtable.jobno LIKE '%"+req.query.jobnosearch+"%' AND shippermaster.shipper_name LIKE '%"+req.query.shippersearch+"%' AND jobtable.shippingbillno LIKE '%"+req.query.sbsearch+"%'";
        let sql=conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{                
                res.send(results);                
            }
        });
    },
    selectjobsearched:(req,res)=>{
        let query="SELECT jobtable.jobtable_id,jobtable.jobno,shippermaster.shipper_name,jobtable.invoiceno,jobtable.shippingbillno,DATE_FORMAT(jobtable.shippingbilldate,'%Y-%m-%d') AS shippingbilldate,jobtable.dischargePort,jobtable.LoadingPort,jobtable.EVNumber,jobtable.VesselName,jobtable.berthNo,jobtable.wharfageentryNo, DATE_FORMAT(jobtable.wharfageentryDate,'%Y-%m-%d') AS wharfageentryDate FROM (jobtable INNER JOIN shippermaster ON jobtable.shipperName=shippermaster.shippermaster_id) WHERE jobtable.jobno='"+req.query.jobno+"'";
        let sql=conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{                
                let query2="SELECT * FROM markspacking WHERE markspacking.jobtableref='"+results[0].jobtable_id+"'"
                conn.query(query2,(err,results2)=>{
                    if(err){
                        console.log(err);
                    }else{                        
                        res.send([results,results2]);
                    }
                });                
            }
        });
    },
    addmarkspacking:(req,res)=>{
        let query="INSERT INTO markspacking(markspacking.makrs,markspacking.packing,markspacking.bags,markspacking.eachbagNweigh,markspacking.eachbagGweigh,markspacking.location,markspacking.jobtableref)VALUES('"+req.body.marks+"','"+req.body.packing+"','"+req.body.bags+"','"+req.body.ebnw+"','"+req.body.ebgw+"','"+req.body.location+"','"+req.body.jobnoid+"')";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{                
                let query2="SELECT * FROM markspacking WHERE markspacking.markspacking_ID='"+results.insertId+"'"
                conn.query(query2,(err,results2)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.send(results2);
                    }
                });
            }
        });
        
    },
    updateshipperlist:(req,res)=>{
        let query="SELECT * FROM shippermaster";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send(results);
            }
        });
    },
    shippernameadd:(req,res)=>{
        let query="INSERT INTO shippermaster(shippermaster.shipper_name)VALUES ('"+req.body.shippername+"')";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send("added");
            }
        });
    },
    updateshipper:(req,res)=>{
        let query="UPDATE jobtable SET jobtable.jobno='"+req.body.jobno+"',jobtable.shipperName='"+req.body.shippername+"',jobtable.invoiceno='"+req.body.invoiceno+"',jobtable.shippingbillno='"+req.body.shippingbillno+"',jobtable.shippingbilldate='"+req.body.shippingbilldate+"',jobtable.dischargePort='"+req.body.dischargeport+"',jobtable.LoadingPort='"+req.body.loadingport+"',jobtable.EVNumber='"+req.body.evnumber+"',jobtable.VesselName='"+req.body.vesselname+"',jobtable.berthNo='"+req.body.berthno+"',jobtable.wharfageentryNo='"+req.body.WharfageEntryNo+"',jobtable.wharfageentryDate='"+req.body.WharfageEntryDate+"' WHERE jobtable.jobtable_id='"+req.body.jobnoid+"' ";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send("updated.");
            }
        });
    },
    editmarkspacking:(req,res)=>{
        let query="UPDATE markspacking SET markspacking.makrs='"+req.body.marks+"',markspacking.packing='"+req.body.packing+"',markspacking.bags='"+req.body.bags+"',markspacking.eachbagNweigh='"+req.body.ebnmt+"',markspacking.eachbagGweigh='"+req.body.ebgmt+"',markspacking.location='"+req.body.loc+"' WHERE markspacking.markspacking_ID='"+req.body.marksid+"'";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                let query2="SELECT * FROM markspacking WHERE markspacking.markspacking_ID='"+req.body.marksid+"'";
                conn.query(query2,(err,results2)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.send(results2);
                    }
                });
            }
        });
    },
    deletemarksdetails:(req,res)=>{
        let query="DELETE FROM markspacking WHERE markspacking.markspacking_ID='"+req.query.marksid+"'";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Deleted");
            }
        });
    },
    gp:(req,res)=>{
        res.render('gatePass');
    },
    getvessellist:(req,res)=>{
        let query="SELECT DISTINCT  jobtable.VesselName FROM jobtable";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send(results);
            }
        });
    },
    getjobdetails:(req,res)=>{
        let query="SELECT jobtable.jobno FROM jobtable WHERE jobtable.VesselName='"+req.query.vesselname+"'";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send(results);
            }
        });
    },
    getmarkspackingdetails:(req,res)=>{
        let query="SELECT markspacking.markspacking_ID,markspacking.makrs,markspacking.packing,markspacking.location  FROM (jobtable INNER JOIN markspacking ON markspacking.jobtableref=jobtable.jobtable_id)WHERE jobtable.jobno='"+req.query.jobno+"'";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{                
                res.send(results);
            }
        });
    },
    createnewgatepass:(req,res)=>{
        let query="INSERT INTO gatepass(gatepass.TruckNo)VALUES('"+req.body.truckno+"')";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{                
                let query2="INSERT INTO gatepassgrid(gatepassgrid.markspackingid,gatepassgrid.bags,gatepassgrid.gatepassid)VALUES('"+req.body.markspackingselected+"','"+req.body.bagsgatepass+"','"+results.insertId+"')";
                conn.query(query2,(err,results2)=>{
                    if(err){                        
                        console.log(err);
                    }else{
                        let query3="SELECT jobtable.jobno,markspacking.makrs,markspacking.packing,markspacking.eachbagNweigh,markspacking.eachbagGweigh,gatepassgrid.bags,gatepass.gatepass_ID,gatepassgrid.gatepassGrid_ID,markspacking.location FROM(((gatepassgrid INNER JOIN gatepass ON gatepassgrid.gatepassid=gatepass.gatepass_ID)INNER JOIN markspacking ON gatepassgrid.markspackingid=markspacking.markspacking_ID)INNER JOIN jobtable ON markspacking.jobtableref=jobtable.jobtable_id)WHERE gatepass.gatepass_ID='"+results.insertId+"'";
                        conn.query(query3,(err,results3)=>{
                            if(err){
                                console.log(err);
                            }else{
                                res.send(results3);
                            }
                        });
                    }
                });
            }
        });
    },
    searcholdgatepassbtn:(req,res)=>{
        let query="SELECT gatepass.gatepass_ID,gatepass.TruckNo,jobtable.jobno,shippermaster.shipper_name,DATE_FORMAT(gatepass.datetime,'%d-%m-%Y') AS datetime,markspacking.makrs,markspacking.packing,markspacking.location FROM ((((jobtable INNER JOIN markspacking ON markspacking.jobtableref=jobtable.jobtable_id)INNER JOIN gatepassgrid ON markspacking.markspacking_ID=gatepassgrid.markspackingid)INNER JOIN gatepass ON gatepass.gatepass_ID=gatepassgrid.gatepassid)INNER JOIN shippermaster ON shippermaster.shippermaster_id=jobtable.shipperName)WHERE gatepass.TruckNo LIKE '%"+req.query.truckno+"%' AND shippermaster.shipper_name LIKE '%"+req.query.shippername+"%'AND jobtable.jobno LIKE '%"+req.query.jobno+"%' AND gatepass.datetime LIKE '%"+req.query.date+"%' GROUP BY gatepass.gatepass_ID";
        conn.query(query,(err,results)=>{
            if(err){                
                console.log(err);
            }else{
                res.send(results);
            }
        });
    },
    selectsearcholdgatepassbtn:(req,res)=>{
        let query="SELECT gatepass.gatepass_ID,gatepass.datetime,jobtable.VesselName,gatepass.TruckNo FROM (((gatepass INNER JOIN gatepassgrid ON gatepass.gatepass_ID=gatepassgrid.gatepassid)INNER JOIN markspacking ON markspacking.markspacking_ID=gatepassgrid.markspackingid)INNER JOIN jobtable ON jobtable.jobtable_id=markspacking.jobtableref)WHERE gatepass.gatepass_ID='"+req.query.gatepassno+"' GROUP BY gatepass.gatepass_ID";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                let query2="SELECT gatepassgrid.gatepassGrid_ID,jobtable.jobno,markspacking.makrs,markspacking.packing,markspacking.location,gatepassgrid.bags,markspacking.eachbagNweigh,markspacking.eachbagGweigh FROM (((gatepassgrid INNER JOIN markspacking ON markspacking.markspacking_ID=gatepassgrid.markspackingid)INNER JOIN jobtable ON jobtable.jobtable_id=markspacking.jobtableref)INNER JOIN gatepass ON gatepass.gatepass_ID=gatepassgrid.gatepassid)WHERE gatepass.gatepass_ID='"+req.query.gatepassno+"'";
                conn.query(query2,(err,results2)=>{
                    if(err){
                        console.log(err);
                    }else{                        
                        res.send([results,results2]);
                    }
                });
            }
        });
    },
    updategatepass:(req,res)=>{
        let query="INSERT INTO gatepassgrid (gatepassgrid.markspackingid,gatepassgrid.bags,gatepassgrid.gatepassid)VALUES ('"+req.body.markspackingselected+"','"+req.body.bagsgatepass+"','"+req.body.gatepassid+"')";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                let query2="SELECT jobtable.jobno,markspacking.makrs,markspacking.packing,markspacking.eachbagNweigh,markspacking.eachbagGweigh,gatepassgrid.bags,gatepass.gatepass_ID,gatepassgrid.gatepassGrid_ID,markspacking.location FROM(((gatepassgrid INNER JOIN gatepass ON gatepassgrid.gatepassid=gatepass.gatepass_ID)INNER JOIN markspacking ON gatepassgrid.markspackingid=markspacking.markspacking_ID)INNER JOIN jobtable ON markspacking.jobtableref=jobtable.jobtable_id)WHERE gatepassgrid.gatepassGrid_ID='"+results.insertId+"'";
                conn.query(query2,(err,results2)=>{
                    if(err){
                        console.log(err);
                    }else{                        
                        res.send(results2);
                    }
                });
            }
        });
    },
    deletegatepassgrid:(req,res)=>{
        let query="DELETE FROM gatepassgrid WHERE gatepassgrid.gatepassGrid_ID='"+req.query.gridid+"'";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{                
                res.send("Deleted");
            }
        });

    },
    secondcontainerdetailsjoball:(req,res)=>{
        let query="SELECT shippermaster.shipper_name,jobtable.jobno,jobtable.invoiceno FROM (jobtable INNER JOIN shippermaster ON shippermaster.shippermaster_id=jobtable.shipperName)WHERE jobtable.jobno='"+req.query.jobno+"'";
        conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                let query2="SELECT jobtable.jobno, markspacking.markspacking_ID, markspacking.makrs,markspacking.packing,markspacking.location,markspacking.eachbagNweigh,markspacking.eachbagGweigh,markspacking.bags,SUM(gatepassgrid.bags) AS bagscarted FROM ((markspacking LEFT JOIN gatepassgrid ON gatepassgrid.markspackingid=markspacking.markspacking_ID)INNER JOIN jobtable ON markspacking.jobtableref=jobtable.jobtable_id)WHERE jobtable.jobno='"+req.query.jobno+"' GROUP BY markspacking.markspacking_ID";
                conn.query(query2,(err,results2)=>{
                    if(err){
                        console.log(err);
                    }else{                        
                        res.send([results,results2]);
                    }
                });
            }
        });
    },
    secondcontainerdetailsmarksselected:(req,res)=>{
        let query="SELECT shippermaster.shipper_name,jobtable.jobno,jobtable.invoiceno,markspacking.makrs,markspacking.packing,markspacking.location,markspacking.bags,(markspacking.bags*markspacking.eachbagNweigh/1000) AS nmt,(markspacking.bags*markspacking.eachbagGweigh/1000) AS gmt,SUM(gatepassgrid.bags) AS gatspasscarted, (SUM(gatepassgrid.bags)*markspacking.eachbagNweigh/1000)AS gnmt,(SUM(gatepassgrid.bags)*markspacking.eachbagGweigh/1000)AS ggmt FROM (((markspacking INNER JOIN jobtable ON jobtable.jobtable_id=markspacking.jobtableref)INNER JOIN shippermaster ON jobtable.shipperName=shippermaster.shippermaster_id)RIGHT JOIN gatepassgrid ON gatepassgrid.markspackingid=markspacking.markspacking_ID)WHERE markspacking.markspacking_ID='"+req.query.marksid+"'";
        conn.query(query,(err,results)=>{
            if(err){                
                console.log(err);                
            }else{                
                res.send(results);
            }
        });
    },
    kandlaGatepassPrint:(req,res)=>{
        res.render('kandlagp.ejs');
    },
    PDFgatepass:(req,res)=>{
        let query=""
        let docDefinition ={
            pageSize:'A5',
            pageMargins:[10,10,0,10],
            content:[
                {                    
                    table:{
                        widths:[17,50,56,25,25,25,28,95],
                        body:[
                            [{colSpan:8,alignment:'center',width:400,border:[false,false,false,false],image:'./public/v-arjoon-logo.jpg'},{},{},{},{},{},{},{}],

                            [
                                {border:[false,false,false,false],text:'No',rowSpan:2,fontSize:10},
                                {fontSize:14,border:[false,false,false,false],text:'651',rowSpan:2,colSpan:5,fontSize:10},
                                {},
                                {},
                                {},
                                {},
                                {alignment:'right',border:[false,false,false,false],text:'Date',rowSpan:2,fontSize:10},
                                {border:[false,false,false,true],text:'',rowSpan:2,fontSize:10},                                
                            ],
                            [
                                //{colSpan:8,border:[true,true,true,true],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:6,border:[false,false,false,false],text:''},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {alignment:'right',border:[false,false,false,false],text:'Shift',fontSize:10},
                                {border:[false,false,false,true],text:'',fontSize:10}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:6,border:[false,false,false,false],text:'The Traffic Manager',fontSize:9},
                                {},
                                {},                                
                                {},
                                {},
                                {},
                                {colSpan:2,border:[false,false,false,false],text:'The Assistant',fontSize:9},
                                {},                                
                            ],
                            [
                                {colSpan:6,border:[false,false,false,false],text:'Deendayal Port Authority',fontSize:9},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {colSpan:2,border:[false,false,false,false],text:'Commissioner of Customs',fontSize:9},
                                {}                                
                            ],
                            [
                                {colSpan:6,border:[false,false,false,false],text:'NEW KADNLA.',fontSize:9},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {colSpan:2,border:[false,false,false,false],text:'NEW KANDLA.',fontSize:9},
                                {}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:'Dear Sir,'},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],                            
                            [
                                {colSpan:8,border:[false,false,false,false],text:'Sub. : Export/Import/Misc. Gate Pass',bold:true,fontSize:12,alignment:'center'},{},{},{},{},{},{},{}
                            ],
                            [
                                {border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''},{border:[false,false,false,false],text:''}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:'Kindly allow us to take in/out side the Dock area the material shown below.',fontSize:12},{},{},{},{},{},{},{}
                            ],
                            [                                
                                {border:[false,false,false,false],text:'1.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:'No. of Packages',fontSize:10},
                                {},
                                {colSpan:5,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'2.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:'Des. of Goods',fontSize:10},
                                {},
                                {colSpan:5,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'3.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:'By C.C./Truck No',fontSize:10},
                                {},
                                {colSpan:5,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'4.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:'R.T.P No.',fontSize:10},
                                {},
                                {colSpan:5,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'5.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:"Driver's Name",fontSize:10},
                                {},
                                {colSpan:5,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'6.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:"Bill Of Entry/S.Bill No.",fontSize:10},
                                {},
                                {colSpan:3,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {border:[false,false,false,false],text:'Date.',alignment:'right',fontSize:10},
                                {border:[false,false,false,true],text:'',fontSize:10}
                            ],
                            [
                                {border:[false,false,false,false],text:'7.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:"Wharfage Entry No.",fontSize:10},
                                {},
                                {colSpan:3,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {border:[false,false,false,false],text:'Date.',alignment:'right',fontSize:10},
                                {border:[false,false,false,true],text:'',fontSize:10}
                            ],
                            [
                                {border:[false,false,false,false],text:'8.',fontSize:10},
                                {colSpan:2,border:[false,false,false,false],text:"Vessel Name.",fontSize:10},
                                {},
                                {colSpan:3,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {},
                                {border:[false,false,false,false],text:'VCN.',alignment:'right',fontSize:10},
                                {border:[false,false,false,true],text:'',fontSize:10}
                            ],
                            [
                                {border:[false,false,false,false],colSpan:8,text:'Weigh',alignment:'left',fontSize:10},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                            ],
                            [
                                {border:[false,false,false,false],text:'G',fontSize:10},
                                {colSpan:2, border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {border:[false,false,false,false],text:'T',fontSize:10},
                                {colSpan:2,border:[false,false,false,true],text:'',fontSize:10},
                                {},
                                {border:[false,false,false,false],text:'N',fontSize:10},
                                {border:[false,false,false,true],text:'',fontSize:10}
                            ],
                            [
                                {border:[false,false,false,false],text:'A/c. M/s.',colSpan:2,fontSize:10},
                                {},
                                {border:[false,false,false,true],text:'',colSpan:6,fontSize:10},
                                {},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {colSpan:8,border:[false,false,false,false],text:''},{},{},{},{},{},{},{}
                            ],
                            [
                                {border:[false,false,false,false],text:'The above particular are true and correct to the best of our knowledge and belief.',colSpan:8,fontSize:11},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'Thankig You,',colSpan:2},
                                {},
                                {border:[false,false,false,false],text:'',colSpan:3},
                                {},
                                {},                                
                                {border:[false,false,false,false],text:"Your's faithfully",colSpan:3,alignment:'right'},
                                {},
                                {}
                            ],
                            [
                                {border:[false,false,false,false],text:'For, V.ARJOON',fontSize:14,colSpan:8,alignment:'right'},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {}
                            ]
                        ]
                    },
                    layout:{
                        defaultBorder:true
                    },margin:[0,0,0,0],
                }
            ],            
        }  
        var pdfDoc =printer.createPdfKitDocument(docDefinition);        
        //pdfDoc.pipe(fs.createWriteStream('file.pdf'));
        var chunks=[];
        var pdffilegatepass;

        pdfDoc.on(`data`,function(chunk){
            chunks.push(chunk);
        });

        pdfDoc.on(`end`,function(){
            pdffilegatepass=Buffer.concat(chunks);
            res.contentType('application/pdf');
            res.send(pdffilegatepass);
        });

        pdfDoc.end();        
    },    
}