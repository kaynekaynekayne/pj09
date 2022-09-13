import XMLParser from 'react-xml-parser';

const xmlConverter=(dataset)=>{
    const dataArr=new XMLParser().parseFromString(dataset).children;
    return dataArr.map(data=>data.children).flat()
}

export default xmlConverter;