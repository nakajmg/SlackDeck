<template>
  <div class="FilePDF">
    <div class="FilePDF_Name">
      <span class="FilePDF_NameIcon">
        <FontAwesomeIcon :icon="['far', 'file-pdf']"/>
      </span>
      {{name}}
    </div>
    <a :href="url_private" target="_blank">
      <div class="FilePDF_Thumb" :style="{backgroundImage: `url(${thumb_pdf})`}">
      </div> 
    </a>
  </div>
</template>

<script>
export default {
  name: "FilePDF",
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
}
</script>

<style lang="scss" scoped>
.FilePDF {
  border: 1px solid #e8e8e8;
  padding: 10px;
  &_Name {
    font-size: 0.75em;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
  &_NameIcon {
    font-size: 30px;
    color: red;
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
}
</style>
