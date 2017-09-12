# Domain Check 

[![Build Status](https://travis-ci.org/AussieGuy0/domaincheck.svg?branch=master)](https://travis-ci.org/AussieGuy0/domaincheck)

A simple website that allows users to check if a domain is free. Also allows 
users to be alerted when a domain becomes available.

## Goals
* Users can check if a domain is free
* Users can subscribe to be alerted when a domain becomes available
* Little to no client side javascript (No frontend frameworks here!)

## Usage

The serverside is built with `nodejs` using the `express` web framework.

To run:
1. Clone the repo 
2. Run `npm install` in the cloned directory to install the dependencies 
3. Run `npm start` to start the server on port 3000. (Can be accessed via `localhost:3000`)

Testing is done via `npm test`. 

## Acknowledgements 

[Travis CI](https://travis-ci.org/AussieGuy0/domaincheck) for continuous integration.
