class ApiFeatures {
  //ApiFeatures(Product.find(), req.query) Product.find() is here as query
  //and req.query is is query str
  constructor(query, queryStr) {
    //querystr hai query jo client side se aayegi
    //query jo hai vo mongodb wali query hai like .find()
    this.query = query;             
    
    this.queryStr = queryStr;
  }

  search() {
    //ye keyword lega or use modify krega dher sare keyword me
    const keyword = this.queryStr.keyword
      ? {
          name: { 
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
//ab ye product.find jo ki query hai use modified krega with dher sare keyword ko
//spread krke 
//note productModel.find(keyword1).find(keyword2)  it will run keyword2
    this.query = this.query.find({ ...keyword });
    return this;
  }
//at last we return this means apifeature object allowing chaining of methods on it


  filter() {
 //making copy so original do not alter
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category 
    const removeFields = ["keyword", "page", "limit"];
//removing field because we dont need them and they may create chaos
    removeFields.forEach((key) => delete queryCopy[key]);

//convert queryStr object in string to perform regex
    let queryStr = JSON.stringify(queryCopy);
    //this replace will replace key =1200rs with limit 0-1200 or somethimg like that
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
//again convert string into object to return this object
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
//this skip means jab hm page 2 pe honge to product 11 se start kro
//page 1 wali product skip krdo 
    const skip = resultPerPage * (currentPage - 1);
//this.query means product.find() will bring all products
//then .limit will limit the product per page
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
