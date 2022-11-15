const API_KEY = '1220030E-30E2-4AAE-8711-7F28D82B5E12'

const STORAGE_KEY = 'selected-currencies'

const DEFAULT_FIAT = 'USD'
const AVAILABLE_FIATS = [
  'USD',
  'EUR',
  'CZK',
  'JPY',
  'GBP',
]

const DEFAULT_CRYPTO = 'BTC'
const AVAILABLE_CRYPTO = [
  'BTC',
  'ETH',
  'LTC',
  'DOGE',
  'XRP',
  'ADA',
  'SOL',
  'DOT',
]

const testData = {
  data: [
    {
      "time_period_start": "2022-09-29T16:00:00.0000000Z",
      "time_period_end": "2022-09-30T00:00:00.0000000Z",
      "time_open": "2022-09-29T16:00:00.0000000Z",
      "time_close": "2022-09-29T23:59:00.0000000Z",
      "rate_open": 19288.686210850476,
      "rate_high": 19597.937112728065,
      "rate_low": 19140.324152652298,
      "rate_close": 19596.532199261484
    },
    {
      "time_period_start": "2022-09-30T00:00:00.0000000Z",
      "time_period_end": "2022-09-30T08:00:00.0000000Z",
      "time_open": "2022-09-30T00:00:00.0000000Z",
      "time_close": "2022-09-30T07:59:00.0000000Z",
      "rate_open": 19592.281382551777,
      "rate_high": 19676.967618736922,
      "rate_low": 19327.88064785384,
      "rate_close": 19562.378870604818
    },
    {
      "time_period_start": "2022-09-30T08:00:00.0000000Z",
      "time_period_end": "2022-09-30T16:00:00.0000000Z",
      "time_open": "2022-09-30T08:00:00.0000000Z",
      "time_close": "2022-09-30T15:59:00.0000000Z",
      "rate_open": 19573.64620656034,
      "rate_high": 20161.94488750554,
      "rate_low": 19216.077379048533,
      "rate_close": 19734.18006979171
    },
    {
      "time_period_start": "2022-09-30T16:00:00.0000000Z",
      "time_period_end": "2022-10-01T00:00:00.0000000Z",
      "time_open": "2022-09-30T16:00:00.0000000Z",
      "time_close": "2022-09-30T23:59:00.0000000Z",
      "rate_open": 19755.794129338283,
      "rate_high": 19862.036189089846,
      "rate_low": 19256.68313963764,
      "rate_close": 19421.220256647448
    },
    {
      "time_period_start": "2022-10-01T00:00:00.0000000Z",
      "time_period_end": "2022-10-01T08:00:00.0000000Z",
      "time_open": "2022-10-01T00:00:00.0000000Z",
      "time_close": "2022-10-01T07:59:00.0000000Z",
      "rate_open": 19424.62457765172,
      "rate_high": 19476.85859525473,
      "rate_low": 19264.209556270504,
      "rate_close": 19309.95071917524
    },
    {
      "time_period_start": "2022-10-01T08:00:00.0000000Z",
      "time_period_end": "2022-10-01T16:00:00.0000000Z",
      "time_open": "2022-10-01T08:00:00.0000000Z",
      "time_close": "2022-10-01T15:59:00.0000000Z",
      "rate_open": 19311.299011200656,
      "rate_high": 19370.30482254344,
      "rate_low": 19209.852106524937,
      "rate_close": 19323.687409014976
    },
    {
      "time_period_start": "2022-10-01T16:00:00.0000000Z",
      "time_period_end": "2022-10-02T00:00:00.0000000Z",
      "time_open": "2022-10-01T16:00:00.0000000Z",
      "time_close": "2022-10-01T23:59:00.0000000Z",
      "rate_open": 19332.417704534277,
      "rate_high": 19344.160939362868,
      "rate_low": 19212.600506703908,
      "rate_close": 19311.74983715999
    },
    {
      "time_period_start": "2022-10-02T00:00:00.0000000Z",
      "time_period_end": "2022-10-02T08:00:00.0000000Z",
      "time_open": "2022-10-02T00:00:00.0000000Z",
      "time_close": "2022-10-02T07:59:00.0000000Z",
      "rate_open": 19312.1507566874,
      "rate_high": 19392.821187673286,
      "rate_low": 19245.07872453152,
      "rate_close": 19286.065815610767
    },
    {
      "time_period_start": "2022-10-02T08:00:00.0000000Z",
      "time_period_end": "2022-10-02T16:00:00.0000000Z",
      "time_open": "2022-10-02T08:00:00.0000000Z",
      "time_close": "2022-10-02T15:59:00.0000000Z",
      "rate_open": 19284.705108011614,
      "rate_high": 19297.87885261231,
      "rate_low": 19060.98614158708,
      "rate_close": 19141.245994187193
    },
    {
      "time_period_start": "2022-10-02T16:00:00.0000000Z",
      "time_period_end": "2022-10-03T00:00:00.0000000Z",
      "time_open": "2022-10-02T16:00:00.0000000Z",
      "time_close": "2022-10-02T23:59:00.0000000Z",
      "rate_open": 19145.013102776484,
      "rate_high": 19333.779258197337,
      "rate_low": 18933.55346852063,
      "rate_close": 19049.555496601442
    },
    {
      "time_period_start": "2022-10-03T00:00:00.0000000Z",
      "time_period_end": "2022-10-03T08:00:00.0000000Z",
      "time_open": "2022-10-03T00:00:00.0000000Z",
      "time_close": "2022-10-03T07:59:00.0000000Z",
      "rate_open": 19057.3754351342,
      "rate_high": 19291.95786686609,
      "rate_low": 18991.9259719956,
      "rate_close": 19196.506504719924
    },
    {
      "time_period_start": "2022-10-03T08:00:00.0000000Z",
      "time_period_end": "2022-10-03T16:00:00.0000000Z",
      "time_open": "2022-10-03T08:00:00.0000000Z",
      "time_close": "2022-10-03T15:59:00.0000000Z",
      "rate_open": 19197.507444268645,
      "rate_high": 19487.75208103627,
      "rate_low": 19126.951677464607,
      "rate_close": 19342.662004743503
    },
    {
      "time_period_start": "2022-10-03T16:00:00.0000000Z",
      "time_period_end": "2022-10-04T00:00:00.0000000Z",
      "time_open": "2022-10-03T16:00:00.0000000Z",
      "time_close": "2022-10-03T23:59:00.0000000Z",
      "rate_open": 19336.79087770238,
      "rate_high": 19675.76428406409,
      "rate_low": 19324.127132135658,
      "rate_close": 19627.242064298967
    },
    {
      "time_period_start": "2022-10-04T00:00:00.0000000Z",
      "time_period_end": "2022-10-04T08:00:00.0000000Z",
      "time_open": "2022-10-04T00:00:00.0000000Z",
      "time_close": "2022-10-04T07:59:00.0000000Z",
      "rate_open": 19631.444193454983,
      "rate_high": 19961.312806607377,
      "rate_low": 19508.031158703587,
      "rate_close": 19961.312806607377
    },
    {
      "time_period_start": "2022-10-04T08:00:00.0000000Z",
      "time_period_end": "2022-10-04T16:00:00.0000000Z",
      "time_open": "2022-10-04T08:00:00.0000000Z",
      "time_close": "2022-10-04T15:59:00.0000000Z",
      "rate_open": 19973.00852934607,
      "rate_high": 20211.464551016892,
      "rate_low": 19819.446387252778,
      "rate_close": 20106.76379891284
    },
    {
      "time_period_start": "2022-10-04T16:00:00.0000000Z",
      "time_period_end": "2022-10-05T00:00:00.0000000Z",
      "time_open": "2022-10-04T16:00:00.0000000Z",
      "time_close": "2022-10-04T23:59:00.0000000Z",
      "rate_open": 20106.108921053303,
      "rate_high": 20438.276717545723,
      "rate_low": 19886.20937585127,
      "rate_close": 20340.382466012892
    },
    {
      "time_period_start": "2022-10-05T00:00:00.0000000Z",
      "time_period_end": "2022-10-05T08:00:00.0000000Z",
      "time_open": "2022-10-05T00:00:00.0000000Z",
      "time_close": "2022-10-05T07:59:00.0000000Z",
      "rate_open": 20344.25927204931,
      "rate_high": 20362.657106409526,
      "rate_low": 20093.281110464522,
      "rate_close": 20237.87551961081
    },
    {
      "time_period_start": "2022-10-05T08:00:00.0000000Z",
      "time_period_end": "2022-10-05T16:00:00.0000000Z",
      "time_open": "2022-10-05T08:00:00.0000000Z",
      "time_close": "2022-10-05T14:04:00.0000000Z",
      "rate_open": 20232.05553276001,
      "rate_high": 20242.497299663897,
      "rate_low": 19839.170747801072,
      "rate_close": 19847.99118695367
    },
    {
      "time_period_start": "2022-10-05T16:00:00.0000000Z",
      "time_period_end": "2022-10-06T00:00:00.0000000Z",
      "time_open": "2022-10-05T16:48:00.0000000Z",
      "time_close": "2022-10-05T23:59:00.0000000Z",
      "rate_open": 20183.71039338157,
      "rate_high": 20329.558215913505,
      "rate_low": 19986.69131778689,
      "rate_close": 20165.6600356664
    },
    {
      "time_period_start": "2022-10-06T00:00:00.0000000Z",
      "time_period_end": "2022-10-06T08:00:00.0000000Z",
      "time_open": "2022-10-06T00:00:00.0000000Z",
      "time_close": "2022-10-06T07:59:00.0000000Z",
      "rate_open": 20160.884834251,
      "rate_high": 20440.713744091987,
      "rate_low": 20153.619494399827,
      "rate_close": 20231.8546609622
    },
    {
      "time_period_start": "2022-10-06T08:00:00.0000000Z",
      "time_period_end": "2022-10-06T16:00:00.0000000Z",
      "time_open": "2022-10-06T08:00:00.0000000Z",
      "time_close": "2022-10-06T15:59:00.0000000Z",
      "rate_open": 20221.159026539506,
      "rate_high": 20309.773639401476,
      "rate_low": 19884.946760784118,
      "rate_close": 20033.026104712175
    },
    {
      "time_period_start": "2022-10-06T16:00:00.0000000Z",
      "time_period_end": "2022-10-07T00:00:00.0000000Z",
      "time_open": "2022-10-06T16:00:00.0000000Z",
      "time_close": "2022-10-06T23:59:00.0000000Z",
      "rate_open": 20013.69668555989,
      "rate_high": 20216.69364648814,
      "rate_low": 19885.328050529373,
      "rate_close": 19958.0767710797
    },
    {
      "time_period_start": "2022-10-07T00:00:00.0000000Z",
      "time_period_end": "2022-10-07T08:00:00.0000000Z",
      "time_open": "2022-10-07T00:00:00.0000000Z",
      "time_close": "2022-10-07T07:59:00.0000000Z",
      "rate_open": 19963.752908275146,
      "rate_high": 20050.005220143197,
      "rate_low": 19831.732753712524,
      "rate_close": 19928.293761714573
    },
    {
      "time_period_start": "2022-10-07T08:00:00.0000000Z",
      "time_period_end": "2022-10-07T16:00:00.0000000Z",
      "time_open": "2022-10-07T08:00:00.0000000Z",
      "time_close": "2022-10-07T15:59:00.0000000Z",
      "rate_open": 19929.976145316352,
      "rate_high": 20048.918467087227,
      "rate_low": 19531.165370532763,
      "rate_close": 19580.120078695127
    },
    {
      "time_period_start": "2022-10-07T16:00:00.0000000Z",
      "time_period_end": "2022-10-08T00:00:00.0000000Z",
      "time_open": "2022-10-07T16:00:00.0000000Z",
      "time_close": "2022-10-07T23:59:00.0000000Z",
      "rate_open": 19578.434985233078,
      "rate_high": 19643.066218135733,
      "rate_low": 19352.771799567145,
      "rate_close": 19540.1265206973
    },
    {
      "time_period_start": "2022-10-08T00:00:00.0000000Z",
      "time_period_end": "2022-10-08T08:00:00.0000000Z",
      "time_open": "2022-10-08T00:00:00.0000000Z",
      "time_close": "2022-10-08T07:59:00.0000000Z",
      "rate_open": 19533.05124361575,
      "rate_high": 19610.453237273436,
      "rate_low": 19436.537814558174,
      "rate_close": 19502.262632363752
    },
    {
      "time_period_start": "2022-10-08T08:00:00.0000000Z",
      "time_period_end": "2022-10-08T16:00:00.0000000Z",
      "time_open": "2022-10-08T08:00:00.0000000Z",
      "time_close": "2022-10-08T15:59:00.0000000Z",
      "rate_open": 19502.100125502246,
      "rate_high": 19548.648652268996,
      "rate_low": 19445.5324139637,
      "rate_close": 19491.242811261614
    },
    {
      "time_period_start": "2022-10-08T16:00:00.0000000Z",
      "time_period_end": "2022-10-09T00:00:00.0000000Z",
      "time_open": "2022-10-08T16:00:00.0000000Z",
      "time_close": "2022-10-08T23:59:00.0000000Z",
      "rate_open": 19489.04063421632,
      "rate_high": 19534.95743413178,
      "rate_low": 19274.84977292575,
      "rate_close": 19416.261320537502
    },
    {
      "time_period_start": "2022-10-09T00:00:00.0000000Z",
      "time_period_end": "2022-10-09T08:00:00.0000000Z",
      "time_open": "2022-10-09T00:00:00.0000000Z",
      "time_close": "2022-10-09T07:59:00.0000000Z",
      "rate_open": 19419.517513802548,
      "rate_high": 19451.857461051935,
      "rate_low": 19329.558326814076,
      "rate_close": 19409.551837692783
    },
    {
      "time_period_start": "2022-10-09T08:00:00.0000000Z",
      "time_period_end": "2022-10-09T16:00:00.0000000Z",
      "time_open": "2022-10-09T08:00:00.0000000Z",
      "time_close": "2022-10-09T15:59:00.0000000Z",
      "rate_open": 19409.765385747847,
      "rate_high": 19551.43532793118,
      "rate_low": 19381.033828414656,
      "rate_close": 19542.628414627972
    },
    {
      "time_period_start": "2022-10-09T16:00:00.0000000Z",
      "time_period_end": "2022-10-10T00:00:00.0000000Z",
      "time_open": "2022-10-09T16:00:00.0000000Z",
      "time_close": "2022-10-09T23:59:00.0000000Z",
      "rate_open": 19538.64892673349,
      "rate_high": 19553.73042140942,
      "rate_low": 19379.15752038517,
      "rate_close": 19445.32863310031
    },
    {
      "time_period_start": "2022-10-10T00:00:00.0000000Z",
      "time_period_end": "2022-10-10T08:00:00.0000000Z",
      "time_open": "2022-10-10T00:00:00.0000000Z",
      "time_close": "2022-10-10T07:59:00.0000000Z",
      "rate_open": 19441.398359074177,
      "rate_high": 19521.386785294504,
      "rate_low": 19380.484885312155,
      "rate_close": 19414.83435657602
    },
    {
      "time_period_start": "2022-10-10T08:00:00.0000000Z",
      "time_period_end": "2022-10-10T16:00:00.0000000Z",
      "time_open": "2022-10-10T08:00:00.0000000Z",
      "time_close": "2022-10-10T15:59:00.0000000Z",
      "rate_open": 19413.63754585113,
      "rate_high": 19440.185346031452,
      "rate_low": 19138.844789883493,
      "rate_close": 19280.444020669533
    },
    {
      "time_period_start": "2022-10-10T16:00:00.0000000Z",
      "time_period_end": "2022-10-11T00:00:00.0000000Z",
      "time_open": "2022-10-10T16:00:00.0000000Z",
      "time_close": "2022-10-10T23:59:00.0000000Z",
      "rate_open": 19268.583116022393,
      "rate_high": 19349.589911092575,
      "rate_low": 19073.27708452662,
      "rate_close": 19131.18021634554
    },
    {
      "time_period_start": "2022-10-11T00:00:00.0000000Z",
      "time_period_end": "2022-10-11T08:00:00.0000000Z",
      "time_open": "2022-10-11T00:00:00.0000000Z",
      "time_close": "2022-10-11T07:59:00.0000000Z",
      "rate_open": 19132.05809482823,
      "rate_high": 19132.05809482823,
      "rate_low": 18957.46771707992,
      "rate_close": 19082.38615684871
    },
    {
      "time_period_start": "2022-10-11T08:00:00.0000000Z",
      "time_period_end": "2022-10-11T16:00:00.0000000Z",
      "time_open": "2022-10-11T08:00:00.0000000Z",
      "time_close": "2022-10-11T15:59:00.0000000Z",
      "rate_open": 19080.842783948512,
      "rate_high": 19260.24151072009,
      "rate_low": 18865.68757952972,
      "rate_close": 19141.83664672787
    },
    {
      "time_period_start": "2022-10-11T16:00:00.0000000Z",
      "time_period_end": "2022-10-12T00:00:00.0000000Z",
      "time_open": "2022-10-11T16:00:00.0000000Z",
      "time_close": "2022-10-11T23:59:00.0000000Z",
      "rate_open": 19147.391685819497,
      "rate_high": 19180.826728745615,
      "rate_low": 18922.62807260227,
      "rate_close": 19052.49430374092
    },
    {
      "time_period_start": "2022-10-12T00:00:00.0000000Z",
      "time_period_end": "2022-10-12T08:00:00.0000000Z",
      "time_open": "2022-10-12T00:00:00.0000000Z",
      "time_close": "2022-10-12T07:59:00.0000000Z",
      "rate_open": 19057.547895894888,
      "rate_high": 19191.337319194572,
      "rate_low": 19029.394567217758,
      "rate_close": 19117.10030483947
    },
    {
      "time_period_start": "2022-10-12T08:00:00.0000000Z",
      "time_period_end": "2022-10-12T16:00:00.0000000Z",
      "time_open": "2022-10-12T08:00:00.0000000Z",
      "time_close": "2022-10-12T15:59:00.0000000Z",
      "rate_open": 19109.599976312453,
      "rate_high": 19192.66600919641,
      "rate_low": 18991.569805743806,
      "rate_close": 19141.171941134824
    },
    {
      "time_period_start": "2022-10-12T16:00:00.0000000Z",
      "time_period_end": "2022-10-13T00:00:00.0000000Z",
      "time_open": "2022-10-12T16:00:00.0000000Z",
      "time_close": "2022-10-12T23:59:00.0000000Z",
      "rate_open": 19137.259859821836,
      "rate_high": 19213.347234975612,
      "rate_low": 19067.18257076213,
      "rate_close": 19156.241400687282
    },
    {
      "time_period_start": "2022-10-13T00:00:00.0000000Z",
      "time_period_end": "2022-10-13T08:00:00.0000000Z",
      "time_open": "2022-10-13T00:00:00.0000000Z",
      "time_close": "2022-10-13T07:59:00.0000000Z",
      "rate_open": 19155.90751877377,
      "rate_high": 19167.853556406753,
      "rate_low": 18953.104781494538,
      "rate_close": 19010.922509067863
    },
    {
      "time_period_start": "2022-10-13T08:00:00.0000000Z",
      "time_period_end": "2022-10-13T16:00:00.0000000Z",
      "time_open": "2022-10-13T08:00:00.0000000Z",
      "time_close": "2022-10-13T15:59:00.0000000Z",
      "rate_open": 19003.804613398082,
      "rate_high": 19038.9639508774,
      "rate_low": 18235.78055494386,
      "rate_close": 18947.780199483776
    },
    {
      "time_period_start": "2022-10-13T16:00:00.0000000Z",
      "time_period_end": "2022-10-14T00:00:00.0000000Z",
      "time_open": "2022-10-13T16:00:00.0000000Z",
      "time_close": "2022-10-13T23:59:00.0000000Z",
      "rate_open": 18957.975941198227,
      "rate_high": 19489.212993856596,
      "rate_low": 18904.6490587707,
      "rate_close": 19385.49318003433
    },
    {
      "time_period_start": "2022-10-14T00:00:00.0000000Z",
      "time_period_end": "2022-10-14T08:00:00.0000000Z",
      "time_open": "2022-10-14T00:00:00.0000000Z",
      "time_close": "2022-10-14T07:59:00.0000000Z",
      "rate_open": 19376.352906605312,
      "rate_high": 19933.868154787127,
      "rate_low": 19341.36472350201,
      "rate_close": 19639.430625622073
    },
    {
      "time_period_start": "2022-10-14T08:00:00.0000000Z",
      "time_period_end": "2022-10-14T16:00:00.0000000Z",
      "time_open": "2022-10-14T08:00:00.0000000Z",
      "time_close": "2022-10-14T15:59:00.0000000Z",
      "rate_open": 19643.921346833507,
      "rate_high": 19844.284503589868,
      "rate_low": 19320.692850273466,
      "rate_close": 19370.44348198229
    },
    {
      "time_period_start": "2022-10-14T16:00:00.0000000Z",
      "time_period_end": "2022-10-15T00:00:00.0000000Z",
      "time_open": "2022-10-14T16:00:00.0000000Z",
      "time_close": "2022-10-14T23:59:00.0000000Z",
      "rate_open": 19357.767485746426,
      "rate_high": 19397.60233383387,
      "rate_low": 19095.84272494994,
      "rate_close": 19181.37446702291
    },
    {
      "time_period_start": "2022-10-15T00:00:00.0000000Z",
      "time_period_end": "2022-10-15T08:00:00.0000000Z",
      "time_open": "2022-10-15T00:00:00.0000000Z",
      "time_close": "2022-10-15T07:59:00.0000000Z",
      "rate_open": 19176.03493060715,
      "rate_high": 19217.324766889542,
      "rate_low": 19141.06605232589,
      "rate_close": 19169.71527414158
    },
    {
      "time_period_start": "2022-10-15T08:00:00.0000000Z",
      "time_period_end": "2022-10-15T16:00:00.0000000Z",
      "time_open": "2022-10-15T08:00:00.0000000Z",
      "time_close": "2022-10-15T15:59:00.0000000Z",
      "rate_open": 19171.8024492925,
      "rate_high": 19197.24045549986,
      "rate_low": 19058.512905968135,
      "rate_close": 19129.010689249288
    },
    {
      "time_period_start": "2022-10-15T16:00:00.0000000Z",
      "time_period_end": "2022-10-16T00:00:00.0000000Z",
      "time_open": "2022-10-15T16:00:00.0000000Z",
      "time_close": "2022-10-15T23:59:00.0000000Z",
      "rate_open": 19128.205553341686,
      "rate_high": 19160.960485158845,
      "rate_low": 19002.94136577797,
      "rate_close": 19065.939709340233
    },
    {
      "time_period_start": "2022-10-16T00:00:00.0000000Z",
      "time_period_end": "2022-10-16T08:00:00.0000000Z",
      "time_open": "2022-10-16T00:00:00.0000000Z",
      "time_close": "2022-10-16T07:59:00.0000000Z",
      "rate_open": 19069.727360112644,
      "rate_high": 19163.772273260205,
      "rate_low": 19069.727360112644,
      "rate_close": 19132.632349581872
    },
    {
      "time_period_start": "2022-10-16T08:00:00.0000000Z",
      "time_period_end": "2022-10-16T16:00:00.0000000Z",
      "time_open": "2022-10-16T08:00:00.0000000Z",
      "time_close": "2022-10-16T15:59:00.0000000Z",
      "rate_open": 19135.35349659436,
      "rate_high": 19190.096855243,
      "rate_low": 19108.853642665686,
      "rate_close": 19155.199328960964
    },
    {
      "time_period_start": "2022-10-16T16:00:00.0000000Z",
      "time_period_end": "2022-10-17T00:00:00.0000000Z",
      "time_open": "2022-10-16T16:00:00.0000000Z",
      "time_close": "2022-10-16T23:59:00.0000000Z",
      "rate_open": 19158.22622959003,
      "rate_high": 19421.256803941433,
      "rate_low": 19120.038808881272,
      "rate_close": 19262.847252249452
    },
    {
      "time_period_start": "2022-10-17T00:00:00.0000000Z",
      "time_period_end": "2022-10-17T08:00:00.0000000Z",
      "time_open": "2022-10-17T00:00:00.0000000Z",
      "time_close": "2022-10-17T07:59:00.0000000Z",
      "rate_open": 19263.494791573114,
      "rate_high": 19304.40589320484,
      "rate_low": 19163.035005661688,
      "rate_close": 19298.379669084352
    },
    {
      "time_period_start": "2022-10-17T08:00:00.0000000Z",
      "time_period_end": "2022-10-17T16:00:00.0000000Z",
      "time_open": "2022-10-17T08:00:00.0000000Z",
      "time_close": "2022-10-17T15:59:00.0000000Z",
      "rate_open": 19295.69220790305,
      "rate_high": 19672.42872657215,
      "rate_low": 19251.68800525145,
      "rate_close": 19534.793841924045
    },
    {
      "time_period_start": "2022-10-17T16:00:00.0000000Z",
      "time_period_end": "2022-10-18T00:00:00.0000000Z",
      "time_open": "2022-10-17T16:00:00.0000000Z",
      "time_close": "2022-10-17T23:59:00.0000000Z",
      "rate_open": 19536.046097027305,
      "rate_high": 19617.01059981846,
      "rate_low": 19458.593150632947,
      "rate_close": 19551.49557900032
    },
    {
      "time_period_start": "2022-10-18T00:00:00.0000000Z",
      "time_period_end": "2022-10-18T08:00:00.0000000Z",
      "time_open": "2022-10-18T00:00:00.0000000Z",
      "time_close": "2022-10-18T07:59:00.0000000Z",
      "rate_open": 19549.85180690637,
      "rate_high": 19695.604058745645,
      "rate_low": 19490.72839085788,
      "rate_close": 19668.395412173853
    },
    {
      "time_period_start": "2022-10-18T08:00:00.0000000Z",
      "time_period_end": "2022-10-18T16:00:00.0000000Z",
      "time_open": "2022-10-18T08:00:00.0000000Z",
      "time_close": "2022-10-18T15:59:00.0000000Z",
      "rate_open": 19667.2995480751,
      "rate_high": 19667.2995480751,
      "rate_low": 19296.370741027404,
      "rate_close": 19361.282328980004
    },
    {
      "time_period_start": "2022-10-18T16:00:00.0000000Z",
      "time_period_end": "2022-10-19T00:00:00.0000000Z",
      "time_open": "2022-10-18T16:00:00.0000000Z",
      "time_close": "2022-10-18T23:59:00.0000000Z",
      "rate_open": 19376.065638236527,
      "rate_high": 19435.996403346402,
      "rate_low": 19106.330889283257,
      "rate_close": 19335.185733994957
    },
    {
      "time_period_start": "2022-10-19T00:00:00.0000000Z",
      "time_period_end": "2022-10-19T08:00:00.0000000Z",
      "time_open": "2022-10-19T00:00:00.0000000Z",
      "time_close": "2022-10-19T07:59:00.0000000Z",
      "rate_open": 19329.11569180823,
      "rate_high": 19350.831469467546,
      "rate_low": 19162.1385420222,
      "rate_close": 19221.13578508176
    },
    {
      "time_period_start": "2022-10-19T08:00:00.0000000Z",
      "time_period_end": "2022-10-19T16:00:00.0000000Z",
      "time_open": "2022-10-19T08:00:00.0000000Z",
      "time_close": "2022-10-19T15:59:00.0000000Z",
      "rate_open": 19219.3010372216,
      "rate_high": 19296.13844778033,
      "rate_low": 19095.10622323856,
      "rate_close": 19269.555226717817
    },
    {
      "time_period_start": "2022-10-19T16:00:00.0000000Z",
      "time_period_end": "2022-10-20T00:00:00.0000000Z",
      "time_open": "2022-10-19T16:00:00.0000000Z",
      "time_close": "2022-10-19T23:59:00.0000000Z",
      "rate_open": 19268.18676037753,
      "rate_high": 19268.18676037753,
      "rate_low": 19103.406992211385,
      "rate_close": 19125.830617108117
    },
    {
      "time_period_start": "2022-10-20T00:00:00.0000000Z",
      "time_period_end": "2022-10-20T08:00:00.0000000Z",
      "time_open": "2022-10-20T00:00:00.0000000Z",
      "time_close": "2022-10-20T07:59:00.0000000Z",
      "rate_open": 19123.722852178027,
      "rate_high": 19194.419749763267,
      "rate_low": 18937.966697473035,
      "rate_close": 19140.52607169671
    },
    {
      "time_period_start": "2022-10-20T08:00:00.0000000Z",
      "time_period_end": "2022-10-20T16:00:00.0000000Z",
      "time_open": "2022-10-20T08:00:00.0000000Z",
      "time_close": "2022-10-20T15:59:00.0000000Z",
      "rate_open": 19143.24011997254,
      "rate_high": 19333.42893316575,
      "rate_low": 19108.013440082243,
      "rate_close": 19259.16645007999
    },
    {
      "time_period_start": "2022-10-20T16:00:00.0000000Z",
      "time_period_end": "2022-10-21T00:00:00.0000000Z",
      "time_open": "2022-10-20T16:00:00.0000000Z",
      "time_close": "2022-10-20T23:59:00.0000000Z",
      "rate_open": 19255.069031667506,
      "rate_high": 19255.069031667506,
      "rate_low": 18976.545508309624,
      "rate_close": 19043.1663344662
    },
    {
      "time_period_start": "2022-10-21T00:00:00.0000000Z",
      "time_period_end": "2022-10-21T08:00:00.0000000Z",
      "time_open": "2022-10-21T00:00:00.0000000Z",
      "time_close": "2022-10-21T07:59:00.0000000Z",
      "rate_open": 19041.707928648357,
      "rate_high": 19120.852805705203,
      "rate_low": 18996.374406284172,
      "rate_close": 19029.911325972516
    },
    {
      "time_period_start": "2022-10-21T08:00:00.0000000Z",
      "time_period_end": "2022-10-21T16:00:00.0000000Z",
      "time_open": "2022-10-21T08:00:00.0000000Z",
      "time_close": "2022-10-21T15:59:00.0000000Z",
      "rate_open": 19028.035575049445,
      "rate_high": 19137.579435923053,
      "rate_low": 18706.85098269938,
      "rate_close": 19137.579435923053
    },
    {
      "time_period_start": "2022-10-21T16:00:00.0000000Z",
      "time_period_end": "2022-10-22T00:00:00.0000000Z",
      "time_open": "2022-10-21T16:00:00.0000000Z",
      "time_close": "2022-10-21T23:59:00.0000000Z",
      "rate_open": 19166.44767030358,
      "rate_high": 19238.342780246952,
      "rate_low": 19090.434633447327,
      "rate_close": 19163.80859006644
    },
    {
      "time_period_start": "2022-10-22T00:00:00.0000000Z",
      "time_period_end": "2022-10-22T08:00:00.0000000Z",
      "time_open": "2022-10-22T00:00:00.0000000Z",
      "time_close": "2022-10-22T07:59:00.0000000Z",
      "rate_open": 19164.907868908685,
      "rate_high": 19180.624286002138,
      "rate_low": 19118.47625763909,
      "rate_close": 19166.643164848352
    },
    {
      "time_period_start": "2022-10-22T08:00:00.0000000Z",
      "time_period_end": "2022-10-22T16:00:00.0000000Z",
      "time_open": "2022-10-22T08:00:00.0000000Z",
      "time_close": "2022-10-22T15:59:00.0000000Z",
      "rate_open": 19163.85465362304,
      "rate_high": 19248.727132319014,
      "rate_low": 19141.937931516302,
      "rate_close": 19234.31635520533
    },
    {
      "time_period_start": "2022-10-22T16:00:00.0000000Z",
      "time_period_end": "2022-10-23T00:00:00.0000000Z",
      "time_open": "2022-10-22T16:00:00.0000000Z",
      "time_close": "2022-10-22T23:59:00.0000000Z",
      "rate_open": 19233.295077478764,
      "rate_high": 19243.261795349757,
      "rate_low": 19137.83167915351,
      "rate_close": 19204.334880892442
    },
    {
      "time_period_start": "2022-10-23T00:00:00.0000000Z",
      "time_period_end": "2022-10-23T08:00:00.0000000Z",
      "time_open": "2022-10-23T00:00:00.0000000Z",
      "time_close": "2022-10-23T07:59:00.0000000Z",
      "rate_open": 19204.844642112177,
      "rate_high": 19219.879384459873,
      "rate_low": 19150.936280784375,
      "rate_close": 19161.618514689646
    },
    {
      "time_period_start": "2022-10-23T08:00:00.0000000Z",
      "time_period_end": "2022-10-23T16:00:00.0000000Z",
      "time_open": "2022-10-23T08:00:00.0000000Z",
      "time_close": "2022-10-23T15:59:00.0000000Z",
      "rate_open": 19162.25880022939,
      "rate_high": 19203.820782775674,
      "rate_low": 19099.41085069772,
      "rate_close": 19190.108049985003
    },
    {
      "time_period_start": "2022-10-23T16:00:00.0000000Z",
      "time_period_end": "2022-10-24T00:00:00.0000000Z",
      "time_open": "2022-10-23T16:00:00.0000000Z",
      "time_close": "2022-10-23T23:59:00.0000000Z",
      "rate_open": 19189.494140732728,
      "rate_high": 19673.91267424096,
      "rate_low": 19170.077091843366,
      "rate_close": 19569.6394141286
    },
    {
      "time_period_start": "2022-10-24T00:00:00.0000000Z",
      "time_period_end": "2022-10-24T08:00:00.0000000Z",
      "time_open": "2022-10-24T00:00:00.0000000Z",
      "time_close": "2022-10-24T07:59:00.0000000Z",
      "rate_open": 19571.888628696095,
      "rate_high": 19587.018565888902,
      "rate_low": 19265.718231681043,
      "rate_close": 19327.482857568917
    },
    {
      "time_period_start": "2022-10-24T08:00:00.0000000Z",
      "time_period_end": "2022-10-24T16:00:00.0000000Z",
      "time_open": "2022-10-24T08:00:00.0000000Z",
      "time_close": "2022-10-24T15:59:00.0000000Z",
      "rate_open": 19324.152576796845,
      "rate_high": 19449.5959583242,
      "rate_low": 19185.897144779683,
      "rate_close": 19301.13765007128
    },
    {
      "time_period_start": "2022-10-24T16:00:00.0000000Z",
      "time_period_end": "2022-10-25T00:00:00.0000000Z",
      "time_open": "2022-10-24T16:00:00.0000000Z",
      "time_close": "2022-10-24T23:59:00.0000000Z",
      "rate_open": 19303.560222224223,
      "rate_high": 19418.049653099486,
      "rate_low": 19227.146569190925,
      "rate_close": 19332.219797061072
    },
    {
      "time_period_start": "2022-10-25T00:00:00.0000000Z",
      "time_period_end": "2022-10-25T08:00:00.0000000Z",
      "time_open": "2022-10-25T00:00:00.0000000Z",
      "time_close": "2022-10-25T07:59:00.0000000Z",
      "rate_open": 19330.059493490215,
      "rate_high": 19368.434074268807,
      "rate_low": 19255.029429598762,
      "rate_close": 19309.104102034744
    },
    {
      "time_period_start": "2022-10-25T08:00:00.0000000Z",
      "time_period_end": "2022-10-25T16:00:00.0000000Z",
      "time_open": "2022-10-25T08:00:00.0000000Z",
      "time_close": "2022-10-25T15:59:00.0000000Z",
      "rate_open": 19305.6800539223,
      "rate_high": 19810.725347058535,
      "rate_low": 19250.78987791059,
      "rate_close": 19739.099663860263
    },
    {
      "time_period_start": "2022-10-25T16:00:00.0000000Z",
      "time_period_end": "2022-10-26T00:00:00.0000000Z",
      "time_open": "2022-10-25T16:00:00.0000000Z",
      "time_close": "2022-10-25T23:59:00.0000000Z",
      "rate_open": 19751.983707058687,
      "rate_high": 20404.04941873566,
      "rate_low": 19730.00047094167,
      "rate_close": 20091.201293008005
    },
    {
      "time_period_start": "2022-10-26T00:00:00.0000000Z",
      "time_period_end": "2022-10-26T08:00:00.0000000Z",
      "time_open": "2022-10-26T00:00:00.0000000Z",
      "time_close": "2022-10-26T07:59:00.0000000Z",
      "rate_open": 20084.763675066828,
      "rate_high": 20368.363248405196,
      "rate_low": 20065.471074455734,
      "rate_close": 20355.215619989725
    },
    {
      "time_period_start": "2022-10-26T08:00:00.0000000Z",
      "time_period_end": "2022-10-26T16:00:00.0000000Z",
      "time_open": "2022-10-26T08:00:00.0000000Z",
      "time_close": "2022-10-26T15:59:00.0000000Z",
      "rate_open": 20350.481083110506,
      "rate_high": 20972.55583770854,
      "rate_low": 20300.650884099163,
      "rate_close": 20851.53062187656
    },
    {
      "time_period_start": "2022-10-26T16:00:00.0000000Z",
      "time_period_end": "2022-10-27T00:00:00.0000000Z",
      "time_open": "2022-10-26T16:00:00.0000000Z",
      "time_close": "2022-10-26T23:59:00.0000000Z",
      "rate_open": 20850.935861797385,
      "rate_high": 20981.490899202134,
      "rate_low": 20654.209633738727,
      "rate_close": 20768.649461477566
    },
    {
      "time_period_start": "2022-10-27T00:00:00.0000000Z",
      "time_period_end": "2022-10-27T08:00:00.0000000Z",
      "time_open": "2022-10-27T00:00:00.0000000Z",
      "time_close": "2022-10-27T07:59:00.0000000Z",
      "rate_open": 20775.329474548704,
      "rate_high": 20872.758719366055,
      "rate_low": 20638.682720579985,
      "rate_close": 20706.281734202603
    },
    {
      "time_period_start": "2022-10-27T08:00:00.0000000Z",
      "time_period_end": "2022-10-27T16:00:00.0000000Z",
      "time_open": "2022-10-27T08:00:00.0000000Z",
      "time_close": "2022-10-27T15:59:00.0000000Z",
      "rate_open": 20715.63211683516,
      "rate_high": 20750.334659121232,
      "rate_low": 20452.816830618074,
      "rate_close": 20558.668350449007
    },
    {
      "time_period_start": "2022-10-27T16:00:00.0000000Z",
      "time_period_end": "2022-10-28T00:00:00.0000000Z",
      "time_open": "2022-10-27T16:00:00.0000000Z",
      "time_close": "2022-10-27T23:59:00.0000000Z",
      "rate_open": 20565.068153387758,
      "rate_high": 20671.357721758006,
      "rate_low": 20235.682238356858,
      "rate_close": 20292.964336422938
    },
    {
      "time_period_start": "2022-10-28T00:00:00.0000000Z",
      "time_period_end": "2022-10-28T08:00:00.0000000Z",
      "time_open": "2022-10-28T00:00:00.0000000Z",
      "time_close": "2022-10-28T07:59:00.0000000Z",
      "rate_open": 20295.842639406925,
      "rate_high": 20328.793961981413,
      "rate_low": 20067.93205933084,
      "rate_close": 20083.165601341585
    },
    {
      "time_period_start": "2022-10-28T08:00:00.0000000Z",
      "time_period_end": "2022-10-28T16:00:00.0000000Z",
      "time_open": "2022-10-28T08:00:00.0000000Z",
      "time_close": "2022-10-28T15:59:00.0000000Z",
      "rate_open": 20081.814747767326,
      "rate_high": 20568.978799731012,
      "rate_low": 20060.881755559254,
      "rate_close": 20469.792317156513
    },
    {
      "time_period_start": "2022-10-28T16:00:00.0000000Z",
      "time_period_end": "2022-10-29T00:00:00.0000000Z",
      "time_open": "2022-10-28T16:00:00.0000000Z",
      "time_close": "2022-10-28T23:59:00.0000000Z",
      "rate_open": 20486.274248182322,
      "rate_high": 20746.71363646977,
      "rate_low": 20464.908035466866,
      "rate_close": 20600.599444520787
    },
    {
      "time_period_start": "2022-10-29T00:00:00.0000000Z",
      "time_period_end": "2022-10-29T08:00:00.0000000Z",
      "time_open": "2022-10-29T00:00:00.0000000Z",
      "time_close": "2022-10-29T07:59:00.0000000Z",
      "rate_open": 20597.488948442944,
      "rate_high": 20809.423008144124,
      "rate_low": 20564.018022435524,
      "rate_close": 20755.255969268175
    },
    {
      "time_period_start": "2022-10-29T08:00:00.0000000Z",
      "time_period_end": "2022-10-29T16:00:00.0000000Z",
      "time_open": "2022-10-29T08:00:00.0000000Z",
      "time_close": "2022-10-29T15:59:00.0000000Z",
      "rate_open": 20778.659643141495,
      "rate_high": 21079.711518306594,
      "rate_low": 20668.77906704413,
      "rate_close": 20930.72934392462
    },
    {
      "time_period_start": "2022-10-29T16:00:00.0000000Z",
      "time_period_end": "2022-10-30T00:00:00.0000000Z",
      "time_open": "2022-10-29T16:00:00.0000000Z",
      "time_close": "2022-10-29T21:06:00.0000000Z",
      "rate_open": 20930.669900906658,
      "rate_high": 20977.722728556237,
      "rate_low": 20777.620082000885,
      "rate_close": 20857.136841332875
    }
  ]
}

const client = axios.create({
  baseURL: 'https://rest.coinapi.io/v1/',
  headers: {
    'X-CoinAPI-Key': API_KEY, // authorization
    'Accept': 'application/json',
  }
})

const repository = {
  async getTimeSeriesData(fiatCurrency, cryptoCurrency) {
    return testData


    const timeEnd = new Date()
    const timeStart = new Date()

    timeStart.setMonth(timeEnd.getMonth() - 1)

    return client.get(`/exchangerate/${cryptoCurrency}/${fiatCurrency}/history`, {
      params: {
        'period_id': '8HRS',
        'time_start': timeStart.toISOString(),
        'time_end': timeEnd.toISOString(),
      }
    })
  },
  async getAssets() {
    return client.get('/assets')
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
    const { data } = await repository.getTimeSeriesData(fiat, crypto)

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
  storage.set(fiat, crypto)
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