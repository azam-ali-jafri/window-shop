class ApiFeatures {
  // class having variables query for the result and queryStr for the actual query from the url
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }
  // filtering by the entered string
  searchAndFilter = () => {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // regular expression for finding not only the exact match but it can be partial as well
            $options: "i", // no case sensitive
          },
        }
      : {}
    this.query = this.query.find(keyword) // updating the result

    const category = this.queryStr.category
      ? {
          category: this.queryStr.category,
        }
      : {}
    this.query = this.query.find(category)

    const ltPriceFilter = this.queryStr.ltPrice
      ? {
          price: {
            $lte: this.queryStr.ltPrice,
          },
        }
      : {}
    this.query = this.query.find(ltPriceFilter)
    const gtPriceFilter = this.queryStr.gtPrice
      ? {
          price: {
            $gt: this.queryStr.gtPrice,
          },
        }
      : {}

    this.query = this.query.find(gtPriceFilter)

    return this
  }

  pagination = (resultPerPage) => {
    const pageNumber = this.queryStr.page ? this.queryStr.page : 1 // getting page number from query or default 1

    const skip = resultPerPage * (pageNumber - 1) // calculating number of items to be skipped according to page number

    this.query = this.query.limit(resultPerPage).skip(skip) // filtering

    return this
  }
}

module.exports = ApiFeatures
