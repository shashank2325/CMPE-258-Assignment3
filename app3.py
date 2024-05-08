from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def chunk_text(text, chunk_size):
    
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def get_translation_pipeline(src_lang, tgt_lang):
    model_id = f"Helsinki-NLP/opus-mt-{src_lang}-{tgt_lang}"
    return pipeline("translation", model=model_id)



@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    src_lang = data.get('source_language', 'en')
    tgt_lang = data.get('target_language', 'es')
    text = data['text']
    try:
        translator = get_translation_pipeline(src_lang, tgt_lang)
        chunks = chunk_text(text, 1024)
        translations = [translator(chunk)[0]['translation_text'] for chunk in chunks]
        final_translation = ' '.join(translations)
        return jsonify(translation=final_translation)
    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data['text']
    chunks = chunk_text(text, 1024) 
    summaries = [summarizer(chunk, max_length=150, min_length=50, length_penalty=2)[0]['summary_text'] for chunk in chunks]
    final_summary = ' '.join(summaries)
    return jsonify(summary=final_summary)

@app.route('/answer', methods=['POST'])
def answer_question():
    data = request.json
    #print("Received data:", data)  # Log the received data
    try:
        context = data['context']
        question = data['question']
        # Assuming you have a function to process the QA task
        answer = qa_pipeline(question=question, context=context)['answer'] 
        return jsonify(answer=answer)
    except KeyError as e:
        #print("Missing key:", e)
        return jsonify(error=f"Missing key: {e}"), 400
    
if __name__ == '__main__':
    app.run(debug=True)