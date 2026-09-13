export function playNote(noteA = 440, noteB = false, delay = 0, duration = 1, type = 'sine', vol = 1, attack = .01, decay = .1, sustain = .6, release = .1) {
	let gain = actx.createGain(),
		osc = actx.createOscillator();
	
	osc.type = type;
	osc.frequency.value = noteA;
	osc.connect(gain);
	if(noteB && noteA !== noteB)
		osc.frequency.exponentialRampToValueAtTime(noteB, actx.currentTime + delay + duration);

	gain.connect(mainGain),
	gain.gain.value = .000001;
	gain.gain.setValueAtTime(0, actx.currentTime + delay),
	gain.gain.exponentialRampToValueAtTime(vol, actx.currentTime + delay + attack),
	gain.gain.exponentialRampToValueAtTime(sustain, actx.currentTime + delay + decay),
	gain.gain.setValueAtTime(sustain, actx.currentTime + delay + duration - release),
	gain.gain.exponentialRampToValueAtTime(.000001, actx.currentTime + delay + duration);


	osc.start(actx.currentTime + delay),
	osc.stop(actx.currentTime + delay + duration + .1);
}