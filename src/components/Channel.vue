<template>
  <div class="Channel">
    <div class="Channel_Header">
      <span class="Channel_TeamIcon">
        <img :src="teamInfo.icon.image_102">
      </span>
      <span class="Channel_ChannelName">
        <span class="Channel_Sharp">
          #
        </span>
        <span>
          {{channelName}}
        </span>
      </span>
      <span class="Channel_Menu"
        @click="onClickMenu"
      >
        <span class="el-icon-menu"></span>
      </span>
    </div>
    <transition name="slide-fade">
      <div class="Channel_Controls" v-if="menuOpened">
        <button class="Channel_MoveLeft"
          @click="onClickMoveLeft"
          :disabled="disableMoveLeft"
        >
          <span class="el-icon-arrow-left"></span>
        </button>
        <button class="Channel_MoveRight"
          @click="onClickMoveRight"
          :disabled="disableMoveRight"
        >
          <span class="el-icon-arrow-right"></span>
        </button>
        <button class="Channel_Remove" @click="onClickRemove">
          <span class="el-icon-close"></span>
        </button>
      </div>
    </transition>
    <div class="Channel_Messages">
      <Message v-for="message in channel.messages" :key="message.ts" v-bind="message" :users="users" :emojiList="emojiList" :messages="channel.messages" :team="teamInfo.id" :channel="channelId" v-if="!message.parent_user_id"/>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"
export default {
  name: "Channel",
  props: {
    teamInfo: Object,
    channelId: String,
    channelName: String,
    users: Object,
    channel: Object,
    emojiList: Object,
    disableMoveLeft: Boolean,
    disableMoveRight: Boolean,
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
      this.$emit("moveLeft", { channelId: this.channelId, team_id: this.teamInfo.id })
    },
    onClickMoveRight() {
      this.$emit("moveRight", { channelId: this.channelId, team_id: this.teamInfo.id })
    },
    onClickRemove() {
      this.$emit("remove", { channelId: this.channelId, team_id: this.teamInfo.id })
    },
  },
  components: {
    Message,
  },
}
</script>

<style lang="scss">
.Channel {
  box-sizing: border-box;
  width: 330px;
  min-width: 330px;
  max-width: 330px;
  margin-right: 5px;
  border: 1px solid #eee;
  &:last-child {
    margin-right: 0;
  }
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
    font-size: 0.9em;
    opacity: 0.7;
  }
  &_ChannelName {
    font-size: 1em;
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
    margin-left: auto;
    display: flex;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #eee;
  }
  &_Remove,
  &_MoveLeft,
  &_MoveRight {
    font-size: 1.2em;
    border: none;
    margin: none;
    padding: none;
    cursor: pointer;
    &:hover {
      color: #0576b9;
    }
    &[disabled] {
      pointer-events: none;
    }
  }
  &_Remove {
    margin-left: auto;
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
