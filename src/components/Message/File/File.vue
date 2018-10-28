<template>
  <div class="File">
    <component :is="fileComponent" v-bind="$attrs" :filetype="filetype"/>
  </div>
</template>

<script>
import clipboard from "clipboard-polyfill"
import { includes } from "lodash"
import FileImage from "./FileImage.vue"
import FilePDF from "./FilePDF.vue"
export default {
  name: "File",
  inheritAttrs: false,
  props: {
    filetype: String,
  },
  computed: {
    fileComponent() {
      if (this.isImage) {
        return FileImage
      }
      switch (this.filetype) {
        case "pdf":
          return FilePDF
      }
    },
    isImage() {
      return includes(["png", "jpg", "jpeg", "gif", "bmp"], this.filetype)
    },
  },
  methods: {
    copyLink(url) {
      clipboard.writeText(url)
    },
  },
}
</script>

<style lang="scss">
.File {
  img {
    max-width: 100%;
    height: auto;
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  &_Name {
    color: #2e2e2e;
    font-size: 0.7em;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  &_Link {
    display: block;
    width: 100%;
    height: 100%;
  }
  &_Content {
    position: relative;
  }
  &_More {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 1;
    background-color: #fff;
    width: 30px;
    height: 30px;
    display: none;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
  }
  &_Content:hover {
    .File_More {
      display: flex;
    }
  }
}
.el-dropdown-menu__item {
  a {
    text-decoration: none;
    color: inherit;
  }
}
</style>
