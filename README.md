
<p align="center">
    <a href="https://xbanki.me/">
        <h1 align="center">xBanki.me</h1>
    </a>
</p>
<p align="center">
    My beautiful, responsive & high-contrast homepage/ portfolio website.
</p>
<p align="center">
    <a href="https://app.codecov.io/gh/xbanki/xbanki-me/branch/development">
        <img alt="Codecov development coverage" src="https://img.shields.io/codecov/c/github/xbanki/xbanki-me/development?label=coverage%2Fdevelopment&style=flat-square">
    </a>
    <a href="https://david-dm.org/xbanki/xbanki-me">
        <img alt="David dependencies" src="https://img.shields.io/david/xbanki/xbanki-me?style=flat-square">
    </a>
    <a href="https://app.codecov.io/gh/xbanki/xbanki-me/branch/master">
        <img alt="Codecov master coverage" src="https://img.shields.io/codecov/c/github/xbanki/xbanki-me/master?label=coverage%2Fmaster&style=flat-square">
    </a>
</p>
<p align="center">
    <a href="https://github.com/xbanki/xbanki-me/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/xbanki/xbanki-me?style=flat-square">
    </a>
</p>

# Table of Contents #

 - [Quick Start](#quick-start)
 - [Repository Structure](#repo-structure)
 - [Changelog](#changelog)
 - [License](#license)

# Quick Start #

To be able to compile and run the code within this repository, the [Vue.js CLI](https://cli.vuejs.org) has to be installed globally. Along with that, it is recommended to also have [Yarn](https://yarnpkg.com) installed, but is not required.

 - Clone this repository using [Git](https://gitscm.com/) or download as zip
 - Open your favorite shell tool, navigate to cloned repository using `cd path/to/xbanki-me/`
 - Install project dependencies:
   - If using Yarn, run `yarn`
   - else, run `npm i`
 - Start the development server:
   - If using yarn, run `yarn serve`
   - else, run `npm run serve`
 - Navigate to `localhost:8080` in your web browser

# Repo Structure #

Most of the changes happen in bespoke branches dedicated to specific issues, meaning before any feature/ change is made, there is a matching issue attached to it.

There are two notable branches;

 - `master` - This is an obvious one. The main branch where the most recent stable version of the site lives.
 - `development` - A soft 'staging' branch. This is where we merge all of the changes first to see how they all play together. To merge `development` with `master`, all of the tests must pass.

# Changelog #

There is a specific Wiki article [here](https://github.com/xbanki/xbanki-me/wiki/Changelog) which documents all of the project changes, listing all of the appropriate issues/ pull requests with each version.

# License #
This repository is licensed under the [MIT License](LICENSE). Copyright (c) 2021, xbanki.
