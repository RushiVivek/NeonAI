from google import genai
from google.genai import types

client = genai.Client(api_key="AIzaSyDyvmvgIfRlNaHZujoy6Jkd6p05rYfpEK0")

def describe(file):
	with open(file, 'rb') as f:
		image_bytes = f.read()

	response = client.models.generate_content(
		model='gemini-2.5-flash',
		contents=[
			types.Part.from_bytes(
				data=image_bytes,
				mime_type='image/jpeg',
			),
			'Describe this image in few lines.'
		]
	)
	return response.text

def summerize(data):
	prompt = f"Give the summery of the following data, don't add any extra information give the answer directly\nData: {data}";
	response = client.models.generate_content(
	    model="gemini-2.5-flash",
	    contents=prompt,
	    config=types.GenerateContentConfig(
	        thinking_config=types.ThinkingConfig(thinking_budget=0) # Disables thinking
	    ),
	)
	return response.text

def query(question, files_data):
	prompt = f"Given a question and any relevant data, don't add any extra information give the answer directly, make sure answer is detailed\nQuestion: {question}";
	if files_data:
		prompt += "\nData: \n"
		for file, data in files_data.items():
			prompt += f"File ({file}) data: {data}\n"

	response = client.models.generate_content(
	    model="gemini-2.5-flash",
	    contents=prompt,
	    config=types.GenerateContentConfig(
	        thinking_config=types.ThinkingConfig(thinking_budget=0) # Disables thinking
	    ),
	)
	# print(response.text)
	return response.text