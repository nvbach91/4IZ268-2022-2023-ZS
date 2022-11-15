(() => {
  const CONFIG = {
    testMode: true, // if true, the API won't be called and test data will be used
    api: {
      baseUrl: 'https://rest.coinapi.io/v1/',
      key: '1220030E-30E2-4AAE-8711-7F28D82B5E12'
    },
    storage: {
      key: 'selected-currencies'
    },
    currencies: {
      fiat: {
        default: 'USD',
        available: [
          'USD',
          'EUR',
          'CZK',
          'JPY',
          'GBP',
        ]
      },
      crypto: {
        default: 'BTC',
        available: [
          'BTC',
          'ETH',
          'LTC',
          'DOGE',
          'XRP',
          'ADA',
          'SOL',
          'DOT',
        ]
      }
    },
    chart: {
      lineColor: '#0d6efd',
    }
  }

  const CLIENT = axios.create({
    baseURL: CONFIG.api.baseUrl,
    headers: {
      'X-CoinAPI-Key': CONFIG.api.key, // authorization
      'Accept': 'application/json',
    }
  })

  const REPOSITORY = {
    async getTimeSeriesData(fiatCurrency, cryptoCurrency) {
      if (CONFIG.testMode) {
        return fetch('./assets/test.json').then(response => response.json())
      }

      const timeEnd = new Date()
      const timeStart = new Date()

      timeStart.setMonth(timeEnd.getMonth() - 1)

      return CLIENT.get(`/exchangerate/${cryptoCurrency}/${fiatCurrency}/history`, {
        params: {
          'period_id': '8HRS',
          'time_start': timeStart.toISOString(),
          'time_end': timeEnd.toISOString(),
        }
      })
    },
  }

  const STORAGE = {
    get() {
      const value = localStorage.getItem(CONFIG.storage.key)

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
      localStorage.setItem(CONFIG.storage.key, JSON.stringify({
        fiat: normalizeFiat(fiat),
        crypto: normalizeCrypto(crypto)
      }))
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
          borderColor: CONFIG.chart.lineColor,
        }
      ],
    }
  }

  const normalizeFiat = val => {
    if (val && CONFIG.currencies.fiat.available.includes(val.toUpperCase())) {
      return val.toUpperCase()
    }

    return CONFIG.currencies.fiat.default
  }

  const normalizeCrypto = val => {
    if (val && CONFIG.currencies.crypto.available.includes(val.toUpperCase())) {
      return val.toUpperCase()
    }

    return CONFIG.currencies.crypto.default
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
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.03
              },
              pinch: {
                enabled: false
              },
              drag: {
                enabled: true,
                backgroundColor: 'rgba(13, 109, 253, .2)'
              },
              mode: 'x'
            }
          },
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
    }, 200)

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

  const toggleError = (state, message = null) => {
    const chartError = document.getElementById('chart-error')

    if (chartError === null) {
      throw new Error('Missing chart error element.')
    }

    if (!state) {
      chartError.classList.add('d-none')

      return
    }

    if (!message) {
      throw new Error('Cannot show error element without a message.')
    }

    const alert = chartError.querySelector('.alert')

    if (alert === null) {
      throw new Error('Missing chart error alert element.')
    }

    message = `There was an error: ${message}. Please try again or reload the page.`

    // set message to the alert element
    alert.innerHTML = message

    // show error container
    chartError.classList.remove('d-none')
  }

  const updateChart = async (fiat, crypto) => {
    // hide chart
    toggleChart(false)

    // hide error
    toggleError(false)

    // show loader
    toggleLoader(true)

    try {
      const { data } = await REPOSITORY.getTimeSeriesData(fiat, crypto)

      chart = createChart('chart', transformData(data), fiat)

      toggleLoader(false)

      toggleChart(true)
    } catch (e) {
      toggleLoader(false)

      toggleError(true, e.message)
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

    // save selected options to the storage
    STORAGE.set(fiat, crypto)
  }

  const initDefault = () => {
    let [fiat, crypto] = STORAGE.get()

    if (fiat === null) {
      fiat = CONFIG.currencies.fiat.default
    }

    if (crypto === null) {
      crypto = CONFIG.currencies.crypto.default
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
})()