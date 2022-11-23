import os
from os.path import abspath
from shutil import rmtree

class Cache(object):
    
    def  __init__(self, CACHEDIR=None):
        if CACHEDIR is None:
            self.CACHEDIR = os.path.join(os.path.dirname(abspath(__file__)), "cache", "azlyrics") # make new dir 'cache' in which already received groups will be stored
        if not os.path.exists(self.CACHEDIR):
            os.makedirs(self.CACHEDIR)

    def key_path(self, key):
        return os.path.join(self.CACHEDIR, key)

    def add(self, key, content):
        key_path = self.key_path(key)
        with open(key_path, "a") as f:
            f.write(content)

    def exists(self, key):
        key_path = self.key_path(key)
        return os.path.exists(key_path)

    def get(self, key):
        if (self.exists(key)):
            key_path = self.key_path(key)
            with open(key_path, "r") as f:
                return f.read()
            
        
    def destroy(self):
        if os.path.exists(self.CACHEDIR):
            rmtree(self.CACHEDIR)