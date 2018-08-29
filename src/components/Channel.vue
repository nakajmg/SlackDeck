<template>
  <div class="Channel">
    <div class="Channel_Header">
      <span class="Channel_TeamIcon">
        <img :src="teamInfo.icon.image_102">
      </span>
      <span class="Channel_ChannelName">
        <div>
          <span class="Channel_Sharp">
            #
          </span>
          <span>
            {{channelName}}
          </span>
        </div>
      </span>
      <span class="Channel_Remove">
        <span @click="onClickRemove">
          <i class="el-icon-error"></i>
        </span>
      </span>
    </div>
    
    <div class="Channel_Messages">
      <Message v-for="message in messages.messages" :key="message.ts" v-bind="message" :users="users" :emojiList="emojiList"/>
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
    messages: Object,
    emojiList: Object,
  },
  methods: {
    onClickRemove() {
      this.$emit("removeChannel", { channelId: this.channelId, team_id: this.teamInfo.id })
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
  &_Remove {
    margin-left: auto;
    font-size: 1.2em;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
