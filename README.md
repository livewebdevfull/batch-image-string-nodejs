# procedural-strings-js
> procedural generation of beautiful svg shapes

![](https://img.shields.io/npm/v/procedural-strings-js.svg)
[![](https://img.shields.io/github/license/v-braun/procedural-strings-js.svg?style=flat-square)](https://github.com/v-braun/procedural-strings-js/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/v-braun/procedural-strings-js.svg?style=flat-square)](https://travis-ci.org/v-braun/procedural-strings-js)
![PR welcome](https://img.shields.io/badge/PR-welcome-green.svg?style=flat-square)


By [v-braun - viktor-braun.de](https://viktor-braun.de).


<p align="center">
<img width="70%" src="https://github.com/v-braun/procedural-strings-js/blob/master/.assets/banner.png" />
</p>


## Description


## Installation

``` sh
# as module
npm i procedural-strings-js --save

# as CLI
npm i procedural-strings-js -g

```


## Usage

### Module
``` js
const procStrings = require('procedural-strings-js');

const setting = new procStrings.Settings();
setting.width = 800;
setting.height = 600;

const data = procStrings.generate(setting);
console.log(data); // output will be the generated SVG as string

```


### CLI
``` sh

procedural-strings-js --out ./output --batch 2 --in input.png --lines 100 --points 20 --color black --stroke white --labelSize 144 --top 600 --left 780 --padding 80 --length 5

```
``` sh

procedural-strings-js  -o ./output -b 5 -i input.png -l 100 -p 20 -c black -s white -z 180 -x 780 -y 600 -a 80 -n 5

```
--out, -o: output directory. Must be created before launching the command  
--batch, -b: number of files to generate starting from 00000  
--in, -i: file path for the input png  
--lines, -l: number of strings lines  
--points, -p: number of strings points  
--color, -c: label text string color  
--stroke, -s: stroke color for label text  
--labelSize, -z: label text size  
--top, -y: number of pixel from the top edge  
--left, -x: number of pixel from left edge  
--padding, -a: padding inside the limits of the template for strings boundary  
-- length, -n: number of padding 0 for the label text i.e: 00001  


## Configuration

Checkout the [Settings](https://github.com/v-braun/procedural-strings-js/blob/e384da408bfe6ba02bbe3f460c3d3174bac6420a/lib/procedural-strings.js#L11) object for more configuration details.

## Documentation

See [DOCUMENTATION](https://github.com/v-braun/procedural-strings-js/blob/master/DOCUMENTATION.md)

## Related Projects
- [VBRProceduralStrings](https://github.com/v-braun/VBRProceduralStrings): iOS - Swift version of this project


## Authors

![image](https://avatars3.githubusercontent.com/u/4738210?v=3&amp;s=50)
[v-braun](https://github.com/v-braun/)



## Contributing

Make sure to read these guides before getting started:
- [Contribution Guidelines](https://github.com/v-braun/procedural-strings-js/blob/master/CONTRIBUTING.md)
- [Code of Conduct](https://github.com/v-braun/procedural-strings-js/blob/master/CODE_OF_CONDUCT.md)

## License
**procedural-strings-js** is available under the MIT License. See [LICENSE](https://github.com/v-braun/procedural-strings-js/blob/master/LICENSE) for details.

node ./cli.js -o ./output -b 5 -i input.png -l 100 -p 20 -c black -s white -z 180 -x 780 -y 650 -a 80 -n 5