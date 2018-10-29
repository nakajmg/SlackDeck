<template>
  <div class="Reply"
  >
    <div class="Message_UserIcon">
      <img :src="convUserIcon(user, users)" class="Message_Icon">
    </div>
    <div class="Message_Content">
      <div class="Message_Header">
        <span class="Message_UserName">
          {{convUserName({user}, users)}}
        </span>
        <span class="Message_Timestamp">
          {{convTimestamp(ts)}}
        </span>
      </div>
      <div class="Message_Text"
        v-html="convertMessageToHTML({text, edited}, {users, emojiList})"
      >
      </div>
      <div class="Message_Reactions"
        v-if="reactions && reactions.length !== 0 && controls"
      >
        <Reaction class="Message_Reaction"
          v-for="(reaction, index) in reactionsToEmoji(reactions, emojiList)"
          :key="index"
          v-bind="reaction"
          :emojiList="emojiList"
          :usersList="users"
          v-on="events"
          :user_id="user_id"
        /> 
      </div>
    </div>
    <Actions
      class="Reply_Actions"
      :ts="ts"
      :team="team"
      :channel="channel"
      :domain="domain"
      @showEmojiPicker="showEmojiPicker"
      @reply="reply"
      v-if="controls"
    />
  </div>
</template>


<script>
import convTimestamp from "../../utils/message/convTimestamp"
import convUserIcon from "../../utils/message/convUserIcon"
import convUserName from "../../utils/message/convUserName"
import reactionsToEmoji from "../../utils/message/reactionsToEmoji"
import convertMessageToHTML from "../../utils/message/convertMessageToHTML"
import events from "../../variables/events"
import Reaction from "./Reaction.vue"
import Actions from "./Actions.vue"
export default {
  name: "Reply",
  components: {
    Reaction,
    Actions,
  },
  props: {
    client_msg_id: String,
    parent_user_id: String,
    text: String,
    thread_ts: String,
    ts: String,
    type: String,
    user: String,
    edited: Object,
    reactions: {
      type: Array,
      default: () => [],
    },
    users: Object,
    emojiList: Object,
    user_id: String,
    domain: String,
    team: String,
    channel: String,
    controls: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    events() {
      return {
        [events.CLICK_REACTION]: this.onClickReaction,
      }
    },
  },
  methods: {
    convTimestamp,
    convUserIcon,
    convUserName,
    convertMessageToHTML,
    reactionsToEmoji,
    onClickReaction({ name, reacted }) {
      this.$emit(events.CLICK_REACTION, {
        name,
        ts: this.ts,
        reacted,
      })
    },
    showEmojiPicker({ type, ts }) {
      this.$emit("showEmojiPicker", {
        ts,
        type,
      })
    },
    reply() {
      this.$emit("reply", {
        thread_ts: this.thread_ts,
      })
    },
  },
}
</script>

<style lang="scss">
.Reply {
  position: relative;
  box-sizing: border-box;
  text-align: left;
  word-break: break-all;
  display: flex;
  padding: 5px 0;
  // border-bottom: 1px solid #f0f0f0;
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
  &:hover {
    .Reply_Actions {
      display: flex;
    }
  }
}
</style>
