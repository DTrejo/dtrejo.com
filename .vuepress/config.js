module.exports = {
  title: 'David Trejo',
  description: 'Growth Engineer at Credit Karma & Consultant',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'copyright', content: `Copyright 2009-${(new Date()).getFullYear()} David Trejo` }],
    ['meta', { name:'apple-mobile-web-app-capable', content: 'yes' }],
  ],
  themeConfig: {
    authors: {
      default: {
        image: '/images/dtrejo.jpg', // must be inside .vuepress/public/images/*
        imageTitle: 'David Trejo',
        name: 'David Trejo',
        description: `Growth Engineer at Credit Karma & Consultant. Past clients include Aconex, Triplebyte, Neo, Brown Computer Science Department, Voxer, Cloudera, and the Veteran's Benefits Administration.`,
        link: '/'
      }
    },
    footer: `Copyright © 2009-${(new Date()).getFullYear()} David Trejo`,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Books', link: '/books' },
      { text: 'Hire Engineers', link: 'https://engineeroverflow.com' },
      // TODO: hiring articles?
    ],
    // sidebar: []
  }
}

/*

---
navbar: false
---

---
sidebar: auto
---

*/
