(() => {
  const CHART_TYPE =  {
    bar: 'bar',
    line: 'line'
  }

  const CONFIG = {
    testMode: false, // if true, the API won't be called and test data will be used
    language: navigator?.language ?? 'en-US', // default language for dates and currencies
    api: {
      baseUrl: 'https://rest.coinapi.io/v1/',
      key: '1220030E-30E2-4AAE-8711-7F28D82B5E12'
    },
    storage: {
      key: 'config' // key for storing data in local storage (selected values, options etc.)
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
    form: {
      autoApply: false // default value for auto-apply checkbox
    },
    chart: {
      type: CHART_TYPE.line, // default chart type
      lineColor: '#0d6efd',
      tension: 0.4,
      dragBgColor: 'rgba(13, 109, 253, 0.2)'
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
        return {
          fiat: CONFIG.currencies.fiat.default,
          crypto: CONFIG.currencies.crypto.default,
          autoApply: CONFIG.form.autoApply,
          chartType: CONFIG.chart.type,
        }
      }

      let json

      try {
        json = JSON.parse(value)
      } catch (e) {
        return {
          fiat: CONFIG.currencies.fiat.default,
          crypto: CONFIG.currencies.crypto.default,
          autoApply: CONFIG.form.autoApply,
          chartType: CONFIG.chart.type,
        }
      }

      return {
        fiat: normalizeFiat(json.fiat ?? null),
        crypto: normalizeCrypto(json.crypto ?? null),
        autoApply: !!(json.autoApply ?? CONFIG.form.autoApply),
        chartType: normalizeChartType(json.chartType ?? null),
      }
    },

    set(fiat, crypto, autoApply, chartType) {
      localStorage.setItem(CONFIG.storage.key, JSON.stringify({ fiat, crypto, autoApply, chartType }))
    }
  }

  const elements = {
    chartContainer: document.getElementById('chart-container'),
    chartLoader: document.getElementById('chart-loader'),
    chartError: document.getElementById('chart-error'),
    chart: document.getElementById('chart'),
    form: document.getElementById('form'),
    autoApply: document.getElementById('automatic-apply'),
    formSubmit: document.getElementById('submit-btn'),
    cryptoSelect: document.getElementById('crypto-currency'),
    fiatSelect: document.getElementById('fiat-currency'),
    chartTypeSelect: document.getElementById('chart-type')
  }

  const normalizeChartType = val => {
    if (val && Object.keys(CHART_TYPE).includes(val.toLowerCase())) {
      return val.toLowerCase()
    }

    console.log("lmao")

    return CONFIG.chart.type
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

  // transforms raw data to data object for chart
  const transformData = data => {
    const labels = []
    const points = []

    data.forEach(item => {
      labels.push(new Date(item.time_period_start).toLocaleString(CONFIG.language))
      points.push(item.rate_open)
    })

    return {
      labels,
      datasets: [
        {
          label: `Price`,
          data: points,
          tension: CONFIG.chart.tension,
          fill: false,
          borderColor: CONFIG.chart.lineColor,
        }
      ],
    }
  }

  const createChart = (data, fiatCurrency, type) => {
    const context = elements.chart.getContext('2d')

    // create formatter for labels
    const formatter = new Intl.NumberFormat(CONFIG.language, {
      style: 'currency',
      currency: fiatCurrency.toUpperCase()
    })

    let minYScale = null
    let maxYScale = null

    // set manually min and max for bar chart, otherwise it looks awful
    if (type === CHART_TYPE.bar) {
      // find mix & max
      const [min, max] = data.datasets[0].data.reduce((reducer, item) => {
        let min = reducer[0]
        let max = reducer[1]

        if (min === null || min > item) {
          min = item
        }

        if (max === null || max < item) {
          max = item
        }

        return [min, max]
      }, [null, null])

      // calculate the range which will be added to max and min value
      const range = (max - min) / 10

      minYScale = min - range <= 0 ? 0 : min - range
      maxYScale = max + range
    }

    return new Chart(context, {
      type: type,
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
            },
            min: minYScale,
            max: maxYScale
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
                backgroundColor: CONFIG.chart.dragBgColor
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

  const initSelectEvents = () => {
    elements.cryptoSelect.addEventListener('change', event => {
      // autoApply is not turned off
      if (! elements.autoApply.checked) {
        return
      }

      elements.form.dispatchEvent(new Event('submit'))
    })

    elements.fiatSelect.addEventListener('change', event => {
      // autoApply is not turned off
      if (! elements.autoApply.checked) {
        return
      }

      elements.form.dispatchEvent(new Event('submit'))
    })

    elements.chartTypeSelect.addEventListener('change', event => {
      // autoApply is not turned off
      if (! elements.autoApply.checked) {
        return
      }

      elements.form.dispatchEvent(new Event('submit'))
    })
  }

  const persistAutoApplyValue = (value) => {
    const { fiat, crypto, chartType } = STORAGE.get()

    STORAGE.set(fiat, crypto, value, chartType)
  }

  const initAutoApplyEvent = () => {
    elements.autoApply.addEventListener('change', event => {
      const checked = elements.autoApply.checked

      elements.formSubmit.disabled = checked

      // persist changed value to local storage
      persistAutoApplyValue(checked)
    })

    // dispatch event to change the button state
    elements.autoApply.dispatchEvent(new Event('change'))
  }

  const initFormEvent = () => {
    elements.form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const fiat = elements.fiatSelect.value
      const crypto = elements.cryptoSelect.value
      const chartType = elements.chartTypeSelect.value
      const autoApply = elements.autoApply.checked

      await updateChart(
        normalizeFiat(fiat),
        normalizeCrypto(crypto),
        normalizeChartType(chartType)
      )

      // set values on update to locale storage
      STORAGE.set(fiat, crypto, autoApply, chartType)
    })
  }

  // inits crypto currency select, fills it with
  // values and sets default value
  const initCryptoSelectValues = () => {
    const cryptoOptions = []

    CONFIG.currencies.crypto.available.forEach(crypto => {
      const option = document.createElement('option')

      // set attributes
      option.value = crypto
      option.text = crypto

      cryptoOptions.push(option)
    })

    elements.cryptoSelect.append(...cryptoOptions)
  }

  // inits fiat currency select, fills it with
  // values and sets default value
  const initFiatSelectValues = () => {
    const fiatOptions = []

    CONFIG.currencies.fiat.available.forEach(fiat => {
      const option = document.createElement('option')

      // set attributes
      option.value = fiat
      option.text = fiat

      fiatOptions.push(option)
    })

    elements.fiatSelect.append(...fiatOptions)
  }

  // retrieves data from local storage and sets them
  // to form inputs
  const initDefaultValues = () => {
    let { fiat, crypto, autoApply, chartType } = STORAGE.get()

    elements.fiatSelect.value = fiat
    elements.cryptoSelect.value = crypto
    elements.chartTypeSelect.value = chartType
    elements.autoApply.checked = autoApply
  }

  // toggles disabled state of the form
  const toggleForm = state => {
    elements.cryptoSelect.disabled = !state
    elements.fiatSelect.disabled = !state
    elements.chartTypeSelect.disabled = !state
    elements.autoApply.disabled = !state

    if (!state && elements.formSubmit.disabled) {
      elements.formSubmit.classList.add('was-disabled')
    }

    elements.formSubmit.disabled = elements.formSubmit.classList.contains('was-disabled') || !state

    if (state) {
      elements.formSubmit.classList.remove('was-disabled')
    }
  }

  let loaderInterval = null
  const toggleLoader = state => {
    if (!state) {
      window.clearInterval(loaderInterval)
      elements.chartLoader.classList.add('d-none')

      return
    }

    loaderInterval = window.setInterval(() => {
      const span = elements.chartLoader.querySelector('span > span')

      if (span === null) {
        throw new Error('Missing loader span element.')
      }

      if (span.innerHTML.length >= 3) {
        span.innerHTML = ''
      } else {
        span.innerHTML += '.'
      }
    }, 200)

    elements.chartLoader.classList.remove('d-none')
  }

  let chart = null
  const toggleChart = state => {
    const chartContainer = document.getElementById('chart-container')

    if (chartContainer === null) {
      throw new Error('Missing chart container element.')
    }

    if (state) {
      elements.chartContainer.classList.remove('d-none')

      return
    }

    // destroy previous chart instance if any
    if (chart) {
      chart.destroy()
    }

    elements.chartContainer.classList.add('d-none')
  }

  const toggleError = (state, message = null) => {
    if (!state) {
      elements.chartError.classList.add('d-none')

      return
    }

    if (!message) {
      throw new Error('Cannot show error element without a message.')
    }

    const alert = elements.chartError.querySelector('.alert')

    if (alert === null) {
      throw new Error('Missing chart error alert element.')
    }

    message = `There was an error: ${message}. Please try again or reload the page.`

    // set message to the alert element
    alert.innerHTML = message

    // show error container
    elements.chartError.classList.remove('d-none')
  }

  const updateChart = async (fiat, crypto, type) => {
    // hide chart
    toggleChart(false)

    // hide error
    toggleError(false)

    // show loader
    toggleLoader(true)

    // disable form
    toggleForm(false)

    try {
      const { data } = await REPOSITORY.getTimeSeriesData(fiat, crypto)

      chart = createChart(transformData(data), fiat, type)

      toggleLoader(false)

      toggleChart(true)

      toggleForm(true)
    } catch (e) {
      toggleLoader(false)

      toggleForm(true)

      toggleError(true, e.message)
    }
  }

  // initializes whole app
  const init = () => {
    // initialize select options
    initCryptoSelectValues()
    initFiatSelectValues()

    // initialize default values
    initDefaultValues()

    // initialize events on elements
    initSelectEvents()
    initAutoApplyEvent()
    initFormEvent()

    // trigger submit event to load the chart
    elements.form.dispatchEvent(new Event('submit'))
  }

  init()
})()