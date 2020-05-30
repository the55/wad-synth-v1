import React, { useContext } from "react";
import OscillatorContext from "../../context/oscillatorContext/oscillatorContext";

function midiNoteToFreq(note) {
  const a = 440;
  return a * Math.pow(2, (note - 69) / 12);
}

export default class extends React.PureComponent {
  static contextType = OscillatorContext;

  state = {
    lastMidiMessage: undefined,
  };

  componentDidMount() {
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
  }

  onMIDIFailure = () => {
    this.setState({ lastMidiMessage: "midi fail" });
  };

  onMIDISuccess = (midiAccess) => {
    this.setState({ lastMidiMessage: "midi ok" });
    for (var input of midiAccess.inputs.values())
      input.onmidimessage = this.getMIDIMessage;
  };

  getMIDIMessage = (message) => {
    const [event, note, velocity] = message.data;

    if (event === 144) {
      this.handleNoteOn(midiNoteToFreq(note), velocity);
    } else if (event === 128) {
      this.handleNoteOff();
    }

    this.setState({ lastMidiMessage: message.data });
  };

  handleNoteOn = async (frequency, velocity) => {
    const {
      oscillators,
      setOscillatorPitch,
      setNoteVolume,
      setNotePlaying,
    } = this.context;

    await oscillators.map(
      (oscillator) =>
        setOscillatorPitch(oscillator.id, frequency * oscillator.octave) // Update each oscillator's pitch with the played frequency multiplied by that oscillator's octave value
    );

    await setNoteVolume(velocity / 128); // FIXME
    setNotePlaying(true);
  };

  handleNoteOff = () => {
    const { setNotePlaying } = this.context;
    setNotePlaying(false);
  };

  render() {
    const { lastMidiMessage, alert } = this.state;
    return (
      <div style={{ float: "right", marginRight: "2em" }}>
        {JSON.stringify(lastMidiMessage)}
      </div>
    );
  }
}
