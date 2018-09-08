<template>
  <div>
    <Picker
      :sheetSize="32"
      :perLine="7"
    />
  </div>
</template>

<script>
import { Picker } from "emoji-mart-vue"
export default {
  name: "EmojiPicker",
  components: {
    Picker,
  },
}
</script>
