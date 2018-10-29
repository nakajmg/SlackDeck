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
          <span class="Message_Status" v-if="status" :title="status.text">
            <span v-if="status.emoji.emoji">
              {{status.emoji.emoji}}
            </span>
            <img :src="status.emoji.src" v-if="status.emoji.src" class="Message_StatusEmoji">
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
        <File
          v-for="file in files"
          v-bind="file"
          :key="file.id"
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
            :user_id="user_id"
            v-on="events"
          />
        </div>
        <Actions
          class="Message_Actions"
          :team="team"
          :channel="channel"
          :domain="domain"
          :ts="ts"
          @showEmojiPicker="showEmojiPicker"
        />
      </div>
      <div
        class="Message_Replies"
        v-if="replies.length !== 0"
      >
        <Reply
          v-for="reply in replyMessages"
          :key="reply.ts"
          v-bind="reply"
          :users="users"
          :emojiList="emojiList"
          :user_id="user_id"
          :team="team"
          :channel="channel"
          :domain="domain"
          v-on="events"
          @showEmojiPicker="showEmojiPicker"
        />
      </div>
    </div>
  </div>
</template>

<script>
import events from "../variables/events"
import { includes } from "lodash"
import Attachment from "./Message/Attachment.vue"
import File from "./Message/File/File.vue"
import Reply from "./Message/Reply.vue"
import Reaction from "./Message/Reaction.vue"
import convTimestamp from "../utils/message/convTimestamp"
import convUserIcon from "../utils/message/convUserIcon"
import convUserName from "../utils/message/convUserName"
import convertMessageToHTML from "../utils/message/convertMessageToHTML"
import reactionsToEmoji from "../utils/message/reactionsToEmoji"
import emojify from "../utils/message/emojify"
import OpenOnSlack from "../basics/OpenOnSlack.vue"
import CopyMessageLink from "../basics/CopyMessageLink.vue"
import Actions from "./Message/Actions.vue"
export default {
  name: "Message",
  components: {
    Attachment,
    File,
    Reply,
    Reaction,
    Actions,
    OpenOnSlack,
    CopyMessageLink,
  },
  props: {
    user_id: String,
    users: Object,
    emojiList: Object,
    type: String,
    ts: String,
    user: String,
    text: String,
    thread_ts: String,
    parent_user_id: String,
    attachments: Array,
    files: Array,
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
  data() {
    return {
      emojiPicker: false,
    }
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
    events() {
      return {
        [events.CLICK_REACTION]: this.onClickReaction,
      }
    },
    status() {
      const user = this.users[this.user]
      if (!user) return
      const profile = user.profile
      const emoji = emojify(profile.status_emoji, this.emojiList)
      return {
        emoji,
        text: profile.status_text,
      }
    },
  },
  methods: {
    showEmojiPicker({ type, ts }) {
      this.$emit("showEmojiPicker", {
        type,
        ts,
      })
    },
    onClickReaction({ name, ts, reacted }) {
      this.$emit(events.CLICK_REACTION, {
        name,
        ts: ts || this.ts,
        reacted,
      })
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
      font-size: 0.9em;
      color: #0576b9;
      text-decoration: none;
      &:link {
        color: #0576b9;
      }
      &:active,
      &:focus,
      &:hover {
        color: #005e99;
        text-decoration: underline;
      }
    }
    [data-user] {
      color: #0576b9;
    }
    p {
      margin: 0;
      white-space: pre-wrap;
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
    margin-right: 0.5em;
  }
  &_Status {
    font-size: 0.7em;
    display: inline-flex;
    align-items: center;
  }
  &_StatusEmoji {
    height: 1.4em;
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
  &_Main:hover {
    background-color: #f9f9f9;
  }
  &_Main:hover &_Actions {
    display: flex;
  }
}
</style>
