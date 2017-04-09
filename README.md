# srt2vtt
tbd.
Transform SubRip Subtitle files into webVTT which can then be consumed by HTML5 `<video>`


## Installing
To install srt2vtt run:
```
    yarn install srt2vtt --global
```

## Usage
Pass it the .srt file you want to convert directly or by stdin:

```
srt2vtt myfile.srt > newfile.vtt
# or:
cat myfile.srt | srt2vtt > newfile.vtt
```

## License
Licensed under MIT License
