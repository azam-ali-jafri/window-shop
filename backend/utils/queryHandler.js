exports.searchAndFilter = (query, queryStr) => {
  const keyword = queryStr.keyword
    ? {
        name: {
          $regex: queryStr.keyword, // regular expression for finding not only the exact match but it can be partial as well
          $options: 'i', // no case sensitive
        },
      }
    : {}
  query = query.find(keyword) // updating the result

  const category = queryStr.category
    ? {
        category: queryStr.category,
      }
    : {}
  query = query.find(category)

  const ltPriceFilter = queryStr.ltPrice
    ? {
        price: {
          $lte: queryStr.ltPrice,
        },
      }
    : {}
  query = query.find(ltPriceFilter)
  const gtPriceFilter = queryStr.gtPrice
    ? {
        price: {
          $gt: queryStr.gtPrice,
        },
      }
    : {}

  query = query.find(gtPriceFilter)

  return query
}

exports.pagination = (query, queryStr, resultPerPage) => {
  const pageNumber = queryStr.page ? queryStr.page : 1 // getting page number from query or default 1

  const skip = resultPerPage * (pageNumber - 1) // calculating number of items to be skipped according to page number
  
  query = query.limit(resultPerPage).skip(skip) // filtering
  return query
}
