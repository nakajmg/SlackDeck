<template>
  <div class="FileGeneral">
    <FileMenu data-file-menu :menu="menu"></FileMenu>

    <a :href="url_private" target="_blank" class="FileGeneral_Info">
      <span class="FileGeneral_NameIcon">
        <FontAwesomeIcon :icon="['far', 'file']"/>
      </span>
      <span>
        <div class="FileGeneral_Name">
          {{name}}
        </div>
        <div class="FileGeneral_Size">
          {{fileSize}}
        </div>
      </span>
    </a>
  </div>
</template>

<script>
import clipboard from "clipboard-polyfill"
import FileMenu from "./FileMenu.vue"
export default {
  name: "FileGeneral",
  props: {
    id: String,
    name: String,
    filetype: String,
    size: Number,
    url_private: String,
    url_private_download: String,
  },
  computed: {
    fileSize() {
      const kb = Math.round(this.size / 1000)
      if (kb < 1) {
        return `${this.size}B`
      }
      if (kb < 1000) {
        return `${kb}kB`
      }
      return Math.round(kb / 1000)
    },
    menu() {
      return [
        {
          href: this.url_private_download,
          label: "Download",
        },
        {
          handler: () => this.copyLink(this.url_private),
          label: "Copy link to file",
        },
        {
          href: this.url_private,
          label: "Open original",
          target: "_blank",
        },
      ]
    },
  },
  methods: {
    copyLink(url) {
      clipboard.writeText(url)
    },
  },
  components: {
    FileMenu,
  },
}
</script>

<style lang="scss" scoped>
.FileGeneral {
  position: relative;
  border: 1px solid #e8e8e8;
  padding: 10px;
  margin-top: 10px;
  &:hover {
    [data-file-menu] {
      opacity: 1;
    }
  }
  &_Info {
    margin-bottom: 5px;
    display: flex;
    align-items: flex-start;
    text-decoration: none;
    color: inherit;
  }
  &_Name {
    font-weight: 600;
    font-size: 0.7em;
    margin-bottom: 3px;
  }
  &_Size {
    font-size: 0.7em;
    color: #8e8e8e;
    font-family: monospace;
  }
  &_NameIcon {
    display: inline-flex;
    font-size: 35px;
    margin-right: 10px;
    color: #6078ff;
  }
}
</style>
