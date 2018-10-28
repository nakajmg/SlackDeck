<template>
  <div class="ChannelHeader">
    <div class="ChannelHeader_Header">
      <span class="ChannelHeader_TeamIcon">
        <img :src="teamInfo.icon.image_102">
      </span>
      <span class="ChannelHeader_Sharp">
        <FontAwesomeIcon :icon="['fab', 'slack-hash']"/>
      </span>
      <span class="ChannelHeader_ChannelName">
        {{channelName}}
      </span>
      <span class="ChannelHeader_Menu"
        @click="onClickMenu"
      >
        <span class="el-icon-menu"></span>
      </span>
    </div>
    <transition name="slide-fade">
      <div class="ChannelHeader_Controls" v-if="menuOpened">
        <button class="ChannelHeader_MoveLeft"
          @click="onClickMoveLeft"
          :disabled="disableMoveLeft"
        >
          <span class="el-icon-arrow-left"></span>
        </button>
        <button class="ChannelHeader_Delete" @click="onClickRemove">
          <span class="el-icon-delete"></span>
        </button>
        <button class="ChannelHeader_MoveRight"
          @click="onClickMoveRight"
          :disabled="disableMoveRight"
        >
          <span class="el-icon-arrow-right"></span>
        </button>
        <button class="ChannelHeader_Close" @click="onClickMenu">
          <span class="el-icon-close"></span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ChannelHeader",
  props: {
    channelName: String,
    disableMoveLeft: Boolean,
    disableMoveRight: Boolean,
    teamInfo: Object,
  },
  data() {
    return {
      menuOpened: false,
    }
  },
  methods: {
    onClickMenu() {
      this.menuOpened = !this.menuOpened
    },
    onClickMoveLeft() {
      this.$emit("moveLeft")
    },
    onClickMoveRight() {
      this.$emit("moveRight")
    },
    onClickRemove() {
      this.$emit("remove")
    },
  },
}
</script>


<style lang="scss">
.ChannelHeader {
  position: relative;
  &_Header {
    padding: 5px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
  }
  &_TeamIcon {
    width: 24px;
    margin-right: 5px;
    border-radius: 3px;
    img {
      border-radius: 3px;
      width: 100%;
      height: auto;
      display: block;
    }
  }
  &_Sharp {
    // font-size: 0.9em;
    color: #bbb;
    margin-right: 0.3em;
  }
  &_ChannelName {
    font-size: 0.9em;
    font-weight: 600;
    margin-right: 0.5em;
  }
  &_TeamName {
    font-size: 0.7em;
    opacity: 0.8;
  }
  &_Menu {
    margin-left: auto;
    font-size: 1.2em;
    opacity: 0.4;
    cursor: pointer;
    &:hover {
      opacity: 1;
      color: #0576b9;
    }
  }
  &_Controls {
    position: absolute;
    z-index: 1;
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #eee;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
  &_Delete,
  &_Close,
  &_MoveLeft,
  &_MoveRight {
    font-size: 1.2em;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &:hover {
      color: #0576b9;
    }
    &[disabled] {
      pointer-events: none;
    }
  }
  &_Close {
    margin-left: auto;
  }
  &_Delete {
    color: tomato;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
