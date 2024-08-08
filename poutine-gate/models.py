from fastapi import FastAPI
from pydantic import BaseModel
from lyrics_extractor import SongLyrics

class Robot(BaseModel):
    def __init__(self, sound):
        self.sound = sound

class Outremona(Robot):
    def __init__(self, sound, cheese):
        super().__init__(sound)
        self.cheese = cheese

    def get_cheese(self):
        return self.__cheese

    def set_cheese(self, cheese):
        self.__cheese = cheese
    def squeeze_scream(self, scream):
        return scream

class Montroyashi(Robot):
    def robot_sounds(self):
        extract_lyrics = SongLyrics("AIzaSyD7EM5Vy5fG-y1jQW7RnKO-3er8ps2Jr-I", "327c9ebdadd0b4bc1")
        extract_lyrics.get_lyrics(self.sound)

    def drunk_detector(self):
        pass
class Verduny(Robot):
    def __init__(self, sound, potato_size, potato_dip):
        super().__init__(sound)
        self.potato_size = potato_size
        self.potato_dip = potato_dip

    def get_potato_size(self):
        return self.__potato_size

    def set_potato_size(self, potato_size):
        self.__potato_size = potato_size

    def get_potato_dip(self):
        return self.__potato_dip

    def set_potato_dip(self, potato_dip):
        self.__potato_dip = potato_dip
class Nordo(Robot):
    def __init__(self, sound, softness):
        super().__init__(sound)
        self.softness = softness
    def softness_level(self, softness: int):
        if softness < 5:
            print("Too hard")
        elif 5 <= softness < 10:
            print("Needs more time")
        elif 10 <= softness < 15:
            print("Almost done")
        elif 15 <= softness < 20:
            print("Check it's done + perfect")
        else:
            print("Too mushy")
class Bizar(Robot):
    def __init__(self, sound, oil):
        super().__init__(sound)
        self.oil = oil

    def get_oil(self):
        return self.__oil

    def set_oil(self, oil):
        self.__oil = oil
class Oldoporto(Robot):
    def __init__(self, sound, temperature):
        super().__init__(sound)
        self.temperature = temperature

    def get_temperature(self):
        return self.__temperature

    def set_temperature(self, temperature):
        self.__temperature = temperature
class Pierre(Robot):
    def __init__(self, sound, container):
        super().__init__(sound)
        self.container = container

    def get_container(self):
        return self.__container

    def set_container(self, container):
        self.__container = container

# if __name__ == "__main__":
#     extract_lyrics = SongLyrics("AIzaSyD7EM5Vy5fG-y1jQW7RnKO-3er8ps2Jr-I", "327c9ebdadd0b4bc1")
#     extract_lyrics.get_lyrics('Hallelujah')
