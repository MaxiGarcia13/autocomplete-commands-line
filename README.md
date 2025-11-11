# Autocomplete Commands Line

⚡️ **Smart autocomplete for your existing terminal & shell** - enhances your command-line experience with intelligent suggestions for commands, options, and npm scripts.

## Features

- 🚀 **Universal Command Support** - Works with 40+ popular commands including Git, Docker, npm, AWS CLI, and more
- 📦 **npm Scripts Integration** - Automatically suggests npm scripts from your `package.json`

## Demo

<video src="/assets/demo.mov" autoplay muted loop playsinline width="600"></video>

## Supported Commands

The autocomplete system works with these popular commands:

**Package Managers:** npm, yarn, pnpm, brew, apt, apt-get, dnf, yum, cargo, gem, composer

**Development Tools:** git, node, npx, tsc, ruby, vite, react-native, webpack, parcel

**DevOps & Cloud:** docker, docker-compose, kubectl, helm, minikube, aws, gcloud, terraform, ansible

**System Tools:** vim, nvim, ssh, scp, curl, wget, grep, tar, zip, unzip


**Configure Zsh Integration:**

   **To make this project work, you need to copy and paste the configuration from the `command-line-interfaces` folder in your `~/.zshrc`.**

   1. Open your `~/.zshrc` file and add the following configuration:
   2. Copy and paste the configuration from the `command-line-interfaces` folder in your `~/.zshrc`.
   3. Reload your shell:
      ```bash
      source ~/.zshrc
      ```

## Usage

Once configured, the autocomplete system works automatically:

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

## Understanding the Zsh Configuration Script

The configuration script that you copy and paste into your `~/.zshrc` consists of several important components:

### The `compinit` Function

```bash
autoload -Uz compinit
compinit
```

- **`autoload -Uz compinit`** - This loads the `compinit` function into memory on-demand:
  - `-U` flag tells zsh not to expand aliases when loading the function
  - `-z` flag uses zsh-style loading (as opposed to ksh-style)
  - `compinit` is zsh's completion initialization function

- **`compinit`** - This actually initializes the zsh completion system:
  - Sets up the completion infrastructure
  - Loads all available completion functions
  - Must be called before any custom completion functions can be defined or used
  - Creates the necessary data structures for tab completion to work

### The Custom Completion Function

The `_read_package_scripts()` function is where the magic happens:

**Purpose:** Dynamically reads npm scripts from the current directory's `package.json` file and presents them as completion options.

### Why This Setup Works

This configuration integrates seamlessly with zsh's native completion framework:

- **Non-intrusive:** Uses zsh's standard completion mechanisms
- **Dynamic:** Reads scripts from `package.json` in real-time
- **Context-aware:** Only activates for `npm run` commands
- **Performance:** Leverages Node.js for fast JSON parsing

The `compinit` initialization is crucial because it sets up the entire completion system that makes tab completion possible in zsh. Without it, custom completion functions like `_read_package_scripts` wouldn't work.


## Acknowledgments

- Inspired by modern shell completion systems
- Built with Node.js and shell scripting
- Designed for developer productivity

---
