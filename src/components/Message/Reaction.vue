<template>
  <span class="Reaction"> 
    <span class="Reaction_Icon"
      v-for="user in users"
      :title="convUserName({user}, usersList)"
      :key="user"
    >
      <img v-if="src" :src="src" :data-custom-emoji="name">
      <span v-if="emoji" :data-emoji="`:${name}:`">{{emoji}}</span>
    </span>
  </span>
</template>

<script>
import convUserName from "../../utils/message/convUserName"
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
  },
  methods: {
    convUserName,
  },
}
</script>

<style lang="scss">
.Reaction {
  align-items: center;
  display: inline-flex;
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 5px;
  color: #717274;
  font-family: monospace;
  &_Icon {
    padding: 2px;
    border-radius: 5px;
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
}
</style>
