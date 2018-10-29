<template>
  <div class="MessageForm">
    <el-input type="textarea" autosize :placeholder="placeholder"
      v-model="message"
      @keydown.native.enter.exact.prevent="onEnter"
      @keydown.native.shift.enter.exact.prevent="insertNewline"
      @compositionstart.native="onCompositionStart"
      @compositionend.native="onCompositionEnd"
    >
    </el-input>
  </div>
</template>

<script>
import { find } from "lodash"
export default {
  name: "MessageForm",
  props: {
    channelName: String,
    channelId: String,
    user_id: String,
    customEmojis: Array,
    emojiList: Object,
    users: Object,
  },
  data() {
    return {
      message: "",
      isProcessing: false,
    }
  },
  computed: {
    placeholder() {
      return `#${this.channelName}`
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
  },
}
</script>

<style lang="scss" scoped>
.MessageForm {
  padding: 5px;
}
</style>
