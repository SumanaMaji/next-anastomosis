// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import excuteQuery from './db'

export default async (req, res) => {
    try {
       // console.log("req nom", req.body)
        var dobval = req.body.dob.split("/");
        
        var dob = dobval[2]+"-"+dobval[1]+"-"+dobval[0];
        
      const result = await excuteQuery({
          query: 'INSERT INTO employee(name,dob,affiliation,phone,email) VALUES("'+req.body.name+'","'+dob+'","'+req.body.affiliation+'","'+req.body.phone+'","'+req.body.email+'")',
          values: [req.body.content],
      });

    res.send({msg:'data inserted and fetched',status:true})
  } catch ( error ) {
      console.log( error );
  }
}