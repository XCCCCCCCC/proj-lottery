<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
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
    moment: moment,
    ...mapMutations('square', ['updateShowPrize']),
    returnUseDaysItem() {
      function returnDay(val) {
        switch (val) {
          case 1:
            return '周一'
          case 2:
            return '周二'
          case 3:
            return '周三'
          case 4:
            return '周四'
          case 5:
            return '周五'
          case 6:
            return '周六'
          case 7:
            return '周日'
        }
      }
      if (this.prize.useType === 'all') {
        return '全部时段'
      }
      if (!this.prize.useDays.length) {
        return ''
      }
      if (this.prize.useDays.length === 1) {
        return returnDay(this.prize.useDays[0])
      }
      return `${returnDay(this.prize.useDays[0])} 至 ${returnDay(this.prize.useDays[this.prize.useDays.length - 1])}`
    },
  },
}
</script>

<template>
  <div id="prize">
    <div class="prize-wrapper">
      <div class="prize-wrapper__title">
        奖品详情
        <van-icon name="close" @click="updateShowPrize(false)" />
      </div>
      <div class="prize-wrapper__content">
        <div class="prize-summary">
          <div class="prize-summary__title">{{prize.name}}</div>
          <div
            class="prize-summary__duration"
          >使用期限：{{prize.datetimeRange[0]}}&nbsp;至&nbsp;{{prize.datetimeRange[1]}}</div>
          <div class="prize-summary-code">
            <div class="prize-summary-code__code">优惠码：888888</div>
            <div class="prize-summary-code__copy-btn">复制</div>
          </div>
          <div class="prize-summary__btn">立即兑奖</div>
          <div class="prize-summary__tip">{{prize.tip}}</div>
        </div>
        <div class="prize-detail">
          <div class="category">优惠券详情</div>
          <div class="label-item">
            <span class="label">兑奖期限：</span>
            <span class="item">{{prize.datetimeRange[0]}}&nbsp;至&nbsp;{{prize.datetimeRange[1]}}</span>
          </div>
          <div class="label-item">
            <span class="label">可用时段：</span>
            <span class="item">{{returnUseDaysItem()}}</span>
          </div>
          <div class="label-item">
            <span class="label">使用须知：</span>
            <span class="item">{{prize.shouldKnow||'不填写则不显示'}}</span>
          </div>
        </div>
        <div class="prize-contact">
          <div class="prize-contact__phone">
            客服电话
            <span class="disabled">（未开启）</span>
          </div>
          <i class="el-icon-phone"></i>
        </div>
        <div class="prize-btn" @click="updateShowPrize(false)">放入微信卡包</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#prize {
  @include mask();
  padding: 12px 18px 25px;
  .prize-wrapper {
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
      .prize-summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 10px;
        border-bottom: 1px dashed #d8dde6;
        text-align: center;
        &__title {
          width: 100%;
          @include text-size(20px, 28px);
          font-weight: 500;
          color: #000;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
          outline: 1px dashed transparent;
          &:hover {
            outline: 1px dashed rgba($color: #d8dde6, $alpha: 1);
          }
        }
        &__duration {
          margin-top: 12px;
          width: 225px;
          @include text-size(12px, 18px);
          color: rgba($color: #000000, $alpha: 0.6);
        }
        &-code {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          width: 225px;
          &__code {
            @include text-size(18px, 25px);
            font-weight: 500;
            color: #d23e2f;
          }
          &__copy-btn {
            width: 68px;
            border: 1px solid #d8dde6;
            border-radius: 12px;
            @include text-size(12px, 23px);
            cursor: pointer;
          }
        }
        &__btn {
          margin-top: 12px;
          width: 272px;
          height: 44px;
          background: linear-gradient(270deg, rgba(210, 75, 68, 1) 0%, rgba(244, 131, 126, 1) 100%);
          box-shadow: 0px 2px 4px 2px rgba(131, 19, 7, 0.25), 0px 1px 0px 0px rgba(0, 0, 0, 0.25);
          border-radius: 22px;
          @include text-size(16px, 44px);
          color: #fff;
          cursor: pointer;
        }
        &__tip {
          margin-top: 12px;
          width: 100%;
          @include text-size(12px, 16px);
          color: rgba($color: #000000, $alpha: 0.6);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .prize-detail {
        display: flex;
        flex-direction: column;
        padding: 15px 10px;
        border-bottom: 1px dashed #d8dde6;
        .categroy {
          @include text-size(14px, 20px);
          color: rgba($color: #000000, $alpha: 0.85);
        }
        .label-item {
          margin-top: 12px;
          .label {
            @include text-size(12px, 20px);
            color: rgba($color: #000000, $alpha: 0.65);
          }
          .item {
            @include text-size(14px, 20px);
            color: rgba($color: #000000, $alpha: 0.85);
          }
        }
      }
      .prize-contact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding: 15px 10px;
        border-bottom: 1px dashed #d8dde6;
        &__phone {
          @include text-size(14px, 20px);
          color: rgba($color: #000000, $alpha: 0.85);
          .disabled {
            color: rgba($color: #000000, $alpha: 0.4);
          }
        }
        .el-icon-phone {
          @include text-size(20px, 20px);
          color: #d23e2f;
        }
      }
      .prize-btn {
        width: 270px;
        margin: 0 auto;
        border: 1px solid rgba(216, 221, 230, 1);
        border-radius: 22px;
        @include text-size(16px, 42px);
        color: rgba($color: #000000, $alpha: 0.65);
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
