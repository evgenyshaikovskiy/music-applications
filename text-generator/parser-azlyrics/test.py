import argparse, sys, re
import urllib.request, urllib.error
from bs4 import BeautifulSoup
import time
from cache import Cache
import os
from os.path import abspath



def run():
    parser = argparse.ArgumentParser(description="Get all lyrics or a certain number of artist from azlyric")
    parser.add_argument("artist", metavar="Artist", type=str, help='Enter Artist name')
    parser.add_argument("number_of_songs", metavar="number_of_songs", type=int, \
        help='Enter number of songs or big value(for example 10000) to parse all')
    parser.add_argument("path", metavar='path_to_file', type=str, \
        help='Enter "def" to save all in script directory')
    parser.add_argument("init_new_file", metavar='new_file', type=str, default = True,\
        help='Need to create a new file for writing (bool)?')

    args = parser.parse_args()

    print(f'{args.artist}  {args.number_of_songs}  {args.path}  {args.path} {args.init_new_file}')

run()