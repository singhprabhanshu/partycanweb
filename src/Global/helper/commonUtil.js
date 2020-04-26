import cleanDeep from 'clean-deep';



const cleanEntityData = (data) => {
    let cleanData = {};
    try{
        cleanData = cleanDeep(data);
    } catch (e) {
        console.log(e);
    }
    return cleanData;
}

const createReqObjForCart = ()=>{
    let reqObj = {}
    if(localStorage.getItem("Token"))
    reqObj = {
        "api_token": localStorage.getItem("Token")
    };
    else{
        reqObj = {
            "cart_id":localStorage.getItem("cart_id")
        };
    }
    return reqObj;
}


export {
    cleanEntityData,
    createReqObjForCart
}