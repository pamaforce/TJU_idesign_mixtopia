<template>
  <div :class="'home' + (notMobile ? '' : ' m-home')">
    <template v-if="notMobile">
      <div
        id="scrolly-video"
        style="position: fixed; top: 0; width: 100%"
      ></div>
      <img
        :src="
          type == '2'
            ? require('../assets/t1-w.svg')
            : require('../assets/t1.svg')
        "
        class="p0 noSelect"
        @dragstart.prevent
        :style="
          'transform: translate3d(0, ' +
          this.top0 +
          'px, 0);' +
          (this.top0 == 0
            ? ''
            : 'opacity:' + (1 + this.top0 / 100) + ' !important;')
        "
      />
      <img
        :src="
          type == '2'
            ? require('../assets/t2-w.svg')
            : require('../assets/t2.svg')
        "
        class="p1 noSelect"
        @dragstart.prevent
        :style="
          'transform: translate3d(0, ' +
          this.top1 +
          'px, 0);' +
          (this.top1 == 0
            ? ''
            : 'opacity:' + (1 + this.top1 / 100) + ' !important;')
        "
      />
      <p
        class="p2"
        :style="
          'transform: translate3d(0, ' +
          this.top2 +
          'px, 0);' +
          (this.top2 == 0
            ? ''
            : 'opacity:' + (1 + this.top2 / 100) + ' !important;') +
          (type == '2' ? 'color:white' : '')
        "
      >
        The 9th
      </p>
      <p
        class="p3"
        :style="
          'transform: translate3d(0, ' +
          this.top3 +
          'px, 0);' +
          (this.top3 == 0
            ? ''
            : 'opacity:' + (1 + this.top3 / 100) + ' !important;') +
          (type == '2' ? 'color:white' : '')
        "
      >
        Annual Design
      </p>
      <p
        class="p4"
        :style="
          'transform: translate3d(0, ' +
          this.top4 +
          'px, 0);' +
          (this.top4 == 0
            ? ''
            : 'opacity:' + (1 + this.top4 / 100) + ' !important;') +
          (type == '2' ? 'color:white' : '')
        "
      >
        Exhibition of
      </p>
      <p
        class="p5"
        :style="
          'transform: translate3d(0, ' +
          this.top5 +
          'px, 0);' +
          (this.top5 == 0
            ? ''
            : 'opacity:' + (1 + this.top5 / 100) + ' !important;') +
          (type == '2' ? 'color:white' : '')
        "
      >
        Tianjin
      </p>
      <p
        class="p6"
        :style="
          'transform: translate3d(0, ' +
          this.top6 +
          'px, 0);' +
          (this.top6 == 0
            ? ''
            : 'opacity:' + (1 + this.top6 / 100) + ' !important;') +
          (type == '2' ? 'color:white' : '')
        "
      >
        University
      </p>
      <p
        class="p7"
        :style="
          'transform: translate3d(0, ' +
          this.top7 +
          'px, 0);' +
          (this.top7 == 0
            ? ''
            : 'opacity:' + (1 + this.top7 / 100) + ' !important')
        "
      >
        融·容
      </p>
      <p
        class="p8"
        :style="
          'transform: translate3d(0, ' +
          this.top8 +
          'px, 0);' +
          (this.top8 == 0
            ? ''
            : 'opacity:' + (1 + this.top8 / 100) + ' !important')
        "
      >
        Mixtopia
      </p>
      <img
        class="img1"
        :style="
          'transform: translate3d(0, ' +
          this.top9 +
          'px, 0);opacity:' +
          (-this.top9 / 100 + 1)
        "
        src="../assets/arrow-down.svg"
      />
      <transition name="show">
        <p
          v-if="show2"
          class="p10"
          :style="
            'margin-top:' + moreTop + 'px;' + (type == '2' ? 'color:white' : '')
          "
        >
          {{ $t("t_1") }}
        </p>
      </transition>
      <transition name="show-2">
        <p
          v-if="show2"
          class="p11"
          :style="
            'margin-top:' + moreTop + 'px;' + (type == '2' ? 'color:white' : '')
          "
        >
          {{ $t("t_2") }}
        </p>
      </transition>
      <transition name="show-3">
        <p
          v-if="show2"
          class="p12"
          :style="
            'margin-top:' + moreTop + 'px;' + (type == '2' ? 'color:white' : '')
          "
        >
          {{ $t("t_3") }}
        </p>
      </transition>
      <transition name="show-4">
        <p
          v-if="show2"
          class="p13"
          :style="
            'margin-top:' + moreTop + 'px;' + (type == '2' ? 'color:white' : '')
          "
        >
          {{ $t("t_4") }}
        </p>
      </transition>
      <transition name="show-5">
        <img
          v-if="show2"
          class="img2"
          :src="
            type == '2'
              ? require('../assets/enter-exhibition-white.svg')
              : require('../assets/enter-exhibition.svg')
          "
          :style="'margin-top:' + moreTop + 'px'"
          @click="toExhibition"
        />
      </transition>
      <div class="arrow-left">
        <img src="../assets/arrow-left.svg" />
      </div>
      <video
        src="../assets/mixzone.mp4"
        class="mixzone-video"
        @click="toMixzone"
        autoplay
        muted
        loop
      ></video>
      <div class="text-left">Mixzone</div>
      <div class="footer" :style="'bottom:' + footerTop + 'px'" ref="footer">
        <div class="links">
          <div class="specialGird-1 noSelect">相关网站</div>
          <div class="specialGird-2 noSelect">
            <a href="http://www.tju.edu.cn/" target="_blank">天津大学</a>
            <div>
              <a
                href="http://me.tju.edu.cn/"
                target="_blank"
                style="margin-right: 0"
                >机械工程学院</a
              >·<a href="http://idesign.tju.edu.cn/" target="_blank"
                >工业设计</a
              >
            </div>
            <a href="http://arch.tju.edu.cn/" target="_blank">建筑学院</a>
            <a href="http://cic.tju.edu.cn/" target="_blank">智能与计算学部</a>
            <a
              href="javascript:void(0)"
              @mouseover="qrHover = true"
              @mouseout="qrHover = false"
              >宣怀学院</a
            >
          </div>
          <div class="specialGird-6 noSelect">历届年展</div>
          <div class="specialGird-2 specialGird-7 noSelect">
            <a href="http://idesign.tju.edu.cn/marseum" target="_blank"
              >2022·第八届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions2021/index/index.html"
              target="_blank"
              >2021·第七届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions/index/index.html"
              target="_blank"
              >2020·第六届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/5.html"
              target="_blank"
              >2019·第五届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/4.html"
              target="_blank"
              >2018·第四届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/3.html"
              target="_blank"
              >2017·第三届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/2.html"
              target="_blank"
              >2016·第二届</a
            ><a
              href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/1.html"
              target="_blank"
              >2015·第一届</a
            >
          </div>
          <div class="specialGird-3 noSelect">关于我们</div>
          <div class="specialGird-4">
            地址 / 中国·天津市津南区雅观路135号北洋园校区35教学楼
          </div>
          <div class="specialGird-5"></div>
          <div class="specialGird-4">电话 / 022-27402172</div>
          <div class="specialGird-4">邮箱 / idesign@tju.edu.cn</div>
          <div class="specialGird-4">邮编 / 300354</div>
        </div>
        <img
          src="../assets/qrcode.webp"
          class="QR-code noSelect"
          alt="QRCode"
          v-show="qrHover"
          @dragstart.prevent
        />
        <p class="copyright noSelect">
          © 2023 天津大学机械工程学院机械工程系工业设计专业 版权所有
        </p>
      </div>
      <video
        v-if="isLoading"
        src="../assets/loading.mp4"
        class="loading"
        autoplay
        loop
        muted
        @touchmove.prevent
        @mousewheel.prevent
      />
    </template>
    <template v-else>
      <img
        src="../assets/layer12.svg"
        :class="
          'layer-img layer-12' +
          (scrollProgress >= (cardState ? 54 : 99) ? ' active-layer-12' : '')
        "
      />
      <img
        src="../assets/layer11.svg"
        :class="
          'layer-img layer-11' +
          (scrollProgress >= (cardState ? 45 : 90) ? ' active-layer-11' : '')
        "
      />
      <img
        src="../assets/layer10.svg"
        :class="
          'layer-img layer-10' +
          (scrollProgress >= (cardState ? 36 : 81) ? ' active-layer-10' : '')
        "
      />
      <img
        src="../assets/layer9.svg"
        :class="
          'layer-img layer-9' +
          (scrollProgress >= (cardState ? 27 : 72) ? ' active-layer-9' : '')
        "
      />
      <img
        src="../assets/layer8.svg"
        :class="
          'layer-img layer-8' +
          (scrollProgress >= (cardState ? 18 : 63) ? ' active-layer-8' : '')
        "
      />
      <img
        src="../assets/layer7.svg"
        :class="
          'layer-img layer-7' +
          (scrollProgress >= (cardState ? 9 : 54) ? ' active-layer-7' : '')
        "
      />
      <img
        src="../assets/layer6.svg"
        :class="
          'layer-img layer-6' +
          (scrollProgress >= (cardState ? 0 : 45) ? ' active-layer-6' : '')
        "
      />
      <img
        src="../assets/layer5.svg"
        :class="
          'layer-img layer-5' +
          (scrollProgress >= (cardState ? 0 : 36) ? ' active-layer-5' : '')
        "
      />
      <img
        src="../assets/layer4.svg"
        :class="
          'layer-img layer-4' +
          (scrollProgress >= (cardState ? 0 : 27) ? ' active-layer-4' : '')
        "
      />
      <img
        src="../assets/layer3.svg"
        :class="
          'layer-img layer-3' +
          (scrollProgress >= (cardState ? 0 : 18) ? ' active-layer-3' : '')
        "
      />
      <img
        src="../assets/layer2.svg"
        :class="
          'layer-img layer-2' +
          (scrollProgress >= (cardState ? 0 : 9) ? ' active-layer-2' : '')
        "
      />
      <img src="../assets/layer1.svg" class="layer-img layer-1" />

      <div
        class="m-glass"
        :style="{
          bottom:
            Math.min(cardState ? 0 : 12.5, scrollProgress / 4 - 12.5) + 'rem',
        }"
      >
        <img src="../assets/g4.webp" class="m-glass-img" />
        <img
          src="../assets/intro-m.svg"
          class="m-intro-img"
          v-if="!cardState"
        />
        <div v-if="cardState" class="m-menu">
          <div class="m-top-line">
            <p @click="changeSelect(0)">卷首语</p>
            <p @click="changeSelect(1)">展厅</p>
            <p @click="changeSelect(2)">卷尾语</p>
          </div>
          <div
            class="m-capsule"
            :style="{
              left: select === 0 ? '16.67%' : select === 1 ? '50%' : '83.33%',
            }"
          ></div>
          <div class="m-menu-content">
            <template v-if="select === 0">
              <img
                :src="
                  lang === 'cn'
                    ? require('../assets/zh-en.svg')
                    : require('../assets/en-zh.svg')
                "
                @click="switchLang"
                class="m-menu-icon"
              />
              <img
                :src="
                  lang === 'cn'
                    ? require('../assets/zh1.svg')
                    : require('../assets/en1.svg')
                "
                class="m-menu-text"
              />
            </template>
            <template v-else-if="select === 1">
              <div class="scroll-list-container">
                <div class="scroll-list" ref="scrollList" @scroll="onScroll">
                  <img
                    v-for="i in 7"
                    :key="i"
                    class="list-item"
                    :src="require(`../assets/${i}.svg`)"
                    :style="getItemStyle(i - 1)"
                    @click="clickItem(i - 1)"
                  />
                  <div class="scroll-space"></div>
                </div>
              </div>
              <div class="m-capsule-current"></div>
            </template>
            <template v-else-if="select === 2">
              <img
                :src="
                  lang === 'cn'
                    ? require('../assets/zh-en.svg')
                    : require('../assets/en-zh.svg')
                "
                @click="switchLang"
                class="m-menu-icon"
              />
              <img
                :src="
                  lang === 'cn'
                    ? require('../assets/zh2.svg')
                    : require('../assets/en2.svg')
                "
                class="m-menu-text"
              />
            </template>
          </div>
          <div class="m-bottom-line">
            <div @click="toPath('/sponsor')">工作组</div>
            <img src="../assets/m-id-card-icon.svg" />
            <div @click="toPath('/graduate')">毕业生</div>
          </div>
        </div>
        <transition mode="out-in" name="fade">
          <img
            src="../assets/arrow-m.svg"
            class="m-arrow-img"
            v-if="initState && !cardState"
          />
        </transition>
      </div>
    </template>
  </div>
</template>

<script>
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.js";
export default {
  name: "Home",
  props: ["notMobile"],
  data() {
    return {
      items: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
      ],
      activeIndex: 4, // 设置初始时的活动项索引
      show2: false,
      top0: 0,
      top1: 0,
      top2: 0,
      top3: 0,
      top4: 0,
      top5: 0,
      top6: 0,
      top7: 0,
      top8: 0,
      top9: 0,
      top10: 0,
      top11: 0,
      top12: 0,
      top13: 0,
      top14: 0,
      moreTop: 0,
      select: 1,
      footerTop: -400,
      qrHover: false,
      type: 4,
      isLoading: true,
      initState: false,
      cardState: false,
      scrollProgress: 0,
      selectedImage: 4,
      scrollTimeout: null,
      idMap: [58, 59, 60, 63, 64, 62, 61],
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  activated() {
    if (this.select === 1 && this.cardState) {
      this.$nextTick(() => {
        this.scrollToCenter(this.activeIndex, true);
      });
    }
  },
  methods: {
    clickItem(val) {
      if (val === this.activeIndex) {
        this.$router.push("/exhibition/" + this.idMap[val]);
      } else this.scrollToCenter(val);
    },
    changeSelect(val) {
      this.select = val;
      if (val === 1) {
        this.$nextTick(() => {
          this.scrollToCenter(4, true);
        });
      }
    },
    getItemStyle(index) {
      const distance = Math.abs(index - this.activeIndex);
      const scale = 1.5 - distance * 0.25;
      return {
        transform: `scale(${scale})`,
      };
    },
    scrollToCenter(index, auto = false) {
      this.activeIndex = index;
      const container = this.$refs.scrollList;
      const targetElement = container.children[index];
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const scrollLeft =
        targetRect.left -
        containerRect.left +
        container.scrollLeft -
        (containerRect.width - targetRect.width) / 2;
      if (!auto) {
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      } else {
        container.scrollTo({
          left: scrollLeft,
        });
      }
    },
    onScroll(event) {
      clearTimeout(this.scrollTimeout);
      const container = event.target;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let minDistance = Infinity;
      let index = 0;
      Array.from(container.children).forEach((element, i) => {
        const elementRect = element.getBoundingClientRect();
        const elementCenter = elementRect.left + elementRect.width / 2;
        const distance = Math.abs(elementCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          index = i;
        }
      });
      this.activeIndex = index;
      this.scrollTimeout = setTimeout(() => {
        this.scrollToCenter(index);
      }, 200);
    },
    handleScroll(top) {
      let percent = top / window.innerHeight;
      if (percent > 1.75) {
        this.show1 = false;
        this.show2 = true;
      } else {
        this.show1 = true;
        this.show2 = false;
      }
      let footerHeight = this.$refs.footer.offsetHeight;
      let tempTop = Math.max(
        -footerHeight,
        Math.min(0, (-footerHeight * (percent * 100 - 275)) / 0.9)
      );
      this.moreTop = Math.max(-footerHeight / 1.4, tempTop);
      this.footerTop = -tempTop - footerHeight;
      this.top0 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 20)) / 0.3)
      );
      this.top1 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 40)) / 0.3)
      );
      this.top2 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 60)) / 0.3)
      );
      this.top3 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 75)) / 0.3)
      );
      this.top4 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 90)) / 0.3)
      );
      this.top5 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 105)) / 0.3)
      );
      this.top6 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 120)) / 0.3)
      );
      this.top7 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 140)) / 0.3)
      );
      this.top8 = Math.max(
        -100,
        Math.min(0, (-1 * (percent * 100 - 150)) / 0.3)
      );
      this.top9 = Math.max(0, Math.min(100, (percent * 100 - 30) / 0.4));
    },
    toPath(val) {
      this.$router.push(val);
    },
    toMixzone() {
      this.$router.push("/mixzone");
    },
    toExhibition() {
      this.$router.push("/exhibition");
    },
    switchLang() {
      this.$i18n.locale = this.$i18n.locale === "cn" ? "en" : "cn";
      document.title =
        this.$i18n.locale === "cn"
          ? "2023·天津大学第九届设计年展·【融·容】"
          : "THE 9TH ANNUAL DESIGN EXHIBITION OF TIANJIN UNIVERSITY · MIXTOPIA";
    },
  },
  watch: {},
  mounted() {
    if (this.notMobile) {
      let type = this.$route.query.type;
      if (!type) type = Math.floor(Math.random() * 7) + 1;
      this.type = type;
      this.isLoading = true;
      const video = document.createElement("video");
      video.src = require("../assets/video-" + type + ".mp4");
      video.addEventListener("canplaythrough", () => {
        new ScrollyVideo({
          scrollyVideoContainer: "scrolly-video",
          src: video.src,
          sticky: false,
        });
        this.isLoading = false;
        video.remove();
      });
      window.addEventListener("scroll", () => {
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        this.handleScroll(scrollTop);
      });
    } else {
      window.addEventListener("scroll", () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        this.scrollProgress = Math.round(progress);
        if (this.scrollProgress > 90) {
          this.initState = true;
        }
        if (this.initState && this.scrollProgress < 5) {
          this.cardState = true;
          this.$nextTick(() => {
            this.scrollToCenter(4, true);
          });
        }
      });
    }
  },
};
</script>
<style scoped>
.home {
  width: 1920px;
  height: 400vh;
  background-color: #e4c9da;
}
#srcolly-video video,
#srcolly-video canvas {
  width: 100%;
}
.p0,
.p1,
.p2,
.p3,
.p4,
.p5,
.p6,
.p7,
.p8,
.p10,
.p11,
.p12,
.p13,
.p14 {
  position: fixed;
  left: calc(50% + 180px);
  transition: all 1.3s cubic-bezier(0.16, 1.08, 0.38, 0.98);
  transform: translate3d(0, -100px, 0);
  opacity: 0;
  margin-top: -150px;
  color: #262626;
}
.p0 {
  top: 230px;
  left: unset;
  right: 150px;
  height: 54px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.05s 1 forwards;
}
.p1 {
  top: 290px;
  left: unset;
  right: 150px;
  height: 64px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.05s 1 forwards;
}
.p2,
.p3,
.p4,
.p5,
.p6 {
  left: unset;
  right: 150px;
  font-weight: 300;
  font-size: 32px;
  letter-spacing: 0.16em;
}
.p2 {
  top: 400px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.35s 1 forwards;
}
.p3 {
  top: 440px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.75s 1 forwards;
}
.p4 {
  top: 480px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.95s 1 forwards;
}
.p5 {
  top: 520px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 1.15s 1 forwards;
}
.p6 {
  top: 560px;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 1.35s 1 forwards;
}
.p7 {
  left: unset;
  right: 150px;
  top: 640px;
  font-weight: 500;
  font-size: 32px;
  letter-spacing: 0.24em;
  color: #e2730e;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 1.6s 1 forwards;
}
.p8 {
  left: unset;
  right: 150px;
  top: 680px;
  font-weight: 200;
  font-size: 32px;
  letter-spacing: 0.24em;
  color: #2ea398;
  animation: show 1s cubic-bezier(0.16, 1.08, 0.38, 0.98) 1.7s 1 forwards;
}
.p10,
.p11,
.p12,
.p13 {
  width: 600px;
  white-space: unset;
  font-weight: 300;
  font-size: 24px;
  line-height: 40px;
  color: #262626;
  margin-top: 0;
  opacity: 1;
  transform: translate3d(0, 0px, 0);
}
.p10 {
  top: 260px;
}
.p11 {
  top: 330px;
}
.p12 {
  top: 400px;
}
.p13 {
  top: 600px;
  font-weight: 500;
  font-size: 32px;
}
.img1 {
  width: 160px;
  position: fixed;
  bottom: 60px;
  right: 400px;
  transition: all 1.3s cubic-bezier(0.16, 1.08, 0.38, 0.98);
  animation: up-down 2s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.25s infinite;
}
.img2 {
  width: 130px;
  position: fixed;
  top: 700px;
  right: 180px;
  cursor: pointer;
  transition: all 1.3s cubic-bezier(0.16, 1.08, 0.38, 0.98);
}
.show-enter-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
}
.show-leave-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.8s;
}
.show-enter,
.show-leave-to {
  opacity: 0;
  transform: translate3d(0, -100px, 0);
}
.show-2-enter-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.2s;
}
.show-2-leave-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.6s;
}
.show-2-enter,
.show-2-leave-to {
  opacity: 0;
  transform: translate3d(0, -100px, 0);
}
.show-3-enter-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.4s;
}
.show-3-leave-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.4s;
}
.show-3-enter,
.show-3-leave-to {
  opacity: 0;
  transform: translate3d(0, -100px, 0);
}
.show-4-enter-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.8s;
}
.show-4-leave-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0.1s;
}
.show-4-enter,
.show-4-leave-to {
  opacity: 0;
  transform: translate3d(0, -100px, 0);
}
.show-5-enter-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98) 1s;
}
.show-5-leave-active {
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
}
.show-5-enter,
.show-5-leave-to {
  opacity: 0;
  transform: translate3d(-120px, 0px, 0);
}
.mixzone-video {
  position: fixed;
  width: 100%;
  right: 100%;
  cursor: pointer;
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
}
.text-left {
  position: fixed;
  width: 90px;
  height: 100vh;
  left: -90px;
  writing-mode: vertical-rl;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: 0.12em;
  pointer-events: none;
  cursor: pointer;
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
}
.arrow-left {
  position: fixed;
  width: 90px;
  height: 100vh;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow-left img {
  width: 40px;
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
  animation: left-right 2s cubic-bezier(0.16, 1.08, 0.38, 0.98) 0s infinite;
}
.arrow-left:hover + .mixzone-video {
  right: calc(100% - 90px);
}
.arrow-left:hover + .mixzone-video + .text-left {
  left: 0px;
}
.mixzone-video:hover {
  right: calc(100% - 90px);
}
.mixzone-video:hover + .text-left {
  left: 0px;
}
.footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 460px;
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
  background: rgba(255, 255, 255, 0.36);
  box-shadow: inset -32px 32px 32px rgba(255, 255, 255, 0.158);
  backdrop-filter: blur(16px);
  padding: 0 260px;
  overflow: visible;
}
.sub-footer-icon {
  position: absolute;
  width: 285px;
  height: 50px;
  top: -25px;
  right: 150px;
  background-color: white;
}
.links {
  display: grid;
  grid-template-columns: 280px auto;
  grid-template-rows: 90px auto auto auto auto auto;
  font-size: 22px;
  color: #262626;
}
.links a {
  text-decoration: none;
  font-size: 22px;
  color: #262626;
  margin-right: 40px;
  font-weight: 300;
}
.links a:hover {
  text-decoration: underline;
}
.specialGird-1 {
  align-self: end;
  justify-self: center;
}
.specialGird-2 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
}
.specialGird-6 {
  align-self: flex-start;
  justify-self: center;
  margin-top: 24px;
}
.specialGird-7 a {
  margin-top: 24px;
}
.specialGird-3 {
  align-self: end;
  justify-self: center;
  margin-top: 24px;
}
.specialGird-4 {
  justify-self: start;
  align-self: end;
  color: #262626;
  font-weight: 300;
  margin-top: 24px;
}
.specialGird-5 {
  grid-row: 4 / 7;
}
.QR-code {
  position: absolute;
  top: -150px;
  right: 510px;
  width: 200px;
  height: 210px;
}
.copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  color: #000000;
}
.m-home {
  background: none;
  height: 150vh;
}
.layer-img {
  position: fixed;
  left: 0;
  width: 100%;
  transition: all 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);
}
.layer-1 {
  top: 60px;
}
.layer-2 {
  top: 100px;
  opacity: 0;
}
.active-layer-2 {
  top: 75px;
  opacity: 1;
}
.layer-3 {
  top: 115px;
  opacity: 0;
}
.active-layer-3 {
  top: 90px;
  opacity: 1;
}
.layer-4 {
  top: 130px;
  opacity: 0;
}
.active-layer-4 {
  top: 105px;
  opacity: 1;
}
.layer-5 {
  top: 145px;
  opacity: 0;
}
.active-layer-5 {
  top: 120px;
  opacity: 1;
}
.layer-6 {
  top: 160px;
  opacity: 0;
}
.active-layer-6 {
  top: 135px;
  opacity: 1;
}
.layer-7 {
  top: 175px;
  opacity: 0;
}
.active-layer-7 {
  top: 150px;
  opacity: 1;
}
.layer-8 {
  top: 190px;
  opacity: 0;
}
.active-layer-8 {
  top: 165px;
  opacity: 1;
}
.layer-9 {
  top: 205px;
  opacity: 0;
}
.active-layer-9 {
  top: 180px;
  opacity: 1;
}
.layer-10 {
  top: 220px;
  opacity: 0;
}
.active-layer-10 {
  top: 195px;
  opacity: 1;
}
.layer-11 {
  top: 235px;
  opacity: 0;
}
.active-layer-11 {
  top: 210px;
  opacity: 1;
}
.layer-12 {
  top: 250px;
  opacity: 0;
}
.active-layer-12 {
  top: 225px;
  opacity: 1;
}
.loading {
  position: fixed;
  z-index: 800;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  min-height: 100vh;
}
.m-glass {
  position: fixed;
  bottom: -200px;
  width: 100%;
  height: max-content;
  backdrop-filter: blur(16px);
  border-radius: 20px;
  overflow: hidden;
}
.m-glass-img {
  width: 100%;
  display: block;
}
.m-intro-img {
  position: absolute;
  width: 376px;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
}
.m-arrow-img {
  width: 150px;
  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translateX(-50%);
}
.m-menu {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  height: calc(100% - 30px);
  width: 100%;
}
.m-top-line {
  width: 414px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.m-top-line p {
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
}
.m-bottom-line {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: absolute;
  bottom: 100px;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  align-items: center;
  justify-items: center;
}
.m-bottom-line img {
  width: 70px;
}
.m-capsule {
  margin-top: 6px;
  width: 25px;
  height: 3px;
  border-radius: 2px;
  background: #ffffff;
  position: absolute;
  transition: all 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);
  transform: translateX(-50%);
}
.m-menu-icon {
  width: 27px;
  height: 31px;
  align-self: flex-end;
  margin-right: 15px;
  margin-bottom: 5px;
}
.m-menu-content {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.m-menu-text {
  width: 314px;
}
.m-menu-svg {
  width: 40px;
  margin: 0 20px;
  flex-shrink: 0;
}
.m-scroll-container {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  overflow-x: scroll;
  display: flex;
  align-items: flex-end;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.m-scroll-container::-webkit-scrollbar {
  display: none;
}
.scroll-list-container {
  margin-top: 30px;
  width: 100%;
  height: 130px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-y: visible;
}

.scroll-list {
  display: flex;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  align-items: center;
  overflow-y: visible;
  overflow-x: scroll;
  box-sizing: content-box;
}
.list-item {
  flex: 0 0 40px;
  height: 60px;
  margin: 0 30px;
  transition: transform 0.3s;
}
.list-item:first-of-type {
  margin-left: calc(50vw - 20px);
}
.scroll-space {
  flex-shrink: 0;
  width: calc(50vw - 20px);
  height: 10px;
}
.scroll-list::-webkit-scrollbar {
  display: none;
}
.m-capsule-current {
  width: 32px;
  height: 3px;
  border-radius: 3px;
  background-color: #ffffff;
}
@keyframes up-down {
  0% {
    bottom: 60px;
  }
  50% {
    bottom: 30px;
  }
  100% {
    bottom: 60px;
  }
}
@keyframes left-right {
  0% {
    margin-left: 0;
  }
  50% {
    margin-left: -20px;
  }
  100% {
    margin-left: 0;
  }
}
@keyframes show {
  0% {
    opacity: 0;
    margin-top: -150px;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
}
</style>