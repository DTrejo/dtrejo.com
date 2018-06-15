<template>
  <ol>
    <li
      v-for="post in $site.pages.sort((a, b) =>
        -1 * (a.frontmatter.date || '').localeCompare(b.frontmatter.date)
      )"
      v-if="(!tag || tags(post).includes(tag))
        && !intersects(tags(post), parseTags(not))"
      :key="post.frontmatter.title"
    >
      <router-link :to="post.path">
        {{ post.title }}
      </router-link>
    </li>
  </ol>
</template>

<script>
/*
<!-- <div class="title">{{ post.title }}</div> -->
<!-- <div class="date">{{ new Date(post.frontmatter.date).toLocaleDateString() }}</div> -->
<!-- <div class="description">{{ post.frontmatter.description }}</div> -->
<!-- TODO: include excerpt instead? -->
<!-- style="white-space: pre; font-family: monaco, monospace;"
{{JSON.stringify([this,tag, post], null, 2)}} -->
<!-- it is okay to put this in an <article> if you include excerpt etc -->
*/
export default {
  props: {
    tag: {
      type: String
    },
    not: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseTags,
    tags(post) {
      return parseTags(post.frontmatter.tags)
    },
    intersects(a, b) {
      // console.log('intersects', a, '|', b, '===', a.some(el => b.includes(el)))
      return a.some(el => b.includes(el))
    }
  }
}

function parseTags (raw) {
  // handle "abc" and "abc, def"
  if (typeof raw === 'string') {
    return raw.split(',').map(s => s.trim())
  }
  return raw || []
}
</script>
