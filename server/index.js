const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require("axios");
const app = express();
var cors = require('cors')

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

const application_bff_url = "https://uat.drinkpartycan.com";

app.get("/index.php/connect/index/banners",(req,res)=>{
  let p1 = axios.get(`${application_bff_url}/index.php/connect/index/banners`);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})
});

app.get("/index.php/connect/index/getlocation",(req,res)=>{
  const zipcode = req.query.zipcode;
  let p1 = axios.get(`${application_bff_url}/index.php/connect/index/getlocation?zipcode=${zipcode}`);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})
});

app.post("/api/customer/login",(req,res)=>{
  const email = req.query.email;
  const password = req.query.password;
  let p1 = axios.post(`${application_bff_url}/api/customer/login?email=${email}&password=${password}`,{});
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})
});

app.post("/api/customer/register",(req,res)=>{
  const email = req.query.email;
  const password = req.query.password;
  const confirm_pswd = req.query.confirm_pswd;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  let p1 = axios.post(`${application_bff_url}/api/customer/register?email=${email}&password=${password}&confirm_password=${confirm_pswd}&first_name=${first_name}&last_name=${last_name}`,{});
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})
});

app.post("/connect/customer/getaddresses",(req,res)=>{
  const customerid = req.query.customerid;
  let p1 = axios.post(`${application_bff_url}/connect/customer/getaddresses?customerid=${customerid}`, req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
  })
});

app.post("/api/cart/showcart",(req,res)=>{
    let p1 = axios.post(`${application_bff_url}/api/cart/showcart`,req.body);
    p1.then((apiRespo)=>{
     res.setHeader('Content-Type', 'application/json');
     res.send(apiRespo.data);
    })
    p1.catch((err)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(err)
})

})

app.post("/api/cart/showcart",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/cart/showcart`,req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})

})

app.post("/api/cart/addtocart",(req,res)=>{
    let p1 = axios.post(`${application_bff_url}/api/cart/addtocart`,req.body);
    p1.then((apiRespo)=>{
     res.setHeader('Content-Type', 'application/json');
     res.send(apiRespo.data);
    })
    p1.catch((err)=>{
        res.setHeader('Content-Type', 'application/json');
        res.send(err)
})

})

app.get("/connect/index/categorylist",(req,res)=>{
  const zipcode = req.query.zipcode;
  let p1 = axios.get(`${application_bff_url}/connect/index/categorylist`);
  p1.then((apiRespo)=>{
  console.log(res.data)
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})

})

app.get("/index.php/connect/index/category",(req,res)=>{
  const categoryID = req.query.catid;
  let p1 = axios.get(`${application_bff_url}/index.php/connect/index/category?catid=${categoryID}`);
  p1.then((apiRespo)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(apiRespo.data);
   })
   p1.catch((err)=>{
       res.setHeader('Content-Type', 'application/json');
       res.send(err)
 
   })
})

app.get("/index.php/connect/index/product",(req,res)=>{
  const ProductID = req.query.prodid;
  let p1 = axios.get(`${application_bff_url}/index.php/connect/index/product?prodid=${ProductID}`);
  p1.then((apiRespo)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(apiRespo.data);
   })
   p1.catch((err)=>{
       res.setHeader('Content-Type', 'application/json');
       res.send(err)
 
   })
})

app.post("/connect/customer/addaddress",(req,res)=>{
  const customerid = req.query.customerid;
  let p1 = axios.post(`${application_bff_url}/connect/customer/addaddress?customerid=${customerid}`,req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)

  })
});

app.post("/api/shipping",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/shipping`,req.body);
  p1.then((apiRespo)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(apiRespo.data);
   })
   p1.catch((err)=>{
       res.setHeader('Content-Type', 'application/json');
       res.send(err)
 
   })
 });

app.post("/api/cart/deleteitem",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/cart/deleteitem`,req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)

  })
});

app.get("/category/")

app.post("/api/cart/updateitem",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/cart/updateitem`,req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})
})

app.post("/api/checkout/paymentmethods",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/checkout/paymentmethods`,req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)

  })
});

app.post("/api/placeorder/placeorder",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/placeorder/placeorder`,req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)

  })
})

app.post("/api/account/mydashboard",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/account/mydashboard`, req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
  })
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);