const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res, next) => {
  const sheetId = '16Dv4y2lkrG-4LnvRn6d8hCjNI3p6kzSyL803sxdrizU'
  let query = req.query.q ?? 'select *'

  query = encodeURIComponent(query)

  try {
    const response = await axios.get(
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tq=${query}`
    )

    const data = response.data

    console.log(response)

    console.log(response.data)
    
    const jsonData = JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}') + 1))

    console.log(jsonData)
    console.log(jsonData.table)

    res.json(jsonData)
  } catch (e) {
    console.log(e)

    res.json({
      error: 'private google sheet'
    })
  }
})

module.exports = router
