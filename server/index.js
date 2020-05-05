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

app.get("/connect/index/banners",(req,res)=>{
  let p1 = axios.get(`${application_bff_url}/connect/index/banners?store_id=1`);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
})
});

app.get("/connect/index/getlocation",(req,res)=>{
  const zipcode = req.query.zipcode;
  const store = req.query.store;
  let p1 = axios.get(`${application_bff_url}/connect/index/getlocation?zipcode=${zipcode}&store_id=1&store=${store}`);
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
  let p1 = axios.post(`${application_bff_url}/api/customer/login?email=${email}&password=${password}`,req.body);
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
  let p1 = axios.post(`${application_bff_url}/api/customer/register?email=${email}&password=${password}&confirm_password=${confirm_pswd}&first_name=${first_name}&last_name=${last_name}`,req.body);
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
  let p1 = axios.get(`${application_bff_url}/connect/index/categorylist?store_id=1`);
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

app.get("/connect/index/category",(req,res)=>{
  const categoryID = req.query.catid;
  let p1 = axios.get(`${application_bff_url}/connect/index/category?catid=${categoryID}&store_id=1`);
  p1.then((apiRespo)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(apiRespo.data);
   })
   p1.catch((err)=>{
       res.setHeader('Content-Type', 'application/json');
       res.send(err)
 
   })
})

app.get("/connect/index/product",(req,res)=>{
  const ProductID = req.query.prodid;
  let p1 = axios.get(`${application_bff_url}/connect/index/product?prodid=${ProductID}&store_id=1`);
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

app.post("/api/account/myorders",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/account/myorders`, req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
  })
});

app.post("/connect/index/search",(req,res)=>{
  const searchRequest = req.query.searchRequest;
  let p1 = axios.post(`${application_bff_url}/connect/index/search?q=${searchRequest}`, req.body);
  p1.then((apiRespo)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(apiRespo.data);
   })
   p1.catch((err)=>{
       res.setHeader('Content-Type', 'application/json');
       res.send(err)
 
   })
});

app.post("/api/account/mycards",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/account/mycards`, req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
  })
});

app.post("/connect/customer/addaddress",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/connect/customer/addaddress`, req.body);
  p1.then((apiRespo)=>{
   res.setHeader('Content-Type', 'application/json');
   res.send(apiRespo.data);
  })
  p1.catch((err)=>{
      res.setHeader('Content-Type', 'application/json');
      res.send(err)
  })
});

app.post("/api/cart/guestcart",(req,res)=>{
  let p1 = axios.post(`${application_bff_url}/api/cart/guestcart`, req.body);
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