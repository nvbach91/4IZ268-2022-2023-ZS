const API_KEY = '1220030E-30E2-4AAE-8711-7F28D82B5E12'

const STORAGE_KEY = 'selected-currencies'

const DEFAULT_FIAT = 'USD'
const AVAILABLE_FIATS = [
  'USD',
  'EUR',
  'CZK',
]

const DEFAULT_CRYPTO = 'BTC'
const AVAILABLE_CRYPTO = [
  'BTC',
  'ETH',
  'LTC',
]

const client = axios.create({
  baseURL: 'https://rest.coinapi.io/v1/',
  headers: {
    'X-CoinAPI-Key': API_KEY, // authorization
    'Accept': 'application/json',
  }
})

const repository = {
  async getTimeSeriesData(fiatCurrency, cryptoCurrency) {
    const timeEnd = new Date()
    const timeStart = new Date()

    timeStart.setMonth(timeEnd.getMonth() - 1)

    return client.get(`/exchangerate/${cryptoCurrency}/${fiatCurrency}/history`, {
      params: {
        'period_id': '1HRS',
        'time_start': timeStart.toISOString(),
        'time_end': timeEnd.toISOString(),
      }
    })
  }
}

// transforms raw data to data object for chart
const transformData = data => {
  const labels = []
  const points = []

  data.forEach(item => {
    labels.push(new Date(item.time_period_start).toLocaleString('en-US'))
    points.push(item.rate_open)
  })

  return {
    labels,
    datasets: [
      {
        label: `Price`,
        data: points,
        tension: 0.4,
        fill: false,
        borderColor: '#0d6efd',
      }
    ],
  }
}

const createChart = (id, data, fiatCurrency) => {
  const element = document.getElementById(id)

  if (!element) {
    throw new Error(`Missing element for chart with ID ${id}.`)
  }

  if (element.tagName !== 'CANVAS') {
    throw new Error('Chart element must be a canvas element.')
  }

  const context = element.getContext('2d')

  // create formatter for labels
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fiatCurrency.toUpperCase()
  })

  return new Chart(context, {
    type: 'line',
    data,
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: `Price in ${fiatCurrency.toUpperCase()}`,
            align: 'center',
            font: {
              size: 16
            }
          },
          ticks: {
            callback: function (value) {
              return formatter.format(value)
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || ''

              if (label) {
                label += ': '
              }

              if (context.parsed.y !== null) {
                label += formatter.format(context.parsed.y)
              }

              return label
            }
          }
        },
        legend: {
          display: false,
        },
        title: {
          display: false,
        }
      }
    }
  })
}

const normalizeFiat = val => {
  if (val && AVAILABLE_FIATS.includes(val.toUpperCase())) {
    return val.toUpperCase()
  }

  return DEFAULT_FIAT
}

const normalizeCrypto = val => {
  if (val && AVAILABLE_CRYPTO.includes(val.toUpperCase())) {
    return val.toUpperCase()
  }

  return DEFAULT_CRYPTO
}

// storage for storing previously selected currencies
const storage = {
  get() {
    const value = localStorage.getItem(STORAGE_KEY)

    // no value stored
    if (value === null) {
      return [null, null]
    }

    /**
     * @type {{fiat?: string, crypto?: string}}
     */
    let json

    try {
      json = JSON.parse(value)
    } catch (e) {
      console.error(e)
      return [null, null]
    }

    return [json?.fiat ?? null, json?.crypto ?? null]
  },
  set(fiat, crypto) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      fiat: normalizeFiat(fiat),
      crypto: normalizeCrypto(crypto)
    }))
  }
}

const selectCurrencies = (fiat, crypto) => {
  const fiatSelect = document.getElementById('fiat-currency')
  const cryptoSelect = document.getElementById('crypto-currency')

  if (fiatSelect === null || cryptoSelect === null) {
    throw new Error('Missing both selects for currencies.')
  }

  fiatSelect.value = fiat
  cryptoSelect.value = crypto
}

let loaderInterval = null

const toggleLoader = state => {
  const loader = document.getElementById('chart-loader')

  if (loader === null) {
    throw new Error('Missing loader element.')
  }

  if (!state) {
    window.clearInterval(loaderInterval)
    loader.classList.add('d-none')

    return
  }

  loaderInterval = window.setInterval(() => {
    const span = loader.querySelector('span > span')

    if (span === null) {
      throw new Error('Missing loader span element.')
    }

    if (span.innerHTML.length >= 3) {
      span.innerHTML = ''
    } else {
      span.innerHTML += '.'
    }
  }, 500)

  loader.classList.remove('d-none')
}

let chart = null

const toggleChart = state => {
  const chartContainer = document.getElementById('chart-container')

  if (chartContainer === null) {
    throw new Error('Missing chart container element.')
  }

  if (state) {
    chartContainer.classList.remove('d-none')

    return
  }

  // destroy previous chart instance if any
  if (chart) {
    chart.destroy()
  }

  chartContainer.classList.add('d-none')
}

const updateChart = async (fiat, crypto) => {
  toggleChart(false)

  toggleLoader(true)

  try {
    const { data } = await repository.getTimeSeriesData(fiat, crypto)

    chart = createChart('chart', transformData(data), fiat)

    toggleLoader(false)

    toggleChart(true)
  } catch (e) {
    toggleLoader(false)

    window.alert(`There was an error: ${e.message}.`)
  }
}

const currenciesChanged = async () => {
  const fiatSelect = document.getElementById('fiat-currency')
  const cryptoSelect = document.getElementById('crypto-currency')

  if (fiatSelect === null || cryptoSelect === null) {
    throw new Error('Missing both selects for currencies.')
  }

  const fiat = fiatSelect.value
  const crypto = cryptoSelect.value

  await updateChart(normalizeFiat(fiat), normalizeCrypto(crypto))
}

const initDefault = () => {
  let [fiat, crypto] = storage.get()

  if (fiat === null) {
    fiat = DEFAULT_FIAT
  }

  if (crypto === null) {
    crypto = DEFAULT_CRYPTO
  }

  selectCurrencies(normalizeFiat(fiat), normalizeCrypto(crypto))

  currenciesChanged()
}

const initEvent = () => {
  const form = document.getElementById('form')

  if (form === null) {
    throw new Error('Missing form element.')
  }

  form.addEventListener('submit', async e => {
    e.preventDefault()
    await currenciesChanged()
  })
}

initEvent()
initDefault()