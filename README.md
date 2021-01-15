# Portfolio for Josh Pollard *(WIP)*

[![](https://github.com/joshlucpoll/my-website/workflows/build/badge.svg)](https://github.com/Joshlucpoll/my-website/actions?query=workflow%3Abuild)
[![time tracker](https://wakatime.com/badge/github/Joshlucpoll/my-website.svg)](https://wakatime.com/badge/github/Joshlucpoll/my-website)


![](https://res.cloudinary.com/dy1xy7vkf/image/upload/my-website.png)

This repository contains all the code used to produce [https://joshlucpoll.com](https://joshlucpoll.com).  
It was created using [React JS](https://reactjs.org) and hosted with [Firebase](https://firebase.google.com)

## Console
Navigation for joshlucpoll.com is achieved with **UNIX** commands - instead of the traditional navigation bar/dropdown. Typing `help` into the command line will explain further.

The most used command on the website is `cd` which changes the page you are viewing. For example, typing `cd projects` will navigate you to the projects page. Traditional **UNIX** commands for `cd` also apply here; you can use the current page `.` and parent page `..` flags for navigation as well.

Another useful command is `ls` which will list all child pages. Combining the use of `ls` and `cd` allows you to navigate the website

If you want to learn more about each command, type `help commands` in the console interface.

For page navigation with the console I have implemented the [React Router](https://github.com/ReactTraining/react-router) package to manage this, as well as [Framer motion](https://www.framer.com/motion/) for page animations.
