const highlightCode = () => {
  // FIX: Only target .syntax-highlight. Removed .container so it doesn't destroy the navbar.
  const blocks = document.querySelectorAll('.syntax-highlight');

  blocks.forEach(block => {
    let text = block.textContent;

    const rules = [
      { type: 'comment',  regex: /(#[\s\S]*?#|\/\/.*|\/\*[\s\S]*?\*\/)/g },
      { type: 'string',   regex: /("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g },
      { type: 'type',     regex: /\b(int|float|char|string|bool|while|if|else|lib)\b(?![^<>]*>)/g },
      { type: 'keyword',  regex: /\b(const|while|if|else|lib|return)\b(?![^<>]*>)/g },
      { type: 'func',     regex: /\b([a-z_][a-z0-9_]*)(?=\()(?![^<>]*>)/gi }
    ];

    let highlighted = text;

    rules.forEach(rule => {
      highlighted = highlighted.replace(rule.regex, (match) => {
        const extraClass = rule.type === 'func' ? 'func' : '';
        return `<span class="code-${rule.type} ${extraClass}">${match}</span>`;
      });
    });

    block.innerHTML = highlighted;
  });

  if (typeof setupFunctionLinks === "function") {
      setupFunctionLinks();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  highlightCode();
});