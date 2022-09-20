const reformatDetailData=(data)=>{
    const obj={};
    for(let i=0; i<data.length; i++){
        obj[data[i].name]=data[i].value;
    };
    return obj;
}

export default reformatDetailData;