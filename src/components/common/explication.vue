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
    prizes() {
      return this.square.awards.filter(prize => prize.isPrize === 1)
    },
    images() {
      return this.square.images.filter((img, i) => this.square.awards[i].isPrize === 1)
    },
    descriptionForHtml() {
      const reg = new RegExp('\\n', 'g')
      return this.square.basic.description.replace(reg, '<br/>')
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('square', ['updateShowExplication']),
  },
}
</script>

<template>
  <div id="explication">
    <div class="explication-wrapper">
      <div class="explication-wrapper__title">
        活动规则
        <van-icon name="close" @click="updateShowExplication(false)" />
      </div>
      <div class="explication-wrapper__content">
        <div class="categroy">
          <div class="categroy-label">
            活动奖品
            <div class="categroy-label-bg"></div>
          </div>
        </div>
        <div class="prizes">
          <div v-for="(prize, index) in prizes" class="prizes-item" :key="index">
            <div class="prizes-item__image">
              <img :src="images[index].path" />
            </div>
            <div class="prizes-item__info">
              <div class="type">礼品</div>
              <div class="name">{{prize.name}}</div>
            </div>
          </div>
        </div>
        <div class="categroy">
          <div class="categroy-label">
            活动时间
            <div class="categroy-label-bg"></div>
          </div>
        </div>
        <div
          class="time-range"
        >{{square.basic.timeRange[0]}}&nbsp;至&nbsp;{{square.basic.timeRange[1]}}</div>
        <div class="categroy">
          <div class="categroy-label">
            活动规则
            <div class="categroy-label-bg"></div>
          </div>
        </div>
        <div class="rule">每人每日有{{square.rule.total === 'free' ? '不限' : square.rule.max}}次抽奖机会</div>
        <div class="categroy">
          <div class="categroy-label">
            活动说明
            <div class="categroy-label-bg"></div>
          </div>
        </div>
        <div class="description" v-html="descriptionForHtml"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#explication {
  @include mask();
  padding: 12px 18px 25px;
  .explication-wrapper {
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
      padding: 15px 0;
      text-align: left;
      overflow-y: auto;
      .categroy {
        padding: 0 10px;
        @include text-size(14px, 20px);
        color: rgba($color: #000000, $alpha: 0.85);
        &-label {
          position: relative;
          display: inline-block;
          &-bg {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 10px;
            background: linear-gradient(360deg, rgba(242, 106, 92, 1) 0%, rgba(183, 204, 208, 0) 100%);
            opacity: 0.7;
          }
        }
      }
      .prizes {
        margin-right: 10px;
        margin-bottom: 12px;
        padding: 12px 10px;
        height: 238px;
        border-bottom: 1px dashed #d8dde6;
        overflow-y: auto;
        &-item {
          display: flex;
          &:not(:first-child) {
            margin-top: 10px;
          }
          &__image {
            margin-right: 12px;
            width: 65px;
            height: 65px;
            border-radius: 4px;
            border: 1px solid rgba(216, 221, 230, 1);
            img {
              width: 100%;
              height: auto;
            }
          }
          &__info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 0;
            .type {
              @include text-size(16px, 22px);
              color: rgba($color: #000000, $alpha: 0.85);
            }
            .name {
              @include text-size(14px, 20px);
              color: rgba($color: #000000, $alpha: 0.65);
            }
          }
        }
      }

      .time-range,
      .rule,
      .description {
        margin-bottom: 12px;
        padding: 12px 10px;
        @include text-size(14px, 22px);
        border-bottom: 1px dashed #d8dde6;
      }
    }
  }
}
</style>
