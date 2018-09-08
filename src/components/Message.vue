<template>
  <div class="Message">
    <div class="Message_UserIcon">
      <img v-if="userIcon" :src="userIcon" class="Message_Icon">
    </div>
    <div class="Message_Content">
      <div class="Message_Main">
        <div class="Message_Header">
          <span class="Message_UserName">
            {{userName}}
          </span>
          <span class="Message_Timestamp">
            {{timestamp}}
          </span>
        </div>
        <div class="Message_Text"
          v-html="bodyHTML"
        >
        </div>
        <Attachment
          v-for="attachment in attachments"
          v-bind="attachment"
          :key="attachment.id"
        />
        <div class="Message_Reactions"
          v-if="reactions && reactions.length !== 0"
        >
          <Reaction
            v-for="(reaction, index) in reactionsToEmoji(reactions, emojiList)"
            :key="index"
            v-bind="reaction"
            :usersList="users"
            :emojiList="emojiList"
          />
        </div>
        <div class="Message_Actions">
          <div class="Message_Action">
            
          </div>
          <div class="Message_Action">
            <CopyMessageLink
              :domain="domain"
              :channel="channel"
              :ts="ts"
            />
          </div>
          <div class="Message_Action">
            <OpenOnSlack
              :team="team"
              :channel="channel"
              :ts="ts"
            />
          </div>
        </div>
      </div>
      <div
        class="Message_Replies"
        v-if="replies.length !== 0"
      >
        <Reply v-for="reply in replyMessages" :key="reply.ts" v-bind="reply" :users="users" :emojiList="emojiList"/>
      </div>
    </div>
  </div>
</template>

<script>
import includes from "lodash/includes"
import Attachment from "./Message/Attachment.vue"
import Reply from "./Message/Reply.vue"
import Reaction from "./Message/Reaction.vue"
import convTimestamp from "../utils/message/convTimestamp"
import convUserIcon from "../utils/message/convUserIcon"
import convUserName from "../utils/message/convUserName"
import convertMessageToHTML from "../utils/message/convertMessageToHTML"
import reactionsToEmoji from "../utils/message/reactionsToEmoji"
import OpenOnSlack from "../basics/OpenOnSlack.vue"
import CopyMessageLink from "../basics/CopyMessageLink.vue"
export default {
  name: "Message",
  components: {
    Attachment,
    Reply,
    Reaction,
    OpenOnSlack,
    CopyMessageLink,
  },
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
    client_msg_id: String,
    team: String,
    channel: String,
    event_ts: String,
    reply_count: Number,
    subscribed: Boolean,
    last_read: String,
    unread_count: Number,
    domain: String,
  },
  computed: {
    userName() {
      return this.convUserName({ user: this.user, bot_id: this.bot_id }, this.users)
    },
    timestamp() {
      return this.convTimestamp(this.ts)
    },
    userIcon() {
      return this.convUserIcon(this.user, this.users)
    },
    bodyHTML() {
      const { text, edited, users, emojiList } = this.$props
      return this.convertMessageToHTML({ text, edited }, { users, emojiList })
    },
    replyMessages() {
      const repliesTs = this.replies.map(({ ts }) => ts)
      return this.messages.filter(({ ts }) => {
        return includes(repliesTs, ts)
      })
    },
  },
  methods: {
    copyLink() {
      this.$emit("copyLink", this.$props)
    },
    convTimestamp,
    convUserIcon,
    convUserName,
    convertMessageToHTML,
    reactionsToEmoji,
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
  // border-bottom: 1px solid #f0f0f0;
  width: 100%;
  position: relative;
  &_Content {
    flex-grow: 1;
    width: calc(100% - 2.75em);
  }
  &_UserIcon {
    min-width: 2.25em;
    height: 2.25em;
    border-radius: 3px;
    margin-right: 0.5em;
  }
  &_Text {
    // white-space: pre-wrap;
    line-height: 1.35;
    font-size: 0.9em;
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
    p {
      margin: 0;
    }
    pre {
      background: #f9f9f9;
      font-family: Monaco, Menlo, Consolas, "Courier New", monospace !important;
      padding: 0.3em 0.5em;
      font-variant-ligatures: none;
      word-break: normal;
      tab-size: 2;
      border-radius: 2px;
      margin: 0.3em 0;
      font-size: 0.7rem;
      line-height: 1.15rem;
      border: 1px solid rgba(0, 0, 0, 0.15);
      overflow: scroll;
      code {
        font-family: Monaco, Menlo, Consolas, "Courier New", monospace !important;
      }
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
    align-items: center;
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
    margin-right: 5px;
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
    margin-top: 3px;
  }
  &_Actions {
    display: none;
    position: absolute;
    right: 10px;
    top: -10px;
    border: 1px solid #005e99;
    padding: 1px 2px;
    justify-content: center;
    align-items: center;
  }
  &_Main:hover {
    background-color: #f9f9f9;
  }
  &_Main:hover &_Actions {
    display: flex;
  }
}
</style>
