<template>
  <div class="MessageForm">
    <el-input type="textarea" autosize :placeholder="placeholder"
      v-model="message"
      @keydown.native.enter.exact.prevent="onEnter"
      @keydown.native.shift.enter.exact.prevent="insertNewline"
      @compositionstart.native="onCompositionStart"
      @compositionend.native="onCompositionEnd"
      ref="input"
      :disabled="!isInChannel"
    >
    </el-input>
    <div class="MessageForm_Emoji">
      <el-popover trigger="click" popper-class="MessageForm_EmojiPicker" v-model="emojiPicker" :disabled="!isInChannel">
        <div>
          <Picker
            :custom="customEmojis"
            :perLine="7"
            emoji=":heart_eyes_cat:"
            title="Pick a Emoji"
            :sheetSize="32"
            @select="onSelectEmoji"
          />
        </div>
        <div class="MessageForm_Atmark" slot="reference">
          <FontAwesomeIcon icon="grin-squint"></FontAwesomeIcon>
        </div>
      </el-popover>
    </div>
    <div class="MessageForm_Mention">
      <el-popover trigger="hover" popper-class="MessageForm_Popover" v-model="popover">
        <div class="MessageForm_Members">
          <div
            class="MessageForm_Member"
            v-for="user in channelMembers" :key="user.id"
            :value="'@' + user.name"
            :label="user.name"
            @click="isInChannel && insertMemberId(user)"
          >
            <span class="MessageForm_MemberIcon">
              <img :src="user.profile.image_48">
            </span>
            <span class="MessageForm_MemberName">
              {{user.name}}
            </span>
          </div>
        </div>
        <div class="MessageForm_Atmark" slot="reference">
          @
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { find } from "lodash"
import { Picker } from "emoji-mart-vue"
export default {
  name: "MessageForm",
  components: {
    Picker,
  },
  props: {
    channelName: String,
    channelId: String,
    user_id: String,
    customEmojis: Array,
    emojiList: Object,
    users: Object,
    channelInfo: Object,
    channelMembers: Array,
    isInChannel: Boolean,
  },
  data() {
    return {
      message: "",
      popover: false,
      emojiPicker: false,
      isProcessing: false,
    }
  },
  computed: {
    placeholder() {
      return this.isInChannel ? `#${this.channelName}` : "Not in channel"
    },
    processedMessage() {
      return this.message.replace(/@([0-9a-zA-Z]*)/g, (match, $1) => {
        const user = find(this.users, ({ name }) => name === $1)
        if (user) return `<@${user.id}>`
        return match
      })
    },
  },
  methods: {
    insertNewline() {
      this.message += "\n"
    },
    insertMemberId(user) {
      this.selectUser(user.name)
    },
    async selectUser(value) {
      const input = this.$refs.input
      const textarea = input.$el.querySelector("textarea")
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      let text = this.message
      text = text.slice(0, start) + ` @${value} ` + text.slice(end)
      this.message = text
      await this.$nextTick()
      textarea.focus()
    },
    onEnter() {
      if (this.isProcessing) return
      this.submit()
    },
    submit() {
      if (this.message === "") return
      this.$emit("submitMessage", {
        channelId: this.channelId,
        user_id: this.user_id,
        message: this.message,
      })
      this.message = ""
    },
    onCompositionStart() {
      this.isProcessing = true
    },
    onCompositionEnd() {
      this.isProcessing = false
    },
    async onSelectEmoji({ colons }) {
      this.emojiPicker = false
      const input = this.$refs.input
      const textarea = input.$el.querySelector("textarea")
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      let text = this.message
      text = text.slice(0, start) + `${colons}` + text.slice(end)
      this.message = text
      await this.$nextTick()
      textarea.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.MessageForm {
  padding: 5px;
  position: relative;
  &_Mention {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  &_Emoji {
    position: absolute;
    right: 30px;
    top: 10px;
  }
  &_Members {
    max-height: 250px;
    overflow-y: auto;
  }
  &_Member {
    display: flex;
    align-items: center;
    padding: 7px 10px;
    &:hover {
      cursor: pointer;
      background-color: #005e99;
      color: #fff;
    }
  }
  &_Member + &_Member {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  &_MemberName {
    font-weight: 600;
  }
  &_MemberIcon {
    width: 24px;
    margin-right: 7px;
    img {
      width: 100%;
      height: auto;
      border-radius: 3px;
      display: block;
    }
  }
  &_Atmark {
    color: #a5a5a5;
    cursor: pointer;
    &:hover {
      color: #005e99;
    }
    outline: none;
  }
}
</style>

<style>
.MessageForm_EmojiPicker {
  padding: 0;
}
.MessageForm_Popover {
  padding: 5px 3px;
}
</style>
