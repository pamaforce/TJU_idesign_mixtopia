<template>
  <div
    :class="'flex-nav' + (hoverState ? '' : ' hide-p')"
    v-if="notMobile"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="(item, i) in 9"
      :key="i"
      :class="
        'nav-item' + (activeItem === i || hoverItem === i ? ' active-item' : '')
      "
      @mouseenter="handleItemMouseEnter(i)"
      @mouseleave="handleItemMouseLeave"
      @click="toState(i)"
    >
      <img
        :src="
          require('../assets/' +
            i +
            '_' +
            (activeItem === i || hoverItem === i ? 1 : 0) +
            '.svg')
        "
      />
      <p>{{ $t("cate_" + i) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexNav",
  props: {
    notMobile: {
      type: Boolean,
      default: () => true,
    },
    state: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      timer: null,
      hoverState: false,
      activeItem: 0,
      hoverItem: -1,
    };
  },
  methods: {
    toState(i) {
      this.activeItem = i;
      this.$bus.$emit("clickState", i);
    },
    handleMouseEnter() {
      this.hoverState = true;
      clearTimeout(this.timer);
    },
    handleMouseLeave() {
      this.timer = setTimeout(() => {
        this.hoverState = false;
      }, 2000);
    },
    handleItemMouseEnter(i) {
      this.hoverItem = i;
    },
    handleItemMouseLeave() {
      this.hoverItem = -1;
    },
  },
  mounted() {
    this.$bus.$on("changeActiveItem", (i) => {
      this.activeItem = i;
    });
  },
};
</script>
<style scoped>
.flex-nav {
  position: fixed;
  bottom: 52px;
  left: 52px;
  width: max-content;
  z-index: 102;
}
.nav-item {
  display: flex;
  align-items: center;
  opacity: 0.8;
  mix-blend-mode: difference;
  cursor: pointer;
  margin-bottom: 12px;
}
.nav-item p {
  font-size: 20px;
  display: block;
  max-width: 200px;
  color: #ccc;
  font-weight: 200;
  transition: max-width, margin-left 0.3s;
  filter: invert(1);
  mix-blend-mode: difference;
}

.nav-item:hover p {
  margin-left: 10px;
}
.hide-p p {
  max-width: 0;
}
.nav-item img {
  width: 32px;
  height: 40px;
  margin-right: 8px;
  flex-shrink: 0;
}
.active-item p {
  font-weight: 700;
  color: #fff;
}
</style>
