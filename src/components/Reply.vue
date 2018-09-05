<template>
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
</template>


<script>
export default {
  name: "Reply",
  props: {
    client_msg_id: String,
    parent_user_id: String,
    text: String,
    thread_ts: String,
    ts: String,
    type: String,
    user: String,
  },
}
</script>
