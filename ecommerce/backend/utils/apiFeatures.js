// query search
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    const reservFields = ["keyword", "pages", "limits"];
    reservFields.forEach((key) => delete queryCopy[key]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultperpage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultperpage * (currentPage - 1);
    this.query = this.query.limit(currentPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
