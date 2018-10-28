<template>
  <div class="Channel">
    <ChannelHeader
      class="Channel_Header"
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
        :user_id="user_id"
        :users="users"
        :emojiList="emojiList"
        :messages="channel.messages"
        :team="teamInfo.id"
        :channel="channelId"
        v-if="!message.parent_user_id"
        :domain="teamInfo.domain"
        @showEmojiPicker="showEmojiPicker"
        v-on="events.reaction"
      />
    </div>
    <div
      class="Channel_Picker"
      v-if="pickerOpened"
    >
      <Picker
        :custom="customEmojis"
        :perLine="7"
        emoji=":heart_eyes_cat:"
        title="Pick a Emoji"
        :sheetSize="32"
        @select="onClickEmoji"
      />
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"
import ChannelHeader from "./Channel/ChannelHeader.vue"
import { Picker } from "emoji-mart-vue"
import events from "../variables/events"
export default {
  name: "Channel",
  props: {
    user_id: String,
    teamInfo: Object,
    channelId: String,
    channelName: String,
    users: Object,
    channel: Object,
    emojiList: Object,
    customEmojis: Array,
    disableMoveLeft: Boolean,
    disableMoveRight: Boolean,
  },
  data() {
    return {
      pickerOpened: false,
      preData: null,
    }
  },
  computed: {
    events() {
      return {
        reaction: {
          [events.CLICK_REACTION]: this.onClickReaction,
        },
      }
    },
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
    showEmojiPicker({ type, ts }) {
      this.preData = {
        type,
        ts,
      }
      this.pickerOpened = true
    },
    onClickEmoji(emoji) {
      if (this.preData && this.preData.type) {
        this.$emit(this.preData.type, {
          ts: this.preData.ts,
          name: emoji.id,
          channelId: this.channelId,
          team_id: this.team_id,
        })
      }
      this.pickerOpened = false
    },
    onClickReaction({ name, ts, reacted }) {
      this.$emit(events.CLICK_REACTION, {
        channelId: this.channelId,
        name,
        ts,
        reacted,
      })
    },
  },
  components: {
    Message,
    ChannelHeader,
    Picker,
  },
}
</script>

<style lang="scss">
.Channel {
  box-sizing: border-box;
  width: 330px;
  min-width: 330px;
  max-width: 330px;
  margin-right: 3px;
  border: 1px solid #eee;
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
  background-color: #fff;
  &_Header {
    grid-row: 1;
  }
  &_Messages {
    grid-row: 2;
    overflow: auto;
    max-height: 100%;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  &:last-child {
    margin-right: 0;
  }
  &_Picker {
    position: absolute;
    z-index: 1;
  }
}
.emoji-mart-scroll + .emoji-mart-bar {
  height: 50px;
}
.emoji-mart-scroll + .emoji-mart-bar .emoji-mart-preview {
  height: 100%;
  transform: scale(0.7);
  // transform-origin-y: 100%;
}
</style>
