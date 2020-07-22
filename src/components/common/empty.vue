<script>
import { mapMutations } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations('square', ['updateShowEmpty']),
  },
}
</script>

<template>
  <div id="empty">
    <div class="light"></div>
    <img src="@/assets/images/empty.png" />
    <div class="sorry">很遗憾！与奖品擦肩而过</div>
    <div class="control">
      <div class="control-again" @click="updateShowEmpty(false)">再来一次</div>
      <div class="control-back" @click="updateShowEmpty(false)">返回</div>
    </div>
  </div>
</template>

<style lang="scss">
#empty {
  position: relative;
  @include mask();
  text-align: center;
  .light {
    position: absolute;
    top: -15px;
    left: 112.5px;
    width: 150px;
    height: 200px;
    transform: perspective(150px) rotateX(10deg);
    // transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(242, 217, 92, 0.29) 0%, rgba(230, 211, 124, 0.07) 27%, rgba(208, 201, 183, 0) 100%);
  }
  img {
    display: block;
    margin-top: 100px;
    margin-left: 85px;
    width: 178px;
    height: auto;
    // transform: translateX(-50%);
  }
  .sorry {
    margin-top: 40px;
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
    &-again {
      @include btn();
      background: linear-gradient(270deg, rgba(210, 75, 68, 1) 0%, rgba(244, 131, 126, 1) 100%);
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
