const { query } = require("express");
const req = require("express/lib/request");

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
        let query="SELECT jobtable.jobno,jobtable.shipperName,jobtable.shippingbillno FROM jobtable WHERE jobtable.jobno LIKE '%"+req.query.jobnosearch+"%' AND jobtable.shipperName LIKE '%"+req.query.shippersearch+"%' AND jobtable.shippingbillno LIKE '%"+req.query.sbsearch+"%'";
        let sql=conn.query(query,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                res.send(results);
            }
        });
    },
    selectjobsearched:(req,res)=>{
        let query="SELECT jobtable.jobtable_id,jobtable.jobno,jobtable.shipperName,jobtable.invoiceno,jobtable.shippingbillno,DATE_FORMAT(jobtable.shippingbilldate,'%Y-%m-%d') AS shippingbilldate,jobtable.dischargePort,jobtable.LoadingPort,jobtable.EVNumber,jobtable.VesselName,jobtable.berthNo,jobtable.wharfageentryNo, DATE_FORMAT(jobtable.wharfageentryDate,'%Y-%m-%d') AS wharfageentryDate FROM jobtable WHERE jobtable.jobno='"+req.query.jobno+"'";
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
    }
}