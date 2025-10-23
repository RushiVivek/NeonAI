import fitz
import vosk, pydub, wave
import json, os
from .model import describe, summerize, query

vosk.SetLogLevel(-1)
# audio_model_path = "vosk-model-en-us-0.42-gigaspeech"
# audio_model = vosk.Model(audio_model_path)
audio_model = vosk.Model(lang="en-us")

def handle_pdf(file):
	data = ''
	doc = fitz.open(file)
	for i in range(doc.page_count):
		page = doc.load_page(i)
		data += page.get_text() + "\n"
	doc.close()

	if (data == ''):
		data = "this pdf doesn't contain text"

	data = summerize(data)
	return data

def handle_img(file):
	return describe(file)

def handle_audio(file):
	wf = None
	if file[-4:] == '.mp3':
		sound = AudioSegment.from_file(file)
		sound.export('temp_audio.wav', format="wav")
		wf = wave.open('temp_audio.wav', 'rb')
	elif file[-4:] == '.wav':
		wf = wave.open(file, 'rb')
	else:
		return ''

	if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getcomptype() != "NONE":
		return ''

	rec = vosk.KaldiRecognizer(audio_model, wf.getframerate())

	transcribed_text = ""
	while True:
		data = wf.readframes(4000)
		if len(data) == 0:
			break
		if rec.AcceptWaveform(data):
			transcribed_text += rec.Result()

	transcribed_text += rec.FinalResult()

	if file[-4:] != '.wav':
		os.remove('temp_audio.wav')

	return transcribed_text

def handle_files(files):
	files_data = {}
	for file in files:
		if file[-4:] == '.pdf':
			files_data[file] = handle_pdf(file)
		elif file[-4:] == '.jpg' or file[-4:] == '.png':
			files_data[file] = handle_img(file)
		elif file[-4:] == '.mp3' or file[-4:] == '.wav':
			files_data[file] = handle_audio(file)

	return files_data

def get_response(ques, files):
	files_data = handle_files(files)
	print(files_data)
	return query(ques, files_data)