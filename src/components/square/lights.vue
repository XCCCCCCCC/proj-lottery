<script>
import { mapState } from 'vuex'
export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      timer: null,
      toggle: true,
      boxs: new Array(24),
    }
  },
  computed: {
    ...mapState({
      square: state => state.square,
    }),
  },
  watch: {},
  mounted() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      this.timer = setInterval(() => {
        this.toggle = !this.toggle
      }, 1000)
    },
    returnBoxBg(index) {
      return {
        backgroundImage: `url(${index % 2 === 0 ? this.square.light : this.square.dark})`,
      }
    },
  },
}
</script>

<template>
  <div id="lights">
    <div
      v-show="toggle"
      v-for="(box, index) in boxs"
      :key="`1_${index}`"
      class="box"
      :class="`box__${index}`"
      :style="returnBoxBg(index)"
    ></div>
    <div
      v-show="!toggle"
      v-for="(box, index) in boxs"
      :key="`2__${index}`"
      class="box"
      :class="`box__${index}`"
      :style="returnBoxBg(index + 1)"
    ></div>
  </div>
</template>

<style lang="scss">
#lights {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  // border: 1px solid #fff;
  .box {
    position: absolute;
    width: 16px;
    height: 16px;
    background-size: cover;
  }
  .box__0 {
    top: 0;
    left: 0;
  }
  .box__1 {
    top: 0;
    left: 34px;
  }
  .box__2 {
    top: 0;
    left: 84px;
  }
  .box__3 {
    top: 0;
    left: 134px;
  }
  .box__4 {
    top: 0;
    left: 184px;
  }
  .box__5 {
    top: 0;
    left: 234px;
  }
  .box__6 {
    top: 0;
    right: 0;
  }
  .box__7 {
    top: calc(50px - 16px);
    right: 0;
  }
  .box__8 {
    top: calc(100px - 16px);
    right: 0;
  }
  .box__9 {
    top: calc(150px - 16px);
    right: 0;
  }
  .box__10 {
    top: calc(200px - 16px);
    right: 0;
  }
  .box__11 {
    top: calc(250px - 16px);
    right: 0;
  }
  .box__12 {
    left: (300px - 16px);
    bottom: 0;
  }
  .box__13 {
    left: calc(250px - 16px);
    bottom: 0;
  }
  .box__14 {
    left: calc(200px - 16px);
    bottom: 0;
  }
  .box__15 {
    left: calc(150px - 16px);
    bottom: 0;
  }
  .box__16 {
    left: calc(100px - 16px);
    bottom: 0;
  }
  .box__17 {
    left: calc(50px - 16px);
    bottom: 0;
  }
  .box__18 {
    left: 0;
    bottom: 0;
  }
  .box__19 {
    left: 0;
    bottom: calc(50px - 16px);
  }
  .box__20 {
    left: 0;
    bottom: calc(100px - 16px);
  }
  .box__21 {
    left: 0;
    bottom: calc(150px - 16px);
  }
  .box__22 {
    left: 0;
    bottom: calc(200px - 16px);
  }
  .box__23 {
    left: 0;
    bottom: calc(250px - 16px);
  }
}
</style>
