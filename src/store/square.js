import { getDetail, play } from '@/services/square'
const state = {
  available: true,
  id: -1,
  user: '',
  status: 0,
  activeIndex: -1,
  prizeIndex: 4,
  basic: {
    title: '会员抽奖赢好礼',
    description: `1."会员抽奖赢好礼"活动需要花费30积分参与。\n2.活动周期为每月第一周周一(以自然月起始周为准),同一个账户在活动当日可以参与若干次抽奖。\n3."会员抽奖赢好礼"活动所消耗的30积分,一旦参与无论是否中奖，所消耗的积分不予返还。\n4.参加抽奖活动后请留意中奖产品领取页面的礼券使用规则。优惠券的有效期与使用范围请详见规则页面为准。\n5.发现作弊别取等行为，将取消参与及中奖资格积分不子返还。`,
  },
  awards: [],
  images: [],
  cBg: `/uploads/20200616164739_8578.png`,
  pBg: `/uploads/20200616164754_3710.png`,
  dBg: `/uploads/20200616164805_3512.png`,
  startBox: `/uploads/20200616172745_9941.png`,
  startBoxOnHover: `/uploads/20200616172745_9941.png`,
  aBox: `/uploads/20200616172730_1571.png`,
  nBox: `/uploads/20200616172716_5869.png`,
  prize: `/uploads/20200616173443_6555.png`,
  showLoading: false,
}
const getters = {}
const actions = {
  async getActivity({ dispatch, commit, state, rootState }) {
    commit('updateShowLoading', true)
    const res = await getDetail(state.id)
    commit('updateActivity', res)
    commit('updateShowLoading', false)
  },
  async draw({ dispatch, commit, state, rootState }) {
    const res = await play({
      activity: state.id,
      user: state.user,
    })
    if (!res) {
      return res
    }
    commit('updatePrizeIndex', res.position)
    return true
  },
}
const mutations = {
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
    state.status = obj.status
    state.id = obj.id
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
    state.awards = obj.items.map((item) => ({
      name: item.name,
      type: 'coupon',
      template: 'template1',
      count: item.quantity,
      rate: item.win_rate,
      text1: item.win_text_1,
      text2: item.win_text_2,
    }))
    const imageCache1 = new Image()
    const imageCache2 = new Image()
    imageCache1.src = state.aBox
    imageCache2.src = state.startBoxOnHover
  },
  updateShowLoading(state, val) {
    state.showLoading = val
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
