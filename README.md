# Smart light utils

This project contains some utilities to make interesting things with **yeelight** smart light bulbs

## Idea

Main idea of this project is in setting bulb light color in sync with image in game or film

![Functional Scheme](assets/functional.drawio.png)

## Project contains

### [@smart-light/colors](packages/colors)

Utilities to operate with colors

### [@smart-light/balancer](packages/balancer)

Utilities to distribute method calls between multiple class instances

### [@smart-light/light-bulb](packages/light-bulb)

Utilities to connect and send commands to **yeelight** light bulb

### [@smart-light/usb-screenshoter](packages/usb-screenshoter)

Utilities to initialize connection with usb recording device and take images from it

### [@smart-light/example](packages/example)

Simple example on how to use packages
