# Technical exercise

The technical exercise is an opportunity for us to understand both your technical ability and the way you work. We'd like you to write this as if it were to be a piece of a real functioning system, intended for maintenance and future expansion.

We'll be looking at the way you set up your project, how you test your solution, and the reasoning behind the decisions you make along the way. We're particularly interested in the quality of your solution, rather than seeing the full set of requirements being completed. As such, you should spend absolutely no more than 2 hours on this exercise, and please do skip requirements if you're running out of time!

When you've completed the exercise, package it up (there's a guide at the bottom of this document) and send it over to us. We'll review it, and get back to you with next steps. During our interview process, we'll have a pair programming session where we'll continue with your solution to the exercise, looking to implement a new requirement. Don't worry if you don't complete every requirement below - this new requirement will be around a different area of the data you've been provided.

Please do get in touch if you find anything about the exercise unclear. We're not trying to catch you out, and really want you to be able to do the best you can!

## Rules

* You must spend no more than **2 hours** on the exercise.
* You must use either **JavaScript or TypeScript**. Your solution must run in **Node.js**. The version of Node.js and/or TypeScript is up to you, however.
* You should write automated tests for the code you write, although those tests may take whichever form you think most useful.
* Your solution should take the form of an API returning JSON data as specified. No user interface beyond this is required.
* The structure of the API is up to you. You can create as many or as few endpoints as you need, and name them however you think is best.
* You can use whichever frameworks, utility libraries, or testing tools you wish. You can also use a skeleton project generator if you feel it'll save you time.

## Submission

You should commit your changes, as you work, to this repository. When you're happy that you've completed the exercise, let us know via e-mail at the `careers@evergreensmartpower.co.uk` email address.

There are a couple of things we'd like you to bear in mind:

* We should be able to install your dependencies by running `npm install`. Please do not commit your `node_modules` directory.
* We should be able to start your project by running `npm start`.
* We should be able to run the tests for your project by running `npm test`.

We'd also like you to include a README, explaining a little about the following areas. This doesn't need to be long, just a little extra background about your solution. Things we'd find useful are:

* Any decisions about functionality that you made while implementing the requirements.
* The reasoning behind your technical approach and choice of libraries and/or tools.

## Problem

Your team is in the process of building a system to control electrical devices in order to balance the load on the grid. Devices are already connected to the system, reporting their status, and allowing control commands to be issued (such as "turn up" or "turn down").

You have data about the devices which are available for control, such as their type, power consumption, and current state. You also have a history of the commands issued to those devices.

Unfortunately, some of the devices were released before the communication standard was finalised, meaning they don't always report all the information they should. Some elements may be missing from the data set as a result. You will have to make a decision about how to handle these devices.

You've been asked to build an API to process this data to help generate reports about devices connected to the system. The API will need to cut the data in a number of different ways to allow the reporting system to generate all the reports it needs.

## Data

The data file is enclosed with this exercise as `data.json`. It's a JSON-formatted dataset with some devices and their associated command histories.

## Requirements

**Requirement 1**

Show all the devices currently connected. The response should look like the following:

```
{
    "devices": [
        {
            "id": <device's id>,
            "currentPowerConsumption": <device's power consumption, in kilowatts>,
            "type": <device's type>,
            "registeredSince": <when the device was registered, as an ISO-8601 formatted date string>
        },
        ...
    ]
}
```

**Requirement 2**

Show all devices of a particular type.

* For example, "show me all devices where type = 'charger'".
* The response should look the same as in Requirement 1, but filtered to only those devices matching the type specified in the request.

**Requirement 3**

Show all devices with a power consumption above a specified threshold, measured in kilowatts (kW).

* For example, "show me all devices using at least 5kW".
* The response should look the same as in Requirement 1, but filtered to only those devices matching the type specified in the request.

