<template>
  <div :class="'header-outer' + (notMobile ? '' : ' m-header')">
    <div class="header noSelect">
      <template v-if="notMobile">
        <img
          src="../assets/logo.svg"
          class="logo"
          alt="logo"
          @dragstart.prevent
          @click="toHome"
        />
        <div class="nav">
          <div class="nav-item" @click="toRoute('/exhibition')">
            {{ $t("title_1") }}
            <div
              :class="
                'item-line' + ($route.path === '/exhibition' ? ' active' : '')
              "
            ></div>
          </div>
          <div class="nav-item" @click="toRoute('/graduate')">
            {{ $t("title_3") }}
            <div
              :class="
                'item-line' + ($route.path === '/graduate' ? ' active' : '')
              "
            ></div>
          </div>
          <div class="nav-item" @click="toRoute('/sponsor')">
            {{ $t("title_2") }}
            <div
              :class="
                'item-line' + ($route.path === '/sponsor' ? ' active' : '')
              "
            ></div>
          </div>
        </div>
        <img
          src="../assets/mixzone.gif"
          class="mixzone"
          alt="mixzone"
          @dragstart.prevent
          @click="toRoute('/mixzone')"
        />
        <div class="divider"></div>
        <span class="lang" @click="changeLang">{{
          $i18n.locale === "cn" ? "EN" : "中"
        }}</span>
        <img
          src="../assets/search.svg"
          class="search"
          alt="search"
          @dragstart.prevent
          @click="toRoute('/search')"
        />
      </template>
      <template v-else>
        <img
          src="../assets/logo.svg"
          class="logo"
          alt="logo"
          @dragstart.prevent
          @click="toHome"
        />
        <img
          src="../assets/back-arrow.svg"
          class="m-icon-back"
          alt="icon"
          @dragstart.prevent
          @click="goBack"
          v-if="$route.path !== '/'"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  props: ["notMobile"],
  data() {
    return {
      tabHover: false,
      tabHover_1: false,
      tabHover_2: false,
      tabHover_3: false,
      tabHover_4: false,
      searchStatue: false,
      hover: false,
      subHover: false,
      focus: false,
      searchInput: "",
      hideTemp: false,
      statue: 1,
      colorType: {
        50: {
          color: "#D7B98C",
        },
        53: {
          color: "#4175A5",
        },
        52: {
          color: "#68AFD4",
        },
        48: {
          color: "#2E895C",
        },
        49: {
          color: "#A7774A",
        },
        51: {
          color: "#971E23",
        },
      },
    };
  },
  methods: {
    toRoute(path) {
      this.$router.push(path);
    },
    changeSearch() {
      if (this.searchStatue) {
        if (this.searchInput) {
          this.toSearch();
        } else {
          document.body.style.height = "";
          document.body.style.overflow = "";
          document.body.style.position = "relative";
          this.searchStatue = false;
        }
      } else {
        if (!this.notMobile) {
          document.body.style.height = "100%";
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          this.searchStatue = true;
        }
      }
    },
    toAni() {
      window.open(
        "https://space.bilibili.com/584556583/channel/collectiondetail?sid=453897",
        "_blank"
      );
    },
    toGraduate() {
      this.$router.push("/graduate");
    },
    toSponsor() {
      this.$router.push("/sponsor");
    },
    toExhibition(category_id) {
      if (
        this.$route.params.category_id !== "" + category_id ||
        this.$route.params.id
      ) {
        this.$router.push("/exhibition/" + category_id);
        this.tabHover = false;
        this.tabHover_1 = false;
        this.tabHover_4 = false;
        this.hideTemp = true;
        setTimeout(() => {
          this.hideTemp = false;
        }, 1000);
      }
    },
    toHome() {
      if (this.$route.path !== "/") this.$router.push("/");
      this.$bus.$emit("clickState", 0);
    },
    goBack() {
      if (
        this.$route.params.id &&
        this.$route.params.category_id !== "undefined"
      ) {
        this.$router.push("/exhibition/" + this.$route.params.category_id);
      } else if (
        this.$route.params.category_id &&
        this.$route.params.category_id !== "undefined"
      ) {
        this.$router.push("/");
      } else if (
        this.$route.name === "Sponsor" ||
        this.$route.name === "Graduate"
      ) {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    },
    hoverOver() {
      setTimeout(() => {
        this.hover = false;
      }, 300);
    },
    subHoverOver() {
      setTimeout(() => {
        this.subHover = false;
      }, 300);
    },
    focusOver() {
      setTimeout(() => {
        this.focus = false;
      }, 300);
    },
    tabHoverOver() {
      setTimeout(() => {
        this.tabHover = false;
      }, 100);
    },
    tabHoverOver_1() {
      setTimeout(() => {
        this.tabHover_1 = false;
      }, 100);
    },
    tabHoverOver_2() {
      setTimeout(() => {
        this.tabHover_2 = false;
      }, 300);
    },
    tabHoverOver_3() {
      setTimeout(() => {
        this.tabHover_3 = false;
      }, 300);
    },
    tabHoverOver_4() {
      setTimeout(() => {
        this.tabHover_4 = false;
      }, 300);
    },
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === "cn" ? "en" : "cn";
      document.title =
        this.$i18n.locale === "cn"
          ? "2023·天津大学第九届设计年展·【融·容】"
          : "THE 9TH ANNUAL DESIGN EXHIBITION OF TIANJIN UNIVERSITY · MIXTOPIA";
    },
    toSearch() {
      if (this.searchInput) {
        this.$router.push("/result?keywords=" + this.searchInput);
        this.searchInput = "";
        this.changeSearch();
      }
    },
  },
};
</script>
<style scoped>
.header-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  overflow: unset;
  z-index: 101;
}
.header {
  position: relative;
  width: 100%;
  height: 85px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  overflow: unset;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  padding: 0 52px;
  align-items: center;
}
.header p,
.header span {
  display: inline-block;
}
.logo {
  height: 100%;
  cursor: pointer;
}
.mixzone {
  height: 100%;
  cursor: pointer;
}
.nav {
  flex-grow: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item {
  margin: 20px;
  font-size: 20px;
  color: #262626;
  cursor: pointer;
  position: relative;
  overflow: visible;
}
.item-line {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.5s all ease-in-out;
}
.nav-item:hover .item-line {
  width: 6px;
  height: 2px;
  background-color: #000000;
  margin-top: 8px;
  border-radius: 2px;
}
.active {
  width: 12px !important;
  height: 2px;
  background-color: #000000;
  margin-top: 8px;
  border-radius: 2px;
}
.divider {
  width: 2px;
  height: 48px;
  margin-left: 10px;
  margin-right: 30px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.06);
}
.title_CN {
  align-self: end;
  justify-self: start;
  padding-left: 10px;
  font-size: 24px;
  color: #353535;
  cursor: pointer;
}
.item_content {
  display: flex;
  align-items: center;
}
.headerBottom {
  display: grid;
  justify-items: start;
  align-items: start;
  grid-template-columns: 730px 580px 420px auto;
}
.title_EN {
  padding-left: 10px;
  font-size: 16px;
  padding-top: 5px;
  cursor: pointer;
  color: #000000;
}
.tabs {
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}
.tab {
  font-size: 20px;
  color: #000000;
  cursor: pointer;
}
.lang {
  width: 30px;
  font-size: 20px;
  color: #000000;
  justify-self: end;
  align-self: top;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.search {
  width: 35px;
  height: 35px;
  margin-left: 20px;
  cursor: pointer;
}
.icon-search {
  width: 18px;
  height: 18px;
  margin-left: 12px;
  cursor: pointer;
  justify-self: left;
  align-self: top;
  z-index: 102;
  vertical-align: middle;
}
.search-input {
  position: absolute;
  right: 25px;
  top: 60px;
  padding-top: 44px;
  padding-right: 20px;
  height: 100px;
  width: 300px;
  overflow-x: hidden;
  overflow-y: visible;
}
.search-input input {
  height: 45px;
  width: 100%;
  border: 1px solid #707070;
  outline: none;
  font-size: 20px;
  padding: 0 15px;
}
.mobile-input {
  width: 300px;
  height: 40px;
  outline: none;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 6px;
  margin-right: 20px;
  padding: 0 15px;
}
.search-input img {
  position: absolute;
  right: 35px;
  height: 18px;
  width: 18px;
  bottom: 25px;
  opacity: 0.5;
  cursor: pointer;
}
.widen-enter {
  width: 0;
}
.widen-enter-active {
  transition: all 0.5s ease-in-out;
}
.widen-enter-active input {
  padding: 0;
}
.widen-enter-to,
.widen-leave-from {
  width: 300px;
}
.widen-leave-active {
  transition: all 1s ease-in-out;
}
.widen-leave-active input {
  padding: 0;
}
.widen-leave-to {
  width: 0;
}
.mobile-widen-enter {
  width: 0;
}
.mobile-widen-enter-active {
  transition: all 0.5s ease-in-out;
}
.mobile-widen-enter-to,
.mobile-widen-leave-from {
  width: 300px;
}
.mobile-widen-leave-to {
  width: 0;
}
.tab-items {
  position: absolute;
  left: 0;
  top: 100px;
  height: 60px;
  width: 1920px;
  background: white;
  border-bottom: 1px solid #707070;
  display: grid;
  overflow-y: hidden;
  grid-template-columns: 860px auto;
}
.heighten-enter {
  height: 0;
}
.heighten-enter-active {
  transition: all 0.5s ease-in-out;
}
.heighten-enter-to,
.heighten-leave-from {
  height: 60px;
}
.heighten-leave-active {
  transition: all 0.7s ease-in-out;
}
.heighten-leave-to {
  height: 0;
}
.capsule {
  position: absolute;
  bottom: -2px;
  width: 20px;
  height: 10px;
  transition: all 0.5s ease;
}

.capsule-1 {
  left: 910px;
}
.capsule-2 {
  left: 1100px;
}
.capsule-3 {
  left: 1300px;
}
.subHeighten-enter {
  height: 0;
}
.subHeighten-enter-active {
  transition: all 0.5s ease-in-out;
}
.subHeighten-enter-to,
.subHeighten-leave-from {
  height: 10px;
}
.subHeighten-leave-active {
  transition: all 1s ease-in-out;
}
.subHeighten-leave-to {
  height: 0;
}
.item_type_1 {
  font-size: 22px;
  font-weight: 700;
  align-self: center;
  justify-self: center;
  min-width: 120px;
  text-align: center;
}
.cursor {
  cursor: pointer;
}
.item_type_2 {
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  white-space: pre-line;
  word-break: break-word;
  text-align: center;
  min-width: 40px;
  margin: 0 10px;
}
.item_type_3 {
  font-size: 22px;
  align-self: center;
  justify-self: center;
  color: #9d9c9c;
}
#wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}
.m-header {
  height: 42px;
}
.m-header .header {
  height: 42px;
  padding: 0;
}
.m-icon-back {
  width: 15.5px;
  height: 13.5px;
  cursor: pointer;
  margin-right: 32.5px;
}
</style>
