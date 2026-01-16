<template>
  <div
    class="mixzone"
    @contextmenu.prevent
    ref="container"
    @mousemove="handleMouseMove"
  >
    <video
      v-if="show"
      src="../assets/mixzone.mp4"
      class="mixzone-video"
      id="video"
      autoplay
      muted
      loop
    ></video>
    <img
      :src="
        state
          ? require('../assets/mouse-r.svg')
          : require('../assets/mouse-l.svg')
      "
      class="mouse"
    />
    <img
      src="../assets/mouse-ll.svg"
      class="mouse-ll"
      v-if="combineItem !== ''"
    />
    <div class="container" ref="content">
      <div
        v-for="(item, index) in array"
        :key="index"
        ref="myDiv"
        class="box noSelect"
        :class="{
          shaking: !isMoving[index],
          active: arrayColor[index] === 1,
          self: arrayColor[index] === 2,
        }"
        :style="{
          'animation-delay': 2 * delayTimes[index] + 'ms',
          transform:
            'translate(-50%, -50%) scale(' +
            (arrayColor[index] === 2 && combineItem !== ''
              ? hugeSize
              : 0.6 + 0.0008 * delayTimes[index]) +
            ')',
          left: randomNumbers[0][index] + 'px',
          top: randomNumbers[1][index] + 'px',
          opacity: combineItem === item ? 0 : 1,
        }"
        @wheel="handleWheel"
        @mousedown.left="startMoving($event, index)"
        @mouseup.left="stopPress"
        @mousedown.right="stopMoving($event, index)"
      >
        <div class="back"></div>
        <div class="front">
          {{ item }}
          <template v-if="arrayColor[index] === 2 && combineItem !== ''">
            <img src="../assets/mix.svg" />
            {{ combineItem }}
          </template>
        </div>
      </div>
      <div
        class="card"
        ref="card"
        :style="{
          left: cardLeft + 'px',
          top: cardTop + 'px',
        }"
        v-if="combineItem !== ''"
      >
        <img
          class="card-cover"
          :src="
            UPLOAD_URL +
            worksList[current].more.thumbnail
          "
          alt="cover"
        />

        <p class="card-p" style="-webkit-box-orient: vertical">
          {{
            lang === "en"
              ? worksList[current].post_title_en
              : worksList[current].post_title
          }}
        </p>
        <div class="card-count">
          <img src="../assets/left.svg" />
          <span>{{ current + 1 }} / {{ worksList.length }}</span>
          <img src="../assets/right.svg" />
        </div>
        <img src="../assets/scroll.svg" class="card-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import service from "../utils/request.js";
import { UPLOAD_URL } from "../utils/constants.js";
export default {
  data() {
    return {
      UPLOAD_URL, // 暴露给模板使用
      array: [],
      arrayColor: [],
      moveHandlers: [],
      isMoving: [],
      show: false,
      delayTimes: [],
      scrollInterval: null,
      left: 0,
      pos: { clientX: 0, clientY: 0, z: true },
      randomNumbers: [[], []],
      state: false,
      longPressTimeout: null,
      subArray: [],
      radius: 50,
      combineItem: "",
      hugeSize: 1.6,
      cardLeft: 100,
      cardTop: 100,
      worksList: [{ more: {} }],
      current: 0,
    };
  },
  activated() {
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    handleWheel(e) {
      if (this.combineItem === "") return;
      if (e.deltaY > 0) {
        if (this.current < this.worksList.length - 1) {
          this.current++;
        } else {
          this.current = 0;
        }
      } else {
        if (this.current > 0) {
          this.current--;
        } else {
          this.current = this.worksList.length - 1;
        }
      }
    },
    handleMouseMove(event) {
      if (this.combineItem !== "") {
        this.stopScroll();
        return;
      }
      const container = this.$refs.container;
      const containerWidth = container.offsetWidth;
      const mouseX = event.clientX;
      const mousePosition = mouseX / containerWidth;
      if (mousePosition < 0.2 && mousePosition >= 0) {
        this.startScroll(container, -40);
      } else if (mousePosition > 0.8 && mousePosition <= 1) {
        this.startScroll(container, 40);
      } else {
        this.stopScroll();
      }
    },
    startScroll(container, speed) {
      if (this.scrollInterval) {
        return;
      }
      this.scrollInterval = setInterval(() => {
        container.scrollLeft += speed;
        this.moveHandlers.forEach((handler) => {
          handler(this.pos);
        });
      }, 100);
    },
    stopScroll() {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    },
    longPress() {
      if (this.combineItem === "") return;
      let itemList = "",
        from = "/mixzone";
      for (let i = 0; i < this.worksList.length; i++) {
        itemList += this.worksList[i].id + "_";
      }
      this.$router.push(
        "/exhibition/" +
          this.worksList[this.current].category_id +
          "/" +
          this.worksList[this.current].id +
          "?list=" +
          itemList +
          "&current=" +
          this.current +
          "&from=" +
          from
      );
    },
    stopPress() {
      clearTimeout(this.longPressTimeout);
    },
    findSame(i, index) {
      service(
        "/portal/api_v1/get_works_by_keywords?per_page=9999&current_page=1&cate_ids=58,59,60,61,62,63,64&keyword=" +
          this.array[index]
      ).then((data1) => {
        service(
          "/portal/api_v1/get_works_by_keywords?per_page=9999&current_page=1&cate_ids=58,59,60,61,62,63,64&keyword=" +
            this.array[i]
        ).then((data2) => {
          const intersection = this.findIntersection(
            data1.data.data,
            data2.data.data
          );
          this.worksList = intersection;
        });
      });
    },
    findIntersection(array1, array2) {
      return array1.filter((obj1) => {
        return array2.some((obj2) => obj2.id === obj1.id);
      });
    },
    updateColor(self = -1) {
      this.array.map((item, i) => {
        let flag = false;
        this.subArray.map((subItem) => {
          if (subItem === item) flag = true;
        });
        if (flag) this.$set(this.arrayColor, i, 1);
        else this.$set(this.arrayColor, i, 0);
      });
      if (self !== -1) this.$set(this.arrayColor, self, 2);
    },
    startMoving(event, index) {
      this.longPressTimeout = setTimeout(() => {
        this.longPress();
      }, 1000);
      if (this.isMoving[index]) return;
      event.preventDefault();
      const div = this.$refs.myDiv[index];
      div.style.zIndex = "80";
      this.$set(this.isMoving, index, true);
      this.state = true;
      service(
        "/portal/api_v1/get_keywords_by_key?cate_ids=58,59,60,61,62,63,64&keyword=" +
          this.array[index]
      ).then((data) => {
        this.subArray = data.data.filter((item) => item !== this.array[index]);
        this.updateColor(index);
      });
      const moveHandler = (event) => {
        if (!this.isMoving[index]) return;
        if (!event.z) {
          this.pos.clientX = event.clientX;
          this.pos.clientY = event.clientY;
        }
        this.left = this.$refs.container.scrollLeft;
        let left = event.clientX + this.left,
          top = event.clientY;
        div.style.left = left + "px";
        div.style.top = top + "px";
        if (this.combineItem !== "") {
          const container = this.$refs.container;
          const card = this.$refs.card;
          const containerWidth = container.offsetWidth;
          const cardWidth = card.offsetWidth;
          const cardHeight = card.offsetHeight;
          const mouseX = event.clientX;
          const mouseY = event.clientY;
          const mouseXPosition = mouseX / containerWidth;
          const mouseYPosition = mouseY / containerWidth;
          if (mouseXPosition > 0.75) {
            this.cardLeft = left - cardWidth - this.radius;
          } else {
            this.cardLeft = left + this.radius;
          }
          if (mouseYPosition > 0.3) {
            this.cardTop = top - cardHeight + this.radius;
          } else {
            this.cardTop = top - this.radius;
          }
        } else {
          this.$refs.myDiv.map((item, i) => {
            if (i == index) return;
            if (this.arrayColor[i] === 0) return;
            let itsLeft = parseInt(item.style.left.split("px")[0]),
              itsTop = parseInt(item.style.top.split("px")[0]);
            if (
              Math.abs(left - itsLeft) < this.radius &&
              Math.abs(top - itsTop) < this.radius
            ) {
              this.combineItem = this.array[i];
              this.findSame(i, index);
              this.hugeSize =
                0.6 +
                0.0008 * this.delayTimes[index] +
                0.0008 * this.delayTimes[i];
            }
          });
        }
      };
      this.moveHandlers[index] = moveHandler;
      document.addEventListener("mousemove", moveHandler);
    },
    stopMoving(event, index) {
      const div = this.$refs.myDiv[index];
      div.style.zIndex = "1";
      this.$set(this.isMoving, index, false);
      this.subArray = [];
      this.combineItem = "";
      this.updateColor(-1);
      this.state = false;
      if (!this.isMoving) {
        this.moveHandlers.forEach((handler) => {
          document.removeEventListener("mousemove", handler);
        });
      }
    },
    getRandomDelay() {
      return Math.floor(Math.random() * 1000);
    },
    generateRandomNumbers(min, max, count, minDiff) {
      const numbers = new Set();
      while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

        if (
          [...numbers].every((num) => Math.abs(randomNumber - num) >= minDiff)
        ) {
          numbers.add(randomNumber);
        }
      }
      return Array.from(numbers);
    },
  },
  mounted() {
    service(
      "/portal/api_v1/get_keywords_by_key?cate_ids=58,59,60,61,62,63,64&keyword="
    ).then((data) => {
      this.array = data.data || [];
      this.array.forEach((_, index) => {
        this.$set(this.isMoving, index, false);
        this.$set(this.arrayColor, index, 0);
        this.$set(this.delayTimes, index, this.getRandomDelay());
      });
      this.$refs.container.scrollTo({
        left: this.$refs.container.scrollWidth / 2,
      });
      setTimeout(() => {
        this.left = this.$refs.container.scrollLeft;
      }, 200);
      this.radius =
        9.375 *
        0.7 *
        parseInt(
          document.getElementsByTagName("html")[0].style.fontSize.split("px")[0]
        );
      this.randomNumbers = [
        this.generateRandomNumbers(
          this.radius,
          this.$refs.content.offsetWidth - this.radius,
          this.array.length,
          60
        ),
        this.generateRandomNumbers(
          this.radius,
          this.$refs.content.offsetHeight - this.radius,
          this.array.length,
          0
        ),
      ];
    });
  },
};
</script>


<style scoped>
.mixzone {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-x: auto;
  position: relative; /* 添加 position: relative 属性 */
}
.mixzone-video {
  width: 100%;
  position: fixed;
}
.container {
  width: 2000%;
  height: 100vh;
}
.mouse {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  width: 180px;
}
.mouse-ll {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  width: 230px;
}
.box {
  width: 150px;
  height: 150px;
  margin: 10px;
  background: #000000;
  border: 2px solid #ffffff;
  box-shadow: inset 0px 0px 32px rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 50%;
  font-weight: 200;
  font-size: 22px;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  top: 400px;
  left: 400px;
  z-index: 1;
  margin-left: 0;
  margin-top: 0;
  padding: 5px;
  white-space: nowrap;
  overflow: visible;
}
.shaking {
  animation: shake 3.5s infinite;
}
.active .back {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #e2730e 54.9%,
    rgba(226, 115, 14, 0.4) 100%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(16px);
}
.active .front {
  width: 100%;
  height: 100%;
  color: #e2730e;
  border-radius: 50%;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: inset 0px 0px 16px rgba(250, 217, 188, 0.8);
}
.self {
  background: #000000;
  color: #56cf71;
  border: 1.5px solid #56cf71;
  box-shadow: inset 0px 0px 12px rgba(86, 207, 113, 0.8);
}
.front {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.front img {
  width: 32px;
  height: 32px;
  margin: 4px 0;
}
.card {
  width: 416px;
  height: 428px;
  background: rgba(255, 255, 255, 0.36);
  border: 2px solid #ffffff;
  backdrop-filter: blur(8px);
  border-radius: 32px;
  position: absolute;
  z-index: 90;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.card-cover {
  width: 368px;
  height: 207px;
  border-radius: 24px;
  margin-top: 24px;
  object-fit: cover;
}
.card-p {
  font-size: 24px;
  color: #fff;
  align-self: flex-start;
  margin: 0 22px;
  margin-top: 18px;
  width: 368px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: unset;
  line-height: 30px;
  min-height: 60px;
}
.card-count {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
}
.card-count span {
  font-weight: 200;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 32px;
}
.card-count img {
  width: 32px;
  height: 32px;
}
.card-icon {
  margin-top: 12px;
  width: 368px;
}
@keyframes shake {
  0% {
    margin-left: 0;
    margin-top: 0;
  }
  25% {
    margin-left: 5px;
    margin-top: -5px;
  }
  50% {
    margin-left: -5px;
    margin-top: 5px;
  }
  75% {
    margin-left: 5px;
    margin-top: -5px;
  }
  100% {
    margin-left: 0;
    margin-top: 0;
  }
}
</style>
