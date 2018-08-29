<template>
  <div class="Message">
    <div class="Message_UserIcon">
      <img v-if="userIcon" :src="userIcon" class="Message_Icon">
    </div>
    <div class="Message_Content">
      <div class="Message_Header">
        <span class="Message_UserName">
          {{userName}}
        </span>
        <span class="Message_Timestamp">
          {{timestamp}}
        </span>
      </div>
      <div class="Message_Text" v-html="parsedText">
      </div>
    </div>
  </div>
</template>

<script>
import first from "lodash/first"
import toNumber from "lodash/toNumber"
import DateTime from "luxon/src/datetime"
import { emojify } from "node-emoji"
export default {
  name: "Message",
  props: {
    users: Object,
    type: String,
    ts: String,
    user: String,
    text: String,
    attachments: Array,
    bot_id: {
      type: String,
      default: "",
    },
  },
  computed: {
    userName() {
      if (this.bot_id !== "") {
        return this.user || "Bot"
      }
      const user = this.users[this.user] || {}
      return user.name || "unknown"
    },
    timestamp() {
      const time = toNumber(first(this.ts.split("."))) * 1000
      return DateTime.fromMillis(time).toFormat("MM/dd HH:mm:ss")
    },
    userIcon() {
      const user = this.users[this.user]
      if (!user) return "https://a.slack-edge.com/0180/img/slackbot_72.png"
      const icon = user.profile.image_72
      return icon
    },
    parsedText() {
      // const regexMention = /<@([A-Za-z0-9]+)>/g
      // const regexImageLink = /<(https?:\/\/.*\.(png|jpg|gif))>/g
      let text = this.text
      text = emojify(text)
      text = text.replace(/\<(https?:\/\/[^\s]+)\|(.*?)\>/g, (url, $1, $2) => {
        return `<a href="${$1}" target="_blank" rel="noopener">${$2}</a>`
      })
      text = text.replace(/\<(https?:\/\/[^\s]+)\>/g, (url, $1) => {
        return `<a href="${$1}" target="_blank" rel="noopener">${$1}</a>`
      })
      text = text.replace(/\&gt;(.*)$/g, (match, $1) => {
        return `<blockquote class="Message_Blockquote">${$1}</blockquote>`
      })
      return text || ""
    },
  },
}
</script>

<style lang="scss">
.Message {
  text-align: left;
  word-break: break-all;
  display: flex;
  padding: 3px;
  &_Header {
    font-size: 0.8em;
    display: flex;
    align-items: center;
  }
  &_UserIcon {
    min-width: 36px;
    height: 36px;
    border-radius: 3px;
    margin-right: 0.5em;
  }
  &_Icon {
    height: 100%;
    width: auto;
    display: block;
    border-radius: 3px;
  }
  &_UserName {
    font-weight: 600;
    margin-right: 1em;
  }
  // &_Timestamp {}
  &_Blockquote {
    position: relative;
    margin: 0.25rem 0;
    padding-left: 16px;
    &:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 4px;
      border-radius: 8px;
      background: #e3e4e6;
      content: "";
    }
  }
}
</style>