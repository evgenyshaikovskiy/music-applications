import numpy as np
import argparse
import json
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

def prediction(model, tokenizer, max_sequence_len=38, next_words = 26, first_string = 'loose your self'):
    seed_text = first_string
  
    for _ in range(next_words):
        token_list = tokenizer.texts_to_sequences([seed_text])[0]
        token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')
        predicted = model.predict(token_list, verbose=0)
        predicted = np.argmax(predicted, axis=-1).item()
        output_word = tokenizer.index_word[predicted]
        seed_text += " " + output_word
        
    return(seed_text)

def run():   
    parser = argparse.ArgumentParser(description="Get all lyrics or a certain number of artist from azlyric")
    parser.add_argument("path_to_nn", metavar="Path_to_h5", type=str, help='Enter path to h5 file')
    parser.add_argument("path_to_tokenizer", metavar="Path_to_tokenizer_json", type=str, \
        help='Enter path to tokenizer.json for current NN')
    parser.add_argument("first_line", metavar="Base line for generation", type=str, \
        default='Lyric for Victoria Ravkovskaya - ', help='Based on this line, the text will be generated')
    #be careful with max_sequence_len(work only with Kanye West)
    args = parser.parse_args()

    tokenizer = None
    with open(args.path_to_tokenizer) as f:
        data = json.load(f)
        tokenizer = tokenizer_from_json(data)

    generated_text = prediction(model = load_model(args.path_to_nn), tokenizer=tokenizer,\
                                first_string = args.first_line)
    print(generated_text)

run()