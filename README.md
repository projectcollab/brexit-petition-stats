# Brexit NodeJS Interrogator

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Yarn ( Node on local machine )
A good editor i.e. VSCode / Webstorm
```

### Installing

```
git clone
yarn install
```
## Running

```
node index.js 
```

Optional parameters:
- countries i.e. --countries
- interval i.e. --interval


Example, for all countries includedd in output
```
node index.js --countries
```

Example, for countries with vote count greater than x includedd in output
```
node index.js --countries=500
```

Example, to have nodejs query every x seconds
```
node index.js --countries=500 --interval=3000
```

## Built With

* [Chalk](https://momentjs.com/)
* [Moment](https://momentjs.com/)
* [Node Fetch](https://www.npmjs.com/package/node-fetch)
* [Lodash](https://lodash.com/)
* [Minimist](https://www.npmjs.com/package/minimist)

## Authors

* **Colin McClure**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

