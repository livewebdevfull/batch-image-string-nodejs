#!/usr/bin/env node

const lib = require('.');
const options = require('options-parser');
const path = require('path');
const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync('./fonts/SplendidB.ttf');
const blankaToSVG = TextToSVG.loadSync('./fonts/Blanka-Regular.otf');
const phageToSVG = TextToSVG.loadSync('./fonts/Phage-Rough.otf');

const opts = {
  batch: {
    short: 'b',
    default: 1,
    varName: '1',
    help: 'number of outputs to generate',
  },
  width: {
    short: 'w',
    default: 800,
    varName: '800',
    help: 'width of the generated image',
  },
  height: {
    short: 'h',
    default: 600,
    varName: '600',
    help: 'height of the generated image',
  },
  in: {
    short: 'i',
    varName: 'input.png',
    help: 'name of the input file',
  },
  out: {
    short: 'o',
    varName: 'out',
    help: 'name of the output directory',
  },
  color: {
    short: 'c',
    varName: 'red',
    default: 'red',
    help: 'color of label text',
  },
  stroke: {
    short: 's',
    varName: 'stroke',
    default: 'red',
    help: 'stroke color of label text',
  },
  labelSize: {
    short: 'z',
    varName: 'labelSize',
    default: 144,
    help: 'size of label text',
  },
  length: {
    short: 'n',
    varName: 'length',
    default: 5,
    help: 'number of 0 positions',
  },
  lines: {
    short: 'l',
    varName: '50',
    default: 50,
    help: 'number of strings lines',
  },
  points: {
    short: 'p',
    varName: '10',
    default: 10,
    help: 'number of strings points',
  },
  left: {
    short: 'x',
    varName: 'left',
    default: 0,
    help: 'position of label text from the left edge',
  },
  top: {
    short: 'y',
    varName: 'top',
    default: 0,
    help: 'position of label text starting from top edge',
  },
  padding: {
    short: 'a',
    varName: 'padding',
    default: 50,
    help: 'padding inside the template for strings generation',
  },
  help: {
    short: 'h',
    help: 'this help screen',
    showHelp: {
      banner: 'procedural-strings-js example: [options]',
    },
  },
};

function padLeadingZeros(num, size) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

async function generator(cli) {
  let inputImage = await sharp(cli.opt.in).resize({ width: 3000, height: 2500, fit: 'fill' });

  const metadata = await inputImage.metadata();
  for (let i = 0; i < parseInt(cli.opt.batch, 10); i++) {
    const label = padLeadingZeros(i, parseInt(cli.opt.length));
    const fileName = `${ label }.png`;
    const filePath = path.join(cli.opt.out, fileName);

    console.log(`Generating ${ label }`);

    const padding = parseInt(cli.opt.padding, 10);
    const setting = new lib.Settings({
      width: metadata.width - padding,
      height: metadata.height - padding,
      lines: parseInt(cli.opt.lines, 10),
      points: parseInt(cli.opt.points, 10),
    });

    const attributes = { fill: cli.opt.color, stroke: cli.opt.stroke };
    const options = {
      x: 0,
      y: 0,
      fontSize: parseInt(cli.opt.labelSize, 10),
      anchor: 'top',
      attributes: attributes,
    };

    const triganLabelData = blankaToSVG.getSVG('TRIGAN',
      { ...options, fontSize: 300, attributes: { fill: '#FFF', stroke: '#FFF' } });
    const triganLabelBuffer = Buffer.from(triganLabelData);

    const goldenLabelData = phageToSVG.getSVG('GOLDEN', { ...options, fontSize: 120 });
    const goldenLabelBuffer = Buffer.from(goldenLabelData);

    const ticketLabelData = phageToSVG.getSVG('TICKET', { ...options, fontSize: 120 });
    const ticketLabelBuffer = Buffer.from(ticketLabelData);

    const labelData = textToSVG.getSVG(label, options);
    const labelBuffer = Buffer.from(labelData);

    const stringData = lib.generate(setting);
    const stringBuffer = Buffer.from(stringData);

    const stringPngBuffer = await sharp(stringBuffer).
      png().toBuffer();
    await inputImage.composite(
      [
        { input: stringPngBuffer },
        { input: labelBuffer, top: parseInt(cli.opt.top, 10), left: parseInt(cli.opt.left, 10) },
        { input: triganLabelBuffer, top: 560, left: 1050 },
        { input: goldenLabelBuffer, top: 400, left: 720 },
        { input: ticketLabelBuffer, top: 550, left: 780 },
      ]).
      png().
      toFile(filePath);
  }
}

const result = options.parse(opts);
if (!result.opt.out) {
  options.help(opts);
  process.exit();
} else {
  console.log('generating');
  generator(result);
}

