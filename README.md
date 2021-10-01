<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![CI][ci-shield]][ci-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/victin09/vira-project-manager">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
    VPM
  </a>

  <h3 align="center">vira-project-manager</h3>

  <p align="center">
    An awesome issue tracking software!
    <br />
    <a href="https://github.com/victin09/vira-project-manager"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/victin09/vira-project-manager">View Demo</a> -->
    ·
    <a href="https://github.com/victin09/vira-project-manager/issues">Report Bug</a>
    ·
    <!-- <a href="https://github.com/victin09/vira-project-manager/issues">Request Feature</a> -->
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

There are many great issue tracking software available, however, most of them are payment. This is an open source project, you can deploy it on your computer, on a server in the cloud or in a Docker container!.

Here's why:
* Other tools have a high cost, this is totally free
* A solution that you can deploy wherever you want

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With

This was built with:
* [React](https://reactjs.org/)
* [TailwindCSS](https://tailwindcss.com)
* [NestJS](https://nestjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)



<!-- GETTING STARTED -->
## Getting Started

This is how you can configure your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

You need these tools to be able to execute the project.
* [npm](https://nodejs.org/)
* [node](https://nodejs.org/)
* [mongodb](https://www.mongodb.com/)

### Setting up development environment 🛠

1. Clone the repo
   ```sh
   git clone https://github.com/Victin09/vira-project-manager.git
   ```
2. Install NPM packages
   ```sh
   cd backend
   npm install
   ```
   ```sh
   cd frontend
   npm install
   ```
3. Create an empty `.env` file in `/frontend`, copy `/frontend/.env.example` contents into it, and fill it with your data
4. Run the project
   ```sh
   cd backend
   npm run start:dev
   ```
   ```sh
   cd frontend
   npm start
   ```
5. App should now be running on `http://localhost:8080/`


<!-- DOCS EXAMPLES -->
## Documentation

At the moment there is only documentation for deployment in a development environment.

_In a future, please refer to the [Documentation](https://github.com/Victin09/vira-project-manager/wiki) for more documentation about usage, deployment, etc_


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/victin09/vira-project-manager/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

To contribute to this project, please read [CONTRIBUTING.md](./CONTRIBUTING.md)


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

<!-- Victor Gomez - [@your_twitter](https://twitter.com/your_username) - email@example.com -->

Project Link: [https://github.com/victin09/vira-project-manager](https://github.com/victin09/vira-project-manager)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [React Icons](https://react-icons.github.io/react-icons/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/victin09/vira-project-manager
[contributors-url]: https://github.com/victin09/vira-project-manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/victin09/vira-project-manager.svg
[forks-url]: https://github.com/victin09/vira-project-manager/network/members
[stars-shield]: https://img.shields.io/github/stars/victin09/vira-project-manager.svg
[stars-url]: https://github.com/victin09/vira-project-manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/victin09/vira-project-manager.svg
[issues-url]: https://github.com/victin09/vira-project-manager/issues
[license-shield]: https://img.shields.io/github/license/victin09/vira-project-manager.svg
[license-url]: https://github.com/victin09/vira-project-manager/blob/master/LICENSE.txt
[ci-shield]: https://github.com/Victin09/vira-project-manager/actions/workflows/node.js.yml/badge.svg
[ci-url]: https://github.com/Victin09/vira-project-manager/actions/workflows/node.js.yml
[product-screenshot]: images/screenshot.png