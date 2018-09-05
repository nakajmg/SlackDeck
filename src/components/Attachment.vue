<template>
  <div class="Attachment">
    <div class="Attachment_Pretext">{{pretext}}</div>
    <div class="Attachment_Content">
      <div class="Attachment_Border"
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
  </div>
</template>

<script>
import MarkdownIt from "markdown-it"
import replaceLink from "../utils/message/replaceLink"
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
  &_Pretext {
    font-size: 0.8em;
  }
  &_Content {
    display: flex;
  }
  &_Title {
    font-weight: 700;
    font-size: 0.9em;
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
    color: #555;
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
    font-size: 0.75em;
    line-height: 1.7;
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
    em {
      font-style: normal;
      font-weight: 600;
    }
    code {
      font-family: Monaco, Menlo, Consolas, "Courier New", monospace !important;
      font-size: 1em;
      line-height: 1em;
      white-space: normal;
      color: #d72b3f;
      padding: 2px 3px 1px;
      font-variant-ligatures: none;
      tab-size: 4;
      background-color: #f7f7f9;
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
}
</style>
