# Synthy: React Synth

A polyphonic synthesizer built with React, using the Web Audio API.

## Todos

- [ ] Create function to map notes in a scale (eg. 'Am') to the visual keyboard & computer keyboard
  - Eg. 'KeyA' => Scale (A) => Octave 3 => Note C#
- [ ] Finish styling & building controls panel
- [ ] Update code to leverage new custom audio classes for effects

## Future Todos

- [ ] Add "Save as Preset" functionality
- [ ] Update some code to run in WebWorkers and/or AudioWorklets
  - [ ] Add Metronome/Scheduler Web Worker
- [ ] Finish building the audio recording interface & functionality
- [ ] Consider building a backend service for processing the data & converting to various formats

## VCO Builder

- [ ] Ability add/remove oscillators that look like rack mount effects
- [ ] Ability to control each one independently and chain them together
- [ ] Ability to add effects to each
- [ ] Ability to turn each one on/off with a click
- [ ] Build the instrument interface like the Korg Kaoss

---

## Resources

- [Wavetable Synthesis](https://stackoverflow.com/questions/59815073/how-to-convert-a-wavetable-for-use-with-oscillatornode-setperiodicwave)
- [Wavetable Synth Repo](https://github.com/voscarmv/coding_behind_the_scenes/tree/c7d78652b72093cd5afcdd4d6267d76864119abd/soundwave/synth)
