# Import Libraries
import json
import nltk
import time
import random
import string
import pickle
import re
import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import Model
from keras.utils.vis_utils import plot_model
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.layers import Input, Embedding, LSTM
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import concatenate, Dense, Dropout, Conv1D, MaxPooling1D, Flatten

tokenizer = Tokenizer(num_words=1000)
le = LabelEncoder()

# Package sentence tokenizer
nltk.download('punkt') 
# Package lemmatization
nltk.download('wordnet')
# Package multilingual wordnet data
nltk.download('omw-1.4')

from flask import Flask, render_template, request

app = Flask(__name__)

df = pd.read_csv("cases 2_updated.csv", low_memory = False, encoding='utf8')

data = df[['Pertanyaan', 'Kategori']]

# Removing Punctuations (Menghilangkan Punktuasi)
data['Pertanyaan'] = data['Pertanyaan'].apply(lambda wrd:[ltrs.lower() for ltrs in wrd if ltrs not in string.punctuation])
data['Pertanyaan'] = data['Pertanyaan'].apply(lambda wrd: ''.join(wrd))
for i in range(data.shape[0]):
  data['Pertanyaan'][i]=re.sub(r'\n', ' ',data['Pertanyaan'][i])
  data['Pertanyaan'][i]=re.sub('\(', '',data['Pertanyaan'][i]) 
  data['Pertanyaan'][i]=re.sub(r'\)', '',data['Pertanyaan'][i]) 
  data['Pertanyaan'][i]=re.sub(r',', '',data['Pertanyaan'][i]) 
  data['Pertanyaan'][i]=re.sub(r'-', '',data['Pertanyaan'][i])
  data['Pertanyaan'][i]=re.sub(r'/', '',data['Pertanyaan'][i])  
  data['Pertanyaan'][i]=re.sub(r'/', '',data['Pertanyaan'][i])
  data['Pertanyaan'][i]=re.sub(r"[^\w]", ' ',data['Pertanyaan'][i])

kata_index = {}
for pattern in data['Pertanyaan']:
      kata = pattern.lower().split()
      for w in kata:
            if w not in kata_index:
                  kata_index[w] = len(kata_index) + 1

sequences = []
for sentence in data['Pertanyaan']:
    words = sentence.lower().split()  # Mengubah ke huruf kecil dan memecah kalimat menjadi kata-kata
    sequence = [kata_index[word] for word in words]  # Mengubah setiap kata menjadi angka berdasarkan kamus
    sequences.append(sequence)

# Menentukan panjang maksimum urutan angka
max_length = max(len(sequence) for sequence in sequences)

# Melakukan padding pada setiap urutan angka
padded_sequences = []
for sequence in sequences:
    padded_sequence = sequence + [0] * (max_length - len(sequence))
    padded_sequences.append(padded_sequence)

# Menyimpan hasil padded dalam variabel
padded_sequences_variable = padded_sequences

train = padded_sequences_variable

x_train = np.array(train)

panjang_input = x_train.shape[1]

labels = data['Kategori']
label_mapping = {label: idx for idx, label in enumerate(labels.unique())}
y_train1 = labels.map(label_mapping)
y_train = y_train1.to_numpy()

jawaban = {}

for index, row in df.iterrows():
    kategori = row['Kategori']
    jawaban_1 = row['Jawaban']
    
    if kategori not in jawaban:
        jawaban[kategori] = [jawaban_1]
    else:
        jawaban[kategori].append(jawaban_1)

model = tf.keras.models.load_model('modelfinal.h5')

def get_response(prediction_input):
    # Menghapus punktuasi dan konversi ke huruf kecil
    prediction_input = [letters.lower() for letters in prediction_input if letters not in string.punctuation]
    prediction_input = ''.join(prediction_input)

    # Tokenisasi input
    words = prediction_input.split()
    sequence = [kata_index.get(word, 0) for word in words]  # Mengubah kata menjadi indeks berdasarkan kamus
    padded_sequence = sequence + [0] * (panjang_input - len(sequence))  # Padding dengan menambahkan nilai 0

    # Membuat prediksi
    prediction = model.predict(np.array([padded_sequence]))
    predicted_class = np.argmax(prediction)

    # Mendapatkan tag kategori yang sesuai dengan prediksi
    predicted_tag = list(label_mapping.keys())[list(label_mapping.values()).index(predicted_class)]

    # Mendapatkan jawaban yang sesuai dengan tag kategori
    predicted_answer = jawaban.get(predicted_tag)[0:20]

    # Mengembalikan hasil prediksi
    if predicted_answer is not None:
        return random.choice(predicted_answer)
    else:
        return "Jawaban tidak ditemukan."

@app.route("/get_response", methods=["POST"])
def get_bot_response():
    data = request.json
    question = data.get("question")
    response = get_response(question)
    return {"response": response}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6060)