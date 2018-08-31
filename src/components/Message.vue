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
      <div class="Message_Text"
        v-html="parsedText"
      >
      </div>
      <div class="Message_Reactions"
        v-if="reactions && reactions.length !== 0"
      >
        <span class="Message_Reaction"
          v-for="(reaction, index) in reactionsToEmoji(reactions)"
          :key="index"
        > 
          <span class="Message_ReactionIcon"
            v-for="user in reaction.users"
            :title="convUserName({user})"
            :key="user"
          >
            <img v-if="reaction.src" :src="reaction.src" :data-custom-emoji="reaction.name">
            <span v-if="reaction.emoji" :data-emoji="`:${reaction.name}:`">{{reaction.emoji}}</span>
          </span>
        </span>
      </div>
      <div
        class="Message_Replies"
        v-if="replies.length !== 0"
      >
        <div class="Message_Reply"
          v-for="reply in replyMessages"
          :key="reply.ts"
        >
          <div class="Message_UserIcon">
            <img :src="convUserIcon(reply.user)" class="Message_Icon">
          </div>
          <div class="Message_Content">
            <div class="Message_Header">
              <span class="Message_UserName">
                {{convUserName(reply)}}
              </span>
              <span class="Message_Timestamp">
                {{convTimestamp(reply.ts)}}
              </span>
            </div>
            <div class="Message_Text"
              v-html="messageToHTML(reply.text)"
            >
            </div>
            <div class="Message_Reactions"
              v-if="reply.reactions && reply.reactions.length !== 0"
            >
              <span class="Message_Reaction"
                v-for="(reaction, index) in reactionsToEmoji(reply.reactions)"
                :key="index"
              > 
                <span class="Message_ReactionIcon"
                  v-for="user in reaction.users"
                  :title="convUserName({user})"
                  :key="user"
                >
                  <img v-if="reaction.src" :src="reaction.src" :data-custom-emoji="reaction.name">
                  <span v-if="reaction.emoji" :data-emoji="`:${reaction.name}:`">{{reaction.emoji}}</span>
                </span>
              </span>
            </div>
          </div>
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
    parent_user_id: String,
    attachments: Array,
    edited: Object,
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
      return this.convUserName({ user: this.user, bot_id: this.bot_id })
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
    replyMessages() {
      const repliesTs = this.replies.map(({ ts }) => ts)
      return this.messages.filter(({ ts }) => {
        return includes(repliesTs, ts)
      })
    },
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
    convUserName({ user, bot_id }) {
      if (bot_id) return user || "Bot"
      const _user = this.users[user] || {}
      return _user.name || "unknown"
    },
    messageToHTML(text) {
      text = this._replaceUserName(text)
      text = this._replaceEmoji(text)
      text = this._replaceLink(text)
      text = this._replaceBlockquote(text)
      text += this.edited ? "<span class='Message_Edited'>(edited)</span>" : ""
      return text || ""
    },
    reactionsToEmoji(reactions) {
      const emojis = reactions.map(({ name, count, users }) => {
        const emoji = this.reactionToEmoji({ name })
        const reaction = {
          name,
          count,
          users,
        }
        this.isUrl(emoji) ? (reaction.src = emoji) : (reaction.emoji = emoji)
        return reaction
      })
      return emojis
    },
    reactionToEmoji({ name }) {
      const emoji = emojify(`:${name}:`, name => {
        return this.emojiList[name]
      })
      return emoji
    },
    isUrl(str) {
      return /https?:\/\/[^\s]+/.test(str)
    },
    _replaceUserName(text) {
      text = text.replace(/<@(U.*)>/g, (match, $1) => {
        const user = this.users[$1]
        return `<span data-user="${$1}">@${user.name}</span>`
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
          return `<span data-emoji="${name}">${code}</span>`
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
      return emoji ? `<img data-custom-emoji="${name}" src="${emoji}">` : name
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
    line-height: 1.35;
    font-size: 1em;
    img[data-custom-emoji] {
      display: inline-flex;
      height: 1.4em;
      width: auto;
      vertical-align: text-bottom;
    }
    [data-emoji] {
      font-size: 1.4em;
    }
    a {
      color: #0576b9;
      &:link {
        color: #0576b9;
      }
      &:active,
      &:focus,
      &:hover {
        color: #005e99;
      }
    }
    [data-user] {
      color: #0576b9;
    }
  }
  &_Edited {
    opacity: 0.4;
    font-size: 0.7em;
    margin-left: 0.25em;
    white-space: nowrap;
  }
  &_Header {
    font-size: 0.8em;
    display: flex;
    align-items: bottom;
  }
  &_UserIcon {
    min-width: 2.25em;
    height: 2.25em;
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
    display: inline-flex;
    font-size: 11px;
    line-height: 16px;
    margin-bottom: 5px;
    // margin-right: 5px;
    // padding: 2px 3px;

    color: #717274;
    font-family: monospace;
  }
  &_ReactionIcon {
    padding: 2px;
    border-radius: 5px;
    // border: 1px solid rgba(5, 118, 185, 0.3);
    // background-color: rgba(5, 118, 185, 0.05);
    border: 1px solid #f0f0f0;
    text-align: center;
    margin-right: 2px;
    [data-custom-emoji] {
      width: 100%;
      width: 16px;
      height: auto;
      display: block;
    }
    [data-emoji] {
      margin-left: 2px;
    }
  }
  // &_Replies {}
  &_Reply {
    box-sizing: border-box;
    text-align: left;
    word-break: break-all;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #f0f0f0;
    width: 100%;
    font-size: 0.85em;
    &:before {
      content: "";
      display: block;
      min-width: 3px;
      border-radius: 2px;
      background-color: #40a688;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-right: 5px;
    }
  }
}
</style>
