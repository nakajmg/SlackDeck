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
      <div v-html="reaction"></div>
      <div v-if="replies">
        <div v-for="reply in replyMessages" :key="reply.ts">
          <span>{{convUserName(reply)}}</span>
          <div v-html="messageToHTML(reply.text)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import first from "lodash/first"
import toNumber from "lodash/toNumber"
import includes from "lodash/includes"
import DateTime from "luxon/src/datetime"
import { emojify } from "node-emoji"
export default {
  name: "Message",
  props: {
    users: Object,
    emojiList: Object,
    type: String,
    ts: String,
    user: String,
    text: String,
    thread_ts: String,
    attachments: Array,
    reactions: {
      type: Array,
      default: () => [],
    },
    replies: {
      type: Array,
      default: () => [],
    },
    bot_id: {
      type: String,
      default: "",
    },
    messages: Array,
  },
  computed: {
    userName() {
      return this.convUserName({user: this.user, bot_id: this.bot_id })
    },
    timestamp() {
      return this.convTimestamp(this.ts)
    },
    userIcon() {
      return this.convUserIcon(this.user)
    },
    parsedText() {
      // const regexMention = /<@([A-Za-z0-9]+)>/g
      // const regexImageLink = /<(https?:\/\/.*\.(png|jpg|gif))>/g
      return this.messageToHTML(this.text)
    },
    reaction() {
      const reactions = this.reactions.map(({ count, name }) => {
        const emoji = emojify(`:${name}:`, name => {
          return this._replaceCustomEmoji(name)
        })
        return `<span class="Message_Reaction"><span class="Message_ReactionIcon">${emoji}</span><span>${count}</span></span>`
      })
      return `<div class="Message_Reactions">${reactions.join("")}</div>`
    },
    replyMessages() {
      const repliesTs = this.replies.map(({ts, user}) => ts)
      return this.messages.filter(({ts}) => {
        return includes(repliesTs, ts)
      })
    }
  },
  methods: {
    convTimestamp(ts) {
      const time = toNumber(first(ts.split("."))) * 1000
      return DateTime.fromMillis(time).toFormat("MM/dd HH:mm:ss")
    },
    convUserIcon(userId) {
      const user = this.users[userId]
      if (!user) return "https://a.slack-edge.com/0180/img/slackbot_72.png"
      const icon = user.profile.image_72
      return icon
    },
    convUserName({user, bot_id}) {
      if (bot_id) return user || "Bot"
      const _user = this.users[user] || {}
      return _user.name || "unknown"
    },
    messageToHTML(text) {
      text = this._replaceUserName(text)
      text = this._replaceEmoji(text)
      text = this._replaceLink(text)
      text = this._replaceBlockquote(text)
      return text || ""
    },
    _replaceUserName(text) {
      text = text.replace(/<@(U.*)>/g, (match, $1) => {
        const user = this.users[$1]
        return user.name
      })
      return text
    },
    _replaceEmoji(text) {
      return emojify(
        text,
        name => {
          return this._replaceCustomEmoji(name)
        },
        (code, name) => {
          console.log(code, name)
          return `<span data-emoji>${code}</span>`
        },
      )
    },
    _replaceLink(text) {
      text = text.replace(/<(https?:\/\/[^\s]+)\|(.*?)>/g, (url, $1, $2) => {
        return `<a href="${$1}" target="_blank" rel="noopener">${$2}</a>`
      })
      text = text.replace(/<(https?:\/\/[^\s]+)>/g, (url, $1) => {
        return `<a href="${$1}" target="_blank" rel="noopener">${$1}</a>`
      })
      return text
    },
    _replaceBlockquote(text) {
      text = text.replace(/&gt;(.*)$/g, (match, $1) => {
        return `<blockquote class="Message_Blockquote">${$1}</blockquote>`
      })
      return text
    },
    _replaceCustomEmoji(name) {
      const emoji = this.emojiList[name]
      return emoji ? `<img data-custom-emoji="name" src="${emoji}">` : name
    },
  },
}
</script>

<style lang="scss">
.Message {
  box-sizing: border-box;
  text-align: left;
  word-break: break-all;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  &_Text {
    white-space: pre-wrap;
    line-height: 1.25;
    img[data-custom-emoji] {
      display: inline-flex;
      height: 1.4em;
      width: auto;
      vertical-align: top;
    }
    [data-emoji] {
      font-size: 1.4em;
    }
  }
  &_Header {
    font-size: 0.8em;
    display: flex;
    align-items: bottom;
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
  &_Timestamp {
    margin-left: auto;
    font-size: 0.85em;
    opacity: 0.8;
  }
  &_Content {
    flex-grow: 1;
  }
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
  &_Reactions {
    display: flex;
    align-items: center;
  }
  &_Reaction {
    align-items: center;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    display: inline-flex;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 2px 3px;
    background-color: rgba(5, 118, 185, 0.05);
    border-color: rgba(5, 118, 185, 0.3);
  }
  &_ReactionIcon {
    width: 16px;
    margin-right: 3px;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>
