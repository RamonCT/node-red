# node-red-contrib-acoustics

This module provides two nodes in NODE-RED to generate noise following Gaussian and Extreme Value Distributions 
respectively depending on the periods of day, evening and night.

From version 1.0.0 you can add acoustic nodes like other Node-RED nodes.

## Pre-requisites

The node-red-contrib-acoustics module requires <a href="https://nodered.org">Node-RED</a> to be installed.

## Install

To install the stable version use the **Menu - Manage palette** option and search for `node-red-contrib-acoustics`, or run the following command in your Node-RED user directory (typically `~/.node-red`):

    npm i node-red-contrib-acoustics

Restart your NODE-RED instance and you should have two extra nodes available in the palette. These nodes called **gaussian** and **extreme_value** are added to the **function** tab.

## Features
#### Gaussian node
Generates noise following a Gaussian Distribution depending on the periods of day, evening and night.

1. **Inputs** 
   - `payload:` the message payload is the timestamp (current time) used to discriminate between day, evening and night periods.

2. **Outputs** 
   - `payload:` the message payload is a json frame ready to send via RESTful protocol (POST operation).

3. **Operation** 
   - `Name:` used to rename the node.
   - `msg.payload:` node input used to select a time period: day, evening or night.
   - For each time period, it is possible to set the start time `t_start` and the end time 
       `t_end` as well as the mean `mu` and the standard deviation `sigma` of the gaussian.

#### Extreme_value node
Generates noise following a Extreme Value Distribution depending on the periods of day, evening and night.

1. **Inputs** 
   - `payload:` the message payload is the timestamp (current time) used to discriminate between day, evening and night periods.

2. **Outputs** 
   - `payload:` the message payload is a json frame ready to send via RESTful protocol (POST operation).

3. **Operation** 
   - `Name:` used to rename the node.
   - `msg.payload:` node input used to select a time period: day, evening or night.
   - For each time period, it is possible to set the start time `t_start` and the end time 
       `t_end` as well as the location `mu`, the scale `sigma` and the shape `k` parameters 
       of the Extreme Value Distribution.

## License
The 2.0 version of the Apache License.

See the LICENSE file in this project for more details.