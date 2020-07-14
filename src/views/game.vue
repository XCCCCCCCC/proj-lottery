<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import lights from '@/components/square/lights'
import win from '@/components/common/win'
import empty from '@/components/common/empty'
import prize from '@/components/common/prize'
import myPrizes from '@/components/common/myPrizes'
export default {
  name: '',
  components: { lights, win, empty, prize, myPrizes },
  props: [],
  data() {
    return {
      finished: true,
      timer: null,
      startTime: '',
      speed: 200,
      diff: 15,
      inStartBox: false,
    }
  },
  computed: {
    ...mapState({
      available: state => state.square.available,
      activeIndex: state => state.square.activeIndex,
      prizeIndex: state => state.square.prizeIndex,
      square: state => state.square,
    }),
    baseStyle() {
      return {
        backgroundImage: `url(${this.square.base})`,
      }
    },
    purseStyle() {
      return {
        top: `${((this.square.purseY / 375) * 100).toFixed(5)}vw`,
        left: `${((this.square.purseX / 375) * 100).toFixed(5)}vw`,
        'z-index': 6,
      }
    },
    bannerStyle() {
      return {
        width: `${((this.square.bannerW / 375) * 100).toFixed(5)}vw`,
        height: `${((this.square.bannerH / 375) * 100).toFixed(5)}vw`,
        top: `${((this.square.bannerY / 375) * 100).toFixed(5)}vw`,
        left: `${((this.square.bannerX / 375) * 100).toFixed(5)}vw`,
        'z-index': this.square.bannerZ,
      }
    },
    gameBaseStyle() {
      return {
        backgroundImage: `url(${this.square.gameBase})`,
        top: `${((this.square.playY / 375) * 100).toFixed(5)}vw`,
        left: `${((this.square.playX / 375) * 100).toFixed(5)}vw`,
        'z-index': this.square.playZ,
      }
    },
    awardBaseStyle() {
      return {
        backgroundImage: `url(${this.square.awardBase})`,
      }
    },
    prizeStyle() {
      return {
        backgroundImage: `url(${this.square.prize})`,
      }
    },
    startStyle() {
      return {
        backgroundImage: `url(${this.inStartBox ? this.square.start : this.square.startActive})`,
      }
    },
    descriptionForHtml() {
      const reg = new RegExp('\\n', 'g')
      return this.square.basic.description.replace(reg, '<br/>')
    },
    prize() {
      // console.log(this.square.awards[this.prizeIndex])
      return this.square.images[this.prizeIndex] || {}
      // return {}
    },
    showWin: {
      get() {
        return this.square.showWin
      },
      set(val) {
        this.updateShowWin(val)
      },
    },
    showEmpty: {
      get() {
        return this.square.showEmpty
      },
      set(val) {
        this.updateShowEmpty(val)
      },
    },
    showMyPrizes: {
      get() {
        return this.square.showMyPrizes
      },
      set(val) {
        this.updateShowMyPrizes(val)
      },
    },
    showPrize: {
      get() {
        return this.square.showPrize
      },
      set(val) {
        this.updateShowPrize(val)
      },
    },
    showLoading: {
      get() {
        return this.square.updateShowLoading
      },
      set(val) {
        this.updateShowLoading(val)
      },
    },
  },
  watch: {},
  mounted() {
    // if (!this.$route.query.id || !this.$route.query.user) {
    if (!this.$route.query.user) {
      this.updateAvailable(false)
      // this.$toast('活动异常')
      // return false
    }
    // this.updateId(this.$route.query.id)
    this.updateUser(this.$route.query.user)
    // this.getActivity()
  },
  methods: {
    ...mapMutations('square', ['updateActiveIndex', 'updateAvailable', 'updateId', 'updateUser', 'updateShowWin', 'updateShowEmpty', 'updateShowMyPrizes', 'updateShowPrize', 'updateShowLoading']),
    ...mapActions('square', ['getActivity', 'draw']),
    play() {
      const self = this
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        self.updateActiveIndex(self.activeIndex + 1)
        if (self.activeIndex > 7) {
          self.updateActiveIndex(0)
        }
        if (Date.now() - self.startTime > 2000) {
          self.speed += self.diff
          if (Date.now() - self.startTime > 4000 && this.activeIndex === this.prizeIndex) {
            clearTimeout(self.timer)
            setTimeout(() => {
              self.finished = true
              self.showWin = true
            }, 800)
            return true
          }
        } else {
          self.speed -= self.speed < 40 ? 0 : self.diff
        }
        self.play()
      }, this.speed)
    },
    init() {
      if (!this.available && !this.square.isTest) {
        this.$toast('缺少openid')
        return false
      }
      if (!this.finished) {
        return false
      }
      this.inStartBox = true
      setTimeout(() => {
        this.inStartBox = false
      }, 200)
      this.updateActiveIndex(-1)
      this.closeAllMask()

      this.speed = 200
      this.diff = 15
      // 获取
      this.getPrize()
    },
    closeAllMask() {
      this.showWin = false
      this.showEmpty = false
      this.showMyPrizes = false
      this.showprize = false
    },
    async getPrize() {
      if (!this.square.isTest) {
        const res = await this.draw()
        if (!res) {
          return false
        }
      }

      this.startTime = Date.now()
      this.finished = false
      this.play()
    },
    done() {
      this.$toast({ message: '领取后进入小程序我的优惠券查看', duration: 1500 })
      this.updateActiveIndex(-1)
      this.showPrize = false
    },
  },
}
</script>

<template>
  <div id="game" :style="baseStyle">
    <van-overlay class="loading" :show="showLoading">
      <van-loading type="spinner" />
    </van-overlay>
    <!-- <div v-show="showPrize" class="prize-wrapper">
      <div class="prize-wrapper__tip" :style="prizeStyle" @click="done">
    <img :src="prize.path" />-->
    <!-- <img src="/uploads/20200528180708_6812.png" /> -->
    <!-- </div>
    </div>-->
    <transition name="van-fade">
      <win v-show="showWin"></win>
    </transition>
    <transition name="van-fade">
      <empty v-show="showEmpty"></empty>
    </transition>
    <transition name="van-fade">
      <prize v-show="showPrize"></prize>
    </transition>
    <transition name="van-fade">
      <my-prizes v-show="showMyPrizes"></my-prizes>
    </transition>
    <!-- <transition name="van-fade">
      <my-prizes v-show="showMyPrizes"></my-prizes>
    </transition>-->
    <div class="purse-wrapper" :style="purseStyle">
      <img :src="square.purse" @click="updateShowMyPrizes(true)" />
    </div>
    <div class="banner-wrapper" :style="bannerStyle">
      <img :src="square.banner" />
    </div>
    <div class="game-wrapper" :style="gameBaseStyle">
      <lights></lights>
      <div class="game-wrapper__box has-margin" :style="awardBaseStyle">
        <img v-if="square.images[0]" :src="square.images[0].path" />
        <div v-show="!finished && activeIndex !== 0" class="mask"></div>
      </div>
      <div class="game-wrapper__box has-margin" :style="awardBaseStyle">
        <img v-if="square.images[1]" :src="square.images[1].path" />
        <div v-show="!finished && activeIndex !== 1" class="mask"></div>
      </div>
      <div class="game-wrapper__box has-margin" :style="awardBaseStyle">
        <img v-if="square.images[2]" :src="square.images[2].path" />
        <div v-show="!finished && activeIndex !== 2" class="mask"></div>
      </div>
      <div class="game-wrapper__box has-margin" :style="awardBaseStyle">
        <img v-if="square.images[7]" :src="square.images[7].path" />
        <div v-show="!finished && activeIndex !== 7" class="mask"></div>
      </div>
      <div class="game-wrapper__box has-margin" :style="startStyle" @click="init"></div>
      <div class="game-wrapper__box has-margin" :style="awardBaseStyle">
        <img v-if="square.images[3]" :src="square.images[3].path" />
        <div v-show="!finished && activeIndex !== 3" class="mask"></div>
      </div>
      <div class="game-wrapper__box" :style="awardBaseStyle">
        <img v-if="square.images[6]" :src="square.images[6].path" />
        <div v-show="!finished && activeIndex !== 6" class="mask"></div>
      </div>
      <div class="game-wrapper__box" :style="awardBaseStyle">
        <img v-if="square.images[5]" :src="square.images[5].path" />
        <div v-show="!finished && activeIndex !== 5" class="mask"></div>
      </div>
      <div class="game-wrapper__box" :style="awardBaseStyle">
        <img v-if="square.images[4]" :src="square.images[4].path" />
        <div v-show="!finished && activeIndex !== 4" class="mask"></div>
      </div>
    </div>
    <div v-show="square.basic.showParticipation" class="total">
      已有
      <span class="value">1</span>
      人参与
    </div>
    <div v-show="square.basic.showSurplus" class="my">
      您今天还有
      <span class="value">10</span>
      次机会
    </div>
    <div class="copyright">页面技术由 晶赞科技 提供</div>
    <!-- <div class="description-wrapper" :style="dBoxStyle">
      <p v-html="descriptionForHtml"></p>
    </div>-->
  </div>
</template>

<style lang="scss">
#game {
  position: relative;
  height: 100%;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .loading {
    @include flex-center();
  }
  // img {
  //   display: block;
  //   width: 100%;
  //   height: auto;
  // }
  // .prize-wrapper {
  //   @include flex-center(x);
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: 1;
  //   padding-top: 120px;
  //   background: rgba($color: #000000, $alpha: 0.6);
  //   &__tip {
  //     @include flex-center(y);
  //     box-sizing: border-box;
  //     width: 309px;
  //     height: 375px;
  //     background-size: cover;
  //     padding: 0 80px 0 80px;
  //     @include text-size(20px, 28px);
  //     font-weight: bold;
  //     color: #000;
  //     cursor: pointer;
  //   }
  // }
  .purse-wrapper {
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .banner-wrapper {
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .game-wrapper {
    box-sizing: border-box;
    position: absolute;
    padding: 24px;
    width: 300px;
    height: 300px;
    // 盒模型布局
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    background-size: 100% auto;
    background-repeat: no-repeat;
    .game-wrapper__box {
      position: relative;
      width: 80px;
      height: 80px;
      background-size: cover;
      overflow: hidden;
      border-radius: 8px;
      user-select: none;
      &.has-margin {
        margin-bottom: 6px;
      }
      .mask {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba($color: #000000, $alpha: 0.4);
      }
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: auto;
        user-select: none;
      }
    }
  }
  .total {
    position: absolute;
    width: 100%;
    bottom: 55px;
    text-align: center;
    @include text-size(14px, 28px);
    color: rgb(254, 149, 0);
    z-index: 5;
    .value {
      color: #fff;
    }
  }
  .my {
    position: absolute;
    width: 100%;
    bottom: 35px;
    text-align: center;
    @include text-size(14px, 28px);
    color: rgb(255, 226, 2);
    z-index: 5;
    .value {
      color: #fff;
    }
  }
  .copyright {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
    text-align: center;
    color: #fff;
    @include text-size(14px, 28px);
    z-index: 5;
  }
  .description-wrapper {
    position: relative;
    box-sizing: border-box;
    padding: 70px 20px 10px 20px;
    height: 295px;
    background-size: cover;
    text-align: left;
    @include text-size(12px, 24px);
    color: #cfc4af;
  }
}
</style>
