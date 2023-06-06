<template>
  <div :class="'graduate' + (notMobile ? ' pc-graduate' : ' m-graduate')">
    <template v-if="notMobile">
      <img
        :src="
          lang === 'cn'
            ? require('../assets/words.svg')
            : require('../assets/words_en.svg')
        "
        class="words noSelect"
        @dragstart.prevent
        alt="words"
      />
      <div class="s-title">指导教师</div>
      <div class="s-group">
        <div class="card" v-for="i in 12" :key="i">
          <img
            :src="require('../assets/sponsor/0/' + i + '.jpeg')"
            class="card-img"
            alt="avatar"
            preview="1"
          />
          <div class="card-name-line">
            <p class="card-name">{{ teacher[i - 1][0] }}</p>
            <p class="card-class"></p>
          </div>
          <p class="card-intro">{{ teacher[i - 1][1] }}</p>
        </div>
      </div>
      <template v-for="i in 8">
        <div class="s-title" :key="i + 't'">{{ titles[i].title }}</div>
        <div class="s-group" :key="i + 's'">
          <div
            class="card"
            v-for="(person, j) in titles[i].content"
            :key="i + ' ' + j"
          >
            <img
              :src="require('../assets/sponsor/' + i + '/' + (j + 1) + '.jpeg')"
              class="card-img"
              alt="avatar"
              preview="1"
            />
            <div class="card-name-line">
              <p class="card-name">{{ person.name }}</p>
              <p class="card-class"></p>
            </div>
            <p class="card-intro">{{ person.job }}</p>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="nav-img">
        <img src="../assets/mobile/t2.svg" />
        <div class="bt1" @click="toGraduate"></div>
        <div class="bt2"></div>
      </div>
      <div class="students">
        <template v-for="(title, i) in titles">
          <div :key="i + 'a'" class="letter" :id="'title' + i">
            <img
              :src="
                i == nowChar
                  ? require('../assets/mobile/y.svg')
                  : require('../assets/mobile/n.svg')
              "
            />
            {{ title.title }}
            <div class="point" :id="'titles' + i"></div>
          </div>
          <div
            v-for="(item, j) in title.content"
            :key="i + ' ' + j"
            class="student-item"
          >
            <img
              v-lazy="
                require('../assets/sponsor/' + i + '/' + (j + 1) + '.jpeg')
              "
              @dragstart.prevent
              alt="avatar"
            />
            <div :key="i + ' a' + j" class="text-item-name">
              {{ item.name }}
            </div>
            <div :key="i + ' b' + j" class="text-item-job">
              {{ item.job }}
            </div>
          </div>
        </template>
      </div>
      <div class="letters-nav">
        <div
          v-for="item in 9"
          :key="item"
          :class="'letter-nav' + (item - 1 === nowChar ? ' nav-active' : '')"
          @click="getLetter(item - 1)"
        >
          <img
            :src="
              item - 1 === nowChar
                ? require('../assets/mobile/y.svg')
                : require('../assets/mobile/n.svg')
            "
          />
          {{ titles[item - 1].title }}
        </div>
      </div>
    </template>
    <div class="msg-dialog" v-if="msgDialog" key="a">
      <div :class="'msg-img' + (localLang === 'en' ? ' msg-en-img' : '')">
        <div class="msg-btn" @click="hideMsg"></div>
        <div class="msg-btn-2" @click="switchLocalLang"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notMobile"],
  created() {
    if (!this.notMobile) this.showMsg();
    window.addEventListener("scroll", () => {
      if (this.auto) return;
      if (document.getElementById("title1")) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop < document.getElementById("title1").offsetTop - 100) {
          this.nowChar = 0;
        } else if (
          scrollTop <
          document.getElementById("title2").offsetTop - 100
        ) {
          this.nowChar = 1;
        } else if (
          scrollTop <
          document.getElementById("title3").offsetTop - 100
        ) {
          this.nowChar = 2;
        } else if (
          scrollTop <
          document.getElementById("title4").offsetTop - 100
        ) {
          this.nowChar = 3;
        } else if (
          scrollTop <
          document.getElementById("title5").offsetTop - 100
        ) {
          this.nowChar = 4;
        } else if (
          scrollTop <
          document.getElementById("title6").offsetTop - 100
        ) {
          this.nowChar = 5;
        } else if (
          scrollTop <
          document.getElementById("title7").offsetTop - 100
        ) {
          this.nowChar = 6;
        } else {
          this.nowChar = 7;
        }
      }
    });
  },
  methods: {
    toGraduate() {
      this.$router.push("/graduate");
    },
    getLetter(letter) {
      this.$nextTick(() => {
        this.nowChar = letter;
        this.auto = true;
        setTimeout(() => {
          this.auto = false;
        }, 1200);
        if (document.getElementById("titles" + letter)) {
          document.getElementById("titles" + letter).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    },
    showMsg() {
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      this.msgDialog = true;
    },
    hideMsg() {
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.position = "relative";
      this.msgDialog = false;
    },
    switchLocalLang() {
      this.localLang = this.localLang === "cn" ? "en" : "cn";
    },
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  data() {
    return {
      auto: false,
      nowChar: 1,
      top: [0, 100, 400],
      localLang: this.$i18n.locale,
      msgDialog: false,
      teacher: [
        ["边放", "展览理论知识讲授、设计指导"],
        ["杨君宇", "年展视觉设计指导"],
        ["张赫晨", "年展策划协调、设计指导"],
        ["李擎炜", "年展实验指导、文宣指导"],
        ["张小弸", "环艺指导教师"],
        ["赵伟", "环艺指导教师"],
        ["李兴", "动画指导教师"],
        ["郭滢", "动画指导教师"],
        ["赵天娇", "动画指导教师"],
        ["赵晶", "动画指导教师"],
        ["彭志军", "动画指导教师"],
        ["孙晗", "动画指导教师"],
      ],
      titles: {
        0: {
          title: "指导教师",
          content: [
            {
              name: "边放",
              job: "展览理论知识讲授、设计指导",
            },
            {
              name: "杨君宇",
              job: "年展视觉设计指导",
            },
            {
              name: "张赫晨",
              job: "年展策划协调、设计指导",
            },
            {
              name: "李擎炜",
              job: "年展实验指导、文宣指导",
            },
            {
              name: "项忠霞",
              job: "19班导师",
            },
          ],
        },
        1: {
          title: "总负责",
          content: [
            {
              name: "张广林",
              job: "展览总体策划、协调，随时介入各组工作，兼管策展组，并对策展资料存档",
            },
          ],
        },
        2: {
          title: "策展A组",
          content: [
            {
              name: "周双彦",
              job: "线下展览设计，线下策展统筹与对接",
            },
            {
              name: "耿旭冉",
              job: "线下展览设计，展具统计及购买",
            },
            {
              name: "胡可昕",
              job: "线下展览设计，线上财务",
            },
            {
              name: "王紫桐",
              job: "线下展览布置，线上线下财务，线下展览建模",
            },
            {
              name: "于业淼",
              job: "线下展览布置，线上线下财务，线下展览建模",
            },
          ],
        },
        3: {
          title: "策展B组",
          content: [
            {
              name: "何子文",
              job: "线上展览规划与设计，线上线下的统筹与对接",
            },
            {
              name: "王铸涛",
              job: "线上展览手机端设计、线上展览电脑端设计",
            },
            {
              name: "宋海雯",
              job: "线上展览电脑端设计 设计组对接",
            },
            {
              name: "刘宏伟",
              job: "线上展览电脑端与手机端网页前端开发",
            },
            {
              name: "李杰",
              job: "特邀教师，负责网站搭建",
            },
            {
              name: "肖金",
              job: "线上展览后端开发",
            },
          ],
        },
        4: {
          title: "策展C组",
          content: [
            {
              name: "张淋悦",
              job: "展品信息统计整理对接，辅助策展",
            },
            {
              name: "贾皓璇",
              job: "展品信息统计整理，辅助策展",
            },
            {
              name: "王浩",
              job: "展品信息统计整理，辅助策展",
            },
          ],
        },
        5: {
          title: "设计组",
          content: [
            {
              name: "乔博宇",
              job: "统筹设计组工作，负责设计组和其他组进行工作对接",
            },
            {
              name: "赵芳悦",
              job: "负责与线上策展组对接，辅助设计工作",
            },
            {
              name: "许诺",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "杜琬琪",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "方宇凌",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "王宁宁",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "杨晰然",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "邸杨",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "刘千千",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
            {
              name: "白悦",
              job: "参与主视觉，辅助图形以及线上线下设计工作",
            },
          ],
        },
        6: {
          title: "文宣组",
          content: [
            {
              name: "于米提江",
              job: "统筹文宣组工作、H5、预热片、负责宣传",
            },
            {
              name: "陈书恒",
              job: "负责预热片、宣传片的脚本和剪辑",
            },
            {
              name: "周蒙",
              job: "预热片、宣传片",
            },
            {
              name: "王博约",
              job: "文案，预热片，宣传片，推送",
            },
            {
              name: "赵书苇",
              job: "文案、宣传片、预热片，推送",
            },
            {
              name: "特列克",
              job: "预热片、宣传片",
            },
            {
              name: "边巴次仁",
              job: "预热片、宣传片",
            },
            {
              name: "哈林",
              job: "预热片、宣传片、布展",
            },
          ],
        },
        7: {
          title: "对接人",
          content: [
            {
              name: "张以琳",
              job: "19工设展品对接",
            },
            {
              name: "顾佳奇",
              job: "19宣怀展品对接",
            },
            {
              name: "贾皓璇",
              job: "20工设展品对接",
            },
            {
              name: "江长林",
              job: "21工设展品对接",
            },
            {
              name: "苑景宣",
              job: "硕士展品对接",
            },
          ],
        },
        8: {
          title: "动画",
          content: [
            {
              name: "贾晗舒越",
              job: "展览动画与环艺部分总体策划、协调，统筹展区规划与展线设计，与其他组对接，物料收集与整理，布展协调与安排",
            },
            {
              name: "谢金金",
              job: "展览动画部分宣传，设计，纪录片组三组与其他组的对接，统筹动画宣传片组工作，信息整理",
            },
            {
              name: "李婧绮",
              job: "展览动画部分交互，文案，模型组三组和其他组的对接，衍生品物料收集与整理，布展",
            },
            {
              name: "马思雨",
              job: "策展组。统筹展区规划与展线设计，与其他组对接",
            },
            {
              name: "田怡萱",
              job: "策展组工作，负责优秀衍生品、圆台悬挂插画、场设角色折纸墙",
            },
            {
              name: "李嘉欣",
              job: "策展组工作，负责观影区、模型区设计，模型组、交互组对接等工作",
            },
            {
              name: "秦梓瑄",
              job: "策展组工作，负责观影区、模型区设计，折纸墙布置，模型组的对接等工作",
            },
            {
              name: "郭蔚靖",
              job: "策展组工作，负责流动屏遮挡处理、毕设海报光盘、天上装饰性悬挂物布局设计",
            },
            {
              name: "薛一",
              job: "策展组工作，负责圆台插画与折叠展示墙设计",
            },
            {
              name: "祝维佳",
              job: "财务管理，采购物资，开发票，毕设海报展示墙面设计",
            },
            {
              name: "柳思远",
              job: "外联组工作，负责信息、作品收集，与工设，环艺对接",
            },
            {
              name: "乔稳",
              job: "外联组工作，负责21级场景设计作业以及插画作品收集，毕业作品规范整理",
            },
            {
              name: "郭鎏祥",
              job: "负责收集环艺作品，上传b站动画毕设",
            },
            {
              name: "王若涵",
              job: "外联组，负责22级衍生品收集整理21级作业收集，联系老师",
            },
            {
              name: "杨潇涵",
              job: "统筹设计组工作，设计IP形象、展板，设计和制作周边文创",
            },
            {
              name: "辛天瑀",
              job: "设计IP形象、长幅海报",
            },
            {
              name: "齐中悦",
              job: "设计海报，参与文创设计与制作",
            },
            {
              name: "刘莹",
              job: "设计IP形象，参与文创设计与制作，参与Ai头像制作",
            },
            {
              name: "商琬琪",
              job: "统筹文创设计与制作，设计展板，绘制衍生品底图",
            },
            {
              name: "吴梦钰",
              job: "参与文创设计与制作，绘制衍生品底图",
            },
            {
              name: "杨滢嘉",
              job: "设计动画主视觉，制作长幅海报，参与Ai头像制作",
            },
            {
              name: "李晓晗",
              job: "参与文创设计与制作，设计展板，绘制衍生品底图",
            },
            {
              name: "刘彦君",
              job: "统筹纪录片组工作、纪录片脚本与拍摄",
            },
            {
              name: "董晓雨",
              job: "纪录片拍摄",
            },
            {
              name: "王健萍",
              job: "纪录片剪辑",
            },
            {
              name: "朱美霖",
              job: "纪录片剪辑",
            },
            {
              name: "王铭",
              job: "参与纪录片录制",
            },
            {
              name: "赖怡萱",
              job: "参与Ai头像制作",
            },
            {
              name: "李兆宇",
              job: "负责IP形象动画制作",
            },
            {
              name: "张晓熹",
              job: "负责IP形象动画制作",
            },
            {
              name: "于小展",
              job: "负责IP形象动画制作",
            },
            {
              name: "谢搏珩",
              job: "预热片结尾的主视觉版式设计",
            },
            {
              name: "孙维序",
              job: "整理动画毕设、收集素材",
            },
            {
              name: "王子暄",
              job: "参与动画宣传片设计",
            },
            {
              name: "吴梦晗",
              job: "负责板块文案的撰写，标题引语等，发布公共号",
            },
            {
              name: "丁一菲",
              job: "展览文案的编写和修整；参与布置展览",
            },
            {
              name: "马欣辰",
              job: "负责编写文案、标语等编写，协助其他组的工作。",
            },
            {
              name: "李佩儒",
              job: "展览文案创想编辑及修整；协助纪录片组拍摄策展视频；参与布置展览",
            },
            {
              name: "向芊芊",
              job: "制定交互方案，涂鸦板制作",
            },
            {
              name: "贾若冰",
              job: "照相小框设计",
            },
            {
              name: "曹思雨",
              job: "交互装置提案与设计，ai头像制作，各组对接与工作汇报，线下展览布置",
            },
            {
              name: "李烨",
              job: "线下展览布置，交互装置设计",
            },
            {
              name: "付有",
              job: "线下展览布置，海报交互设计",
            },
            {
              name: "马恒苒",
              job: "线下展览布置,交互装置设计",
            },
            {
              name: "朱洁扬",
              job: "线下展览布置,交互装置设计 照片大框设计",
            },
            {
              name: "丁思源",
              job: "线下展览布置，交互装置设计",
            },
            {
              name: "杨枫",
              job: "负责定格动画的模型制作，后期布景拍摄以及展览模型布置等工作",
            },
            {
              name: "李昂轩",
              job: "负责定格动画的模型制作，后期布景拍摄以及展览模型布置等工作",
            },
            {
              name: "牛青乐",
              job: "模型制作，二维绘制，展览布置等工作",
            },
            {
              name: "徐昭慧",
              job: "负责定格动画的模型制作，后期布景拍摄以及展览模型布置等工作",
            },
            {
              name: "杨昕源",
              job: "负责定格动画的模型制作，后期布景拍摄，二维绘制以及展览模型布置等工作",
            },
          ],
        },
      },
      letters: [
        "B",
        "C",
        "D",
        "H",
        "L",
        "M",
        "Q",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      num: {
        B: 2,
        C: 6,
        D: 1,
        H: 2,
        L: 9,
        M: 1,
        Q: 1,
        S: 1,
        T: 3,
        W: 15,
        X: 2,
        Y: 7,
        Z: 12,
      },
    };
  },
};
</script>

<style scoped>
.graduate {
  position: relative;
}
.pc-graduate {
  background-image: url("../assets/g2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 200px;
  padding-bottom: 120px;
}
.m-graduate {
  padding-top: 50px;
  background-image: url("../assets/mobile/bi.png");
  background-size: 100%;
  background-attachment: fixed;
  background-position: 0 0;
}
.words {
  width: 1027px;
  margin-bottom: 80px;
}
.s-title {
  font-weight: 400;
  font-size: 36px;
  color: #262626;
  margin-bottom: 32px;
  margin-top: 64px;
}
.s-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 150px;
}
.card {
  width: 320px;
  box-sizing: border-box;
  padding: 24px;
  background-image: url("../assets/g1.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  margin: 32px;
  flex-shrink: 0;
  margin-top: 0;
}
.card-img {
  width: 272px;
  height: 272px;
  border-radius: 16px;
  object-fit: cover;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-position: top;
}
.nav {
  display: grid;
  width: 100%;
  height: 44px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  margin-top: 6px;
}
.nav-img {
  position: relative;
  width: 394px;
  margin: 0 auto;
}
.nav-img img {
  width: 100%;
}
.bt1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}
.bt2 {
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
}
.content-text {
  margin-left: 450px;
  margin-right: 180px;
  font-size: 25px;
  font-weight: 500;
  margin-top: 32px;
  line-height: 40px;
  text-align: justify;
}
.card-name-line {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-end;
}
.card-name {
  font-weight: 400;
  font-size: 30px;
  color: #262626;
  flex-shrink: 0;
}
.card-info {
  flex-grow: 2;
  height: 272px;
  display: flex;
  flex-direction: column;
}
.card-intro {
  margin-bottom: 8px;
  font-weight: 300;
  font-size: 16px;
  color: #898989;
  white-space: unset;
}
.group {
  margin-top: 50px;
  margin-left: 450px;
  margin-right: 160px;
  margin-bottom: 100px;
  overflow: visible;
}
.nav-1 {
  background-color: #d36a64;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.nav-2 {
  font-weight: 300;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d36a64;
  background-color: white;
}
.teacher {
  margin-top: 25px;
  width: 100%;
}
.teacher-title {
  margin-top: 90px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
.teacher-images {
  display: flex;
  justify-content: space-between;
  margin: 80px 85px;
  margin-bottom: 0px;
}
.teacher-images img {
  width: 863px;
  height: 282px;
}
.student {
  position: relative;
  margin-top: 25px;
  width: 100%;
}
.student-title {
  margin-top: 90px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
.student-images {
  display: grid;
  grid-template-columns: 580px 580px 580px;
  grid-template-rows: repeat(auto-fill, 190px);
  row-gap: 30px;
  margin: 80px 85px;
}
.student-images img {
  width: 580px;
  height: 190px;
}
.name-title {
  padding-left: 20px;
  position: relative;
  font-size: 25px;
  overflow: visible;
  margin-top: 40px;
  margin-bottom: 20px;
}
.back_7 {
  position: absolute;
  right: -2px;
  top: 210px;
  width: 55px;
  height: 55px;
}
.back_4 {
  position: absolute;
}
.back_4_1,
.back_4_2,
.back_4_8 {
  width: 35px;
  height: 40px;
  left: 0px;
  top: -10px;
}
.back_4_3,
.back_4_4,
.back_4_5,
.back_4_6,
.back_4_7 {
  width: 53px;
  height: 47px;
  left: -6px;
  top: -15px;
}
.back_3_1 {
  position: absolute;
  left: 50%;
  top: 190px;
  transform: translateX(-50%);
  width: 695px;
  height: 24px;
}
.back_3_2 {
  position: absolute;
  left: 50%;
  top: 165px;
  transform: translateX(-50%);
  width: 695px;
  height: 24px;
}
.msg-dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 103;
}
.msg-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 414px;
  height: 561px;
  background-image: url("../assets/mobile/sponsor.png");
  background-size: 414px 561px;
}
.msg-en-img {
  background-image: url("../assets/mobile/sponsor-en.png");
}
.msg-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + 160px), calc(-50% - 240px));
  width: 50px;
  height: 50px;
}
.msg-btn-2 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + 140px), calc(-50% - 150px));
  width: 40px;
  height: 40px;
}
.students {
  margin-left: 110px;
  padding-bottom: 40px;
}
.letter {
  position: relative;
  margin-top: 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.letter span {
  font-size: 14px;
  color: #828282;
}
.point {
  position: absolute;
  top: -100px;
}
.desc {
  font-size: 10px;
  color: #8a8a8a;
  margin-bottom: 7px;
}
.student-item {
  width: 284px;
  height: 102px;
  margin: 3px 0;
  padding: 10px;
  background-image: url("../assets/g6.png");
  background-size: 100% 100%;
  display: grid;
  grid-template-columns: 82px auto;
  grid-template-rows: 36px 46px;
  column-gap: 16px;
  overflow: hidden;
}
.student-item img {
  width: 82px;
  height: 82px;
  grid-row: 1 / 3;
  object-fit: cover;
  object-position: top;
}
.web-student-item {
  display: inline-block;
  position: relative;
  width: 250px;
  margin-right: 20px;
  overflow: visible;
  vertical-align: top;
  margin-bottom: 20px;
}
.avatar {
  width: 250px;
  height: 250px;
  display: block;
  margin-bottom: 5px;
}
.text-item-name {
  font-weight: 500;
  font-size: 16px;
  color: #262626;
}
.text-item-job {
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  align-self: end;
}
.web-text-item-name {
  font-weight: 500;
  font-size: 23px;
  color: #000000;
  line-height: 38px;
  height: 38px;
}
.web-text-item-job {
  font-weight: 400;
  font-size: 18px;
  color: #8a8a8a;
  align-self: end;
}
.letters-nav {
  position: fixed;
  left: 16px;
  top: 150px;
  width: 82px;
  display: grid;
  grid-template-rows: repeat(8, 47px);
  align-items: center;
}
.letter-nav {
  font-size: 12px;
  color: #979696;
  display: flex;
  overflow: hidden;
  align-items: center;
  padding: 10px 10px 10px 10px;
  background-color: transparent;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid white;
  border-bottom: none;
}
.letter-nav img {
  width: 10px;
  height: 13px;
}
.letter-nav:last-of-type {
  border: 1px solid white;
}
.nav-active {
  color: #262626;
}
.capsule {
  position: absolute;
  left: 10px;
  bottom: 12px;
  width: 14px;
  height: 2px;
  background-color: #d36a65;
}
.back_1 {
  position: absolute;
  width: 310px;
  height: 360px;
  right: 0;
  top: -75px;
}
.back_3 {
  position: absolute;
  width: 818px;
  height: 850px;
  right: 0;
  bottom: 50px;
}
.title {
  overflow: visible;
  margin-top: 75px;
  margin-left: 120px;
  font-weight: 700;
  font-size: 40px;
  position: relative;
}
.back_2 {
  position: absolute;
  top: -50px;
  left: -90px;
  width: 180px;
  height: 180px;
}
</style>