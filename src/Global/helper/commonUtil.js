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

export {
    cleanEntityData
}