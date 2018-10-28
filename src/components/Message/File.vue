<template>
  <div class="File">
    <div v-if="isImage">
      <div class="File_Name">{{name}}</div>
      <div class="File_Content">
        <div class="File_More">
          <el-dropdown trigger="click">
            <span class="el-icon-more">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a :href="url_private_download">Download</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a :href="url_private" @click.prevent="copyLink(url_private)">
                  Copy link to file
                </a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a :href="url_private" target="_blank">
                  Open original
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <a class="File_Link" :href="url_private" target="_blank">
          <img class="File_Image" :src="thumb_360">  
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import clipboard from "clipboard-polyfill"
import { includes } from "lodash"
export default {
  name: "File",
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
