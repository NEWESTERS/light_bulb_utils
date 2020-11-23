# @smart-light/light-bulb

This package is supposed to initialize connection with **yeelight** smart bulb and send commands via [it's API](https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf)

## Command quota

According to documentation **yeelight** bulb have client command quota of 60 commands/minute and total quota of 144 commands/minute

Balancer from `@smart-light/balancer` distributes commands between 3 connections with quota of 47 commands/minute to achieve command frequency of 47 \* 3 = **141 commands/minute**
