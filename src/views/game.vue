<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      finished: true,
      timer: null,
      startTime: '',
      speed: 200,
      diff: 15,
      inStartBox: false,
      showPrize: false,
    }
  },
  computed: {
    ...mapState({
      available: (state) => state.square.available,
      activeIndex: (state) => state.square.activeIndex,
      prizeIndex: (state) => state.square.prizeIndex,
      square: (state) => state.square,
    }),
    prizeStyle() {
      return {
        backgroundImage: `url(${this.square.prize})`,
      }
    },
    aBoxStyle() {
      return {
        backgroundImage: `url(${this.square.aBox})`,
      }
    },
    nBoxStyle() {
      return {
        backgroundImage: `url(${this.square.nBox})`,
      }
    },
    dBoxStyle() {
      return {
        backgroundImage: `url(${this.square.dBg})`,
      }
    },
    startBoxStyle() {
      return {
        backgroundImage: `url(${this.inStartBox ? this.square.startBoxOnHover : this.square.startBox})`,
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
    showLoading: {
      get() {
        return this.square.showLoading
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
    this.getActivity()
  },
  methods: {
    ...mapMutations('square', ['updateActiveIndex', 'updateAvailable', 'updateId', 'updateUser', 'updateShowLoading']),
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
              self.showPrize = true
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
      if (!this.available) {
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
      this.showPrize = false

      this.speed = 200
      this.diff = 15
      // 获取

      this.getPrize()
    },
    async getPrize() {
      this.showLoading = true
      const res = await this.draw()
      if (!res) {
        return false
      }
      this.showLoading = false
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
  <div id="game">
    <van-overlay class="loading" :show="showLoading">
      <van-loading type="spinner" />
    </van-overlay>
    <img :src="square.cBg" />
    <img :src="square.pBg" />
    <div v-show="showPrize" class="prize-wrapper">
      <div class="prize-wrapper__tip" :style="prizeStyle" @click="done">
        <img :src="prize.path" />
        <!-- <img src="/uploads/20200528180708_6812.png" /> -->
      </div>
    </div>
    <div class="game-wrapper">
      <div class="game-wrapper__box has-margin" :style="activeIndex == 0 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[0]" :src="square.images[0].path" />
      </div>
      <div class="game-wrapper__box has-margin" :style="activeIndex == 1 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[1]" :src="square.images[1].path" />
      </div>
      <div class="game-wrapper__box has-margin" :style="activeIndex == 2 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[2]" :src="square.images[2].path" />
      </div>
      <div class="game-wrapper__box has-margin" :style="activeIndex == 7 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[7]" :src="square.images[7].path" />
      </div>
      <div class="game-wrapper__box has-margin" :style="startBoxStyle" @click="init"></div>
      <div class="game-wrapper__box has-margin" :style="activeIndex == 3 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[3]" :src="square.images[3].path" />
      </div>
      <div class="game-wrapper__box" :style="activeIndex == 6 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[6]" :src="square.images[6].path" />
      </div>
      <div class="game-wrapper__box" :style="activeIndex == 5 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[5]" :src="square.images[5].path" />
      </div>
      <div class="game-wrapper__box" :style="activeIndex == 4 ? aBoxStyle : nBoxStyle">
        <img v-if="square.images[4]" :src="square.images[4].path" />
      </div>
    </div>
    <div class="description-wrapper" :style="dBoxStyle">
      <p v-html="descriptionForHtml"></p>
    </div>
  </div>
</template>

<style lang="scss">
#game {
  position: relative;
  .loading {
    @include flex-center();
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  .prize-wrapper {
    @include flex-center(x);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding-top: 120px;
    background: rgba($color: #000000, $alpha: 0.6);
    &__tip {
      @include flex-center(y);
      box-sizing: border-box;
      width: 309px;
      height: 375px;
      background-size: cover;
      padding: 0 80px 0 80px;
      @include text-size(20px, 28px);
      font-weight: bold;
      color: #000;
      cursor: pointer;
    }
  }
  .game-wrapper {
    position: absolute;
    top: 310px;
    left: calc(50% - 156px);
    width: 312px;
    height: 312px;
    // 盒模型布局
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    .game-wrapper__box {
      position: abosulte;
      width: 101px;
      height: 101px;
      // background-color: #000;
      background-size: cover;
      overflow: hidden;
      &.has-margin {
        margin-bottom: 3px;
      }
      img {
        width: 101px;
        height: auto;
      }
    }
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
