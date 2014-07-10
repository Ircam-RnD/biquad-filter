## Example

This library can be used, for instance, inside the Web Audio API:

```html
    <script src="/biquad-filter.min.js"></script>
    <!-- https://github.com/Ircam-RnD/buffer-loader  We need a way to load and decode the audio file for the player, so we use this lib -->
    <script src="/examples/js/buffer-loader.js"></script>
    <!-- https://github.com/Ircam-RnD/player - We use this player to play a sound -->
    <script src="/examples/js/player.js"></script>
```

```js
  // The coefficients of the cascade of biquad filters.
  var coef = [0.90338, -0.80434, 0.52878, -1.3264, 0.68112, -1.8567, 0.92083, -1.8476,
  0.92028, -1.8483, 0.95257, -1.8367, 0.93335, -1.9599, 0.98291, -1.9442, 0.96724,
  -1.9795, 0.9825, -1.977, 0.97983, -0.45444, 0.62182, 0.18046, 0.78331];

  // We need an audio context
  var audioContext = new AudioContext();
  var targetNode = audioContext.destination;
  // Create Audio Nodes
  var player = createPlayer();
  var bufferLoader = createBufferLoader();
  var scriptProcessor = audioContext.createScriptProcessor(1024, 1, 1);
  // Connect Audio Nodes
  player.connect(scriptProcessor);
  scriptProcessor.connect(targetNode);
  
  // Create biquad filter module
  var biquadFilter = createBiquadFilter();
  // Set the coefficients and indicate the number of biquads
  biquadFilter.setCoefficients(coef);
  
  // Load player file
  bufferLoader.load('/examples/snd/breakbeat.wav').then(function(buffer){
    player.setBuffer(buffer);
    player.enableLoop(true);
    player.start();
  })

  // Process the data inside the scriptProcessor process
  scriptProcessor.onaudioprocess = function(event){
    // Get the input buffer
    var inputBuffer = event.inputBuffer.getChannelData(0);
    // Get the ouput buffer
    var outputBuffer = event.outputBuffer.getChannelData(0);

    // Process the data
    biquadFilter.process(inputBuffer, outputBuffer);
  }
  
```

## Coefficients format

The input format of the coefficients for the library is a JavaScript Array with all the coefficients:

For one biquad filter:
```
[g, b1, b2, a1, a2]
```

For two or more biquad filters:
```
[g, b1_1, b2_1, a1_1, a2_1, b1_2, b2_2, a1_2, a2_2, ... , b1_n, b2_n, a1_n, a2_n ]
```

where n is the number of biquad filters and g is the global gain of the cascade of biquads.

## API

The `binauralFIR` object exposes the following API:

Method | Description
--- | ---
`biquadFilter.setCoefficients(coef)` | Set the coefficients of the filter. 
`biquadFilter.process(inputBuffer, outputBuffer)` | Calculate the output of the cascade biquad filter for an inputBuffer. The inputBuffer and the outputBuffer are Arrays with the same length.