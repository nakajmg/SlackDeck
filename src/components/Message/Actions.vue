<template>
  <div class="Actions">
    <div class="Actions_Action">
      <el-tooltip content="Reply" placement="top" popper-class="Actions_Tooltip">
        <span @click="reply">
          <FontAwesomeIcon icon="reply"></FontAwesomeIcon>
        </span>
      </el-tooltip>
    </div>
    <div class="Actions_Action">
      <el-tooltip content="Add reaction" placement="top" popper-class="Actions_Tooltip">
        <span @click="showEmojiPicker">
          <FontAwesomeIcon :icon="['far', 'grin-squint']"></FontAwesomeIcon>
        </span>
      </el-tooltip>
    </div>
    <div class="Actions_Action">
      <el-tooltip content="Copy link" placement="top" popper-class="Actions_Tooltip">
        <CopyMessageLink
          :domain="domain"
          :channel="channel"
          :ts="ts"
        />
      </el-tooltip>
    </div>
    <div class="Actions_Action">
      <el-tooltip content="Open on Slack.app" placement="top" popper-class="Actions_Tooltip">
        <OpenOnSlack
          :team="team"
          :channel="channel"
          :ts="ts"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import CopyMessageLink from "../../basics/CopyMessageLink.vue"
import OpenOnSlack from "../../basics/OpenOnSlack.vue"
import types from "../../store/types"
export default {
  name: "Actions",
  components: {
    CopyMessageLink,
    OpenOnSlack,
  },
  props: {
    ts: String,
    domain: String,
    team: String,
    channel: String,
  },
  methods: {
    showEmojiPicker() {
      this.$emit("showEmojiPicker", {
        type: types.REACTION_TO_MESSAGE,
        ts: this.ts,
      })
    },
    reply() {
      this.$emit("reply", {
        thread_ts: this.ts,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Actions {
  display: none;
  position: absolute;
  right: 10px;
  top: -10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  // padding: 1px 2px;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  background-color: #fff;
  text-align: center;
  border-radius: 3px;
  &:hover {
    box-shadow: 1px 1px 1px -1px rgba(0, 0, 0, 0.8);
  }
  &_Action {
    color: #ababab;
    padding: 3px;
    width: 25px;
    height: 25px;
    &:hover {
      cursor: pointer;
      color: #005e99;
    }
    & > * {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  &_Action + &_Action {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>

<style>
.Actions_Tooltip {
  padding: 8px;
  font-size: 10px;
}
</style>
