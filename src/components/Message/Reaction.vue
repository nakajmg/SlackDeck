<template>
  <span class="Reaction"> 
    <span class="Reaction_Icon"
      v-for="user in users"
      :title="convUserName({user}, usersList)"
      :key="user"
      :class="{_isMyReaction: isMyReaction(user)}"
      @click="onClick(user)"
    >
      <img v-if="src" :src="src" :data-custom-emoji="name">
      <span v-if="emoji" :data-emoji="`:${name}:`">{{emoji}}</span>
    </span>
  </span>
</template>

<script>
import convUserName from "../../utils/message/convUserName"
import { includes } from "lodash"
import events from "../../variables/events"
export default {
  name: "Reaction",
  props: {
    name: String,
    count: Number,
    users: Array,
    src: String,
    emoji: String,
    emojiList: Object,
    usersList: Object,
    user_id: String,
  },
  computed: {
    reacted() {
      return includes(this.users, this.user_id)
    },
  },
  methods: {
    convUserName,
    isMyReaction(user) {
      return user === this.user_id
    },
    onClick() {
      this.$emit(events.CLICK_REACTION, {
        name: this.name,
        reacted: this.reacted,
      })
    },
  },
}
</script>

<style lang="scss">
.Reaction {
  align-items: center;
  display: inline-flex;
  // font-size: 11px;
  margin-top: 5px;
  // margin-bottom: 5px;
  color: #717274;
  font-family: monospace;
  cursor: pointer;
  &_Icon {
    padding: 2px;
    border-radius: 5px;
    border: 1px solid #f0f0f0;
    background-color: #fff;
    text-align: center;
    margin-right: 2px;
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    [data-custom-emoji] {
      width: 100%;
      // width: 22px;
      height: auto;
      display: block;
    }
    [data-emoji] {
      font-size: 1.2em;
      // letter-spacing: -4px;
    }
  }
  ._isMyReaction {
    // background-color: rgba(5, 118, 185, 0.05);
    // border-color: rgba(5, 118, 185, 0.3);
    border: 2px solid rgb(55, 182, 255);
  }
}
</style>
