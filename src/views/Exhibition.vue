<template>
  <div class="wrapper" ref="wrapper">
    <div class="home" ref="main">
      <div class="preface" :style="{ transform: 'translateY(' + top + 'px)' }">
        <img src="../assets/preface.png" @drag.prevent alt="background" />
      </div>
      <div
        class="b1"
        :style="{
          transform: 'translateY(' + top + 'px)',
          marginTop: 200 * preActive - 100 + 'vh',
        }"
      >
        <ul id="scene">
          <li class="layer" data-depth="0.8">
            <img
              :src="require('../assets/b' + preActive + '.png')"
              class="back-img"
            />
          </li>
        </ul>
      </div>
      <div
        class="f1"
        :style="
          'transform: translateY(' +
          extraTop +
          'px);margin-top:' +
          (200 * activeItem - 100) +
          'vh;mask-image: url(' +
          require('../assets/mask_' +
            (activeItem === 0 ? 1 : activeItem === 8 ? 7 : activeItem) +
            '.png') +
          ');-webkit-mask-image: url(' +
          require('../assets/mask_' +
            (activeItem === 0 ? 1 : activeItem === 8 ? 7 : activeItem) +
            '.png') +
          ');'
        "
        v-if="!hideAll"
      ></div>
      <img
        :src="
          require('../assets/svg_' +
            (activeItem === 0 ? 1 : activeItem === 8 ? 7 : activeItem) +
            '.png')
        "
        class="f1-img"
        v-if="!hideAll"
        :style="{
          transform: 'translateY(' + extraTop + 'px)',
          marginTop: 200 * activeItem - 100 + 'vh',
        }"
      />
      <div
        class="f1-text"
        :style="{
          transform: 'translateY(' + moreExtraTop + 'px)',
        }"
      >
        <p
          class="f1-title"
          :style="
            activeItem === 0 || activeItem === 8
              ? 'color:#262626;'
              : textColor
              ? 'color:' + activeList[activeItem].color
              : ''
          "
        >
          {{ activeList[activeItem].title_zh }}
        </p>
        <p
          class="f1-title-en"
          :style="
            activeItem === 0 || activeItem === 8
              ? 'color:#262626;'
              : textColor
              ? 'color:' + activeList[activeItem].color
              : ''
          "
        >
          {{ activeList[activeItem].title_en }}
        </p>
        <transition name="fade" mode="out-in">
          <div v-if="showItem === -1">
            <p class="f1-paragraph--2" v-if="activeItem === 8 && lang === 'cn'">
              {{ activeList[activeItem]["p-2"] }}
            </p>
            <p class="f1-paragraph--1" v-if="activeItem === 8 && lang === 'cn'">
              {{ activeList[activeItem]["p-1"] }}
            </p>
            <p
              class="f1-paragraph-0"
              v-if="(activeItem === 0 || activeItem === 8) && lang === 'cn'"
            >
              {{ activeList[activeItem].p0 }}
            </p>
            <p
              class="f1-paragraph-1"
              :style="
                activeItem === 0 || activeItem === 8 ? 'color:#262626' : ''
              "
            >
              {{
                lang === "en"
                  ? activeList[activeItem].p1_en
                  : activeList[activeItem].p1
              }}
            </p>
            <p
              class="f1-paragraph-2"
              v-if="lang === 'cn' || (activeItem !== 4 && activeItem !== 5)"
              :style="
                activeItem === 0 || activeItem === 8 ? 'color:#262626' : ''
              "
            >
              {{
                lang === "en"
                  ? activeList[activeItem].p2_en.split(
                      activeList[activeItem].title_en
                    )[0]
                  : activeList[activeItem].p2.split(
                      activeList[activeItem].title_zh
                    )[0]
              }}<b
                v-if="activeItem !== 5 && activeItem !== 0 && activeItem !== 8"
              >
                {{
                  lang === "en"
                    ? activeList[activeItem].title_en
                    : activeList[activeItem].title_zh
                }}</b
              >{{
                lang === "en"
                  ? activeList[activeItem].p2_en.split(
                      activeList[activeItem].title_en
                    )[1]
                  : activeList[activeItem].p2.split(
                      activeList[activeItem].title_zh
                    )[1]
              }}
            </p>
            <p
              v-if="(activeItem === 0 || activeItem === 8) && lang === 'cn'"
              class="f1-paragraph-3"
              :style="
                activeItem === 0 || activeItem === 8 ? 'color:#262626' : ''
              "
            >
              {{ activeList[activeItem].p3 }}
            </p>
            <p
              v-if="(activeItem === 0 || activeItem === 8) && lang === 'cn'"
              class="f1-paragraph-4"
              :style="
                activeItem === 0 || activeItem === 8 ? 'color:#262626' : ''
              "
            >
              {{ activeList[activeItem].p4 }}
            </p>
            <p
              v-if="activeItem === 0 && lang === 'cn'"
              class="f1-paragraph-5"
              :style="
                activeItem === 0 || activeItem === 8 ? 'color:#262626' : ''
              "
            >
              {{ activeList[activeItem].p5 }}
            </p>
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div v-if="showItemA !== -1" class="f1-detail">
            <p class="f1-item-title">
              {{ lang === "en" ? showDetail.post_title_en : showDetail.title }}
            </p>
            <div class="f1-keywords-group">
              <div
                v-for="(item, i) in lang === 'en'
                  ? showDetail.keywords_en.split('|')
                  : showDetail.keywords_zh.split('|')"
                :key="i"
              >
                {{ item }}
              </div>
            </div>
            <div class="f1-label-name-group">
              <p class="f1-label">{{ $t("designer") }}</p>
              <div class="f1-name">
                <p
                  v-for="(name, j) in lang === 'en'
                    ? showDetail.authors_en
                    : showDetail.authors"
                  :key="j"
                >
                  {{ name }}
                </p>
              </div>
            </div>
            <div class="f1-label-name-group">
              <p class="f1-label">{{ $t("tutor") }}</p>
              <div class="f1-name">
                <p>
                  {{
                    lang === "en" ? showDetail.tutors_en : showDetail.tutors_zh
                  }}
                </p>
              </div>
            </div>
            <p class="f1-intro" style="-webkit-box-orient: vertical">
              {{ lang === "en" ? showDetail.intro_en : showDetail.intro_zh }}
            </p>
            <div class="f1-enter" @click="toDetail">
              <p>{{ $t("enter") }}</p>
              <img src="../assets/enter.svg" />
            </div>
            <img class="f1-close" src="../assets/close.svg" @click="toClose" />
          </div>
        </transition>
      </div>
      <div
        class="fm"
        :style="{
          transform: 'translateY(' + extraMoreExtraTop + 'px)',
          marginTop: 200 * preActive2 + 'vh',
        }"
      >
        <div class="fm-space"></div>
        <div class="fm-content" @wheel="handleScroll" ref="scroll">
          <div
            class="fm-items"
            v-for="(item, i) in cardList"
            :key="i"
            @click="toShowItem(item, i)"
          >
            <img
              class="fm-cover"
              :src="item.src"
              alt="cover"
              :title="lang === 'en' ? item.post_title_en : item.title"
            />
            <img
              :src="require('../assets/' + preActive2 + '_4.png')"
              :class="
                'fm-wave' +
                (showItem !== -1 && showDetail.id === item.id
                  ? ' fm-wave-active'
                  : '')
              "
            />
            <p
              :title="lang === 'en' ? item.post_title_en : item.title"
              style="-webkit-box-orient: vertical"
            >
              {{ lang === "en" ? item.post_title_en : item.title }}
            </p>
          </div>
        </div>
        <div class="fm-scroll">
          <div class="scroll-start">
            <div
              class="scroll-line"
              :style="
                'height:' +
                calcHeight +
                'px;background-color:' +
                activeList[preActive2].color
              "
            ></div>
            <div
              class="scroll-start-box shadow-1"
              :style="
                'background-image:url(' +
                require('../assets/' + preActive2 + '_2.svg') +
                ')'
              "
            >
              {{ currentNum }}
            </div>
          </div>
          <img
            :src="require('../assets/' + preActive2 + '_3.svg')"
            class="scroll-end"
          />
          <p class="scroll-end-text">{{ totalNum }}</p>
        </div>
      </div>
      <div
        class="bm"
        :style="{
          transform: 'translateY(' + top + 'px)',
          marginTop: 200 * preActive2 + 'vh',
        }"
      >
        <ul id="scene2">
          <li class="layer" data-depth="-0.7">
            <img
              src="../assets/cloud_1.png"
              :class="
                'bm-img-cloud-1' + (showItem !== -1 ? ' active-cloud-1' : '')
              "
            />
          </li>
          <li class="layer" data-depth="0.2">
            <img
              :src="require('../assets/' + preActive2 + '_3.png')"
              :class="
                'bm-img-building' + (showItem !== -1 ? ' active-building' : '')
              "
            />
          </li>
          <li class="layer" data-depth="-0.3">
            <img
              src="../assets/cloud_2.png"
              :class="
                'bm-img-cloud-2' + (showItem !== -1 ? ' active-cloud-2' : '')
              "
            />
          </li>
          <li class="layer" data-depth="-0.8">
            <img
              src="../assets/cloud_3.png"
              :class="
                'bm-img-cloud-3' + (showItem !== -1 ? ' active-cloud-3' : '')
              "
            />
          </li>
        </ul>
      </div>
      <div class="epilogue" :style="{ transform: 'translateY(' + top + 'px)' }">
        <div class="epilogue-space">
          <img
            :src="
              lang === 'cn'
                ? require('../assets/code1.svg')
                : require('../assets/code1_en.svg')
            "
            class="epilogue-code"
          />
          <img
            :src="
              lang === 'cn'
                ? require('../assets/code2.svg')
                : require('../assets/code2_en.svg')
            "
            class="epilogue-code"
          />
        </div>
        <div class="epilogue-content">
          <img src="../assets/Epilogue_0.svg" class="epilogue-svg" />
          <transition name="fade" mode="out-in">
            <img
              v-if="!seal"
              :src="
                lang === 'cn'
                  ? require('../assets/icon_zh.svg')
                  : require('../assets/icon_en.svg')
              "
              @click="clickSeal"
              class="seal-icon"
            />
          </transition>
          <transition name="fade" mode="out-in">
            <img
              v-if="sealA"
              src="../assets/Epilogue_1.svg"
              class="epilogue-svg-1"
            />
          </transition>
          <div class="music" @click="switchPlay">
            <img
              src="../assets/music.svg"
              :class="'music-icon' + (playing ? ' rolling-img' : '')"
            />
            <div>
              <p :class="'music-text' + (playing ? ' scrolling-text' : '')">
                {{ playing ? "Serene View - by Arulo" : $t("music") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="dialog"
      @touchmove.prevent
      @mousewheel.prevent
      @click="() => (dialog = false)"
      v-if="dialog"
      v-html="showDetail.url"
    ></div>
    <audio ref="audioPlayer" src="../assets/sereneview.mp3" loop></audio>
  </div>
</template>

<script>
import Parallax from "parallax-js";
import service from "../utils/request";
export default {
  name: "Exhibition",
  props: ["notMobile"],
  data() {
    return {
      playing: false,
      seal: false,
      sealA: false,
      activeItem: 0,
      queryItem: 0,
      calcHeight: 0,
      top: 0,
      extraTop: 0,
      moreExtraTop: 0,
      extraMoreExtraTop: 0,
      hideAll: false,
      cardList: [],
      itemList: "",
      totalNum: 4,
      currentNum: 4,
      textColor: false,
      showItem: -1,
      showItemA: -1,
      showDetail: { keywords_zh: "", keywords_en: "" },
      preActive: 1,
      preActive2: 1,
      timer: null,
      activeList: [
        {
          title_zh: "卷首语",
          title_en: "Preface",
          color: "#262626",
          id: "58",
          p0: "无数新生事物在时代的洗礼下如雨后春笋",
          p1: "伴随而生的是属于设计师更加广阔的视野天地",
          p2: "当创造力融入新的时代底色",
          p3: "我们将如何用画笔打破思想的界限",
          p4: "融合多元的灵魂",
          p5: "描绘出一张包罗万象的壮丽图纸",
          p1_en:
            "Countless new things have sprung up under the baptism of the times, accompanied by a broader vision of designers.",
          p2_en:
            "When creativity is integrated into the background of the new era, how will we use the brush to break the boundaries of thought, integrate diverse souls, and paint an all-encompassing magnificent drawing.",
        },
        {
          title_zh: "共心",
          title_en: "Mindoasis",
          color: "#182E7A",
          id: "58",
          p1: "当设计之海掀起涟漪，现实的苦难色彩与设计的精妙线条相互缠绕，凝结成精神上的疗愈之源，荡涤我们身心的污垢，更激荡起我们内心对生命的深层思考……",
          p2: "在设计的连结下，我们与生命、与世界、与自我，得以更深刻地“共心”……",
          p1_en:
            "In the drawing of design, the colors of reality and the lines of design intertwine, and turn into an oasis of healing, cleansing our minds and bodies, and stirring our hearts to think deeper and deeper ...",
          p2_en:
            "Through the connection of design, we finally reach Mindoasis, and get a deep understanding of life, of the world and of ourselves ......",
        },
        {
          title_zh: "共容",
          title_en: "Virtualborder",
          color: "#B34C98",
          id: "59",
          p1: "当设计纪元变幻莫测，身心沉醉于探索虚拟，而当触感切实之际，又能感知到真实的气息。虚实容与处如水墨相溶般或虚或实，我们执着不懈，我们激动雀跃，于未知的交界探索，打破想象的边界……",
          p2: "而灵感终将在“共容”处争相盛放，开启未来的人类新纪元……",
          p1_en:
            "When design is multifarious, we are absorbed in exploring the virtual. Yet inevitably, we always perceive reality at the border. We are persistent and excited, we explore the borders of the unknown, and break the boundaries of imagination ......",
          p2_en:
            "Inspiration will finally bloom at Virtualborder, opening up a new era for humanity ......",
        },
        {
          title_zh: "共今",
          title_en: "Timegallery",
          color: "#E2730E",
          id: "60",
          p1: "当古老的智慧与当代的科技不断交织，昔日的传统与现代的突破协作相融，同根的彼此不断渗透，以设计为媒介，化解不同年龄间的隔阂，缝补生活的缝隙，缔造可触的体验。",
          p2: "那些曾经年少的我们，那些终将老去的我们，都能于“共今”找到自己的所属。",
          p1_en:
            "When ancient wisdom meets contemporary technology, when old culture encounters modern breakthroughs, they influence each other constantly and profoundly. We are moved to design with our emotions, to bridge the gap between ages.",
          p2_en:
            "Those of us who were once young, and those of us who will finally become old, can all find our own in Timegallery.",
        },
        {
          title_zh: "共映",
          title_en: "Soulscreen",
          color: "#F1D7E5",
          id: "61",
          p1: "每一帧的影像，无声却充满了生命的呼吸，每一段的故事情节，平凡却蕴含着人类的感情共鸣。",
          p2: "当设计之火花燃起、交相辉映，隽美画卷就此展开。彼此渗透的艺术语言，携来对生命的敬畏与爱。方寸间共鸣“共映”的此刻，灵感逸兴遄飞——动画绘制的美轮美艳的角色场景，丰富的情感故事，都在视觉上和情感上都传达达着独特的信息和魅力，如此细腻的灵魂与独特的表现方式，这便是动画永恒的魅力。",
          p1_en:
            "Every frame of the image, silent yet full of the breath of life, every plot of the story, ordinary yet containing the emotional resonance of humanity.",
          p2_en:
            "Through the connection of design, we finally reach Mindoasis, and get a deep understanding of life, of the world and of ourselves ......",
        },
        {
          title_zh: "共探",
          title_en: "Exploringgalaxy",
          color: "#2EA398",
          id: "62",
          p1: "穿行于设计之美的星河，共同探索人类对绝妙美感的不息追求。",
          p2: "探，是对未知世界的探究，是对自我潜能的挖掘；是人类对美的不懈探索和追求。外观和材质的交相呼应；技术、功能和情感的融会贯通。环境设计的对人类智慧和想象力的赞颂，对文化、历史和时代的沉淀和传承，正通过不断探究来促进文明发展。",
          p1_en:
            "Wandering in the ocean of design beauty, exploring together humanity's endless pursuit of exquisite aesthetic sense.",
          p2_en:
            "Through the connection of design, we finally reach Mindoasis, and get a deep understanding of life, of the world and of ourselves ......",
        },
        {
          title_zh: "共助",
          title_en: "Agrisland",
          color: "#E9C91C",
          id: "63",
          p1: "当商业的热量和人文的情感在现代社会中融合，时光的潮汐里，它们一同起舞，协同耕耘。曾经疏离的两端，此时共振合一，人文美学的诗篇与商业智慧的创意在设计中耘集，全新的商业未来已然铺陈于我们眼前。",
          p2: "岁月流转，“共助”之力量，耕耘之可贵，不因时光而改，却因时光而更加绚烂！",
          p1_en:
            "In the drawing of design, the colors of reality and the lines of design intertwine, and turn into an oasis of healing, cleansing our minds and bodies, and stirring our hearts to think deeper and deeper ...",
          p2_en:
            "Through the connection of design, we finally reach Mindoasis, and get a deep understanding of life, of the world and of ourselves ......",
        },
        {
          title_zh: "共生",
          title_en: "Naturezone",
          color: "#56CF71",
          id: "64",
          p1: "当设计走过荒原，越过高山，深入广袤森林，找到那片永恒的生命之源；当设计感受到自然的呼吸，人类的思维和自然的语言在此共鸣，呈现出永不消逝的生命旋律。",
          p2: "一切轻盈的、悦目的、富有生命的特质，都化为人与自然的“共生”之舞！",
          p1_en:
            "In the drawing of design, the colors of reality and the lines of design intertwine, and turn into an oasis of healing, cleansing our minds and bodies, and stirring our hearts to think deeper and deeper ...",
          p2_en:
            "Through the connection of design, we finally reach Mindoasis, and get a deep understanding of life, of the world and of ourselves ......",
        },
        {
          title_zh: "卷尾语",
          title_en: "Epilogue",
          color: "#262626",
          id: "64",
          "p-2": "世界在无时无刻的流转中",
          "p-1": "万物在彼此交融中诞生、在彼此包容中发展",
          p0: "仿佛笔下融合后重现的色彩",
          p1: "在时代的浸润中焕发出新的颜色",
          p2: "我们将昨日丰富的颜料融合",
          p3: "涂在今日的画板上",
          p4: "绘出明日的蓝图",
          p1_en:
            "In the flow of the world , all things are born in the fusion of each other and develop in mutual inclusion, as if the colors reproduced after the fusion of the pen are exchanged for new colors in the immersion of the times.",
          p2_en:
            "We fuse yesterday's rich pigments and paint them on today's drawing boards to create the blueprint of tomorrow.",
        },
      ],
      dialog: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    switchPlay() {
      const audioPlayer = this.$refs.audioPlayer;
      audioPlayer.volume = 0.5;
      if (this.playing) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      this.playing = !this.playing;
    },
    clickSeal() {
      this.seal = true;
      setTimeout(() => {
        this.sealA = true;
      }, 500);
    },
    toDetail() {
      if (this.showDetail.id < 0) {
        console.log(this.showDetail);
        if (this.showDetail.id > -20) this.dialog = true;
        else {
          this.$viewerApi({
            images: [this.showDetail.src],
          });
        }
      } else {
        this.$router.push(
          "/exhibition/" +
            this.showDetail.category_id +
            "/" +
            this.showDetail.id +
            "?list=" +
            this.itemList +
            "&current=" +
            this.showItem
        );
      }
    },
    toClose() {
      this.showItemA = -1;
      setTimeout(() => {
        this.showItem = -1;
      }, 500);
    },
    handleMouseWheel(event, auto = false) {
      if (!auto) clearInterval(this.timer);
      let windowHeight = window.innerHeight;
      this.top = event;
      this.activeItem = Math.floor((-this.top / windowHeight - 0.5) / 2) + 1;
      this.queryItem = Math.floor((-this.top / windowHeight - 1) / 2) + 1;
      this.preActive = Math.min(
        7,
        Math.floor(-this.top / windowHeight / 2) + 1
      );
      this.preActive2 = Math.min(
        7,
        Math.max(1, Math.floor((-this.top / windowHeight - 1) / 2) + 1)
      );
      this.$bus.$emit("changeActiveItem", this.activeItem);
      if (this.activeItem !== 0) {
        this.extraTop = 2 * this.top + (2 * this.activeItem - 1) * windowHeight;
        if (this.extraTop + (2 * this.activeItem - 1) * windowHeight <= 0) {
          this.extraTop = this.top;
        }
        if (this.top - (0.5 - 2 * this.preActive2) * windowHeight <= 0) {
          this.extraMoreExtraTop =
            2 * this.top + 2 * this.preActive2 * windowHeight;
          if (this.top + 2 * this.preActive2 * windowHeight <= 0) {
            this.extraMoreExtraTop = this.top;
          }
        } else {
          this.extraMoreExtraTop = 0;
        }
      }
      if (this.top >= (0.5 - 2 * this.activeItem) * windowHeight) {
        this.textColor = false;
        this.showItemA = -1;
        setTimeout(() => {
          this.showItem = -1;
        }, 500);
      } else {
        this.textColor = true;
      }
      this.moreExtraTop = 0;
      if (this.top < -15 * windowHeight) {
        this.moreExtraTop = this.top + 15 * windowHeight;
      }
      if (this.top < -14 * windowHeight) {
        this.hideAll = true;
      } else {
        this.hideAll = false;
      }
    },
    handleScroll(e) {
      let scrollTop = this.$refs.scroll.scrollTop;
      let scrollHeight = this.$refs.scroll.scrollHeight;
      let clientHeight = this.$refs.scroll.clientHeight;
      if (scrollTop === 0) {
        if (e.deltaY > 0) e.stopPropagation();
      } else if (scrollTop + clientHeight >= scrollHeight) {
        if (e.deltaY < 0) e.stopPropagation();
      } else {
        e.stopPropagation();
      }
      let scrollRatio = scrollTop / (scrollHeight - clientHeight) || 0;
      this.currentNum = Math.max(4, parseInt(scrollRatio * this.totalNum));
      let totalHeight =
        0.75 * window.innerHeight -
        5.125 *
          parseInt(
            document
              .getElementsByTagName("html")[0]
              .style.fontSize.split("px")[0]
          );
      this.calcHeight = (this.currentNum / this.totalNum) * totalHeight;
    },
    toShowItem(val, i) {
      if (this.showItem == i) {
        this.toDetail();
        return;
      }
      this.showDetail = val;
      this.showItem = i;
      setTimeout(() => {
        this.showItemA = i;
      }, 500);
    },
    getList(val) {
      service(
        "/portal/api_v1/get_cates_lists?per_page=9999&current_page=1&category_id=" +
          this.activeList[val].id
      ).then((data) => {
        this.cardList = [];
        this.itemList = "";
        for (let i = 0; i < data.data.data.length; i++) {
          let y = [],
            x = [];
          for (
            let j = 0;
            j < data.data.data[i].more.authors?.length || 0;
            j++
          ) {
            x.push(data.data.data[i].more.authors[j].en_names);
            y.push(data.data.data[i].more.authors[j].zh_names);
          }
          this.itemList += data.data.data[i].id + "_";
          this.cardList.push({
            ...data.data.data[i],
            title: data.data.data[i].post_title,
            src:
              "http://idesign.tju.edu.cn/upload/" +
              data.data.data[i].more.thumbnail,
            authors: y,
            authors_en: x,
            term: data.data.data[i].post_term,
            id: data.data.data[i].id,
          });
        }
      });
    },
  },
  watch: {
    queryItem(val) {
      if (val === 4) {
        this.cardList = [
          {
            src: require("../assets/cover/1.jpeg"),
            title: "《THE ROAD》",
            post_title_en: "《THE ROAD》",
            id: -2,
            keywords_en: "游戏|疗愈|RPG|亲子关系",
            keywords_zh: "游戏|疗愈|RPG|亲子关系",
            authors_en: ["范译升"],
            authors: ["范译升"],
            tutors_en: "彭志军",
            tutors_zh: "彭志军",
            intro_en:
              "《THE ROAD》是一款以亲子关系为核心的RPG游戏，通过沉浸式的角色扮演和情境体验，帮助家长和孩子增强相互理解和沟通，游戏创造了代表不同人生态度的三个季节，玩家会遭遇各种各样的角色以及不同的人生选择，旨在启发玩家思考人生的多样性和选择的自由意志，从而学会理解和尊重他人的选择。",
            intro_zh:
              "《THE ROAD》是一款以亲子关系为核心的RPG游戏，通过沉浸式的角色扮演和情境体验，帮助家长和孩子增强相互理解和沟通，游戏创造了代表不同人生态度的三个季节，玩家会遭遇各种各样的角色以及不同的人生选择，旨在启发玩家思考人生的多样性和选择的自由意志，从而学会理解和尊重他人的选择。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=271696227&bvid=BV1rc411G7Fr&cid=1146932793&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/2.jpeg"),
            title: "《PARADISE》",
            post_title_en: "《PARADISE》",
            id: -3,
            keywords_en: "概念|科幻|循环",
            keywords_zh: "概念|科幻|循环",
            authors_en: ["贺思琦", "赵晶晶"],
            authors: ["贺思琦", "赵晶晶"],
            tutors_en: "赵天娇",
            tutors_zh: "赵天娇",
            intro_en: "《PARADISE》— 一部科幻概念动画短片",
            intro_zh: "《PARADISE》— 一部科幻概念动画短片",
            url: '<iframe src="//player.bilibili.com/player.html?aid=954204635&bvid=BV16W4y197oh&cid=1146952122&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/3.png"),
            title: "《Global mutation investigation report》",
            post_title_en: "《Global mutation investigation report》",
            id: -4,
            keywords_en: "伪录像带|惊悚|反讽",
            keywords_zh: "伪录像带|惊悚|反讽",
            authors_en: ["王善凝"],
            authors: ["王善凝"],
            tutors_en: "赵晶",
            tutors_zh: "赵晶",
            intro_en:
              "《全球突变调查报告》是一部伪录像带风格的三维动画短片，讲述了在未来架空世界，核污染严重，人类遭受到突变患者的攻击，亚太联合调查中心为此成立，并收集了攻击事件相关录像带，对此进行调查跟进的故事。",
            intro_zh:
              "《全球突变调查报告》是一部伪录像带风格的三维动画短片，讲述了在未来架空世界，核污染严重，人类遭受到突变患者的攻击，亚太联合调查中心为此成立，并收集了攻击事件相关录像带，对此进行调查跟进的故事。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=954183014&bvid=BV1fs4y1T7AJ&cid=1146940432&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/4.png"),
            title: "《莱莉的康复》",
            post_title_en: "《莱莉的康复》",
            id: -5,
            keywords_en: "哥特|反转|心理疾病自救",
            keywords_zh: "哥特|反转|心理疾病自救",
            authors_en: ["戴诗雨"],
            authors: ["戴诗雨"],
            tutors_en: "李兴",
            tutors_zh: "李兴",
            intro_en:
              "《莱莉的康复》是一段待创作的定格与二维结合动画短片，在低沉的故事基调上强调美术风格和人物动态，运用布料和纸料的拼贴制作实现哥特风格的美学设计表现，从而完成短片制作和研究。",
            intro_zh:
              "《莱莉的康复》是一段待创作的定格与二维结合动画短片，在低沉的故事基调上强调美术风格和人物动态，运用布料和纸料的拼贴制作实现哥特风格的美学设计表现，从而完成短片制作和研究。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=401655071&bvid=BV1Xo4y1T73Q&cid=1146925263&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/5.png"),
            title: "«“我”和奔向不同选择的“我”们»",
            post_title_en: "«“我”和奔向不同选择的“我”们»",
            id: -6,
            keywords_en: "二维动画与三维场景结合|剧情|热点话题",
            keywords_zh: "二维动画与三维场景结合|剧情|热点话题",
            authors_en: ["李欣彦", "杨欣然"],
            authors: ["李欣彦", "杨欣然"],
            tutors_en: "李兴",
            tutors_zh: "李兴",
            intro_en:
              "«“我”和奔向不同选择的“我”们》讲述了女孩下班回家进入了一个奇幻世界，遇到了拥有不同人生的自己。我们都在羡慕别人的生活，殊不知别人也在羡慕我们。珍惜当下的生活，一切都是最好的选择。",
            intro_zh:
              "«“我”和奔向不同选择的“我”们》讲述了女孩下班回家进入了一个奇幻世界，遇到了拥有不同人生的自己。我们都在羡慕别人的生活，殊不知别人也在羡慕我们。珍惜当下的生活，一切都是最好的选择。",
            url: "",
          },
          {
            src: require("../assets/cover/6.png"),
            title: "《心海》",
            post_title_en: "《心海》",
            id: -7,
            keywords_en: "意识流|清新|治愈",
            keywords_zh: "意识流|清新|治愈",
            authors_en: ["姚小玲"],
            authors: ["姚小玲"],
            tutors_en: "彭志军",
            tutors_zh: "彭志军",
            intro_en:
              "《心海》以意识流形式讲述在繁忙的生活和沉重的压力下难免会心情低落，甚至无缘无故的emo，在这种心情的驱使下就会向往美好平静的事物，当你低头难过时，如果能看看蓝天、看看海，或者其他美好的事物总会让人心情愉悦，面朝大海，春暖花开。",
            intro_zh:
              "《心海》以意识流形式讲述在繁忙的生活和沉重的压力下难免会心情低落，甚至无缘无故的emo，在这种心情的驱使下就会向往美好平静的事物，当你低头难过时，如果能看看蓝天、看看海，或者其他美好的事物总会让人心情愉悦，面朝大海，春暖花开。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=401723540&bvid=BV15o4y1M7NB&cid=1146949522&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/7.png"),
            title: "《寻海》",
            post_title_en: "《寻海》",
            id: -8,
            keywords_en: "二维动画结合横版游戏|生命教育|心理疗愈",
            keywords_zh: "二维动画结合横版游戏|生命教育|心理疗愈",
            authors_en: ["关敬一", "赵紫寒"],
            authors: ["关敬一", "赵紫寒"],
            tutors_en: "孙晗",
            tutors_zh: "孙晗",
            intro_en:
              "《寻海》主要讲述了主人公作为一个在疫情前大受欢迎的小熊软糖在时局动荡后不再受欢迎，在遭受老鼠咬破袋子等无妄之灾后毅然决然决定出逃，见识到了现实中外面的世界，并深深被几年前的时尚广告吸引，想要寻找使自己重新受欢迎的地方，在经历了一系列的冒险后明白与其寻找遥远且不知真假的乌托邦大海，不如多多珍惜自己与身边爱他的朋友的一个童话故事。",
            intro_zh:
              "《寻海》主要讲述了主人公作为一个在疫情前大受欢迎的小熊软糖在时局动荡后不再受欢迎，在遭受老鼠咬破袋子等无妄之灾后毅然决然决定出逃，见识到了现实中外面的世界，并深深被几年前的时尚广告吸引，想要寻找使自己重新受欢迎的地方，在经历了一系列的冒险后明白与其寻找遥远且不知真假的乌托邦大海，不如多多珍惜自己与身边爱他的朋友的一个童话故事。",
            url: "",
          },
          {
            src: require("../assets/cover/8.png"),
            title: "《Cloth Tiger》",
            post_title_en: "《Cloth Tiger》",
            id: -9,
            keywords_en: "寻找|爱|反转",
            keywords_zh: "寻找|爱|反转",
            authors_en: ["赵红", "王睿思"],
            authors: ["赵红", "王睿思"],
            tutors_en: "彭志军",
            tutors_zh: "彭志军",
            intro_en:
              "《Cloth Tiger》讲述了小女孩在送布老虎找老奶奶的途中发生的一系列故事",
            intro_zh:
              "《Cloth Tiger》讲述了小女孩在送布老虎找老奶奶的途中发生的一系列故事",
            url: "",
          },
          {
            src: require("../assets/cover/9.png"),
            title: "《空天地智能无人系统三维演示动画设计》",
            post_title_en: "《空天地智能无人系统三维演示动画设计》",
            id: -10,
            keywords_en: "未来城市|人工智能|无人机",
            keywords_zh: "未来城市|人工智能|无人机",
            authors_en: ["闫诗莹"],
            authors: ["闫诗莹"],
            tutors_en: "赵天娇",
            tutors_zh: "赵天娇",
            intro_en:
              "动画短片《空天地智能无人系统三维演示动画设计》是根据天津市机器学习重点实验室、天津市131创新团队对于空天地智能无人系统工作原理与工作场景的研究，以“未来城市”作为主题背景，进行科普性质的三维动画演示设计。 通过三维动画短片的科普，用直观明了的方式让观众了解无人机、无人车等智能系统是如何统一高效运作的。",
            intro_zh:
              "动画短片《空天地智能无人系统三维演示动画设计》是根据天津市机器学习重点实验室、天津市131创新团队对于空天地智能无人系统工作原理与工作场景的研究，以“未来城市”作为主题背景，进行科普性质的三维动画演示设计。 通过三维动画短片的科普，用直观明了的方式让观众了解无人机、无人车等智能系统是如何统一高效运作的。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=656741068&bvid=BV1Mh4y1d7W7&cid=1146946883&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/10.png"),
            title: "《流徙·欧罗巴》",
            post_title_en: "《流徙·欧罗巴》",
            id: -11,
            keywords_en: "科幻|未来|灾难|星际移民|木卫二|人类文明",
            keywords_zh: "科幻|未来|灾难|星际移民|木卫二|人类文明",
            authors_en: ["孟凡雨"],
            authors: ["孟凡雨"],
            tutors_en: "孙晗",
            tutors_zh: "孙晗",
            intro_en:
              '2053年，人类发现大犬座恒星α意外变成红巨星，这使得它的伴星β吸取的能量急剧减少，导致β星核爆炸，星体向太阳系冲去。人类发现伴星β爆炸产生的巨大动能导致其质量大幅下降。当它进入太阳系后，它会逐渐被各种天体的引力减速。然而，当它临近太阳时，太阳的引力会改变它的轨迹，使其与太阳共轭运动。在此期间，伴星β剩余的放射性物质会加速消耗，释放出大量能量。最终，伴星β将与太阳合并，成为一颗新的恒星。这颗新星被人类命名为"朝晖"。太阳无法与伴星β融合的物质，会包裹在朝晖表层，成为一个热层，并在300年内扩散到金星的轨道。在热层的影响下，金星轨道内的所有物质都将被气化，地球也将干涸。同时，远古的卫星欧巴罗，将成为人类最后的希望。',
            intro_zh:
              '2053年，人类发现大犬座恒星α意外变成红巨星，这使得它的伴星β吸取的能量急剧减少，导致β星核爆炸，星体向太阳系冲去。人类发现伴星β爆炸产生的巨大动能导致其质量大幅下降。当它进入太阳系后，它会逐渐被各种天体的引力减速。然而，当它临近太阳时，太阳的引力会改变它的轨迹，使其与太阳共轭运动。在此期间，伴星β剩余的放射性物质会加速消耗，释放出大量能量。最终，伴星β将与太阳合并，成为一颗新的恒星。这颗新星被人类命名为"朝晖"。太阳无法与伴星β融合的物质，会包裹在朝晖表层，成为一个热层，并在300年内扩散到金星的轨道。在热层的影响下，金星轨道内的所有物质都将被气化，地球也将干涸。同时，远古的卫星欧巴罗，将成为人类最后的希望。',
            url: '<iframe src="//player.bilibili.com/player.html?aid=826669179&bvid=BV16u4y1f7qq&cid=1146936821&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
        ];
      } else if (val === 5) {
        this.cardList = [
          {
            src: "",
            title: "煎饼果子",
            post_title_en: "煎饼果子",
            id: -20,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["赵师傅"],
            authors: ["赵师傅"],
            tutors_en: "",
            tutors_zh: "",
            intro_en: "",
            intro_zh: "",
            url: "",
          },
          {
            src: require("../assets/cover/21.jpeg"),
            title: "探幽寻奇 出山入画",
            post_title_en: "探幽寻奇 出山入画",
            id: -21,
            keywords_en:
              "狮子林|传统工笔画手法|太湖石|蒙太奇|横向发展|纵向深度|古典色彩搭配|中国古典园林|长卷插画",
            keywords_zh:
              "狮子林|传统工笔画手法|太湖石|蒙太奇|横向发展|纵向深度|古典色彩搭配|中国古典园林|长卷插画",
            authors_en: ["周凌霜"],
            authors: ["周凌霜"],
            tutors_en: "赵伟 吴静子 王晶 宋佳音",
            tutors_zh: "赵伟 吴静子 王晶 宋佳音",
            intro_en:
              "该长卷风格以中国传统工笔绘画为灵感，具有现代数码化特点，为画卷注入新意；狮子林作为画面的主题，以其最具特色的假山石贯穿其中，充分展现它的美景与人文历史内涵；在画面布局上，通过对场景的划分，清晰表现出画面的横向发展和纵向深度；色彩搭配按照中国传统宣纸绘画形式，极力刻画出数字艺术下的中国美学体验，以力求表现出画面的层次感和艺术效果；合理地运用蒙太奇的手法，增加画面的变化和想象空间。",
            intro_zh:
              "该长卷风格以中国传统工笔绘画为灵感，具有现代数码化特点，为画卷注入新意；狮子林作为画面的主题，以其最具特色的假山石贯穿其中，充分展现它的美景与人文历史内涵；在画面布局上，通过对场景的划分，清晰表现出画面的横向发展和纵向深度；色彩搭配按照中国传统宣纸绘画形式，极力刻画出数字艺术下的中国美学体验，以力求表现出画面的层次感和艺术效果；合理地运用蒙太奇的手法，增加画面的变化和想象空间。",
            url: "",
          },
          {
            src: require("../assets/cover/22.jpeg"),
            title: "梦境回廊",
            post_title_en: "梦境回廊",
            id: -22,
            keywords_en:
              "逼真的中国园林场景|长廊景致的精彩呈现|线条清晰的现实主义风格|精美的写实技巧|传统与现代相结合的视觉体验|叙事三联画巧妙呈现中国园林场景|融入戏剧元素的写实数字插画|典雅而富有气息的中国园林描绘",
            keywords_zh:
              "逼真的中国园林场景|长廊景致的精彩呈现|线条清晰的现实主义风格|精美的写实技巧|传统与现代相结合的视觉体验|叙事三联画巧妙呈现中国园林场景|融入戏剧元素的写实数字插画|典雅而富有气息的中国园林描绘",
            authors_en: ["刘卓璇"],
            authors: ["刘卓璇"],
            tutors_en: "赵伟 吴静子 王晶 宋佳音",
            tutors_zh: "赵伟 吴静子 王晶 宋佳音",
            intro_en:
              "1. 这幅画卷的设计旨在将中国传统景观与现代数字插画相结合，以创造一种全新的视觉体验。 2. 叙事三联画的风格使得这幅画卷可以被视为一个整体，同时也可分为几个独立的画面，为观众带来更多想象空间。 3. 深灰色和绿色的色调相互交错，营造出一种安静朴素的氛围。 同时旨在营造宋代园林景观氛围4. 精致的植物描绘和浪漫的河景描绘形成鲜明的对比，使整幅画面更加生动饱满。 5. 戏剧描绘的元素被巧妙地融入到画中，为画卷增添一份戏剧性和动感。",
            intro_zh:
              "1. 这幅画卷的设计旨在将中国传统景观与现代数字插画相结合，以创造一种全新的视觉体验。 2. 叙事三联画的风格使得这幅画卷可以被视为一个整体，同时也可分为几个独立的画面，为观众带来更多想象空间。 3. 深灰色和绿色的色调相互交错，营造出一种安静朴素的氛围。 同时旨在营造宋代园林景观氛围4. 精致的植物描绘和浪漫的河景描绘形成鲜明的对比，使整幅画面更加生动饱满。 5. 戏剧描绘的元素被巧妙地融入到画中，为画卷增添一份戏剧性和动感。",
            url: "",
          },
          {
            src: require("../assets/cover/23.jpeg"),
            title: "游园惊梦·钗头凤",
            post_title_en: "游园惊梦·钗头凤",
            id: -23,
            keywords_en: "中国园林|钗头凤|长卷插画",
            keywords_zh: "中国园林|钗头凤|长卷插画",
            authors_en: ["李子怡"],
            authors: ["李子怡"],
            tutors_en: "王晶 吴静子 赵伟 宋佳音",
            tutors_zh: "王晶 吴静子 赵伟 宋佳音",
            intro_en:
              "该长卷的灵感来源为陆游所写的《钗头凤》。陆游和唐琬自幼青梅竹马 ，两小无猜，后待两人长大，陆母用一只凤钗定下了两人的亲事，两人也是相爱无比，但陆母担心儿子沉迷女色而耽误科举，所以逼其讲唐琬休弃，这首词是多年之后，已是物是人非之际，陆游游览沈园偶遇唐琬，包含惊喜、惆怅和相思之情提笔写下了这首词。全卷用长廊将园林的前后空间以及两人相遇到共游园再到最后分别整个故事线串联起来，共有“重逢”、“共饮”、“游园”、“离别”、“思念”五幕场景，整体的色调从两人相遇之初的较为明媚也渐渐转变为离别时的冷色。",
            intro_zh:
              "该长卷的灵感来源为陆游所写的《钗头凤》。陆游和唐琬自幼青梅竹马 ，两小无猜，后待两人长大，陆母用一只凤钗定下了两人的亲事，两人也是相爱无比，但陆母担心儿子沉迷女色而耽误科举，所以逼其讲唐琬休弃，这首词是多年之后，已是物是人非之际，陆游游览沈园偶遇唐琬，包含惊喜、惆怅和相思之情提笔写下了这首词。全卷用长廊将园林的前后空间以及两人相遇到共游园再到最后分别整个故事线串联起来，共有“重逢”、“共饮”、“游园”、“离别”、“思念”五幕场景，整体的色调从两人相遇之初的较为明媚也渐渐转变为离别时的冷色。",
            url: "",
          },
          {
            src: require("../assets/cover/24.jpeg"),
            title: "千千回·狮子林",
            post_title_en: "千千回·狮子林",
            id: -24,
            keywords_en: "苏州园林|佛教禅宗|长卷插画",
            keywords_zh: "苏州园林|佛教禅宗|长卷插画",
            authors_en: ["李依阳"],
            authors: ["李依阳"],
            tutors_en: "赵伟 吴静子 王晶 宋佳音",
            tutors_zh: "赵伟 吴静子 王晶 宋佳音",
            intro_en:
              "作品灵感来源于苏州狮子林及其典故，作者将其加以畅想和续写。狮子林是一座禅宗背景浓厚的园林，相传是为纪念天如法师，其弟子取其坐骑狻猊之名命名此园。后世代辗转多人之手直至今日被大众所喜爱。在我的畅想中，法师百年之后，其灵魂依旧留存于此，一世世的轮回把不同时代的他吸引回到这里；从王侯将相，到市井小民。每一世与狮子林和园林的相遇都让他流连忘返。沧海桑田，苏州园林仍是一个有着千年历史的精神家园。法师的转世也许仍在狮子林中穿梭，在人世间游走。我们不知道他什么时候能找到他的“禅”，只听风声雨声书声皆消散，只有庙宇钟声与青烟袅袅，佛祖拈花微笑，千年时光，不过弹指一挥间。",
            intro_zh:
              "作品灵感来源于苏州狮子林及其典故，作者将其加以畅想和续写。狮子林是一座禅宗背景浓厚的园林，相传是为纪念天如法师，其弟子取其坐骑狻猊之名命名此园。后世代辗转多人之手直至今日被大众所喜爱。在我的畅想中，法师百年之后，其灵魂依旧留存于此，一世世的轮回把不同时代的他吸引回到这里；从王侯将相，到市井小民。每一世与狮子林和园林的相遇都让他流连忘返。沧海桑田，苏州园林仍是一个有着千年历史的精神家园。法师的转世也许仍在狮子林中穿梭，在人世间游走。我们不知道他什么时候能找到他的“禅”，只听风声雨声书声皆消散，只有庙宇钟声与青烟袅袅，佛祖拈花微笑，千年时光，不过弹指一挥间。",
            url: "",
          },
          {
            src: require("../assets/cover/25.jpeg"),
            title: "幽人居",
            post_title_en: "幽人居",
            id: -25,
            keywords_en: "光与影|中国园林|山水自然",
            keywords_zh: "光与影|中国园林|山水自然",
            authors_en: ["郑涵"],
            authors: ["郑涵"],
            tutors_en: "王晶 吴静子 赵伟 宋佳音",
            tutors_zh: "王晶 吴静子 赵伟 宋佳音",
            intro_en:
              "该长卷从描绘园林的光与影出发，通过颜色表达园林中不同的光影呈现。竹林是表达光影的一个主要的出发点，长卷以隐藏在竹林中的建筑为起点，描绘了深林中幽深细微的光影，渐渐场景从深林过渡到建筑中，光影穿过池水升腾的雾气在水面形成光斑，光影在园林建筑墙面留下的光影，建筑在水中的倒影以及水反映在建筑上面的波纹等。最后以抽象的月影结尾，表现园林白天黑夜的轮转。",
            intro_zh:
              "该长卷从描绘园林的光与影出发，通过颜色表达园林中不同的光影呈现。竹林是表达光影的一个主要的出发点，长卷以隐藏在竹林中的建筑为起点，描绘了深林中幽深细微的光影，渐渐场景从深林过渡到建筑中，光影穿过池水升腾的雾气在水面形成光斑，光影在园林建筑墙面留下的光影，建筑在水中的倒影以及水反映在建筑上面的波纹等。最后以抽象的月影结尾，表现园林白天黑夜的轮转。",
            url: "",
          },
          {
            src: require("../assets/cover/26.jpeg"),
            title: "我们这十年——中国速度",
            post_title_en: "我们这十年——中国速度",
            id: -26,
            keywords_en: "科技实力|发展进步|社会制度",
            keywords_zh: "科技实力|发展进步|社会制度",
            authors_en: ["胡春怡"],
            authors: ["胡春怡"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "该插画设计以中国这十年不管是科技实力、发展进步还是在社会制度上为出发点，以此彰显出中国这十年在效率方面的突飞猛进。该插画选取了一些当今社会具有代表性的人物及事物，和平鸽、向日葵等加以点缀来体现当今社会的和谐稳定，以报纸的形式表现出来。“高铁”折射了科技实力的提升，通过高铁蜿蜒曲折的表现手法不仅在画面空间上得到延伸，更是将画面从左到右分割成“建设中的中国”以及“当今的中国”，以此凝聚了这十年发展进步的动力；新冠疫情的爆发，中国一次次的快速出击，防控人员坚持不懈奋斗在抗疫前线，同舟共济、守望相助的家国情怀，无不彰显当今社会制度的优势。最后在画面整体色调上利用渐变手法将画面情节进行分割，大体上展示中国这十年的效率，体现“中国速度”。",
            intro_zh:
              "该插画设计以中国这十年不管是科技实力、发展进步还是在社会制度上为出发点，以此彰显出中国这十年在效率方面的突飞猛进。该插画选取了一些当今社会具有代表性的人物及事物，和平鸽、向日葵等加以点缀来体现当今社会的和谐稳定，以报纸的形式表现出来。“高铁”折射了科技实力的提升，通过高铁蜿蜒曲折的表现手法不仅在画面空间上得到延伸，更是将画面从左到右分割成“建设中的中国”以及“当今的中国”，以此凝聚了这十年发展进步的动力；新冠疫情的爆发，中国一次次的快速出击，防控人员坚持不懈奋斗在抗疫前线，同舟共济、守望相助的家国情怀，无不彰显当今社会制度的优势。最后在画面整体色调上利用渐变手法将画面情节进行分割，大体上展示中国这十年的效率，体现“中国速度”。",
            url: "",
          },
          {
            src: require("../assets/cover/27.jpeg"),
            title: "我们这十年——人间烟火",
            post_title_en: "我们这十年——人间烟火",
            id: -27,
            keywords_en: "人间烟火|世间百态|我们这十年",
            keywords_zh: "人间烟火|世间百态|我们这十年",
            authors_en: ["张姝敏"],
            authors: ["张姝敏"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "海报设计以街头摄影为灵感，观察“扫街”摄影中普通人的生活百态，以不同身份、职业的人们一起吃大桌饭的场景体现我们这十年的人间烟火气。",
            intro_zh:
              "海报设计以街头摄影为灵感，观察“扫街”摄影中普通人的生活百态，以不同身份、职业的人们一起吃大桌饭的场景体现我们这十年的人间烟火气。",
            url: "",
          },
          {
            src: require("../assets/cover/28.jpeg"),
            title: "",
            post_title_en: "",
            id: -28,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["南婷妍"],
            authors: ["南婷妍"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "海报设计以近十年来建筑设计概念的转变和变迁为基础，以线性表现方式展现；配色上借鉴运用蒙德里安“红黄蓝”三原色为基调。将十年间的主要建筑外观形态以二维的形式串联，结合想象和未来新型设计发展趋势展开拓展。",
            intro_zh:
              "海报设计以近十年来建筑设计概念的转变和变迁为基础，以线性表现方式展现；配色上借鉴运用蒙德里安“红黄蓝”三原色为基调。将十年间的主要建筑外观形态以二维的形式串联，结合想象和未来新型设计发展趋势展开拓展。",
            url: "",
          },
          {
            src: require("../assets/cover/29.jpeg"),
            title: "我们这十年——Live and let live",
            post_title_en: "我们这十年——Live and let live",
            id: -29,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["杨童禹"],
            authors: ["杨童禹"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "马可·奥勒利乌斯在《沉思集》中提到，存在物就像是奔腾不息的河流，事物处于不断变化之中。人们常常说，未来已来，十年来，我们的一呼一吸见证了时代的更迭，生生不息的时间里，有不同职业不同年龄的人们在与时间同呼吸共命运。该作品将作者国家这十年的发展与变化，分别从宏观-科技创新角度、微观-平凡岗位上的工作者等两个角度用绘画语言表达出来。",
            intro_zh:
              "马可·奥勒利乌斯在《沉思集》中提到，存在物就像是奔腾不息的河流，事物处于不断变化之中。人们常常说，未来已来，十年来，我们的一呼一吸见证了时代的更迭，生生不息的时间里，有不同职业不同年龄的人们在与时间同呼吸共命运。该作品将作者国家这十年的发展与变化，分别从宏观-科技创新角度、微观-平凡岗位上的工作者等两个角度用绘画语言表达出来。",
            url: "",
          },
          {
            src: require("../assets/cover/30.jpeg"),
            title: "我们这十年——职业兴替",
            post_title_en: "我们这十年——职业兴替",
            id: -30,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["严少青"],
            authors: ["严少青"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "新兴职业的演替可以侧面反映一个国家政治、经济、文化的发展，该作品选取2013年-2022年最具代表性的新兴职业来反映这十年我国的所面对的机遇与挑战以及所取得的成就；",
            intro_zh:
              "新兴职业的演替可以侧面反映一个国家政治、经济、文化的发展，该作品选取2013年-2022年最具代表性的新兴职业来反映这十年我国的所面对的机遇与挑战以及所取得的成就；",
            url: "",
          },
          {
            src: "",
            title: "我们这十年——中国航天",
            post_title_en: "我们这十年——中国航天",
            id: -31,
            keywords_en: "中国航天|中国梦",
            keywords_zh: "中国航天|中国梦",
            authors_en: ["马姝帆"],
            authors: ["马姝帆"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "十年来，中国航天用硬核实力对古老的故事传说进行了全新诠释与精彩演绎，将古人对灿烂星河的憧憬与后人对浩瀚宇宙的探索牵连，将现代科技与传统文化完美融合，一步步让“神话”走进现实。 十年来，中国航天硕果累累；作品集中表达中国航天的实力和水平的不断提高，中国航天一次次飞跃，不断创造新高度；用航天梦托举起新时代的中国梦。",
            intro_zh:
              "十年来，中国航天用硬核实力对古老的故事传说进行了全新诠释与精彩演绎，将古人对灿烂星河的憧憬与后人对浩瀚宇宙的探索牵连，将现代科技与传统文化完美融合，一步步让“神话”走进现实。 十年来，中国航天硕果累累；作品集中表达中国航天的实力和水平的不断提高，中国航天一次次飞跃，不断创造新高度；用航天梦托举起新时代的中国梦。",
            url: "",
          },
        ];
      } else this.getList(val);
      this.totalNum = this.cardList.length;
      this.currentNum = 4;
      let totalHeight =
        0.75 * window.innerHeight -
        5.125 *
          parseInt(
            document
              .getElementsByTagName("html")[0]
              .style.fontSize.split("px")[0]
          );
      this.calcHeight = (this.currentNum / this.totalNum) * totalHeight;
    },
  },
  mounted() {
    let scene = document.getElementById("scene");
    let parallaxInstance = new Parallax(scene, {
      relativeInput: true,
    });
    let scene2 = document.getElementById("scene2");
    let parallaxInstance2 = new Parallax(scene2, {
      relativeInput: true,
    });
    console.log(parallaxInstance, parallaxInstance2);
    this.$bus.$on("clickState", (i) => {
      let toTop = Math.min(0, (1 - 2 * i) * window.innerHeight);
      window.scrollTo({
        top: -toTop,
        left: 0,
        behavior: "smooth",
      });
    });
    this.getList(1);
    window.addEventListener("scroll", () => {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      this.handleMouseWheel(-scrollTop);
    });
  },
};
</script>
<style scoped>
.home {
  position: fixed;
  width: 1920px;
  height: 100vh;
  overflow: hidden;
}
.wrapper {
  width: 1920px;
  height: 1670vh;
}
.preface {
  position: absolute;
  width: 100%;
  height: 100vh;
}
.preface img {
  width: 100%;
  height: 100%;
}
.epilogue {
  position: absolute;
  width: 100%;
  height: 170vh;
  margin-top: 1500vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: 700;
  background-image: url("../assets/glass.png");
  background-size: auto 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  overflow: hidden;
}
.epilogue-content {
  width: 840px;
  height: 170vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
}
.epilogue-space {
  display: flex;
  align-items: center;
  justify-content: center;
}
.epilogue-code {
  margin-top: 720px;
  width: 224px;
}
.epilogue-code + .epilogue-code {
  margin-left: 94px;
}
.epilogue-svg {
  width: 700px;
  margin-top: 150px;
  flex-shrink: 0;
}
.epilogue-svg-1 {
  position: absolute;
  width: 700px;
  top: 150px;
}
.music {
  position: absolute;
  right: 64px;
  top: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}
.music div {
  overflow: hidden;
}
.music-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 12px;
}
.music-text {
  writing-mode: vertical-lr;
  text-align: center;
  font-weight: 200;
  font-size: 23px;
  color: #262626;
  letter-spacing: 0.16em;
}
.seal-icon {
  position: absolute;
  left: 170px;
  top: 260px;
  height: 40px;
  cursor: pointer;
}
.b1 {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.b2 {
  position: absolute;
  margin-top: 300vh;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.bm {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../assets/back_main.png");
  background-size: 100%;
  background-repeat: no-repeat;
  filter: blur(15px);
}
#scene,
.layer {
  overflow: visible;
}
.back-img {
  width: 125%;
  margin-left: -10%;
  margin-top: -10%;
}
.f1 {
  transform: translateZ(0);
  position: absolute;
  margin-top: 100vh;
  width: 100%;
  height: 100vh;
  mask-size: 100%;
  -webkit-mask-size: 100%;
  -webkit-mask-position-y: -90px;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  backdrop-filter: blur(30px);
  overflow: hidden;
}
.fm {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  z-index: 80;
}
.fm-space,
.epilogue-space {
  flex-grow: 2;
}
.fm-content {
  width: 840px;
  height: 75vh;
  margin-top: 50px;
  margin-right: 20px;
  display: flex;
  flex-wrap: wrap;
}
.fm-content::-webkit-scrollbar {
  display: none !important;
}
.fm-items {
  border-radius: 32px;
  width: 370px;
  height: 310px;
  border: 1px solid #ccc;
  margin: 20px;
  margin-top: 0;
  margin-bottom: 30px;
  background: linear-gradient(
    139.1deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.25) 118.63%
  );
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.fm-cover {
  width: 328px;
  height: 182px;
  border-radius: 24px;
  margin-top: 24px;
  object-fit: cover;
}
.fm-items p {
  font-size: 24px;
  color: #262626;
  align-self: flex-start;
  margin: 0 22px;
  margin-top: 18px;
  width: 326px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: unset;
  line-height: 30px;
}
.fm-scroll {
  position: relative;
  width: 82px;
  height: 75vh;
  margin-top: 50px;
  margin-right: 52px;
}
.scroll-start {
  position: absolute;
  right: 41px;
  width: 41px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scroll-line {
  width: 4px;
  max-height: calc(75vh - 82px);
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transition: height 0.2s;
}
.scroll-start-box {
  width: 41px;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.26);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shadow-1 {
  border-radius: 10px;
}
.scroll-end {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
}
.scroll-end-text {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
}
.f1-img {
  position: absolute;
  top: -90px;
  width: 100%;
}
.f1-text {
  position: absolute;
  margin-top: 220px;
  width: 540px;
  left: 312px;
  z-index: 90;
  display: flex;
  flex-direction: column;
}
.f1-title {
  font-size: 36px;
  letter-spacing: 0.72em;
  color: #ffffff;
  font-weight: 700;
  transition: color 0.5s;
  margin-bottom: 8px;
}
.f1-title-en {
  font-size: 36px;
  letter-spacing: 0.32em;
  color: #ffffff;
  font-weight: 700;
  transition: color 0.5s;
  margin-bottom: 64px;
}
.f1-title-active {
  color: #182e7a;
}
.f1-item-title {
  font-size: 30px;
  line-height: 40px;
  color: #262626;
  white-space: unset;
  margin-bottom: 16px;
}
.f1-detail {
  margin-top: -24px;
  display: flex;
  flex-direction: column;
}
.f1-paragraph-0,
.f1-paragraph--1,
.f1-paragraph--2 {
  white-space: unset;
  font-weight: 200;
  font-size: 24px;
  line-height: 48px;
  text-align: justify;
  color: #262626;
  text-shadow: 4px 8px 8px rgba(0, 0, 0, 0.16);
}
.f1-paragraph-1 {
  margin-bottom: 32px;
  white-space: unset;
  font-weight: 200;
  font-size: 24px;
  line-height: 48px;
  text-align: justify;
  color: #ffffff;
  text-shadow: 4px 8px 8px rgba(0, 0, 0, 0.16);
}
.f1-paragraph-2 {
  white-space: unset;
  font-weight: 200;
  font-size: 24px;
  line-height: 48px;
  text-align: justify;
  color: #ffffff;
  text-shadow: 4px 8px 8px rgba(0, 0, 0, 0.16);
}
.f1-paragraph-3,
.f1-paragraph-4,
.f1-paragraph-5 {
  white-space: unset;
  font-weight: 200;
  font-size: 24px;
  line-height: 48px;
  text-align: justify;
  color: #262626;
  text-shadow: 4px 8px 8px rgba(0, 0, 0, 0.16);
}
.f1-keywords-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.f1-keywords-group div {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  padding: 4px 8px;
  font-weight: 200;
  margin-right: 12px;
  border: 1px solid #bcbebe;
  margin-bottom: 8px;
}
.bm-img-building {
  width: 1000px;
  margin-left: 100px;
  margin-top: 300px;
  transition: all 1s ease-in;
}
.bm-img-cloud-1 {
  width: 1920px;
  transition: all 0.75s ease-in;
}
.bm-img-cloud-2 {
  width: 1000px;
  margin-left: -300px;
  margin-top: 400px;
  transition: all 0.75s ease-in;
}
.bm-img-cloud-3 {
  width: 1800px;
  margin-left: 350px;
  margin-top: 400px;
  transition: all 0.75s ease-in;
}
.active-building {
  margin-top: 560px;
}
.active-cloud-1 {
  margin-top: 180px;
  margin-left: -100px;
}
.active-cloud-2 {
  margin-left: -150px;
  margin-top: 450px;
}
.active-cloud-3 {
  margin-left: 250px;
  margin-top: 320px;
}
.fm-items:hover .fm-wave {
  bottom: 0;
}
.fm-wave {
  position: absolute;
  right: 0;
  bottom: -200px;
  width: 320px;
  transition: all 0.5s;
}
.fm-wave-active {
  bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-2-enter-active,
.fade-2-leave-active {
  transition: opacity 0.5s;
}

.fade-2-enter,
.fade-2-leave-to {
  opacity: 0;
}
.f1-label-name-group {
  display: flex;
  margin-bottom: 8px;
}
.f1-label {
  font-size: 16px;
  color: #262626;
  margin-right: 16px;
  flex-shrink: 0;
}
.f1-name {
  flex-grow: 2;
  display: flex;
  flex-wrap: wrap;
  font-weight: 300;
  font-size: 16px;
  color: #8c8c8c;
}
.f1-name p {
  margin-right: 6px;
  margin-bottom: 8px;
}
.f1-intro {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: unset;
  font-weight: 300;
  font-size: 20px;
  line-height: 40px;
  text-align: justify;
  color: #262626;
  margin-bottom: 8px;
  text-shadow: 4px 8px 16px rgba(255, 255, 255, 0.24);
}
.f1-close {
  width: 40px;
  height: 40px;
  align-self: center;
  cursor: pointer;
  margin-top: 16px;
}
.f1-enter {
  align-self: flex-end;
  display: flex;
  width: max-content;
  align-items: center;
  cursor: pointer;
}
.f1-enter p {
  margin-right: 8px;
  font-weight: 500;
  font-size: 24px;
  color: #262626;
}
.f1-enter img {
  width: 32px;
  height: 32px;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rolling-img {
  animation: rotate 5s linear infinite;
}
@keyframes scroll {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
.scrolling-text {
  animation: scroll 8s linear infinite;
}
@media screen and (max-width: 620px) {
  .home {
    position: relative;
    width: 414px;
  }
}
</style>