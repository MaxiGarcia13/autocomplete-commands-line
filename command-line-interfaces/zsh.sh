if ! whence compinit > /dev/null; then
  autoload -Uz compinit
  compinit
fi

if type compdef &>/dev/null; then
  _read_package_scripts() {
    local -a reply

    reply=($(COMP_CWORD="$((CURRENT-1))" \
      COMP_LINE="$BUFFER" \
      COMP_POINT="$CURSOR" \
      node -e '
        const { readFileSync, existsSync } = require("node:fs");
        const path = `${process.cwd()}/package.json`;

        if (existsSync(path)) {
          const pkg = JSON.parse(readFileSync(path, "utf8"));
          if (pkg.scripts) {
            console.log(Object.keys(pkg.scripts).join("\n").replaceAll(":", "\\:"));
          }
        }
      ')
    )

    _describe 'npm scripts' reply
  }

  compdef _read_package_scripts "npm run"
fi
