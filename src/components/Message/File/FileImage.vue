<template>
  <div class="FileImage">
    <div class="FileImage_Name">{{name}}</div>
    <div class="FileImage_Content">
      <FileMenu data-file-menu :menu="menu"/>
      <a class="FileImage_Link" :href="url_private" target="_blank">
        <img class="FileImage_Image" :src="thumb_360">  
      </a>
    </div>
  </div>
</template>

<script>
import clipboard from "clipboard-polyfill"
import FileMenu from "./FileMenu.vue"
export default {
  name: "FileImage",
  props: {
    id: String,
    created: Number,
    timestamp: Number,
    name: String,
    title: String,
    mimetype: String,
    filetype: String,
    pretty_type: String,
    user: String,
    editable: Boolean,
    size: Number,
    mode: String,
    is_external: Boolean,
    external_type: String,
    is_public: Boolean,
    public_url_shared: Boolean,
    display_as_bot: Boolean,
    username: String,
    url_private: String,
    url_private_download: String,
    thumb_64: String,
    thumb_80: String,
    thumb_360: String,
    thumb_360_w: Number,
    thumb_360_h: Number,
    thumb_480: String,
    thumb_480_w: Number,
    thumb_480_h: Number,
    thumb_720: String,
    thumb_720_w: Number,
    thumb_720_h: Number,
    thumb_800: String,
    thumb_800_w: Number,
    thumb_800_h: Number,
    thumb_960: String,
    thumb_960_w: Number,
    thumb_960_h: Number,
    thumb_1024: String,
    thumb_1024_w: Number,
    thumb_1024_h: Number,
    thumb_160: String,
    image_exif_rotation: Number,
    original_w: Number,
    original_h: Number,
    permalink: String,
    permalink_public: String,
  },
  computed: {
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
.FileImage {
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
  &_Content:hover {
    [data-file-menu] {
      opacity: 1;
    }
  }
}
</style>
