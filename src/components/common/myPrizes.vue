<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      showEditBtn1: false,
      showEditBtn2: false,
      showEditBtn3: false,
      showEditBtn4: false,
    }
  },
  computed: {
    ...mapState({
      myPrizes: state => state.square.myPrizes,
    }),
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('square', ['updateShowMyPrizes', 'updateShowPrize', 'updateCurPrize']),
    toDetail(prize) {
      this.updateCurPrize(prize)
      this.updateShowMyPrizes(false)
      this.updateShowPrize(true)
    },
  },
}
</script>

<template>
  <div id="my-prizes">
    <div class="my-prizes-wrapper">
      <div class="my-prizes-wrapper__title">
        我的奖品
        <van-icon name="close" @click="updateShowMyPrizes(false)" />
      </div>
      <div class="my-prizes-wrapper__content">
        <div class="prize" v-for="prize in myPrizes" :key="prize.id" @click="toDetail(prize)">
          <div class="name">
            <span>{{prize.name}}</span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div class="circle left"></div>
          <div class="circle right"></div>
          <div class="divider"></div>
          <div class="limit">使用期限：{{prize.datetimeRange[0]}}&nbsp;至&nbsp;{{prize.datetimeRange[1]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#my-prizes {
  @include mask();
  padding: 12px 18px 25px;
  .my-prizes-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 4px;
    background-color: #fff;
    &__title {
      padding: 0 10px;
      height: 55px;
      @include text-size(20px, 55px);
      border-bottom: 2px solid #d8dde6;
      text-align: center;
      color: #2b2826;
      i {
        float: right;
        margin-top: 17px;
        color: rgba($color: #000000, $alpha: 0.45);
        @include text-size(20px, 20px);
        cursor: pointer;
      }
    }
    &__content {
      flex: 1;
      height: 0;
      margin: 15px 10px;
      overflow-x: hidden;
      overflow-y: auto;
      .prize {
        position: relative;
        margin-bottom: 12px;
        padding: 0 10px;
        border: 1px solid rgba(216, 221, 230, 1);
        box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        .name {
          @include flex-center(y);
          justify-content: space-between;
          @include text-size(16px, 68px);
          color: rgba($color: #000000, $alpha: 0.85);
          // border-radius: -10px;
        }
        .circle {
          position: absolute;
          top: 59px;
          width: 20px;
          height: 20px;
          background-color: #fff;
          border: 1px solid rgba(216, 221, 230, 1);
          border-radius: 10px;
          box-shadow: inset 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
          &.left {
            left: -10px;
          }
          &.right {
            right: -10px;
          }
        }

        .divider {
          border: 1px dashed #d8dde6;
        }
        .limit {
          @include text-size(12px, 60px);
          color: rgba($color: #000000, $alpha: 0.65);
        }
      }
    }
  }
}
</style>
