from SignauxTest import creationSignauxTest
import numpy as np
import matplotlib.pyplot as plt

samplerate = 44100
preset = "sinusAleatoires"
NFFT = 8192

t, signal = creationSignauxTest(dureeSecondes= 0.5,
                        samplerate=samplerate,
                        presetSignal="guitareSimulee")


fig, (ax1, ax2) = plt.subplots(2,1)

ax1.plot(t, signal)
ax2.specgram(signal.tolist(), NFFT, Fs = samplerate, noverlap = NFFT//4 )
ax2.set_ylim(bottom = 0, top = 1250)
plt.show()