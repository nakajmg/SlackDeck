<template>
  <div class="Channel">
    <ChannelHeader
      @moveLeft="moveLeft"
      @moveRight="moveRight"
      @remove="remove"
      :channelName="channelName"
      :disableMoveLeft="disableMoveLeft"
      :disableMoveRight="disableMoveRight"
      :teamInfo="teamInfo"
    />
    <div class="Channel_Messages">
      <Message
        v-for="message in channel.messages"
        :key="message.ts"
        v-bind="message"
        :users="users"
        :emojiList="emojiList"
        :messages="channel.messages"
        :team="teamInfo.id"
        :channel="channelId"
        v-if="!message.parent_user_id"
        :domain="teamInfo.domain"
      />
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"
import ChannelHeader from "./Channel/ChannelHeader.vue"
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
  methods: {
    moveLeft() {
      this.$emit("moveLeft", { channelId: this.channelId, team_id: this.teamInfo.id })
    },
    moveRight() {
      this.$emit("moveRight", { channelId: this.channelId, team_id: this.teamInfo.id })
    },
    remove() {
      this.$emit("remove", { channelId: this.channelId, team_id: this.teamInfo.id })
    },
  },
  components: {
    Message,
    ChannelHeader,
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
}
</style>
