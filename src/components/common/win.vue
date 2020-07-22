<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      square: state => state.square,
    }),
    prize() {
      return this.square.awards[this.square.prizeIndex]
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('square', ['updateShowWin', 'updateShowPrize', 'updateCurPrize']),
    toDetail() {
      this.updateCurPrize(this.square.awards[this.square.prizeIndex])
      this.updateShowWin(false)
      this.updateShowPrize(true)
    },
  },
}
</script>

<template>
  <div id="win">
    <div class="congratulation">
      {{square.basic.winText}}
      <i class="el-icon-circle-close"></i>
    </div>
    <img src="@/assets/images/prize.png" />
    <div class="prize">{{prize.name}}</div>
    <div class="control">
      <div class="control-detail" @click="toDetail">查看奖品详情</div>
      <div class="control-put" @click="updateShowWin(false)">放入微信卡包</div>
      <div class="control-back" @click="updateShowWin(false)">返回</div>
    </div>
  </div>
</template>

<style lang="scss">
#win {
  @include mask();
  text-align: center;
  .congratulation {
    margin-top: 35px;
    @include text-size(24px, 33px);
    color: #ffbc16;
  }
  img {
    display: block;
    margin-top: 30px;
    margin-left: 50%;
    width: 178px;
    height: auto;
    transform: translateX(-50%);
  }
  .prize {
    margin-top: 30px;
    @include text-size(18px, 25px);
    color: #fff;
  }
  .control {
    margin: 70px auto 0;
    width: 270px;
    @mixin btn {
      @include text-size(16px, 44px);
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
    &-detail {
      @include btn();
      background: linear-gradient(270deg, rgba(210, 75, 68, 1) 0%, rgba(244, 131, 126, 1) 100%);
      color: #fff;
    }
    &-put {
      @include btn();
      background: linear-gradient(279deg, rgba(203, 138, 58, 1) 0%, rgba(248, 191, 97, 1) 100%);
      color: #fff;
    }
    &-back {
      @include btn();
      background: rgba(250, 250, 250, 0.9);
      color: #66666c;
    }
  }
}
</style>
