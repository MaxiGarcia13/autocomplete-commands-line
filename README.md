# Autocomplete Commands Line

⚡️ **Smart autocomplete for your existing terminal & shell** - enhances your command-line experience with intelligent suggestions for commands, options, and npm scripts.

## Features

- 🚀 **Universal Command Support** - Works with 40+ popular commands including Git, Docker, npm, AWS CLI, and more
- 📦 **npm Scripts Integration** - Automatically suggests npm scripts from your `package.json`
- 🧠 **Intelligent Parsing** - Dynamically parses help output to provide relevant options and subcommands
- 🐚 **Shell Integration** - Currently supports Zsh with plans for Bash and Fish
- ⚡ **Fast & Lightweight** - Minimal overhead, instant suggestions
- 💾 **Smart Caching** - Caches command help responses for 24 hours to improve performance

## Supported Commands

The autocomplete system works with these popular commands:

**Package Managers:** npm, yarn, pnpm, brew, apt, apt-get, dnf, yum, cargo, gem, composer

**Development Tools:** git, node, npx, tsc, ruby, vite, react-native, webpack, parcel

**DevOps & Cloud:** docker, docker-compose, kubectl, helm, minikube, aws, gcloud, terraform, ansible

**System Tools:** vim, nvim, ssh, scp, curl, wget, grep, tar, zip, unzip

## Installation

### Prerequisites

- Node.js (version 12 or higher)
- Zsh shell (other shells coming soon)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaxiGarcia13/autocomplete-commands-line.git
   cd autocomplete-commands-line
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Add these lines to your `~/.zshrc` file:
   ```bash
   export AUTOCOMPLETE_COMMANDS_LINE_PATH="/path/to/autocomplete-commands-line"
   source "$AUTOCOMPLETE_COMMANDS_LINE_PATH/src/command-line-interfaces/zsh.sh"
   ```

4. **Reload your shell:**
   ```bash
   source ~/.zshrc
   ```

## Usage

Once installed, the autocomplete system works automatically:

### Basic Command Completion
```bash
git <TAB>                    # Shows: add, commit, push, pull, etc.
docker <TAB>                 # Shows: run, build, ps, images, etc.
npm <TAB>                    # Shows: install, start, test, run, etc.
```

### Option and Flag Completion
```bash
git commit <TAB>             # Shows: --message, --amend, --author, etc.
docker run <TAB>             # Shows: --detach, --interactive, --volume, etc.
```

### npm Scripts Integration
When you type `npm run`, the system automatically reads your `package.json` and suggests available scripts:
```bash
npm run <TAB>                # Shows: start, test, build, dev, lint, etc.
```

## How It Works

The autocomplete system uses several intelligent strategies:

1. **Help Output Parsing** - Executes commands with `--help`, `-h`, or `help` flags to extract available options and subcommands
2. **Smart Caching** - Caches command help responses for 24 hours to avoid repeated executions
3. **Pattern Matching** - Uses regular expressions to identify command options (--flag) and subcommands
4. **Fallback Strategy** - If a command fails, it tries parent commands to provide relevant suggestions
5. **npm Integration** - Special handling for npm commands to read package.json scripts
6. **Shell Integration** - Uses Zsh's completion system for seamless integration

## Configuration

### Adding Custom Commands

To add support for additional commands, edit `src/command-list.json`:

```json
[
  "your-custom-command",
  "another-command"
]
```

### Environment Variables

- `AUTOCOMPLETE_COMMANDS_LINE_PATH` - Path to the project directory
- `COMP_LINE` - Current command line (automatically set by shell)
- `COMP_CWORD` - Current cursor word position
- `COMP_POINT` - Current cursor position

### Cache Management

The system automatically caches command help responses to improve performance. Cache entries expire after 24 hours.

#### Cache Commands

```bash
npm run cache:stats                   # View cache statistics
npm run cache:clean                   # Remove expired entries
npm run cache:clear                   # Clear all cache entries
```

#### Cache Location

Cache files are stored in `~/.autocomplete-commands-cache/` in your home directory.

#### Manual Cache Management

You can also use the cache manager directly:

```bash
node src/cache-manager.js stats       # Show cache statistics
node src/cache-manager.js clean       # Remove expired entries
node src/cache-manager.js clear       # Clear all cache
```

## License

ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Maximiliano Garcia Mortigliengo**

- GitHub: [@MaxiGarcia13](https://github.com/MaxiGarcia13)
- Project: [autocomplete-commands-line](https://github.com/MaxiGarcia13/autocomplete-commands-line)

## Acknowledgments

- Inspired by modern shell completion systems
- Built with Node.js and shell scripting
- Designed for developer productivity

---
