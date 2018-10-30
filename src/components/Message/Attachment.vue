<template>
  <div class="Attachment">
    <div class="Attachment_Pretext">{{pretext}}</div>
    <div class="Attachment_Content" v-if="author_name">
      <div class="Attachment_Border"
        v-if="color"
        :style="{backgroundColor:'#' + color}"
      >
      </div>
      <div class="Attachment_Main">
        <div class="Attachment_Header">
          <span class="Attachment_AuthorIcon" v-if="author_icon">
            <img :src="author_icon">
          </span>
          <span class="Attachment_Author" v-if="author_name">
            <a :href="author_link" rel="no-opener" target="_blank">
              {{author_name}}
            </a>
          </span>
        </div>
        <div class="Attachment_Title">
          <a :href="title_link ? title_link : null">
            {{title}}
          </a>
        </div>
        <div class="Attachment_Body" v-html="bodyHTML">
        </div>
        <div class="Attachment_Footer">
          <span class="Attachment_FooterIcon">
            <img :src="footer_icon">
          </span>
          <span v-html="footerHTML"></span>
        </div>
      </div>
    </div>
    <div class="Attachment_Service" v-if="from_url">
      <div class="Attachment_ServiceInfo">
        <img class="Attachment_ServiceIcon" :src="service_icon">
        <span class="Attachment_ServiceName">{{service_name}}</span>
      </div>
      <div class="Attachment_ServiceTitle">
        <a :href="title_link" target="_blank">
          {{title}}
        </a>
      </div>
      <div class="Attachment_ServiceText">
        {{text}}
      </div>
      <div class="Attachment_Image" v-if="image_url">
        <a class="Attachment_ImageLink" :href="from_url || image_url" target="_blank">
          <img :src="image_url" :width="image_width">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it"
import replaceLink from "../../utils/message/replaceLink"
const mdit = new MarkdownIt({ html: true })
export default {
  name: "Attachment",
  props: {
    author_icon: String,
    author_link: String,
    author_name: String,
    color: String,
    footer: String,
    footer_icon: String,
    markdwn_in: Array,
    text: String,
    title: String,
    title_link: String,
    pretext: String,
    image_url: String,
    image_width: Number,
    image_height: Number,
    from_url: String,
    original_url: String,
    service_name: String,
    fallback: String,
    image_bytes: Number,
    service_icon: String,
    id: Number,
  },
  computed: {
    bodyHTML() {
      return mdit.render(replaceLink(this.text))
    },
    footerHTML() {
      return replaceLink(this.footer)
    },
  },
}
</script>

<style lang="scss">
.Attachment {
  a {
    color: #0576b9;
    &:link {
      color: #0576b9;
    }
    &:active,
    &:focus,
    &:hover {
      color: #005e99;
    }
    &:link {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &_Pretext {
    font-size: 0.8em;
  }
  &_Content {
    display: flex;
  }
  &_Title {
    font-weight: 700;
    font-size: 0.75em;
  }
  &_Border {
    min-width: 3px;
    border-radius: 3px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 0.5em;
  }
  &_Header {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  &_AuthorIcon,
  &_FooterIcon {
    display: block;
    width: 1.2em;
    height: 1.2em;
    border-radius: 2px;
    margin-right: 0.3em;
    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 2px;
    }
  }
  &_Author {
    color: #fff;
    font-size: 0.8em;
    a {
      text-decoration: none;
      &:link,
      &:visited {
        color: inherit;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &_Body,
  &_Footer {
    font-size: 0.7em;
    line-height: 1.7;
    p {
      margin: 0;
    }
    em {
      font-style: normal;
      font-weight: 600;
    }
    code {
      font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
      font-size: 0.85em;
      padding: 1px 2px 1px;
      white-space: normal;
      color: #d72b3f;
      background-color: #f7f7f9;
      font-variant-ligatures: none;
      tab-size: 2;
      border: 1px solid #e1e1e8;
      word-break: break-word;
    }
    a {
      color: #0576b9;
      &:link {
        color: #0576b9;
      }
      &:active,
      &:focus,
      &:hover {
        color: #005e99;
      }
      &:link {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  &_Footer {
    display: flex;
    align-items: center;
  }
  &_Image {
    margin-top: 5px;
    img {
      max-width: 100%;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      display: block;
    }
  }
  &_ImageLink {
    display: inline-block;
  }
  &_Service {
    margin-top: 10px;
    padding-left: 10px;
    border-left: 3px solid #a59300;
    margin-left: -28px;
  }
  &_ServiceInfo {
    display: flex;
    align-items: center;
  }
  &_ServiceIcon {
    width: 16px;
    height: auto;
    display: block;
    margin-right: 7px;
  }
  &_ServiceName {
    font-size: 0.8em;
    color: #fff;
  }
  &_ServiceTitle {
    font-weight: 600;
    font-size: 0.7em;
  }
  &_ServiceText {
    font-size: 0.7em;
  }
}
</style>
