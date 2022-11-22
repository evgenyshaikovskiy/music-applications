import argparse, sys, re
import urllib.request, urllib.error
from bs4 import BeautifulSoup
import time
from cache import Cache

class Azlyrics(object):

    def __init__(self, artist):
        self.artist = artist
        self.music = ''
        self.songs = []

    #приводим к нижнему регистру и тд
    def normalize_str(self, str):
        return re.sub(r'\W+', '', str.lower())

    #
    def normalize_artist_music_per_song(self):
        return self.normalize_str(self.artist), self.normalize_str(self.music)
    
    def normalize_artist_music(self):
        norm_str = self.normalize_str(self.artist)
        return norm_str[0], norm_str

    def url(self):
        if not self.artist and not self.music:
            self.artist = "rickastley"
            self.music = "nevergonnagiveyouup"
        return "http://azlyrics.com/lyrics/{}/{}.html".format(*self.normalize_artist_music_per_song())

    def url_for_artist(self):
        if not self.artist:
            self.artist = 'rickastley'
        return "http://azlyrics.com/{}/{}.html".format(*self.normalize_artist_music())

    #parse html per url
    def get_page_of_song(self):
        try:
            page = urllib.request.urlopen(self.url()) #парсим страницу песни
            return page.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                print("Music not found")
                sys.exit(1)
    
    def get_page_of_artist(self):
        try:
            page = urllib.request.urlopen(self.url_for_artist()) #парсим страницу артиста
            return page.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                print("Music not found")
                sys.exit(1)

    def extract_lyrics(self, page):
        soup = BeautifulSoup(page, "html.parser") # парсим данные из html
        lyrics_tags = soup.find_all("div", attrs={"class": 'listalbum-item', "id": None}) # разбиваем на тэги
        lyrics = [tag.getText() for tag in lyrics_tags] # получем текст
        return lyrics

    def extract_list_of_songs(self, page):
        soup = BeautifulSoup(page, "html.parser") # парсим данные из html
        songs_tags = soup.find_all("div", attrs={"class": 'listalbum-item', "id": None})
        songs = [tag.getText() for tag in songs_tags]
        return songs

    def format_lyrics(self, lyrics):
        formated_lyrics = "\n".join(lyrics) #приводим к необходимому формату (\n и ид)
        return formated_lyrics

    def format_self_songs(self):
        for name in range(len(self.songs)):
            self.songs[name] = "\n".join(self.songs[name])

    def format_title(self):
        return "{} by {}".format(self.music.title(), self.artist.title())

    def get_lyrics(self):
        page = self.get_page_of_song()
        lyrics = self.extract_lyrics(page) # получаем текст песни
        return lyrics
    
    def set_songs(self):
        page = self.get_page_of_artist()
        self.songs = self.extract_list_of_songs(page) # работает

    #с такой логикой не парсится последняя песня!
    def set_music(self):
        if self.music == '':
            self.music = self.songs[0]
            return True
        elif self.songs.index(self.music) == len(self.songs)-1:
            self.music = self.songs[-1]
            return False
        else:
            self.music = self.songs[self.songs.index(self.music)+1]
            return True

#просто сэйвим текст в файл с кодировкой utf-8
def save_lyrics_to_file(path, lirics):
    with open(path,'a',encoding = 'utf-8') as f:
        f.write(lirics)

def run():
    path = '/home/siarhei/Programming/Univer/Koursach/music-applications/text-generator/lyrics-data.txt'

    #ПАРАМЕТРЫ ДЛЯ СКИПТА (БЕРЕМ ПАРАМЕТРЫ ИЗ СТРОЧКИ ЧЕРЕЗ ARGPARSE)
    #parser = argparse.ArgumentParser(description="Fetch lyric from azlyric")
    #parser.add_argument("artist", metavar="Artist", type=str)
    #parser.add_argument("music", metavar="Music", type=str)
    #parser.add_argument("-s", "--save", metavar='path', help="Save to the file", default=True, dest='path')
    #args = parser.parse_args()
    num = 5
    #чек кэша, если уже есть этот исполнитель не парсим снова
    c = Cache()
    az = Azlyrics('suicideboys')#Azlyrics(args.artist, args.music)
    cache_key = '_'.join(az.normalize_artist_music_per_song())

    lyrics = c.get(cache_key) # проверяем, был ли исполнитель ранее записан
    if lyrics is None:
        az.set_songs()
        while az.set_music() and num > 0:
            time.sleep(2)
            lyrics = az.format_lyrics(az.get_lyrics())
            c.add(cache_key, lyrics) # добавляем в кэш
            save_lyrics_to_file(path, lyrics) # записывем в файл
            print(f'Successful! {num}')
            num -= 1
    #if args.path:
    #if True:
    #    #save_lyrics_to_file(args.path, lyrics)
    #    save_lyrics_to_file(path, lyrics) # записывем в файл
    else:
        print(az.format_title())
        print(lyrics)

run()