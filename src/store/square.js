import { getDetail, verify, play, getAmount, getPrizes } from '@/services/square'
import moment from 'moment'
const state = {
  isTest: false,
  available: true,
  id: -1,
  user: '',
  status: 0,
  activeIndex: -1,
  prizeIndex: 4,
  purseX: 291,
  purseY: 5,
  myX: 291,
  myY: 500,
  bannerX: 13,
  bannerY: 18,
  bannerW: 350,
  bannerH: 172,
  bannerZ: 4,
  playX: 38,
  playY: 200,
  playZ: 3,
  totalNormalColor: 'rgb(254, 149, 0, 1)',
  totalValueColor: 'rgb(255, 255, 255, 1)',
  lastNormalColor: 'rgb(255, 226, 2, 1)',
  lastValueColor: 'rgb(255, 255, 255, 1)',
  basic: {
    title: '会员抽奖赢好礼',
    description: `1."会员抽奖赢好礼"活动需要花费30积分参与。\n2.活动周期为每月第一周周一(以自然月起始周为准),同一个账户在活动当日可以参与若干次抽奖。\n3."会员抽奖赢好礼"活动所消耗的30积分,一旦参与无论是否中奖，所消耗的积分不予返还。\n4.参加抽奖活动后请留意中奖产品领取页面的礼券使用规则。优惠券的有效期与使用范围请详见规则页面为准。\n5.发现作弊别取等行为，将取消参与及中奖资格积分不子返还。`,
    timeRange: [
      moment().format('YYYY.MM.DD 00:00:00'),
      moment()
        .add(7, 'days')
        .format('YYYY.MM.DD 23:59:59'),
    ],
    showParticipation: 1,
    showSurplus: 1,
    winText: '恭喜！您中奖啦！',
  },
  rule: {
    total: 'free',
    max: 10,
    day: 100,
    cost: 30,
  },
  awards: [
    {
      isPrize: 0,
      name: '奖项1（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '饮品',
      text2: '买一赠一券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项2（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '100元',
      text2: '代金券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项3（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '蛋糕',
      text2: '75折券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项4（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '8元',
      text2: '代金券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项5（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '搪瓷杯',
      text2: '7折券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项6（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '买二赠一券',
      text2: '',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项7（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '挂耳包',
      text2: '一盒券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
    {
      isPrize: 1,
      name: '奖项8（示例）',
      type: 'coupon',
      template: 'template1',
      count: 1,
      rate: 10,
      text1: '5元',
      text2: '代金券',
      isOffline: 1,
      tip: '凭券联系现场工作人员兑奖',
      exchangeType: 'date',
      datetimeRange: [
        moment().format('YYYY.MM.DD 00:00'),
        moment()
          .add(7, 'days')
          .format('YYYY.MM.DD 23:59'),
      ],
      duration: '10',
      createType: 'system',
      validateType: 'scan',
      useType: 'all',
      useDays: [],
      phone: '',
      shouldKnow: '',
    },
  ],
  images: [
    {
      type: 0,
      path: `/uploads/20200528180708_6812.png`,
    },
    {
      type: 1,
      path: `/uploads/20200528180724_9998.png`,
    },
    {
      type: 2,
      path: `/uploads/20200528180731_6509.png`,
    },
    {
      type: 3,
      path: `/uploads/20200528180752_7823.png`,
    },
    {
      type: 4,
      path: `/uploads/20200528183730_2987.png`,
    },
    {
      type: 5,
      path: `/uploads/20200528180829_6152.png`,
    },
    {
      type: 6,
      path: `/uploads/20200528180839_4237.png`,
    },
    {
      type: 7,
      path: `/uploads/20200528180849_2464.png`,
    },
  ],
  cBg: `/uploads/20200616164739_8578.png`,
  pBg: `/uploads/20200616164754_3710.png`,
  dBg: `/uploads/20200616164805_3512.png`,
  startBox: `/uploads/20200616172745_9941.png`,
  startBoxOnHover: `/uploads/20200616172745_9941.png`,
  aBox: `/uploads/20200616172730_1571.png`,
  nBox: `/uploads/20200616172716_5869.png`,
  prize: `/uploads/20200616173443_6555.png`,
  // ** 新增配置
  base: '/uploads/20200702105539_8548.jpg',
  purse: '/uploads/20200715112313_1277.png',
  my: '/uploads/20200715114237_6367.png',
  banner: '/uploads/20200702105618_2481.png',
  gameBase: '/uploads/20200702105557_7551.png',
  awardBase: '/uploads/20200714142416_7674.png',
  start: '/uploads/20200702114849_5615.png',
  startActive: '/uploads/20200707115546_4821.png',
  light: '/uploads/20200702115919_2760.png',
  dark: '/uploads/20200702115942_5691.png',
  preview: '/uploads/20200709143155_7267.',
  purpose: '/uploads/20200710140158_2965.png',
  // ** prize
  curPrize: {
    isPrize: 0,
    name: '奖项1（示例）',
    type: 'coupon',
    template: 'template1',
    count: 1,
    rate: 10,
    text1: '饮品',
    text2: '买一赠一券',
    isOffline: 1,
    tip: '凭券联系现场工作人员兑奖',
    exchangeType: 'date',
    datetimeRange: [
      moment().format('YYYY.MM.DD 00:00'),
      moment()
        .add(7, 'days')
        .format('YYYY.MM.DD 23:59'),
    ],
    duration: '10',
    createType: 'system',
    validateType: 'scan',
    useType: 'all',
    useDays: [],
    phone: '',
    shouldKnow: '',
  },
  // ** extra
  has: 1,
  last: 1,
  // ** myPrizes
  myPrizes: [],
  showWin: false,
  showEmpty: false,
  showMyPrizes: false,
  showPrize: false,
  showExplication: false,
  showLoading: false,
}
const getters = {}
const actions = {
  async getActivity({ dispatch, commit, state, rootState }) {
    commit('updateShowLoading', true)
    const res = await getDetail(state.id)
    await dispatch('getExtra')
    await dispatch('getMyPrizes')
    commit('updateActivity', res)
    commit('updateShowLoading', false)
  },
  async draw({ dispatch, commit, state, rootState }) {
    const verifyObj = await verify({
      activity: state.id,
      user: state.user,
    })
    const res = await play({
      activity: state.id,
      user: state.user,
      ...verifyObj,
    })
    if (!res) {
      return res
    }
    commit('updatePrizeIndex', res.position)
    await dispatch('getExtra')
    await dispatch('getMyPrizes')
    return true
  },
  async getExtra({ dispatch, commit, state, rootState }) {
    const res = await getAmount({
      id: state.id,
    })
    if (!res) {
      return res
    }
    commit('updateAmount', res)
    return true
  },
  async getMyPrizes({ dispatch, commit, state, rootState }) {
    const res = await getPrizes({
      activity: state.id,
      user: state.user,
    })
    if (!res) {
      return res
    }
    commit('updateMyPrizes', res)
    return true
  },
}
const mutations = {
  updateIsTest(state, val) {
    state.isTest = Boolean(val)
  },
  updatePrizeIndex(state, val) {
    state.prizeIndex = val
  },
  updateAvailable(state, val) {
    state.available = val
  },
  updateId(state, val) {
    state.id = val
  },
  updateUser(state, val) {
    state.user = val
  },
  updateActiveIndex(state, val) {
    state.activeIndex = val
  },
  // 更新活动信息
  updateActivity(state, obj) {
    document.title = obj.title
    // todo 新增banner、play尺寸&位置功能，待补充
    if (!obj.template_config) {
      return false
    }
    const tempObj = JSON.parse(obj.template_config)
    // state = JSON.parse(obj.template_config)
    state.purseX = tempObj.purseX
    state.purseY = tempObj.purseY
    state.myX = tempObj.myX
    state.myY = tempObj.myY
    state.bannerX = tempObj.bannerX
    state.bannerY = tempObj.bannerY
    state.bannerW = tempObj.bannerW
    state.bannerH = tempObj.bannerH
    state.bannerZ = tempObj.bannerZ
    state.playX = tempObj.playX
    state.playY = tempObj.playY
    state.playZ = tempObj.playZ
    state.totalNormalColor = tempObj.totalNormalColor
    state.totalValueColor = tempObj.totalValueColor
    state.lastNormalColor = tempObj.lastNormalColor
    state.lastValueColor = tempObj.lastValueColor
    state.base = tempObj.base
    state.purse = tempObj.purse
    state.my = tempObj.my
    state.banner = tempObj.banner
    state.gameBase = tempObj.gameBase
    state.awardBase = tempObj.awardBase
    state.start = tempObj.start
    state.startActive = tempObj.startActive
    state.light = tempObj.light
    state.dark = tempObj.dark
    state.preview = tempObj.preview
    state.status = obj.status
    state.basic.title = obj.title
    state.basic.timeRange = [obj.from_datetime, obj.to_datetime]
    state.basic.description = obj.description
    // state.rule.total = obj.total_chance === -1 ? 'free' : 'limit'
    // state.rule.max = obj.total_chance !== -1 ? obj.total_chance : 0
    // state.rule.day = obj.chance_per_day
    // state.rule.cost = obj.point_cost
    // state.share.imageUrl = obj.share_img
    // state.share.summary = obj.share_title
    // state.share.content = obj.share_description
    state.images = obj.images
    state.awards = obj.redeem.map((award) => JSON.parse(award.config))
    const imageCache1 = new Image()
    imageCache1.src = state.startActive
  },
  updateShowWin(state, val) {
    state.showWin = val
  },
  updateShowEmpty(state, val) {
    state.showEmpty = val
  },
  updateShowMyPrizes(state, val) {
    state.showMyPrizes = val
  },
  updateShowPrize(state, val) {
    state.showPrize = val
  },
  updateShowExplication(state, val) {
    state.showExplication = val
  },
  updateShowLoading(state, val) {
    state.showLoading = val
  },
  updateCurPrize(state, obj) {
    state.curPrize = { ...obj }
  },
  updateAmount(state, { draw, win }) {
    state.has = draw
    state.last = 100
  },
  updateMyPrizes(state, arr) {
    state.myPrizes = arr.map((prize) => JSON.parse(prize.config))
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {},
}
