echo "maxigarcia13/autocomplete-commands-line@$(node -p "require('$AUTOCOMPLETE_COMMANDS_LINE_PATH/package.json').version") is running"
echo $COMMAND_LINE_SRC

autoload -Uz compinit
compinit

if type compdef &>/dev/null; then
  _dynamic_completion () {
    local reply
    local si=$IFS

    # Use current working directory dynamically
    local script_path="$AUTOCOMPLETE_COMMANDS_LINE_PATH/src/main.js"

    # Call your Node.js script and capture its output
    IFS=$'\n' reply=($(COMP_CWORD="$((CURRENT-1))" \
                       COMP_LINE="$BUFFER" \
                       COMP_POINT="$CURSOR" \
                       node "$script_path" -- "${words[@]}"))
    IFS=$si

    _describe 'values' reply
  }

  for cmd in $(node -p "require('$AUTOCOMPLETE_COMMANDS_LINE_PATH/src/command-list.json').join(' ')"); do
    compdef _dynamic_completion $cmd
  done
fi
