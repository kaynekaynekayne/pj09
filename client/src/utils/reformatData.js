const reformatData = (items) => {

    const arr=items.map(item=>{
        const obj={};
        obj[item.name]=item.value;
        return obj; 
    });
    
    let newArr=[];
    const NUM_OF_OUTPUT=9; 
    for(let i=0; i<arr.length; i++){
        if(i%NUM_OF_OUTPUT===0){
            const result=arr.slice(i,i+NUM_OF_OUTPUT).reduce((prev,curr)=>{
                const key=Object.keys(curr)[0];
                return(
                    {
                        ...prev,
                        [key]:curr[key]
                    }
                )
            })
            newArr.push(result);
        }
    }
    return newArr;
};

export default reformatData;
