<template>
  <div class="FilePDF">
    <div class="FilePDF_Info">
      <span class="FilePDF_NameIcon">
        <FontAwesomeIcon :icon="['far', 'file-pdf']"/>
      </span>
      <span>
        <div class="FilePDF_Name">
          {{name}}
        </div>
        <div class="FilePDF_Size">
          {{fileSize}}
        </div>
      </span>
    </div>
    <FileMenu data-file-menu :menu="menu"/>
    <a :href="url_private" target="_blank">
      <div class="FilePDF_Thumb" :style="{backgroundImage: `url(${thumb_pdf})`}">
      </div> 
    </a>
  </div>
</template>

<script>
import clipboard from "clipboard-polyfill"
import FileMenu from "./FileMenu.vue"
export default {
  name: "FilePDF",
  components: {
    FileMenu,
  },
  props: {
    created: Number,
    display_as_bot: Boolean,
    editable: Boolean,
    external_type: String,
    filetype: String,
    id: String,
    is_external: Boolean,
    is_public: Boolean,
    mimetype: String,
    mode: String,
    name: String,
    permalink: String,
    permalink_public: String,
    pretty_type: String,
    public_url_shared: Boolean,
    size: Number,
    thumb_pdf: String,
    thumb_pdf_h: Number,
    thumb_pdf_w: Number,
    timestamp: Number,
    title: String,
    url_private: String,
    url_private_download: String,
    user: String,
    username: String,
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
}
</script>

<style lang="scss" scoped>
.FilePDF {
  border: 1px solid #080808;
  padding: 10px;
  margin-top: 10px;
  position: relative;
  &_Info {
    margin-bottom: 5px;
    display: flex;
    align-items: flex-start;
  }
  &_Name {
    font-weight: 600;
    font-size: 0.7em;
  }
  &_Size {
    font-size: 0.7em;
    color: #8e8e8e;
    font-family: monospace;
  }
  &_NameIcon {
    display: inline-flex;
    font-size: 40px;
    color: #ff3d3d;
    margin-right: 10px;
  }
  &_Thumb {
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 200px;
    border: 1px solid #e8e8e8;
  }
  &:hover {
    [data-file-menu] {
      opacity: 1;
    }
  }
}
</style>
