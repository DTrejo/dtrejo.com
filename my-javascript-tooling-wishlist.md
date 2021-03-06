---
title: My Javascript Tooling Wishlist
date: 2014-03-21 07:06 CET
tags: javascript, nodejs, tools
---
# ${this.title}

<img src="./images/js-logo.png" height="120px" style="float:right; padding: 0 0 3.2rem 3.2rem;" />

What follows is a wishlist of features I'd want in my perfect javascript
dev environment (I don't care whether each of these things is a separate command
line tool, I just want them :)

<!-- more -->

Some of these are easy to write, some are hard. What would you add to this list?

## I dream of a javascript with these tools...
- flow-typing e.g. [strobe][1], [strobe paper][15]
  - a flow typer is a program that reads your javascript, notices the
    operators you use on certain variables (e.g. `a + 1`), and then guesses
    the type of those variables.
- types via the flow-typer would make the following possible...
  - editor shows types for every variable, and you didn't have to specify them
    :)
  - auto-generated API documentation, with types
  - a "lock-API" tool; when you run it, your the type signatures of your
    functions are remembered. If the signatures every change, it warns you.
    This "lock-API" tool will prevent you from forgetting to increment the
    version of your package.json when you break the API.
  - test fuzzer based on the inferred types, to easily up your code coverage
  - some kind of fuzzer pattern language that would allow you to automatically
    generate assertions to be used at the start of every function. assertions
    would be removed before running in production. This would help people
    using your code to find mistakes more quickly. (This one is going off into
    la la land. Not sure if I believe this would be useful enough).
- visualization of your project's require dependency graph e.g. [tracegl][5]?, [yasiv npm visualization][6] via [substack's lxjs '13 talk][10]
- visualization of which functions call other functions, along with a bird's eye
  view of your whole program
- static analysis tool to find uncalled callbacks (`callback` `cb`, `next`,
  `done`, etc) e.g. [jshint][7]
- static analysis tool to find dead code after `return`. e.g. [jshint][7]
- static analysis tool that reminds you to do `return cb()`, so you never call
  callbacks twice.
- auto npm install
  - when you add a call to `require('example')`, `example` is detected as not
    installed, and the tool runs `npm install --save example` so you don't
    have to
- style guide enforcement **and correction** tool that bases itself on certain
  "blessed" files. Based on the formatting and style of the blessed files, it
  corrects newly written files to match the same whitespace, line-length, etc.
  No blasphemers allowed! e.g. [fixymyjs (kinda)][16]
- v8 hidden class detector - if a hidden class is "broken" or deoptimized, it
  warns you. e.g. if you use `delete` on a property of your `new Point()`
  object.
- lodash style native vs custom speed improvement detector
  - many functions are slower when implemented using native calls e.g. `[].slice`
  - [John David Dalton's jsconf '12 presentation on which custom implementations are faster][8]
  - this tool would tell you when to use custom, and when to use native.
  - it would also tell you when to switch from custom back to native (v8 gets
    faster, etc)
- memory usage map overlaid on your code as a heat map
  - visually see where memory is being used in your code.
  - see which lines are responsible for how much memory usage
  - a snapshot after a day's run should theoretically show you where your
    leaks are, because those lines are the hottest.
- `(new Error).stack` printer that highlights lines based on your app's code,
  `node_modules` code, and node core code.
- performance test runner that takes a list of git commits, checks out each one,
  runs benchmarks and records results, then continues on. spits out a report at
  the end. maybe with a pretty graph showing which commits did best on which
  parts of the benchmark.

### general node-style project tools
- bulk git repo updating (if your project is modular, and each part is in a
  different repo)
- bulk npm version updating (if you are substack, and want to manage the many
  npm modules you've written)

### already-implemented and thus less interesting
- jump to declaration e.g. [webstorm][2]
- jump to all usages of a function
- auto test or auto rerun server on change e.g. [run][3], [nodemon][4]
- shell enhancement: click on a filename to open in your editor
- code coverage e.g. [coverify for client side js][14]
  - highlight untested code in a really ugly color in your editor
    e.g. [DrScheme][9]
- review and **edit** diffs side-by-side before pushing to master (or while fixing
  conflicts)
  - use [Philip Zeyliger's git-vimdiff][13]

#### Ideas / suggestions / "I built that!"
Please if you know of any things that I should add to the lists above, tweet
at me: [@ddtrejo][11], alternatively, [my email is on my github][12].

Thanks!

David Trejo

[1]: https://github.com/brownplt/strobe
[2]: https://www.jetbrains.com/webstorm/
[3]: http://npm.im/run
[4]: http://npm.im/nodemon
[5]: https://trace.gl/
[6]: http://www.yasiv.com/npm#view/browserify
[7]: http://npm.im/jshint
[8]: http://allyoucanleet.com/post/21624742336/jsconf-us-12-slides
[9]: http://racket-lang.org/
[10]:https://www.youtube.com/watch?v=DCQNm6yiZh0
[13]:https://github.com/philz/git-vimdiff
[14]:https://github.com/substack/coverify
[15]:http://cs.brown.edu/~sk/Publications/Papers/Published/gsk-flow-typing-theory/paper.pdf
[16]:https://github.com/jshint/fixmyjs

[11]:http://twitter.com/ddtrejo
[12]:https://github.com/dtrejo

Projects I mentioned:

- <https://github.com/brownplt/strobe>
- <https://www.jetbrains.com/webstorm/>
- <http://npm.im/run>
- <http://npm.im/nodemon>
- <https://trace.gl/>
- <http://www.yasiv.com/npm#view/browserify>
- <http://npm.im/jshint>
- <http://allyoucanleet.com/post/21624742336/jsconf-us-12-slides>
- <http://racket-lang.org/>
- <https://www.youtube.com/watch?v=DCQNm6yiZh0>
- <https://github.com/philz/git-vimdiff>
- <https://github.com/substack/coverify>
- <http://cs.brown.edu/~sk/Publications/Papers/Published/gsk-flow-typing-theory/paper.pdf>
- <https://github.com/jshint/fixmyjs>
