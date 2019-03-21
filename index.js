const fetch = require('node-fetch')
const chalk = require('chalk')
const _ = require('lodash')
const moment = require('moment')
const minimist = require('minimist')(process.argv.slice(2))

let data

async function getData() {
  try {
    data = await fetch(
      'https://petition.parliament.uk/petitions/241584.json'
    ).then(res => res.json())
  } catch (err) {
    hustonWeHaveAProblem()
  }

  const {
    action,
    background,
    signature_count,
    signatures_by_country
  } = data.data.attributes

  Header(action, background, signature_count)

  // Get Country Stats Support
  if (!_.isUndefined(minimist.countries)) {
    if (_.isBoolean(minimist.countries)) {
      getCountryStats(signatures_by_country)
    } else {
      getCountryStats(signatures_by_country, minimist.countries)
    }
  }
}

// Interval support
if (!_.isUndefined(minimist.interval)) {
  setInterval(getData, minimist.interval)
} else {
  getData()
}

function getCountryStats(signatures_by_country, filter = 0) {
  let results = []

  if (filter === 0) {
    signatures_by_country.map(s => {
      const { name, signature_count } = s
      results.push({ name, count: signature_count })
    })

    results = _.sortBy(results, ['count'])
    results.map(s => console.log(s))
  } else {
    signatures_by_country.map(s => {
      const { name, signature_count } = s

      if (signature_count >= filter)
        results.push({ name, count: signature_count })
    })
    results = _.sortBy(results, ['count'])
    results.map(s => console.log(s))
    console.log()
    console.log(
      `Resulting votes >= ${chalk.bold(filter)} yields ${chalk.bold(
        results.length
      )} countries`
    )
  }
}

function Header(action, background, signature_count) {
  console.log(chalk.bold(action))
  console.log()
  console.log(chalk.italic(background))
  console.log()
  console.log(chalk.green.bold(`Current count: ${signature_count}`))
  console.log(
    chalk.grey(`Last update: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
  )
  console.log()
}

function hustonWeHaveAProblem() {
  console.log(
    chalk.red(
      '---------------------------------------------------------------------------'
    )
  )
  console.log(chalk.red('SYSTEM DOWN AT GOV.UK!'))
  console.log(
    chalk.red(
      '---------------------------------------------------------------------------'
    )
  )
  process.exit(1)
}
