var graphpipe = graphpipe || {};

graphpipe.languageLabels = {
  cpp: 'C++',
  okl: 'OKL',
};

graphpipe.getLanguageLabel = (language) => (
  graphpipe.languageLabels[language] || language.toUpperCase()
);

//---[ Header & Footer ]----------------
graphpipe.addFooter = (content) => (
  content
    + '\n\n'
    + '<div id="footer">\n'
    + '  <hr/>\n'
    + '  <div id="copyright">\n'
    + `    © Copyright 2018 - ${(new Date()).getFullYear()}, Oracle Inc.\n`
    + '  </div>\n'
    + '  <div>\n'
    + '    <a href="https://docsify.js.org" target="_blank">Powered by <span class="docsify-text">Docsify</span> <span class="heart">&hearts;</span></a>\n'
    + '  </div>\n'
    + '</div>\n'
);
//======================================

//---[ Indent ]-------------------------
graphpipe.parseIndent = (content) => {
  const parts = marked.lexer(content);
  const mdContent = graphpipe.tokensToHTML(parts);
  return (
    '<div class="indent">\n'
      + mdContent
      + '</div>\n'
  );
}

graphpipe.addIndents = (content) => {
  const re = /\n::: indent\n([\s\S]*?)\n:::(\n|$)/g;
  const parts = [];
  var lastIndex = 0;
  while ((match = re.exec(content)) != null) {
    const [fullMatch, indentContent] = match;

    parts.push(content.substring(lastIndex, match.index));
    parts.push(graphpipe.parseIndent(indentContent));

    lastIndex = match.index + fullMatch.length;
  }
  parts.push(content.substring(lastIndex));

  return parts.join('\n');
};
//======================================

//---[ Tabs ]---------------------------
graphpipe.markdown = {
  space: () => (
    ''
  ),
  text: ({ text }) => (
    `<p>${text}</p>`
  ),
  paragraph: ({ text }) => (
    `<p>${text}</p>`
  ),
  list_start: () => (
    '<ul>'
  ),
  list_end: () => (
    '</ul>'
  ),
  list_item_start: () => (
    '<li>'
  ),
  list_item_end: () => (
    '</li>'
  ),
  html: ({ text }) => (
    text
  ),
};

graphpipe.markdown.code = ({ lang, text }) => {
  // Remove indentation
  const initIndent = text.match(/^\s*/)[0];
  if (initIndent.length) {
    const lines = text .split(/\r?\n/);
    const isIndented = lines.every((line) => (
      !line.length
      || line.startsWith(initIndent)
    ));

    if (isIndented) {
      text = lines.map((line) => (
        line.substring(initIndent.length)
      )).join('\n');
    }
  }

  // Generate highlighted HTML
  const styledCode = Prism.highlight(text,
                                     Prism.languages[lang],
                                     lang);

  // Wrap around pre + code
  return (
    (
      `<pre data-lang="${graphpipe.getLanguageLabel(lang)}">`
        + `<code class="lang-${lang}">`
        + `${styledCode}\n`
        + '</code>'
        + '</pre>'
    )
      .replace(/[*]/g, '&#42;')
      .replace(/[_]/g, '&#95;')
  );
}

graphpipe.tokenToMarkdown = (token) => {
  const { type } = token;
  if (type in graphpipe.markdown) {
    return graphpipe.markdown[token.type](token);
  }
  console.error(`Missing token format for: ${token.type}`, token);
  return '';
};

graphpipe.mergeTextTokens = (tokens) => {
  const newTokens = [];
  let texts = [];
  for (var i = 0; i < tokens.length; ++i) {
    const token = tokens[i];
    if (token.type === 'text') {
      texts.push(token.text);
      continue;
    }
    if (texts.length) {
      newTokens.push({
        type: 'text',
        text: texts.join(' '),
      });
      texts = [];
    }
    newTokens.push(token);
  }
  // Join the tail texts
  if (texts.length) {
    newTokens.push({
      type: 'text',
      text: texts.join(' '),
    });
  }
  return newTokens;
};

graphpipe.tokensToHTML = (tokens) => {
  tokens = graphpipe.mergeTextTokens(tokens);
  return (
    tokens
      .map(graphpipe.tokenToMarkdown)
      .join('\n')
  );
};

graphpipe.getTab = ({ tab, content }) => (
  `      <md-tab id="${tab}" md-label="${tab}">\n`
    + graphpipe.tokensToHTML(content)
    + '      </md-tab>'
);

graphpipe.getTabs = (namespace, tabs) => {
  const content = tabs.map(graphpipe.getTab).join('\n');

  const tab     = `vm.$data.tabNamespaces['${namespace}']`;
  const onClick = `(tab) => vm.onTabChange('${namespace}', tab)`;

  return (
    '<template>\n'
      + '  <div>\n'
      + '    <md-tabs\n'
      + '      md-dynamic-height="true"\n'
      + `      v-bind:md-active-tab="${tab}"\n`
      + `      @md-changed="${onClick}"\n`
      + '    >\n'
      + `${content}\n`
      + '    </md-tabs>\n'
      + '  </div>\n'
      + '</template>\n'
  );
};

graphpipe.parseTabs = (namespace, content) => {
  const parts = marked.lexer(content);
  const newParts = [];

  // Skip begin/end of list
  for (var i = 1; i < (parts.length - 1); ++i) {
    var stackSize = 1;

    // Skip loose_item_start;
    ++i;
    const tab = parts[i++].text;
    const start = i++;

    while ((i < (parts.length - 1)) && (stackSize > 0)) {
      switch (parts[i].type) {
      case 'list_item_start':
        ++stackSize;
        break;
      case 'list_item_end':
        --stackSize;
        break;
      }
      ++i;
    }

    // Don't take the token after list_item_end
    --i;

    newParts.push({
      tab,
      content: parts.slice(start, i),
    });
  }

  if (!newParts.length) {
    return [];
  }

  if (!(namespace in vm.$data.tabNamespaces)) {
    Vue.set(vm.tabNamespaces, namespace, newParts[0].tab);
  }

  return graphpipe.getTabs(namespace, newParts);
};

graphpipe.addTabs = (content) => {
  const re = /\n::: tabs (.*)\n([\s\S]*?)\n:::(\n|$)/g;
  const parts = [];
  var lastIndex = 0;
  while ((match = re.exec(content)) != null) {
    const [fullMatch, namespace, tabContent] = match;

    parts.push(content.substring(lastIndex, match.index));
    parts.push(graphpipe.parseTabs(namespace, tabContent));

    lastIndex = match.index + fullMatch.length;
  }
  parts.push(content.substring(lastIndex));

  return parts.join('\n');
};
//======================================

// Root-level markdowns don't have a sidebar
graphpipe.hasSidebar = (file) => (
  !file.match(/^[^/]*\.md$/)
)

graphpipe.docsifyPlugin = (hook, vm) => {
  hook.init(() => {
    Prism.languages.okl = Prism.languages.extend('cpp', {
      annotation: {
        pattern: /@[a-zA-Z][a-zA-Z0-9_]*/,
        greedy: true,
      },
    });
    Prism.languages.bibtex = Prism.languages.extend('latex');
  });

  hook.beforeEach((content) => {
    // No \n means the last line turns into a header
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    content = graphpipe.addIndents(content);
    content = graphpipe.addTabs(content);
    content = graphpipe.addFooter(content);
    return content;
  });

  hook.doneEach(() => {
    const dom = document.querySelector('body');
    const file = vm.route.file;
    // Add API styling
    if (!file.startsWith('api/')) {
      dom.classList.remove('api-container');
    } else {
      dom.classList.add('api-container');
    }
    // Close sidebar
    if (graphpipe.hasSidebar(file)) {
      dom.classList.remove('no-sidebar');
    } else {
      dom.classList.add('no-sidebar');
    }
  });
};

Vue.component('team-member', {
  props: [
    'name',
    'image',
    'job',
    'location',
    'links',
    'github',
    'twitter',
    'googleScholar',
  ],
  template: (
    '    <div class="member">'
      + '  <div class="avatar">'
      + '    <md-avatar>'
      + '      <img v-bind:src="\'./assets/images/team/\' + image" v-bind:alt="name">'
      + '    </md-avatar>'
      + '  </div>'
      + '  <div class="profile">'
      + '    <h3>{{name}}</h3>'
      + '    <dl>'
      + '      <template v-if="job">'
      + '        <dt><i class="fa fa-briefcase"></i></dt>'
      + '        <dd>{{job}}</dd>'
      + '      </template>'
      + '      <template v-if="location">'
      + '        <dt><i class="fa fa-map-marker"></i></dt>'
      + '        <dd>{{location}}</dd>'
      + '      </template>'
      + '      <template v-for="link in links">'
      + '        <dt><i class="fa fa-link"></i></dt>'
      + '        <dd>'
      + '          <a v-bind:href="link[1]" target="_blank">{{link[0]}}</a>'
      + '        </dd>'
      + '      </template>'
      + '      <footer>'
      + '        <a v-if="github" v-bind:href="\'https://github.com/\' + github" target="_blank">'
      + '          <md-icon class="fa fa-github"></md-icon>'
      + '        </a>'
      + '        <a v-if="twitter" v-bind:href="\'https://twitter.com/\' + twitter" target="_blank">'
      + '          <md-icon class="fa fa-twitter"></md-icon>'
      + '        </a>'
      + '        <a v-if="googleScholar" v-bind:href="googleScholar" target="_blank">'
      + '          <md-icon class="fa fa-google"></md-icon>'
      + '        </a>'
      + '      </footer>'
      + '    </dl>'
      + '  </div>'
      + '</div>'
  ),
});

Vue.component('gallery-item', {
  props: ['name', 'link', 'from', 'image'],
  template: (
    '    <div class="gallery-entry">'
      + '  <div class="image">'
      + '    <a v-bind:href="link" target="_blank">'
      + '      <img v-bind:src="\'./assets/images/gallery/\' + image" alt="{{name}}">'
      + '    </a>'
      + '  </div>'
      + '  <div class="description">'
      + '    <h3><a v-bind:href="link" target="_blank">{{name}}</a> <span class="at">@{{from}}</span></h3>'
      + '    <slot></slot>'
      + '  </div>'
      + '</div>'
  ),
});
