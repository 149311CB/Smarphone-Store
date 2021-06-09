export const pagination= (page,limit,collection) =>{
    page = parseInt(page)
    limit = parseInt(limit)
    const startIndex = (page-1) * limit
    const endIndex = page * limit
    const result ={}
    if(endIndex < collection.count()){
        result.next={
            page:page+1,
            limit:limit
        }
    }
    if(startIndex > 0){
        result.previous ={
            page:page-1,
            limit:limit
        }
    }
    result.results = collection.slice(startIndex,endIndex)
    return result;
}