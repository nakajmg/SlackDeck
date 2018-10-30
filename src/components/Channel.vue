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
          @reply="reply"
          v-on="events.reaction"
        />
      </transition-group>
    </div>
    <MessageForm
      :channelName="channelName"
      :channelId="channelId"
      :channelInfo="channel.channelInfo"
      :user_id="user_id"
      :users="users"
      :emojiList="emojiList"
      :customEmojis="customEmojis"
      :channelMembers="channelMembers"
      :isInChannel="isInChannel"
      :thread_ts="threadTargetTS"
      @submitMessage="onSubmitMessage"
    >
      <div v-if="threadTargetTS" class="Channel_ReplyMessage">
        <div class="Channel_ReplyMessageHeading">
          <FontAwesomeIcon icon="reply"></FontAwesomeIcon>
          <span class="Channel_ReplyMessageHeadingText">
            Reply to
          </span>
          <span class="Channel_ReplyMessageCancel" @click="cancelReply">
            <span class="el-icon-close"></span>
          </span>
        </div>
        <div class="Channel_ReplyMessageBody">
          <Message
            v-bind="threadMessage"
            :user_id="user_id"
            :users="users"
            :emojiList="emojiList"
            :messages="channel.messages"
            :team="teamInfo.id"
            :channel="channelId"
            :domain="teamInfo.domain"
            :controls="false"
          />
        </div>
      </div>
    </MessageForm>
    <div
      class="Channel_PickerScreen"
      v-show="pickerOpened"
      v-if="isInChannel"
      @click.self="closePicker"
    >
      <div class="Channel_Picker">
        <Picker
          :custom="customEmojis"
          :perLine="7"
          emoji=":heart_eyes_cat:"
          title="Pick a Emoji"
          :sheetSize="32"
          @select="onSelectEmoji"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue"
import ChannelHeader from "./Channel/ChannelHeader.vue"
import MessageForm from "./MessageForm.vue"
import { Picker } from "emoji-mart-vue"
import events from "../variables/events"
import { map, some, find } from "lodash"
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
      threadTargetTS: null,
    }
  },
  computed: {
    channelMembers() {
      return map(this.channel.channelInfo.members, userId => this.users[userId])
    },
    isInChannel() {
      return some(this.channelMembers, ({ id }) => id === this.user_id)
    },
    events() {
      return {
        reaction: {
          [events.CLICK_REACTION]: this.onClickReaction,
        },
      }
    },
    threadMessage() {
      if (!this.threadTargetTS) return
      return find(this.channel.messages, message => message.ts === this.threadTargetTS)
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
    closePicker() {
      this.pickerOpened = false
    },
    onSelectEmoji(emoji) {
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
    reply({ thread_ts }) {
      this.threadTargetTS = thread_ts
    },
    cancelReply() {
      this.threadTargetTS = null
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
  width: 360px;
  min-width: 360px;
  max-width: 360px;
  // margin-right: 3px;
  margin-left: 3px;
  // border: 1px solid #eee;
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: 40px 1fr;
  // background-color: #fff;
  // background-color: #;
  color: #fff;
  // border-bottom: 1px solid #14171a;
  background-color: #15202b;
  &_Header {
    grid-row: 1;
  }
  &_Messages {
    grid-row: 2;
    overflow: auto;
    max-height: 100%;
    padding-top: 1em;
    padding-bottom: 0.5em;
  }
  &:last-child {
    margin-right: 0;
  }
  &_PickerScreen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  &_Picker {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 270px;
    height: 420px;
  }
  &_ReplyMessage {
    border-bottom: none;
  }
  &_ReplyMessageHeading {
    background-color: #282a2b;
    padding: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 0.8em;
  }
  &_ReplyMessageHeadingText {
    margin-left: 7px;
  }
  &_ReplyMessageBody {
    padding: 5px;
    color: #282a2b;
    background-color: #f9f9f9;
  }
  &_ReplyMessageCancel {
    cursor: pointer;
    margin-left: auto;
    font-size: 1.2em;
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
  transition: all 1s ease-in;
}
.messages-enter {
  background-color: #000;
}
.messages-leave-active {
  transition: all 500ms ease-in;
}
.messages-leave-to {
  background-color: #ff0000b3;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
