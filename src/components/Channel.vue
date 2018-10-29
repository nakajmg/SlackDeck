<template>
  <div class="Channel">
    <ChannelHeader
      class="Channel_Header"
      @moveLeft="moveLeft"
      @moveRight="moveRight"
      @remove="remove"
      :channelName="channelName"
      :channelId="channelId"
      :disableMoveLeft="disableMoveLeft"
      :disableMoveRight="disableMoveRight"
      :teamInfo="teamInfo"
    />
    <div class="Channel_Messages" ref="messages">
      <transition-group name="messages" tag="div">
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
      </transition-group>
    </div>
    <MessageForm :channelName="channelName" :channelId="channelId" :user_id="user_id" :users="users" :emojiList="emojiList" :customEmojis="customEmojis" @submitMessage="onSubmitMessage"/>
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
import MessageForm from "./MessageForm.vue"
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
    scrollBottom() {
      const el = this.$refs.messages
      this.$nextTick(() => {
        el.scrollTop = el.scrollHeight
      })
    },
    onSubmitMessage(data) {
      this.$emit("submitMessage", data)
    },
  },
  updated() {
    this.scrollBottom()
  },
  mounted() {
    this.scrollBottom()
  },
  components: {
    Message,
    ChannelHeader,
    Picker,
    MessageForm,
  },
}
</script>

<style lang="scss">
.Channel {
  box-sizing: border-box;
  width: 400px;
  min-width: 400px;
  max-width: 400px;
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
.messages-enter-active {
  transition: all 5s;
}
.messages-enter {
  background-color: rgb(255, 255, 212);
}
.messages-leave-active {
  transition: all 1s;
}
.messages-leave-to {
  background-color: rgb(255, 170, 170);
}
</style>
