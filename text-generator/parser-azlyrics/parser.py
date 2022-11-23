import argparse, sys, re
import urllib.request, urllib.error
from bs4 import BeautifulSoup
import time
from cache import Cache
import os
from os.path import abspath

class Azlyrics(object):

    def __init__(self, artist):
        self.artist = artist
        self.current_song = ''
        self.songs = []

    def normalize_str(self, str):
        return re.sub(r'\W+', '', str.lower()) # make str normal for url format

    #
    def normalize_artist_current_song_per_song(self):
        return self.normalize_str(self.artist), self.normalize_str(self.current_song)
    
    def normalize_artist_current_song(self):
        norm_str = self.normalize_str(self.artist)
        return norm_str[0], norm_str # url - https://www.azlyrics.com/FIRST-LATER-OF-ARTIST/ARTIST-NAME.html

    def url(self): #url to song
        if not self.artist and not self.current_song:
            self.artist = "rickastley"
            self.current_song = "nevergonnagiveyouup"
        return "http://azlyrics.com/lyrics/{}/{}.html".format(*self.normalize_artist_current_song_per_song())

    def url_for_artist(self): #url to artist
        if not self.artist:
            self.artist = 'rickastley'
        return "http://azlyrics.com/{}/{}.html".format(*self.normalize_artist_current_song())

    # parse html per url
    def get_page_of_song(self):
        try:
            page = urllib.request.urlopen(self.url()) # parse the page
            return page.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                print("current_song not found")
                sys.exit(1)
    
    # to obtain page with all songs from current artist
    def get_page_of_artist(self):
        try:
            page = urllib.request.urlopen(self.url_for_artist()) # parse the page
            return page.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                print("Artist not found")
                sys.exit(1)

    def extract_lyrics(self, page):
        soup = BeautifulSoup(page, "html.parser") # get data from html code
        lyrics_tags = soup.find_all("div", attrs={"class": None, "id": None}) # divide to tags
        lyrics = [tag.getText() for tag in lyrics_tags] # get text from tag
        return lyrics

    def extract_list_of_songs(self, page):
        soup = BeautifulSoup(page, "html.parser")
        songs_tags = soup.find_all("div", attrs={"class": 'listalbum-item', "id": None}) # get all strings from class : listalbum-item
        songs = [tag.getText() for tag in songs_tags] # get all songs(all strings from listalbum-item tags)
        return songs

    def format_lyrics(self, lyrics):
        formated_lyrics = "\n".join(lyrics)
        return formated_lyrics

    def format_self_songs(self):
        for name in range(len(self.songs)):
            self.songs[name] = "\n".join(self.songs[name]) # normalize every song in list

    def format_title(self):
        return "{} by {}".format(self.current_song.title(), self.artist.title())

    def get_lyrics(self):
        page = self.get_page_of_song()
        lyrics = self.extract_lyrics(page)
        return lyrics
    
    def set_songs(self):
        page = self.get_page_of_artist()
        self.songs = self.extract_list_of_songs(page)

    def get_current_song(self):
        return self.current_song

    # WARNING!
    # Logic of this finc in combination with the while loop in run() does't parse the last song
    def set_current_song(self):
        if self.current_song == '':
            self.current_song = self.songs[0]
            return True
        elif self.songs.index(self.current_song) == len(self.songs)-1:
            self.current_song = self.songs[-1]
            return False
        else:
            self.current_song = self.songs[self.songs.index(self.current_song)+1]
            return True

def save_lyrics_to_file(path, lirics):
    with open(path,'a',encoding = 'utf-8') as f:
        f.write(lirics)

def set_settings(new_file, artist_name,path_to_cache, path_to_file):
    if path_to_file != 'def':
        if new_file == True:
            with open(path_to_file+'/'+str(artist_name),'w',encoding = 'utf-8') as f:
                f.write('')
    else:
        if new_file == True:
            path_to_file = os.path.join(os.path.dirname(abspath(__file__)), artist_name+'.txt')
            with open(path_to_file,'w',encoding = 'utf-8') as f:
                f.write('')
    
    if path_to_cache == 'None': path_to_cache = None
    return path_to_cache, path_to_file


def run():

    #argparse - helps to take py script parameters from the console line    
    parser = argparse.ArgumentParser(description="Get all lyrics or a certain number of artist from azlyric")
    parser.add_argument("artist", metavar="Artist", type=str, help='Enter Artist name', default='Green Day')
    parser.add_argument("number_of_songs", metavar="number_of_songs", type=int, \
        help='Enter number of songs or big value(for example 10000) to parse all', default=30)
    parser.add_argument("path_to_file", metavar='path_to_file', type=str, \
        help='Enter "def" to save all in script directory', default='def')
    parser.add_argument("path_to_cahe", metavar='path_to_file', type=str, \
        help='Enter "None" to save all in script directory', default='None')
    parser.add_argument("init_new_file", metavar='new_file', type=str, default = 'True',\
        help='Need to create a new file for writing ?')

    args = parser.parse_args()
    args.init_new_file = bool(args.init_new_file)
    
    path_to_cache, path_to_file = set_settings(args.init_new_file, args.artist, args.path_to_cahe, args.path_to_file)
    
    c = Cache(path_to_cache)
    az = Azlyrics(args.artist)
    num = 0
    cache_key = '_'.join(az.normalize_artist_current_song_per_song())

    lyrics = c.get(cache_key) # check if this artist is in the cache
    if lyrics is None:
        az.set_songs()
        while az.set_current_song() and num != args.number_of_songs:
            time.sleep(0.7) # the optimal MIN parameter with which you won't get a ban IS 0.5
            lyrics = az.format_lyrics(az.get_lyrics())
            curr_song = az.get_current_song()
            c.add(cache_key, curr_song+'\n') # add to cache
            save_lyrics_to_file(path_to_file, lyrics) # write to file
            print(f'Successful for {curr_song}! Num = {num+1}')
            num += 1
    else:
        print(az.format_title())
        print(lyrics)

run()